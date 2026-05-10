import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MyLogo from "../assets/sibdev-logo.svg";
import { useNavigate } from "react-router";

const pages = [
  { name: "Поиск", path: "/search" },
  { name: "Избранное", path: "/favorites" },
];

function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", color: "primary.main" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={MyLogo}
            onClick={() => navigate("/search")}
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: 48,
              height: 48,
            }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => navigate(page.path)}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={logout}
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
