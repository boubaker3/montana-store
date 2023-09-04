import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { addContact } from "./ContactsApi";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [res, setRes] = useState("");
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitContact = async (e) => {
    e.preventDefault();
    if (formData.fullname.length < 4 || formData.fullname.length > 24) {
      setError("fullname must be between 4 and 12 characters.");
      return;
    }

    if (formData.email.length < 10 || formData.email.length > 254) {
      setError("Email must be between 10 and 254 characters.");
      return;
    }

    if (formData.phone.length < 4 || formData.phone.length > 15) {
      setError("phone must be between 4 and 15 characters.");
      return;
    }

    if (formData.message.length < 4 || formData.message.length > 1000) {
      setError("message must be between 4 and 1000 characters.");
      return;
    }
    setLoading(true);
    try {
      const response = await addContact({
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setLoading(false);
      setRes(response.res);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid item xs={12} md={5}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4">Contact us</Typography>
        </Grid>
        <form onSubmit={submitContact}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="fullname"
              label="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              autoComplete="email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phone"
              label="phone number"
              value={formData.phone}
              margin="normal"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="message"
              label="message"
              type="text"
              value={formData.message}
              onChange={handleChange}
              margin="normal"
              maxRows={5}
              multiline
            />
          </Grid>
          <Grid item xs={12} sx={{ p: { xs: 2, xl: 4 } }}>
            <Button
              disableElevation
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              sx={{
                textAlign: "center",
                color: "white",
                fontFamily: "montserrat",
                fontSize: { xs: "12px", md: "14px", lg: "14px" },
           
              }}
            >
              Submit
            </Button>
          </Grid>
          {loading && (
            <Grid container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}

          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Montserrat",
              textAlign: "center",
              color: "orange",
              margin: "50px",
            }}
          >
            {error}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "Montserrat",
              textAlign: "center",
              color: "orange",
              margin: "50px",
            }}
          >
            {res}
          </Typography>
        </form>
      </Grid>
      <Grid container justifyContent="center" columnGap={2}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6">Get in touch:</Typography>
        </Grid>
        <IconButton
          href="mailto:contact@yourstore.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <EmailIcon />
          <Typography>montanastore@gmail.com</Typography>
        </IconButton>

        <IconButton
          href="tel:+11234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PhoneIcon />
          <Typography>+212655130071</Typography>
        </IconButton>
        <IconButton
          href="https://www.instagram.com/montana store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
          <Typography>montana_store</Typography>
        </IconButton>
        <IconButton
          href="https://www.facebook.com/montana store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
          <Typography>montana store</Typography>
        </IconButton>
      </Grid>
    </Grid>
  );
}
