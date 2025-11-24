import { useState } from "react";
import API from "../utils/api";

export default function Register() {
    const [data, setData] = useState({ name: "", email: "", password: "" });

    const submit = async () => {
        await API.post("/auth/register", data);
        alert("Registered! Go to login.");
    };

    return (
        <>
            <h2>Register</h2>
            <input placeholder="Name" onChange={(e) => setData({...data, name:e.target.value})} />
            <input placeholder="Email" onChange={(e) => setData({...data, email:e.target.value})} />
            <input placeholder="Password" type="password" onChange={(e) => setData({...data, password:e.target.value})} />
            <button onClick={submit}>Submit</button>
        </>
    );
}
