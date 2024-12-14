import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

function NotFound404() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4f8 30%, #e0eafc 100%)",
        textAlign: "center",
        padding: "16px",
      }}
    >
      {/* 404 Illustration */}
      <Box sx={{ mb: 4 }}>
        <img
          src="https://i.imgur.com/qIufhof.png" // Replace with your custom 404 illustration URL
          alt="404 Illustration"
          style={{ width: "250px", maxWidth: "100%" }}
        />
      </Box>

      {/* Typography */}
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontWeight: "bold", color: "#333333", mb: 2 }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ color: "#555555", mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#777777",
          maxWidth: "500px",
          marginBottom: "32px",
          lineHeight: "1.6",
        }}
      >
        The page you're looking for doesn't exist or has been moved. Let's get
        you back to a safer place.
      </Typography>

      {/* Premium Styled MUI Button */}
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#3f51b5",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "30px",
          fontWeight: "bold",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#2c387e",
          },
        }}
        href="/" // Navigation back to home
      >
        Go Back Home
      </Button>
    </Box>
  );
}

export default NotFound404;
