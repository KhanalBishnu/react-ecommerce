import React from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, Avatar, Fade } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Fade in timeout={800}>
        <Card sx={{ p: 3, boxShadow: 4, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mb: 2, width: 64, height: 64 }}>
              <StorefrontIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              About Us
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <CardContent>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
              Welcome to <strong>My Shop</strong>! We are dedicated to bringing you the best products at unbeatable prices.
              Our mission is to make online shopping easy, enjoyable, and affordable for everyone.
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              We offer a wide range of high-quality products, fast shipping, and excellent customer support.
              Thank you for choosing us — we look forward to serving you!
            </Typography>
          </CardContent>
        </Card>
      </Fade>
    </Container>
  );
};

export default About;
