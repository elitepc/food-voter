import {useState, useEffect, useRef} from 'react'
import Poll from "./current_poll";

export default function Polls() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    function rerenderParentCallback() {
        fetch('/api/polls')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }
    useEffect(() => {
        setLoading(true)
        const timer = window.setInterval(() => {
            fetch('/api/polls')
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }, 2000);

        return () => window.clearInterval(timer);
    }, []);


    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div style={{marginTop: "10px"}}>
            {data.map(poll => (
                <Poll rerenderParentCallback={rerenderParentCallback} key={poll.id} poll={poll} />
            ))}
            <h2>{data.name}</h2>
        </div>
    )
}
