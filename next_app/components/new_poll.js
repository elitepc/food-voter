import {Button, TextField} from "@mui/material";

export default function PageWithJSbasedForm() {
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            name: event.target.name.value,
            answer1: event.target.answer1.value,
            answer2: event.target.answer2.value,
            answer3: event.target.answer3.value,
            answer4: event.target.answer4.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/polls'

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
        window.location.reload()
    }
    return (
        // We pass the event to the handleSubmit() function on submit.
        <form onSubmit={handleSubmit}>
            <TextField fullWidth name="name" label="name" variant="standard" />
            <TextField fullWidth name="answer1" label="answer1" variant="standard" />
            <TextField fullWidth name="answer2" label="answer2" variant="standard" />
            <TextField fullWidth name="answer3" label="answer3" variant="standard" />
            <TextField fullWidth name="answer4" label="answer4" variant="standard" />
            <Button type="submit" variant="text">Criar</Button>
        </form>
    )
}
