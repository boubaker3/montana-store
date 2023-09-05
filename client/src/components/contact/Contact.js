import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Box,
} from "@mui/material";
import { addContact } from "./ContactsApi";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
const commonStyle = {
  color: "black",
};

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
    <Grid container alignItems="center" justifyContent="center" spacing={4}>
      <Grid item lg={4} >
    
          <Typography variant="h5" color="black" textAlign="center">
            Get in touch
          </Typography>
          <Grid item xs={12} mt={4}>
            <IconButton
              href="mailto:montanastore@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={commonStyle}
            >
              <EmailIcon fontSize="large"/>
              <Typography ml={2}>montanastore@gmail.com</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={12} mt={4}>
            <IconButton
              href="tel:+11234567890"
              target="_blank"
              rel="noopener noreferrer"
              sx={commonStyle}
            >
              <PhoneIcon fontSize="large"/>
              <Typography ml={2}>+212655130071</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={12} mt={4}>
            <IconButton
              href="https://www.instagram.com/montana store"
              target="_blank"
              rel="noopener noreferrer"
              sx={commonStyle}
            >
              <InstagramIcon fontSize="large"/>
              <Typography ml={2}>montana_store</Typography>
            </IconButton>
          </Grid>
          <Grid item xs={12} mt={4}>
            <IconButton
              href="https://www.facebook.com/montana store"
              target="_blank"
              rel="noopener noreferrer"
              sx={commonStyle}
            >
              <FacebookIcon fontSize="large"/>
              <Typography ml={2}>montana store</Typography>
            </IconButton>
          </Grid>
       
      </Grid>
      <Grid item xs={12} lg={5} justifyContent="center" mt={2}>
        <Grid item xs={12} justifyContent="center" display="flex">
          <Typography variant="h4">Contact us</Typography>
        </Grid>
        <Grid item xs={12} m={2}>
          <Typography color="gray">
            Feel free to contact us any time,we will get back
          </Typography>
          <Typography color="gray">to you soon as we can! </Typography>
        </Grid>

        <form onSubmit={submitContact}>
          <Grid item xs={12} sx={{ mb: 4 }}>
            <OutlinedInput
              fullWidth
              onChange={handleChange}
              name="fullname"
              placeholder="Full Name"
              type="text"
              value={formData.fullname}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
              sx={{
                backgroundColor: "#F0F0F0",
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 4 }}>
            <OutlinedInput
              fullWidth
              onChange={handleChange}
              name="email"
              placeholder="Email Address"
              type="text"
              value={formData.email}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
              sx={{
                backgroundColor: "#F0F0F0",
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 4 }}>
            <OutlinedInput
              fullWidth
              onChange={handleChange}
              name="phone"
              placeholder="Phone Number"
              type="text"
              value={formData.phone}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              }
              sx={{
                backgroundColor: "#F0F0F0",
                "& fieldset": { border: "none" },
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <OutlinedInput
              fullWidth
              onChange={handleChange}
              name="message"
              placeholder="Message"
              type="text"
              value={formData.message}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
              sx={{
                backgroundColor: "#F0F0F0",
                "& fieldset": { border: "none" },
              }}
              maxRows={5}
              multiline
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              disableElevation
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
              sx={{
                color: "white",
                m: 4,
                borderRadius: "32px",
                fontSize: { xs: "12px", md: "14px", xl: "16px" },
              }}
            >
              Send it
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
              margin: 1,
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
              margin: 1,
            }}
          >
            {res}
          </Typography>
        </form>
      </Grid>
    </Grid>
  );
}
