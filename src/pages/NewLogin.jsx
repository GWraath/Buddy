import React from "react";
import { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { CurrentUserContext } from "../App";
import axios from "axios";
export default function NewLogin() {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()
  const [LUserName, setLUserName] = useState("");
  const [LPassWord, setLPassWord] = useState("");
  const [validateMsg, setValidateMsg] = useState("");

  const handleLogin = async () => {
    // e.preventDefault()
    const username = LUserName;
    const password = LPassWord;
    console.log(username)
    try {
      const response = await axios.post(
        "http://localhost:8063/api/users/login",
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log(token)
      setCurrentUser(token);
      // navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {validateMsg}
      <div>
        <label>Username</label>
      </div>
      <TextField
        type="text"
        value={LUserName}
        onChange={(e) => setLUserName(e.target.value)}
      ></TextField>
      <div>
        <label>Password</label>
      </div>
      <TextField
        type="password"
        value={LPassWord}
        onChange={(e) => setLPassWord(e.target.value)}
      ></TextField>
      <div>
        <Button size="small" onClick={handleLogin}>
          Login
        </Button>
      </div>
      <div>No account yet?</div>
      <Button size="small" href={"/reg/"}>
        Register
      </Button>
    </div>
  );
}
