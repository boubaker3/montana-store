import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import InfoIcon from "@mui/icons-material/Info";
import ChooseCategory from "./featuredProduct/ChooseCategory";

export default function Main() {
  const favorite = localStorage.getItem("favorite");

  const menuData = [
    { title: "Home", path: "/", icon: <HomeIcon /> },
    { title: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
    { title: "Reviews", path: "/reviews", icon: <StarIcon /> },
    { title: "Contact us", path: "/contact", icon: <ContactMailIcon /> },
    { title: "About us", path: "/about", icon: <InfoIcon /> },
  ];

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;
      case "/orders":
        setValue(1);
        break;
      case "/reviews":
        setValue(2);
        break;
      case "/contact":
        setValue(3);
        break;
      case "/about":
        setValue(4);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        sx={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          display: "flex",
          backdropFilter: "blur(6px)",
          justifyContent: "center",
          borderRadius: "32px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            sx: {
              position: "absolute",
              backgroundColor: "primary",
              width: "100%",
              height: { md: "100%" },
              maxWidth: "100%",
              borderRadius: "32px",
            },
          }}
          sx={{
            "& .MuiTabs-flexContainer": {
              gap: "8px", // Adjust the value to reduce spacing
            },
          }}
        >
          {menuData.map((menuItem, index) => (
            <Tab
              component={Link}
              to={menuItem.path}
              key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {menuItem.icon}
                  <Typography
                    sx={{
                      ml: 1,
                      display: { xs: "none", lg: "flex" },
                      fontSize: { xs: "8px", md: "12px", lg: "14px" },
                    }}
                  >
                    {menuItem.title}
                  </Typography>
                </Box>
              }
              {...a11yProps(index)}
              sx={{
                minWidth: { xs: "70px", md: "160px" },
                width: { xs: "70px", md: "160px" },
                zIndex: "100",
                color: {
                  md: value === index ? "white !important" : "black !important",
                },
                flexDirection: "row",
                gap: "8px",
                justifyContent: { xs: "center" },
                "& .MuiTab-label": {
                  display: "none",
                },
              }}
            />
          ))}
        </Tabs>
      </Grid>

      <Grid item xs={12} mt={8}>
        <Outlet />
      </Grid>

      {!favorite && <ChooseCategory />}
    </Grid>
  );
}
