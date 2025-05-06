import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Contact = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Have questions or need help? Fill out the form below, and we’ll get back to you as soon as possible!
        </Typography>
        <Box 
          component="form" 
          sx={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField label="Name" variant="outlined" required />
          <TextField label="Email" variant="outlined" type="email" required />
          <TextField label="Message" variant="outlined" multiline rows={4} required />
          <Button variant="contained" color="primary" type="submit">
            Send Message
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
