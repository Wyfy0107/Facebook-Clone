import React, { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const RegisterForm = styled.div`
  position: relative;
  top: 3rem;
`;

const Input = styled.input`
  border-radius: 6px;
  outline: none;
  height: 3rem;
  width: 15rem;
`;

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
    <RegisterForm>
      <h1>Register</h1>
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
      <Button style={{ margin: "5px" }} onClick={register}>
        Register
      </Button>
      <br />
      <Link to='/'>Login</Link>
    </RegisterForm>
  );
}

export default Register;
