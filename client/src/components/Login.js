import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const Input = styled.input`
  border-radius: 6px;
  outline: none;
  height: 3rem;
  width: 15rem;
`;

const LoginForm = styled.div`
  position: relative;
  top: 3rem;
`;

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
        if (res.data === "success") {
          setAuth(true);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <LoginForm>
      <h1>Login</h1>
      <Input
        type='text'
        placeholder='email'
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <Input
        type='password'
        placeholder='password'
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <Button style={{ margin: "5px" }} onClick={login}>
        Login
      </Button>
      <br />
      <Link to='/register'>Register</Link>
    </LoginForm>
  );
}

export default Login;
