import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '../../constant/axios';
import API_URLS from '../../constant/Constant';
import { SwalMessage } from '../swal/SwalMessage';
import Spinner from '../spinner/Spinner';

export default function Signup() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async () => {
    let newFormErros = {};
    if (!!!formData.name) {
      newFormErros.name = 'The name field is required';
    }
    if (!!!formData.email) {
      newFormErros.email = 'The email field is required';
    }else if(!validationEmail(formData.email)){ 
      SwalMessage('Error','Email not Valid','error');
      return;
    }

    if (!!!formData.password) {
      newFormErros.password = 'The password field is required';
    }
    setErrors(newFormErros)
    if (Object.keys(newFormErros).length == 0) {
      try {
        setLoading(true);
        const response = await postData(API_URLS.REGISTER, formData, setLoading);
        if (response.response) {
          setLoading(false);
          SwalMessage('Success', response.message, 'success');
          navigate('/login')
        }
        else {
          setLoading(false);
          SwalMessage('Error', response.message || 'Something went wrong!', 'error');
        }
      } catch (error) {
        setLoading(false);
        SwalMessage('Error', error.message || 'Something went wrong!', 'error');
      }
    }

  };
  const validationEmail=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <Container component="main" maxWidth="xs">
      {
        loading ? <Spinner content="Register..." /> : (<>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid blue',
              borderRadius: '3%',
              padding: '25px 40px',
              boxShadow: '3px 3px 2px  rgba(156,39,176,0.5)'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                    onChange={handleChange}
                    className={`${errors?.name ? 'border border-danger' : ''}`}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    className={`${errors?.email ? 'border border-danger' : ''}`}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    className={`${errors?.password ? 'border border-danger' : ''}`}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Remember Me"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>)
      }

    </Container>
  );
}