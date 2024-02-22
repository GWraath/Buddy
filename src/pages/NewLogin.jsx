import React from "react";
import { useState, useContext } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import axios from "axios";
export default function NewLogin() {
  let { currentUser, setCurrentUser } = useContext(CurrentUserContext)
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
      const user = response.data.data.user
      if (user.username === username) {
        console.log(user)
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else { alert("Incorrect username or password") }
      
      navigate("/");
    } catch (error) {
      console.error(error);
      alert('Password or username is incorrect.')
    }
  };

  return (
    <div>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 15,
          pb: 4,
        }}
      >
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
      </Box>
    </div>
  );
}
