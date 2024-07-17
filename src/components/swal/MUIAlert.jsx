import { Alert, Snackbar } from '@mui/material'
import React from 'react'


export const alertMUI=({message})=>{
    <Snackbar open={open} autoHideDuration={3000} >
    <Alert
      severity="success"
      variant="filled"
      sx={{ width: '100%' }}
    >
      {message}
    </Alert>
  </Snackbar>
}
