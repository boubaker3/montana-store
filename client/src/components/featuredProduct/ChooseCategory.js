import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import Welcoming from "../assets/welcoming.png";
import { Link, useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const ChooseCategory = () => {
  const [open, setOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const choose = () => {
    localStorage.setItem("favorite", selectedCategory);
    window.location.reload();
    setOpen(false);
    // Add your logic for what to do with the selected category
  };

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Beauty",
    "Books",
    "Toys & Games",
    "Automotive",
    "Health ",
    "Jewelry ",
    "Accessories",
    // Add more categories as needed
  ];

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <Grid container sx={{ backgroundColor: "rgb(241, 241, 241,0.6)" }}>
        <Grid
          container
          justifyContent="center"
          position="relative"
          sx={{ mb: { xs: 14, md: 16, lg: 20 } }}
        >
          <Avatar
            sx={{
              width: "100%",
              height: "auto",
              position: "absolute",
              borderRadius: 0,
            }}
            src={Welcoming}
          />
        </Grid>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columnGap={2}
          m={1}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mt: { xs: 2, sm: 10, lg: 8 },
              textAlign: "center",
            }}
          >
            Choose your favorite category
          </Typography>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columnGap={2}
          m={2}
        >
          {categories.map((category) => (
            <Button
              disableElevation
              key={category}
              onClick={() => handleCategoryClick(category)}
              variant="contained"
              sx={{
                borderRadius: "8px",
                fontSize: { xs: "12px", md: "14px" },
                height: "40px",
                p: 2,
                m: 2,
                backgroundColor:
                  selectedCategory === category ? "secondary.main" : "#F0F0F0",
                color: selectedCategory === category ? "white" : "inherit",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              {category}
            </Button>
          ))}
        </Grid>

        <Button
          onClick={choose}
          color="primary"
          disableElevation
          variant="contained"
          disabled={!selectedCategory}
          sx={{
            borderRadius: "32px",
            fontSize: { xs: "12px", md: "16px" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            m: 2,
          }}
        >
          Continue
        </Button>
      </Grid>
    </Dialog>
  );
};

export default ChooseCategory;
