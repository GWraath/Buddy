import React from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
export default function NewLogin() {
  // let { setCurrentUser } = useContext(CurrentUserContext)
  const [LUserName, setLUserName] = useState("");
  const [LPassWord, setLPassWord] = useState("");
  const [users, setUsers] = useState("");
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
