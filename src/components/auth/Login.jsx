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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postData } from '../../constant/axios';
import API_URL from '../../constant/Constant';
import Spinner from '../spinner/Spinner';
import { SwalMessage } from '../swal/SwalMessage';
import { useDispatch } from 'react-redux';
import { setToken } from '../../feature/auth/AuthSlice';
import { setPermission } from '../../feature/permission/PermissionAuthSlice';



const defaultTheme = createTheme();

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const[loading,setLoading]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })

  }
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response=await postData(API_URL.LOGIN,formData,setLoading)
      if(response.response){
        debugger
        localStorage.setItem('token',JSON.stringify(response.token));
        dispatch(setToken(response.token));
        dispatch(setPermission(response.userPermission))
        navigate('/dashboard/home')

      }else{
        setLoading(false);
        SwalMessage('Error', response.message ||'Something went wrong!','error');
      }
    } catch (error) {
      setLoading(false);
      SwalMessage('Error',error.message || 'Something went wrong!' ,'error');
    }
    
  };
  

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {loading ? <Spinner content="Loging..."/>:(<>
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
               Sign in
             </Typography>
             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <Grid container spacing={2}>
   
               <Grid item xs={12}>
   
                 <TextField
                   required
                   fullWidth
                   id="email"
                   label="Email Address"
                   name="email"
                   autoComplete="email"
                   onChange={handleChange}
                   value={formData.email}
   
   
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
                   value={formData.password}
                   onChange={handleChange}
                 />
               </Grid>
               </Grid>
               <FormControlLabel
                 control={<Checkbox value="remember" color="primary" />}
                 label="Remember me"
               />
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2,backgroundColor:`${loading?'green':""}`}}
                 onClick={handleSubmit}
                 // disabled={loading}
               >
                {loading ?'Signing...':'Sign In'} 
               </Button>
               <Grid container>
                 <Grid item xs>
                   <Link href="#" variant="body2">
                     Forgot password?
                   </Link>
                 </Grid>
                 <Grid item>
                   <Link to='/sign-up'>
                     Sign Up
                   </Link>
                 </Grid>
               </Grid>
             </Box>
           </Box>
           </>
        )}
       
      </Container>
    </ThemeProvider>
  );
}