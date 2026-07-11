import { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";

const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Rooms", id: "rooms" },
    { label: "Services", id: "services" },
    
  ];

  return (
    <>
      <AppBar position="fixed" color="primary" >
        <Toolbar sx={{ justifyContent: "space-between" }}>

          {/* Logo */}
          <Box sx={{ color: "#f5c518", fontWeight: "bold", fontSize: "22px", cursor: "pointer" }}
            onClick={() => scrollTo("home")}>
            🏨 Hotel Royal Stay
          </Box>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
            {navLinks.map((link) => (
              <Button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                sx={{ color: "white", textTransform: "capitalize", fontSize: "15px" }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Book Now Button */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button
              variant="contained"
              onClick={() => scrollTo("booking")}
              sx={{
                backgroundColor: "white",
                color: "#1B5E20",
                borderRadius: "25px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f5c518", color: "#1B5E20" }
              }}
            >
              Book Now
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      {isOpen && (
        <Box sx={{ position: "fixed", top: "64px", width: "100%", backgroundColor: "primary.main", zIndex: 999 }}>
          {navLinks.map((link) => (
            <Box key={link.id} sx={{ borderBottom: "1px solid #2E7D32", padding: "10px 20px" }}>
              <Button
                onClick={() => { scrollTo(link.id); setIsOpen(false); }}
                sx={{ color: "white", textTransform: "capitalize", fontSize: "15px" }}
              >
                {link.label}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default Navbar;