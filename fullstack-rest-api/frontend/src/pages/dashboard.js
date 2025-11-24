import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const load = async () => {
        const res = await API.get("/tasks");
        setTasks(res.data);
    };

    const add = async () => {
        await API.post("/tasks", { title });
        load();
    };

    const del = async (id) => {
        await API.delete(`/tasks/${id}`);
        load();
    };

    useEffect(() => { load(); }, []);

    return (
        <>
            <h2>Dashboard</h2>
            <input placeholder="New task" onChange={(e) => setTitle(e.target.value)} />
            <button onClick={add}>Add</button>

            {tasks.map((t) => (
                <div key={t._id}>
                    {t.title}
                    <button onClick={() => del(t._id)}>Delete</button>
                </div>
            ))}
        </>
    );
}
