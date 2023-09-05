import React from "react";
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Link,
  Divider,
  List,
  ListItemText,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import Logo from "./assets/logo.png"; // Replace with your logo image

const Footer = ({ navigateToCategory }) => {
  const sections = [
    {
      title: "Shop",
      links: [
        { title: "Electronics", link: "188CE695-A4AF-48A4-B855-6BE1C7F0A44F" },
        {
          title: "Men's Watches",
          link: "603B4E08-4226-4BFC-A46E-FCCE92ED1C63",
        },
        { title: "Makeup", link: "7EAF3E36-620B-4D78-818F-EE80955462A4" },
        { title: "Sports Wear", link: "66C86053-159B-436E-B4A9-4A7CCB5CAC8A" },
        {
          title: "Toys & Hobbies",
          link: "04D68B68-1048-4971-BAFA-18FA0A6DB95C",
        },
        {
          title: "Phones & Accessories",
          link: "912FD088-248B-4D58-84F7-1F10B888CF8A",
        },
      ],
    },
    {
      title: "About Us",
      links: [
        { title: "Our Story", link: "/about" },
        { title: "Team", link: "/about" },
        { title: "wanna tell us something?", link: "/contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { title: "montanastore@gmail.com", link: "" },
        { title: "Phone: (+212) 655130071", link: "" },
      ],
    },
  ];

  return (
    <Grid contaier sx={{ backgroundColor: "white", width: "100%", py: 4 }}>
      <Divider />
      <Grid container alignItems="flex-start" display="flex" p={2} justifyContent="center">
        <Grid item xs={4} md={2} >
          <img src={Logo} alt="Logo" style={{ maxWidth: "100%" }} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          justifyContent="center"
          display="flex"
          columnGap={2}
        >
          {sections.map((section, index) => (
            <Grid key={index} item xs={4} md={2} lg={3}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <List style={{ listStyle: "none", padding: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <ListItemText
                    onClick={() => {
                      section.title === "Shop" && navigateToCategory(link.link);
                    }}
                    key={linkIndex}
                    sx={{
                      marginBottom: "8px",
                      "&:hover": { opacity: "0.5" },
                    }}
                  >
                    <Link
                      href={section.title === "About Us" && link.link}
                      color="inherit"
                      underline="none"
                      variant="body2"
                    >
                      {link.title}
                    </Link>
                  </ListItemText>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ mt: 3 }}>
        <IconButton
          href="https://www.facebook.com/montana store"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
        <IconButton
              href="mailto:montanastore@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailIcon fontSize="large"/>
            </IconButton>
        <IconButton
          href="https://www.instagram.com/montana store"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Footer;
