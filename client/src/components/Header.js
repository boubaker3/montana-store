import React, { useEffect } from "react";
import { Button, Typography, Grid, MenuItem, Menu } from "@mui/material";
import Logo from "./assets/logo.png"; // Replace with actual path
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetCartLength } from "./cart/CartApi";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const currentHour = new Date().getHours();
  const isMorning = currentHour >= 0 && currentHour < 12;
  const greeting = isMorning ? "Good Morning" : "Good Evening";
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const cartItemsLength = useSelector((state) => state.cart.cartItemsLength);
  const getCartLength = useGetCartLength();
  useEffect(() => {
    if (user) {
      getCartLength(user._id);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid
      container
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        mb: "64px",
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        pl={2}
        pr={2}
        display="flex"
        position="fixed"
        sx={{
          top: 0,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Grid component={Link} to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Grid>

        <Grid item display="flex" columnGap={2} alignItems="center">
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", md: "block" },
              fontSize: { xs: "12px", md: "16px" },
            }}
          >
            {greeting}
            {user !== null && token !== null ? " " + user.username + " " : null}
            !
          </Typography>
          {user == null && token == null ? (
            <>
              <Button
                component={Link}
                to="/auth/login"
                variant="outlined"
                color="primary"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/auth/signup"
                variant="contained"
                disableElevation
                color="primary"
                sx={{
                  fontSize: { xs: "12px", md: "14px" },
                  color: "white",
                }}
              >
                Signup
              </Button>
            </>
          ) : (
            <>
              <IconButton component={Link} to="/cart" aria-label="cart">
                <StyledBadge
                  badgeContent={cartItemsLength.length}
                  color="secondary"
                >
                  <ShoppingCartIcon sx={{ color: "primary.main" }} />
                </StyledBadge>
              </IconButton>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link onClick={logout} style={{ textDecoration: "none" }}>
                  <MenuItem sx={{ color: "black" }} onClick={handleClose}>
                    Logout
                  </MenuItem>
                </Link>
              </Menu>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
