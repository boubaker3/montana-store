import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Input,
  Button,
  Rating,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { addReview, getReviews } from "./ReviewsApi";
import ReviewsCard from "./ReviewCard";
import { useNavigate } from "react-router-dom";
import "./reviews.css";
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const handleGetReviews = async (page) => {
    setLoading(true);
    try {
      const reviews = await getReviews(page);
      setReviews(reviews);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReviews();
  }, []);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleShareReview = async () => {
    if (user) {
      if (review.length < 4 || review.length > 300) {
        setError("review must be between 4 and 300 chars");
        return;
      } else if (rating === 0) {
        setError("rating is required");
        return;
      }
      const response = await addReview({
        username: user.username,
        review: review,
        rating: rating,
        userid: user._id,
      });

      if (response) {
        setReview("");
        setRating(0);
        handleGetReviews();
        setSnackbarMessage(response.res);
        setSnackbarOpen(true);
      }
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      className="reviewsContainer"
    >
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4">your reviews</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#F0F0F0",
            borderRadius: "32px",
            display: "flex",
            mt: 2,
            p: 4,
          }}
        >
          <Input
            multiline
            fullWidth
            disableUnderline
            placeholder="Write your review here..."
            value={review}
            onChange={handleReviewChange}
          />
          <Rating
            sx={{ fontSize: { xs: "24px", md: "32px", xl: "48px" } }}
            name="rating"
            value={rating}
            precision={1}
            defaultValue={3}
            onChange={(event, newValue) => {
              handleRatingChange(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} display="flex">
          <Button
            onClick={() => {
              if (user) {
                handleShareReview();
              } else {
                navigate("/auth/login");
              }
            }}
            disableElevation
            variant="contained"
            sx={{
              paddingLeft: { xs: "30px", md: "60px" },
              paddingRight: { xs: "30px", md: "60px" },
              color: "white",
              m: "12px auto",
              borderRadius: "38px",
              fontSize: { xs: "12px", md: "14px", xl: "16px" },
              "&:hover": {
                backgroundColor: "secondary.main", // Change to your desired hover color
              },
              transition: "background-color 0.3s ease",
            }}
          >
            share review
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography>{error}</Typography>
        </Grid>{" "}
      </Grid>
      {loading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      <Grid
        container
        p={2}
        spacing={2}
        wrap="nowrap"
        className="reviewsContainer"
        sx={{
          overflowX: "auto",
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
          justifyContent: { xs: "start", xl: "center" },
        }}
      >
        {reviews && reviews.length === 0 && !loading ? (
          <Typography variant="h5" m={4}>
            no reviews found
          </Typography>
        ) : null}

        {reviews &&
          reviews.map((reviewItem) => (
            <Grid item key={reviewItem._id}>
              <ReviewsCard review={reviewItem} />
            </Grid>
          ))}
      </Grid>
      <Grid container justifyContent="center" >
        <Button
          variant="outlined"
          disabled={pageNum === 1}
          onClick={() => {
            setPageNum(pageNum - 1);
            handleGetReviews(pageNum - 1);
          }}
        >
          Previous Page
        </Button>
        <Button
          variant="outlined"
          disabled={reviews && reviews.length === 0}
          onClick={() => {
            setPageNum(pageNum + 1);
            handleGetReviews(pageNum + 1);
          }}
        >
          Next Page
        </Button>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
