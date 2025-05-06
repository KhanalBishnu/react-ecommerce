import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection = () => {
  return (
    <Box sx={{ 
      height: '60vh', 
      backgroundImage: 'url(https://via.placeholder.com/1600x600)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'white',
      textAlign: 'center',
      p: 2
    }}>
      <Typography variant="h3" gutterBottom>Welcome to My Shop</Typography>
      <Typography variant="h6" gutterBottom>Find the best products at unbeatable prices</Typography>
      <Button variant="contained" color="secondary">Shop Now</Button>
    </Box>
  );
};

export default HeroSection;
