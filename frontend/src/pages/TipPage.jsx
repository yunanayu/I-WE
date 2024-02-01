import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, Card  } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});
console.log(document.cookie)

function InfoMain() {
  return (
    <>
      <ThemeProvider theme={theme} sx={{display:'flex', justifyContent:'center'}} >
        <Typography>
          
          꿀팁즈
        </Typography>
        
        
      </ThemeProvider>
    </>
  );
}

export default InfoMain;
