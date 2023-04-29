import supabase from "../../utils/supabase";


export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "POST":
            const {id, answer} = req.body;
            let answer_id = "answer" + answer;
            const { data } = await supabase.from('polls').select('id, name, answer1, answer2, answer3, answer4').order('id', { ascending: false })
            let found_row;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    found_row = data[i];
                }
            }
            found_row[answer_id].votes += 1;
            const { data1 } = await supabase.from('polls').update({[answer_id]: found_row[answer_id]}).eq('id', id)
            res.status(200).json({});
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}