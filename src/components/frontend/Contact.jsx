import React from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, maxWidth: "100%", width: '100%', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Have questions or need help? Fill out the form below, and we’ll get back to you as soon as possible!
          </Typography>
        </Box>

        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<SendIcon />}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                background: 'linear-gradient(45deg, #1565c0, #1e88e5)',
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;
