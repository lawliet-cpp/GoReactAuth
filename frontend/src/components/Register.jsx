import React from "react";
import "../app.css";
import Header from "./Nav";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      username: username,
      password: password,
    };
    if (password === password2) {
      axios.post("http://127.0.0.1:8000/register", data)
      .then(res=>{
         setMessages([
             ...messages,
             "Account Created Successfully"
         ]
  
         )
         setErrors([])
      })
      .catch(err=>{
        setErrors([
          ...errors,
          ...err.response.data.errors
        ])
      })
    }else{
        setErrors([
            ...errors,
            "The passwords don't match"
        ])
    }
  };
  return (
    <div>
      <Header Name="Register" />
      <form className="form-signin" onSubmit={handleSubmit}>
        {errors.map((err, idx) => {
          return (
            <Alert variant="danger" key={idx}>
              {err}
            </Alert>
          );
        })}
        {messages.map((message, idx) => {
          return (
            <Alert variant="success" key={idx}>
              {message}
            </Alert>
          );
        })}
        <h1 className="h3 mb-3 fw-normal form-signin">Sign Up</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          placeholder="Email address"
          required
        />

        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Username"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Password"
          required
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          required
        />

        <button className=" w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
