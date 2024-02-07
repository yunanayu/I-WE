import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMemberStore from '../../stores/userStore';
import moment from 'moment';
import { Typography, Box, CardContent, Card } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const theme = createTheme({
    typography: {
      fontFamily: 'Nanum Gothic, sans-serif',
    },
  });

export default function InfoMain() {
  
    const babyList = useMemberStore(state => state.babyList);
    // date = `A${months}`의 형태
    const [date, setDate] = useState(0);

    // 각각의 정보
    const [babybodyInfo, setBabybodyInfo] = useState([]);
    const [mombodyInfo, setMombodyInfo] = useState([]);
    const [babysugInfo, setBabysugInfo] = useState([]);
    const [momsugInfo, setMomsugInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const info = babyList;
                const pregnancyDate = moment(info[0].pregnancyDate, 'YYYY-MM-DD');
                const birthDate = moment(info[0].birth, 'YYYY-MM-DD');
                const today = moment();
                const pregnancydays = today.diff(pregnancyDate, 'days');
                const birthdays = today.diff(birthDate, 'days');
                const pregnancyweeks = Math.floor(pregnancydays / 7 + 1);
                const birthmonths = Math.floor(birthdays / 30);
                if (birthDate){
                  setDate(`A${birthmonths}`);
                } 
                if (pregnancyDate){
                  setDate(`B${pregnancyweeks}`);
                }
            } catch(error) {
                console.log(error)
            }
        };
        fetchData();
    }, [babyList]);

    // 저장되어있는 Infodata뽑아오기
    useEffect(() => {
      const fetchData = async () => {
        console.log(date);
        // 아기신체
        try {
          const babybodyinforesponse = await axios({
            method: 'get',
            url: `/api/info/baby/p/${date}`
          });
          const babybodyinfodata = babybodyinforesponse.data;
          // 나옴
          console.log(babybodyinfodata);
          setBabybodyInfo(babybodyinfodata);
        } catch (error) {
          console.log(error);
        }
        
        // 엄마 신체
        try{
          const mombodyinforesponse = await axios({
            method: 'get',
            url: `/api/info/mother/p/${date}`
          });
          const mombodyinfodata = mombodyinforesponse.data;
          setMombodyInfo(mombodyinfodata);
        }catch(error){
          console.log(error);
        }

        // 아기 권유
        try{
          const babysuginforesponse = await axios({
            method: 'get',
            url: `/api/info/baby/r/${date}`
          });
          const babysuginfodata = babysuginforesponse.data;
          setBabysugInfo(babysuginfodata);
        }catch(error){
          console.log(error);
        }

        // 엄마 권유
        try{
          const momsuginforesponse = await axios({
            method: 'get',
            url: `/api/info/mother/r/${date}`
          });
          const momsuginfodata = momsuginforesponse.data;
          setMomsugInfo(momsuginfodata);
        }catch(error){
          console.log(error);
        }
      };
        fetchData();
      }, [date]);

    const handleChange = (event, value) => {
        setDate(value);
      };

    return (
      <>
        <ThemeProvider theme={theme} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign:'center' }}>
          <Box>
            {date}
          </Box>
          <Box sx={{ opacity:'80%',  bgcolor: '#FBBBB8', display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={date}
              onChange={handleChange}
              variant="scrollable"
              allowScrollButtonsMobile
              textColor='inherit'
            >
              <Box>
                <Tab label="0 주" value={0} />
              </Box>
              {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
                <Tab key={week} label={`${week}주`} value={`B${week}`} />
              ))}
              {Array.from({ length: 25 }, (_, i) => i).map((month) => (
                <Tab key={month} label={`${month}개월`} value={`A${month}`} />
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
                  {babybodyInfo}
                </Box>
              )}
              {Array.from({ length: 39 }, (_, i) => i + 1).map(week => (
                date === `B${week}` && (
                  <Box key={week}>
                    {babybodyInfo}
                  </Box>
                )
              ))}
              {Array.from({ length: 25 }, (_, i) => i).map(month => (
                date === `A${month}` && (
                  <Box key={month}>
                    {babybodyInfo}
                  </Box>
                )
              ))}
              <CardContent sx={{margin:"5px"}}>
                <Box style={{textAlign: 'right'}}>
                  <Link to='/infobaby'>
                    <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box>
          {/* <Box sx={{ display: 'flex', alignItems:'center', flexDirection: 'column', width:"100%"}}>
            <Typography variant="h6" component="div">
              이 시기에 엄마는요!
            </Typography>
            <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
              {date === 0 && (
                <Box>
                  {mombodyInfo}
                </Box>
              )}
              {Array.from({ length: 40 }, (_, i) => i + 1).map(week => (
                date === `B${week}` && (
                  <Box key={week}>
                    {mombodyInfo}
                  </Box>
                )
              ))}
              {Array.from({ length: 25 }, (_, i) => i).map(month => (
                date === `A${month}` && (
                  <Box key={month}>
                    {mombodyInfo}
                  </Box>
                )
              ))}
              <CardContent sx={{margin:"5px"}}>
                <Box style={{textAlign: 'right'}}>
                  <Link to='/infobaby'>
                    <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ display: 'flex', alignItems:'center', flexDirection: 'column', width:"100%"}}>
            <Typography variant="h6" component="div">
              아이를 위해서는요!
            </Typography>
            <Card sx={{display: 'flex', textAlign:'center', justifyContent: 'center', flexDirection: 'column', width: "90%", margin: "5px 5px 5px 5px" }}>
              {date === 0 && (
                <Box>
                  {babysugInfo}
                  {momsugInfo}
                </Box>
              )}
              {Array.from({ length: 40 }, (_, i) => i + 1).map(week => (
                date === `B${week}` && (
                  <Box key={week}>
                    {babysugInfo}
                    {momsugInfo}
                  </Box>
                )
              ))}
              {Array.from({ length: 25 }, (_, i) => i).map(month => (
                date === `A${month}` && (
                  <Box key={month}>
                    {babysugInfo}
                    {momsugInfo}
                  </Box>
                )
              ))}
              <CardContent sx={{margin:"5px"}}>
                <Box style={{textAlign: 'right'}}>
                  <Link to='/infobaby'>
                    <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>궁금해요!</Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box> */}
        </ThemeProvider>
      </>
    )
}