import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome to My Shop! We are dedicated to bringing you the best products at unbeatable prices.
          Our mission is to make online shopping easy, enjoyable, and affordable for everyone.
        </Typography>
        <Typography variant="body1">
          We offer a wide range of high-quality products, fast shipping, and excellent customer support.
          Thank you for choosing us — we look forward to serving you!
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
