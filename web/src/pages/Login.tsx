import { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const res = await axios.post("http://localhost:1337/api/login", {
        email,
        password,
      });

      if (res) {
        alert("Login Success!");
        localStorage.setItem("authToken", res?.data?.token);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error, "login erooor");
      alert(error.response?.data?.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 4,
            border: "4px solid grey",
            mt: 20,
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              fullWidth
              label="Email address"
              name="email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <TextField
              required
              fullWidth
              label="Paswword"
              name="password"
              sx={{ mt: 2 }}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={loginHandler} sx={{ mt: 2 }}>
              Login
            </Button>
            <Typography textAlign='center' sx={{mt:2}}>
              Not a Member?<Link to="/register">Signup</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
