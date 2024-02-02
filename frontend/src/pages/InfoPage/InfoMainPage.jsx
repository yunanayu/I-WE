import React from "react";
import { Link } from 'react-router-dom';
import { Box, Typography, Card  } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});


//여기서 date(주차 및 월 불러오기)
//useState에 해당 주차 설정하기
export default function InfoMain() {

  const date_list = ['1주', '2주' ]



  const [date, setDate] = React.useState(0);
  const handleChange = (event, value) => {
    setDate(value);
  };
  return (
    <>
      <ThemeProvider theme={theme} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center' }}>
        <Box>
          현재 {date} 주 입니다.
        </Box>
        <Box sx={{ opacity:'80%', bgcolor: '#FBBBB8' }}>
          <Tabs
            value={date}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons
            aria-label="scrollable auto tabs example"
          >
            <Box>
              <Tab label="0 주"/>
            </Box>
            
            <Tab label="1주"/>
            <Tab label="2주"/>
            <Tab label="3주"/>
            <Tab label="4주"/>
            <Tab label="5주"/>
            <Tab label="6주"/>
            <Tab label="7주"/>
            <Tab label="8주"/>
            <Tab label="9주"/>
            <Tab label="10주"/>
            <Tab label="11주"/>
            <Tab label="12주"/>
            <Tab label="13주"/>
            <Tab label="14주"/>

          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', alignItems:'center', flexDirection: 'column', width:"100%"}}>
          
          <Typography variant="h6" component="div">
              이 시기에 아이는요!
            </Typography>
          <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>            
            <Box>
              해당정보들
            </Box>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'center'}}>
                <Link to='/infobaby'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
          
          <Box >
            <Typography variant="h6" component="div">
              이 시기에 엄마는요!
            </Typography>
          </Box>
          
          <Card sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
            <Box>
              해당정보들
            </Box>
            <CardContent sx={{margin:"5px"}}>
              <Box style={{textAlign: 'right'}}>
                <Link to='/infomom'>
                  <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
          
          <Typography variant="h6" component="div" sx={{ mt:'30px', ml:'30px'}}>
              아이를 위해서는요!
            </Typography>
          <Card sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
            <Box>
              해당정보들
            </Box>
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