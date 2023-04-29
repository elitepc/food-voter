

const polls = [
    {
        id: 1,
        name: "O que e que se come?",
        answer1: {name: "Pizza de sushi", votes: 0},
        answer2: {name: "Sushi de pizza", votes: 0},
        answer3: {name: "Pizza de pizza", votes: 0},
        answer4: {name: "Sushi de sushi", votes: 0},
    }
]
export {polls}
export default function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "GET":
            // order pools by id desc
            polls.sort((a, b) => (a.id > b.id) ? -1 : 1)
            res.status(200).json(polls);
            break;
        case "POST":
            const { name, answer1, answer2, answer3, answer4 } = req.body;
            polls.push({
                id: polls.length + 1,
                name,
                answer1: {name: answer1, votes: 0},
                answer2: {name: answer2, votes: 0},
                answer3: {name: answer3, votes: 0},
                answer4: {name: answer4, votes: 0},
            });
            res.status(200).json(polls);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}