import React from "react";
import { useEffect } from "react";
export default function Logout(props) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      props.history.push("/login")

      
    }else{
        props.history.push("/login")
    }
  });
  return (
    <div>
        
    </div>
  );
}
