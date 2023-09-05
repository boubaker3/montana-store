import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { signup } from "./AuthApi";
import RegistrationTerms from "./RegistrationTerms";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const initialFormValues = {
  username: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [formData, setFormData] = useState(initialFormValues);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationTerms, setRegistrationTerms] = useState(false);
  const [agreed, setIsAgreed] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.username.length < 4 || formData.username.length > 12) {
      setError("Username must be between 4 and 12 characters.");
      return;
    }

    if (formData.email.length < 10 || formData.email.length > 254) {
      setError("Email must be between 10 and 254 characters.");
      return;
    }

    if (formData.password.length < 6 || formData.password.length > 16) {
      setError("Password must be between 6 and 16 characters.");
      return;
    }
    if (!agreed) {
      setError("Agree on terms and conditions.");
      return;
    }
    try {
      setIsLoading(true);
      const data = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (data.token && data.user) {
        setIsLoading(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        setError("Something went wrong, please try again");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong, please try again");
    }
  };

  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid item xs={12} md={8}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <OutlinedInput
                fullWidth
                onChange={handleChange}
                name="username"
                placeholder="Username"
                value={formData.username}
                autoComplete="off"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#F0F0F0",
                  "& fieldset": { border: "none" },
                }}
                inputProps={{
                  autoComplete: "new-password", // Prevent auto-fill
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <OutlinedInput
                fullWidth
                onChange={handleChange}
                name="email"
                placeholder="Email"
                value={formData.email}
                autoComplete="off"
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#F0F0F0",
                  "& fieldset": { border: "none" },
                }}
                inputProps={{
                  autoComplete: "new-password", // Prevent auto-fill
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput
                fullWidth
                type="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                placeholder="Password"
                autoComplete="off"
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                sx={{
                  backgroundColor: "#F0F0F0",
                  "& fieldset": { border: "none" },
                }}
                inputProps={{
                  autoComplete: "new-password", // Prevent auto-fill
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                checked={agreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                control={<Checkbox />}
                label={
                  <Typography onClick={() => setRegistrationTerms(true)}>
                    Agree on terms
                  </Typography>
                }
              />
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
              <Button
                type="submit"
                disableElevation
                variant="contained"
                sx={{
                  paddingLeft: "60px",
                  paddingRight: "60px",
                  color: "white",
                  borderRadius: "38px",
                  fontSize: { xs: "12px", md: "12px", lg: "14px" },
                  
                }}
              >
                Signup
              </Button>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
              <Typography>{error}</Typography>
            </Grid>
            {isLoading && (
              <Grid container justifyContent="center">
                <CircularProgress color="primary" />
              </Grid>
            )}
          </Grid>
        </form>
      </Grid>
      {registrationTerms && (
        <Grid xs={12} md={6}>
          <RegistrationTerms setOnClose={() => setRegistrationTerms(false)} />
        </Grid>
      )}
    </Grid>
  );
}
