import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isRegister, setRegister] = useState(false);

  const register = () => {
    if (!email && !password) return alert("please fill in email and password");
    axios
      .post("/register", {
        email: email,
        password: password,
      })
      .then(res => {
        alert("success");
        setRegister(true);
      })
      .catch(err => alert(err.message));
  };

  return isRegister ? (
    <Redirect to='/' />
  ) : (
    <div>
      <h1>Register</h1>
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
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
