import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            ✨TODO✨
          </Typography>
          <Box display="flex" sx={{ ml: "auto" }}>
            <LogoutIcon  sx={{width:40,height:40,cursor:'pointer'}} onClick={logout}/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
