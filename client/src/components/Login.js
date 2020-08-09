import React, { useState } from "react";
import axios from "axios";

function Login({ setAuth }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    if (!email && !password) return alert("please fill in email and password");

    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then(res => {
        console.log(res.data);
        if (res.data === "success") {
          setAuth(true);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <input
        type='text'
        placeholder='email'
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        type='password'
        placeholder='password'
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
