import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });

    const login = async () => {
        const res = await API.post("/auth/login", data);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
    };

    return (
        <>
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
            <input placeholder="Password" type="password" onChange={(e) => setData({ ...data, password: e.target.value })} />
            <button onClick={login}>Login</button>
        </>
    );
}
