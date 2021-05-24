import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Nav"
import "../app.css"
export default function Home(props) {
  const [username, setUsername] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsername(res.data.username)
      })
      .catch((err) => {
        console.log(err.response.data);
        props.history.push("/login")
      });
  });

  return <div>
      <Header Name="Home"></Header>
        
        <h1> Welcome {username}</h1>
  </div>;
}
