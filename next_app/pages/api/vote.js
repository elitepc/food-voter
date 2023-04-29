import {polls} from "./polls";


export default function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "POST":
            const {id, answer} = req.body;
            let answer_id = "answer" + answer;
            // find pool by id
            for (let i = 0; i < polls.length; i++) {
                if (polls[i].id === id) {
                    polls[i][answer_id].votes += 1;
                    break;
                }
            }
            res.status(200).json(polls);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}