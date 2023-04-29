import {Button, Card, CardContent, CardHeader, LinearProgress, TextField} from "@mui/material";

export default function Poll({ poll, rerenderParentCallback }) {
    let highest_votes = Math.max(poll.answer1.votes, poll.answer2.votes, poll.answer3.votes, poll.answer4.votes)
    let percentage_answer1 = poll.answer1.votes / highest_votes * 100
    let percentage_answer2 = poll.answer2.votes / highest_votes * 100
    let percentage_answer3 = poll.answer3.votes / highest_votes * 100
    let percentage_answer4 = poll.answer4.votes / highest_votes * 100

    const sendVote = async (event) => {
        // Get data from the form.
        const data = {
            id: poll.id,
            answer: parseInt(event.target.dataset.answer),
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/vote'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        rerenderParentCallback();
    }
    return (
        // We pass the event to the handleSubmit() function on submit.
        <Card>
            <CardHeader title={poll.name} />
            <CardContent>
                <Button onClick={sendVote} data-answer={1} fullWidth type="submit" variant="text">{poll.answer1.name} ({poll.answer1.votes})</Button> <LinearProgress variant="determinate" value={percentage_answer1} />
                <Button onClick={sendVote} data-answer={2} fullWidth type="submit" variant="text">{poll.answer2.name} ({poll.answer2.votes})</Button> <LinearProgress variant="determinate" value={percentage_answer2} />
                <Button onClick={sendVote} data-answer={3} fullWidth type="submit" variant="text">{poll.answer3.name} ({poll.answer3.votes})</Button> <LinearProgress variant="determinate" value={percentage_answer3} />
                <Button onClick={sendVote} data-answer={4} fullWidth type="submit" variant="text">{poll.answer4.name} ({poll.answer4.votes})</Button> <LinearProgress variant="determinate" value={percentage_answer4} />
            </CardContent>
        </Card>
    )
}
