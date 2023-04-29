import supabase from "../../utils/supabase";


export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "GET":
            const { data } = await supabase.from('polls').select('id, name, answer1, answer2, answer3, answer4').order('id', { ascending: false })
            res.status(200).json(data);
            break;
        case "POST":
            const { name, answer1, answer2, answer3, answer4 } = req.body;
            let new_poll = {
                name,
                answer1: {name: answer1, votes: 0},
                answer2: {name: answer2, votes: 0},
                answer3: {name: answer3, votes: 0},
                answer4: {name: answer4, votes: 0},
            }
            const { data1 } = await supabase.from('polls').insert(new_poll).select()
            res.status(200).json(data1);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}