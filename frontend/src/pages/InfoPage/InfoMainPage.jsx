import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, Card  } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

console.log(document.cookie)

//여기서 date(주차 및 월 불러오기)
export default function InfoMain() {
  const [date, setDate] = React.useState(1);
  const handleChange = (event, value) => {
    setDate(value);
  };
  return (
    <>
      <ThemeProvider theme={theme} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width:"100%", alignItems:'center', textAlign:'center'}}>
          <Stack spacing={10} >
            <Typography>주차: {date}</Typography>
            <Pagination count={40} date={date} boundaryCount={6} onChange={handleChange} />
          </Stack>  
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width:"100%"}}>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "100%", margin: "5px 5px 5px 5px" }}>
           
            <Typography variant="h6" component="div">
              이 시기에 <br />아이는요!
            </Typography>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infobaby'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
            
            <Typography variant="h6" component="div">
              이 시기에 <br />엄마는요!
            </Typography>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infomom'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
            
            <Typography variant="h6" component="div">
              아이를 <br />위해서는요!
            </Typography>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infoforbaby'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
      </ThemeProvider>
    </>
  );
}