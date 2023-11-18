import { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignupHandler = async () => {
    try {
      const res = await axios.post("http://localhost:1337/api/login", {
        name,
        email,
        password,
      });

      if (res) {
        alert("Register Success!");
        navigate("/login");
      }
    } catch (error:any) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          border: "4px solid grey",
          mt: 15,
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Sign Up
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            fullWidth
            label="Name"
            name="name"
            onChange={(e: any) => setName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Email address"
            name="email"
            onChange={(e: any) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            required
            fullWidth
            label="Paswword"
            name="password"
            sx={{ mt: 2 }}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={onClickSignupHandler}
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>

          <Typography textAlign='center' sx={{mt:2}}>
            Already a member? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
