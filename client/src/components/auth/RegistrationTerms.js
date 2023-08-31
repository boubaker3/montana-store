import {
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";

export default function RegistrationTerms({ setOnClose }) {
  const registrationTerms = [
    {
      title: "User Agreement",
      content:
        "By registering and using our services, you agree to comply with the following terms and conditions. Please read them carefully before proceeding with your registration.",
    },
    {
      title: "User Eligibility",
      content:
        "You must be at least 18 years old to register and use our platform. By registering, you confirm that you meet this eligibility requirement.",
    },
    {
      title: "Account Creation",
      content:
        "To create an account, you will need to provide accurate and up-to-date information, including your name, email address, and password. You are responsible for maintaining the confidentiality of your account credentials.",
    },
    {
      title: "User Responsibilities",
      content:
        "You are responsible for the actions taken using your account. You agree to use our platform in compliance with all applicable laws and regulations. You shall not engage in fraudulent, malicious, or unauthorized activities on our platform.",
    },
    {
      title: "Privacy and Data Usage",
      content:
        "We collect and use your personal information in accordance with our Privacy Policy. By using our platform, you consent to the collection, use, and disclosure of your personal information as outlined in the Privacy Policy.",
    },
    {
      title: "Intellectual Property",
      content:
        "Our platform's content, including trademarks, logos, and product descriptions, are protected by intellectual property laws. You may not use, reproduce, or distribute any content without proper authorization.",
    },
    {
      title: "Order Fulfillment",
      content:
        "We facilitate order processing and fulfillment. Shipping times and methods may vary based on the products and suppliers. Please review individual product pages for details.",
    },
    {
      title: "Fees and Payments",
      content:
        "We may charge fees for certain services or transactions. By using these services, you agree to pay any applicable fees. Payment methods and terms are provided during the checkout process.",
    },
    {
      title: "Termination",
      content:
        "We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities. You may also request to close your account at any time.",
    },
    {
      title: "Limitation of Liability",
      content:
        "[Your Store Name] is not responsible for any losses, damages, or liabilities incurred while using our platform. Users use our platform at their own risk.",
    },
    {
      title: "Changes to Terms",
      content:
        "We may update or modify these terms from time to time. Changes will be effective upon posting. You will be notified of any material changes.",
    },
    {
      title: "Contact Information",
      content:
        "If you have any questions or concerns, please contact our customer support at [montanastore@gmail.com].",
    },
    {
      title: "Acceptance",
      content:
        "By clicking 'Register' or accessing our platform, you acknowledge that you have read, understood, and agreed to these terms.",
    },
  ];

  return (
    <Dialog open={true} onClose={setOnClose}>
      <Grid container sx={{ backgroundColor: "rgb(241, 241, 241,0.6)" }}>
        <DialogTitle>Montana registration terms</DialogTitle>

        {registrationTerms.map((registrationTerm) => (
          <List>
            {" "}
            <ListItem>
              <ListItemText
                primary={registrationTerm.title}
                secondary={registrationTerm.content}
              />
            </ListItem>
            <Divider />
          </List>
        ))}
      </Grid>
    </Dialog>
  );
}
