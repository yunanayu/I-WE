import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, Card  } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import momicon from "../../images/momicon.png";


const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

function InfoMain() {
  return (
    <>
      <ThemeProvider theme={theme} sx={{display:'flex', justifyContent:'center'}} >
        <Typography>
          정보 제공
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width:"90%"}}>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "50%", margin: "5px 5px 5px 5px" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={momicon}
              title="momicon"
            />
            <Typography variant="h6" component="div">
              엄마에게 필요한 정보
            </Typography>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infomom'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>더 궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "50%", margin: "5px 5px 5px 5px" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={momicon}
              title="momicon"
            />
            <Typography variant="h6" component="div">
              아빠에게 필요한 정보
            </Typography>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infodad'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>더 궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "50%", margin: "5px 5px 5px 5px" }}>
            <CardMedia
              sx={{ height: 140 }}
              image={momicon}
              title="momicon"
            />
            <Typography variant="h6" component="div">
              아기에게 필요한 정보
            </Typography>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infobaby'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>더 궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
      </ThemeProvider>
    </>
  );
}

export default InfoMain;
