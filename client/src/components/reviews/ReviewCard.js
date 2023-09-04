import { Avatar, Card, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import profile from "../assets/profile.png";
export default function ReviewsCard(props) {
  return (
    <Card
      sx={{
        width: { md: "350px" },
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "38px",
        padding: "20px 10px 10px 20px ",
        marginTop: "20px",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Avatar
            src={profile}
            sx={{
              borderRadius: "100%",
              width: " 80px",
              height: " 80px",
              m: "0 auto",
            }}
          ></Avatar>
        </Grid>

        <Grid item xs={12} md={8} display="flex" columnGap={1}>
          <Typography sx={{ fontSize: { xs: "12px", md: "18px" } }}>
            {props.review.username}{" "}
          </Typography>
          <Rating
            color="primary"
            name="read-only"
            value={props.review.rating}
            readOnly
          />
        </Grid>

        <Grid item xs={12} sx={{ color: "gray", m: 2 }}>
          <Typography sx={{ fontSize: { xs: "12px", md: "14px", xl: "16px" } }}>
            {props.review.review}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
