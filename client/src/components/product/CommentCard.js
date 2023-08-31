import { Avatar, Card, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import profile from "../assets/profile.png";
export default function CommentCard(props) {
  return (
    <Card
      sx={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: "38px",
        padding: " 10px ",
        marginTop: "20px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "16px" },
              color: "gray",
              textAlign: "end",
            }}
          >
            {new Date(props.comment.commentDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Avatar
            src={profile}
            sx={{
              borderRadius: "32px",
              width: " 100px",
              height: " 100px",
              m: { xs: "0 auto", md: 0 },
            }}
          ></Avatar>
        </Grid>
        <Grid item xs={12} md={8} display="flex" columnGap={1}>
          <Typography sx={{ fontSize: { xs: "12px", md: "18px" } }}>
            {props.comment.commentUser}{" "}
          </Typography>
          <Rating
            color="primary"
            name="read-only"
            value={props.comment.score}
            readOnly
          />
        </Grid>
        <Grid item xs={12} md={10} display="flex" columnGap={1} m={2} mb={2}>
          <Typography
            sx={{ fontSize: { xs: "12px", md: "16px" }, color: "gray" }}
          >
            {props.comment.comment}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
