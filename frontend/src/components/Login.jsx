import React, { Component } from "react";
import {Alert} from "react-bootstrap"
import axios from "axios"
import Header from "./Nav";

import "../app.css";
export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors :[]
  };
  Emailchange = (e) => {
    this.setState({
      email: e.target.value,
      password: this.state.password,
    });
  };
  PasswordChange = (e) => {
    this.setState({
      email: this.state.email,
      password: e.target.value,
    });
  };
  handleSubmit = (e)=>{
    e.preventDefault()
    const data = {
        "email":this.state.email,
        "password":this.state.password
    }
    axios.post("http://127.0.0.1:8000/login",data)
    .then(res=>{
        localStorage.setItem("token",res.data.token)
        this.props.history.push("/")
    })
    .catch(err=>{
      if(!this.state.errors.includes(err.response.data.error)){
        console.log("true")
        this.setState({
          errors:[
              err.response.data.error.charAt(0).toUpperCase() + err.response.data.error.slice(1)
          ]
      })
      }
        
        
    })
  }
  render() {
    return (
      <div>
        <Header Name="Login" />
        <form className="form-signin" onSubmit={this.handleSubmit}>
        {this.state.errors.map((err,idx)=>{
            return(
                <Alert variant="danger" key={idx}>
                    {err}
                </Alert>
            )
        })}
          <h1 className="h3 mb-3 fw-normal form-signin">Sign In</h1>
          <input
            onChange={this.Emailchange}
            type="email"
            className="form-control"
            placeholder="Email address"
            required
          />

          <input
           onChange={this.PasswordChange}
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />

          <button className=" w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}
