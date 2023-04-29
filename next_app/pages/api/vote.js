import {polls} from "./polls";


export default function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "POST":
            const {id, answer} = req.body;
            let answer_id = "answer" + answer;
            polls[id-1][answer_id].votes += 1;
            res.status(200).json(polls);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}