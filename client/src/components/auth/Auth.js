import React, { useEffect } from "react";
import { Tab, Box, Grid, Tabs } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const menuData = [
    { title: "Login", path: "/auth/login" },
    { title: "Signup", path: "/auth/signup" },
  ];

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  let location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/auth/login":
        setValue(0);
        break;
      case "/auth/signup":
        setValue(1);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  return (
    <Box>
      <Grid container height="80vh" justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          md={10}
          lg={5}
          sx={{
            margin: "0 auto",
            padding: "24px",
            backgroundColor: " rgb(241, 241, 241,0.6)",
            borderRadius: "32px",
            boxShadow: "2px 2px 24px #DBDBDB",
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
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
                  height: "100%",
                  maxWidth: "100%",
                  borderRadius: "32px",
                },
              }}
            >
              {menuData.map((menuItem, index) => (
                <Tab
                  component={Link}
                  to={menuItem.path}
                  key={index}
                  label={menuItem.title}
                  {...a11yProps(index)}
                  sx={{
                    width: { xs: "150px" },
                    zIndex: "100",
                    color:
                      value === index ? "white !important" : "black !important",
                    fontSize: { xs: "12px", md: "12px", lg: "14px",xl:"16px" },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
