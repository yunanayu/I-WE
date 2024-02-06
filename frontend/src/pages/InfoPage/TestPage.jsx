import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card  } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMemberStore from "../../stores/userStore";
import moment from 'moment';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

export default function InfoMain() {
  const babyList  = useMemberStore(state => state.babyList);
  const [daysPregnancyWeeks, setDaysPregnancyWeeks] = useState(null);
  const [daysPregnancyMonths, setDaysPregnancyMonths] = useState(null);
  const [babyInfo, setBabyInfo] = useState(null);
  const [momInfo, setMomInfo] = useState(null);
  const [babyForInfo, setBabyForInfo] = useState(null);
  const [date, setDate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = babyList;
        const pregnancyDate = moment(info[0].pregnancyDate, 'YYYY-MM-DD');
        const today = moment();
        const days = today.diff(pregnancyDate, 'days');
        const weeks = Math.floor(days / 7 + 1);
  
        if (weeks > 40) {
          const months = Math.floor((weeks - 40) / 4);
          setDate(`A${months}`);
          setDaysPregnancyMonths(months)
        }
        setDaysPregnancyWeeks(weeks);
        setDate(`B${weeks}`);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, [babyList]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/info/${date}`);
        const data = response.data;
        setBabyInfo(data.babyInfo);
        setMomInfo(data.momInfo);
        setBabyForInfo(data.babyForInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date]);

  useEffect(() => {
    if (daysPregnancyWeeks) {
      handleChange(null, daysPregnancyWeeks);
    }
  }, [daysPregnancyWeeks]);
  
  const handleChange = (event, value) => {
    setDate(value);
  };
  
  // 해당 주차를 누르면 해당 주차 정보를 띄우도록 해야햄
  console.log(date)
  return (
    <>
      <ThemeProvider theme={theme} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center' }}>
        <Box sx={{fontWeight:'bold', textAlign:'center'}}>
          현재 {daysPregnancyWeeks > 40 ? daysPregnancyMonths : daysPregnancyWeeks} {daysPregnancyWeeks > 40 ? '달' : '주'} 입니다.
        </Box>
        <Box>
          {date}선택한 주차
        </Box>
        <Box sx={{ opacity:'80%',  bgcolor: '#FBBBB8', display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={date}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons ="auto"
            centered
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Box>
              <Tab label="0 주" value={0} />
            </Box>
            {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
              <Tab key={week} label={`${week}주`} value={week} />
            ))}
            {Array.from({ length: 25 }, (_, i) => i).map((month) => (
              <Tab key={month} label={`${month}개월`} value={month} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ display: 'flex', alignItems:'center', flexDirection: 'column', width:"100%"}}>
        <Typography variant="h6" component="div">
          이 시기에 아이는요!
        </Typography>
        <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
          {date === 0 && (
            <Box>
              {babyInfo}
            </Box>
          )}
          {Array.from({ length: 40 }, (_, i) => i + 1).map(week => (
            date === `B${week}` && (
              <Box key={week}>
                {babyInfo}
              </Box>
            )
          ))}
          {Array.from({ length: 25 }, (_, i) => i).map(month => (
            date === `A${month}` && (
              <Box key={month}>
                {babyInfo}
              </Box>
            )
          ))}
          <CardContent sx={{margin:"5px"}}>
            <Box style={{textAlign: 'center'}}>
              <Link to='/infobaby'>
                <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
        <Box>
          <Typography variant="h6" component="div">
            이 시기에 엄마는요!
          </Typography>
        </Box>
        <Card sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
          <Box>
            {momInfo}
          </Box>
          <CardContent sx={{margin:"5px"}}>
            <Box style={{textAlign: 'right'}}>
              <Link to='/infomom'>
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
