import React, { useEffect, useState } from 'react';
import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { Box, Typography, Card } from '@mui/material';
import GoogleLogin from "./GoogleRedirectPage";
import KakaoLogin from "./KakaoRedirectPage";
import NaverLogin from "./NaverRedirectPage";
import mainprofile from '../images/mainprofile.png';
import b1 from '../images/1.jpg';
import axios from 'axios';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMemberStore from '../stores/userStore';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './styles.css';
import { EffectCards } from 'swiper/modules';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

const Main = ({ onLoginStatusChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const babyList  = useMemberStore(state => state.babyList)
  const setBabyList = useMemberStore(state => state.setBabyList)
  const userNum = useMemberStore(state => state.userNum)
  const setFamilyNum = useMemberStore(state => state.setFamilyNum)
  const babyCnt = babyList.length;
  const [babyNum, setBabyNum] = useState(0); // 선택된 아이의 번호

  const handleKakaoLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleNaverLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleGoogleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (document.cookie) {
      setIsLoggedIn(true);
      onLoginStatusChange(true);
    } else{
      setIsLoggedIn(false);
      onLoginStatusChange(false);
    }
  
  },  [onLoginStatusChange]);

  

  const [babyName, setBabyName] = useState([]);
  // 임신 시
  const [daysSincePregnancy, setDaysSincePregnancy] = useState(null);
  const [daysSinceBirth, setDaysSinceBirth] = useState(null);

  // 출산 시
  const [daysAfterBirth, setDaysAfterBirth] = useState(null);
  const [daysBeforeBirth, setDaysBeforeBirth] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = babyList
        const babyname = info[babyNum].name
        setBabyName(babyname);
        const pregnancyDate = moment(info[babyNum].pregnancyDate, 'YYYY-MM-DD');
        const birthDate = moment(info[babyNum].birth, 'YYYY-MM-DD');
        const today = moment();
        const pregnancydays = today.diff(pregnancyDate, 'days');
        const birthdays = today.diff(birthDate, 'days');
        const pregnancyweeks = Math.floor(pregnancydays / 7 + 1)
        const birthweeks = Math.floor(birthdays / 7 + 1)
        // 출산예정일
        const suggestDate = (280 - pregnancydays);
        // 출산 후 

        

        setDaysBeforeBirth(suggestDate);
        setDaysAfterBirth(birthdays);
        setDaysSincePregnancy(pregnancyweeks);
        setDaysSinceBirth(birthweeks)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

  }, [babyList]);

  // 공유코드 저장
  useEffect(() => {
    const fetchData = async () => {
      try {
        if(userNum){
          const response = await axios({
          method: 'get',
          // userNum
          url: `/api/family/${userNum}`
        });
        const data = response.data.code;
        setFamilyNum(data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userNum]);
  

  return (
    <>
      {isLoggedIn ? (
        <>
        <ThemeProvider theme={theme}>
          <Box sx={{ width:'100%' , display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', mt: 6,}}>
            <Box sx={{ display: 'flex',  alignItems: 'center', flexDirection: 'column' }}>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSlideChange={(swiper) => {
                setBabyNum(swiper.activeIndex);
              }}
            >
              {babyList.map((baby, index) => (
                <SwiperSlide key={index}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    {daysSincePregnancy ? `D - ${daysBeforeBirth}` : daysSinceBirth ? `D + ${daysAfterBirth}` : ''}
                    <img src={b1} alt={baby.name} />
                    {baby.pregnancyDate}
                    {baby.birth}
                    {baby.name}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  {babyName}
                </Typography>
                <Typography margin="10px" variant="h6" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  (은)는 
                </Typography>
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  {daysSincePregnancy ? (
                    `${daysSincePregnancy} 주차 입니다`
                    ) : ( daysSinceBirth ? `${Math.floor(daysSinceBirth / 4)}개월 입니다` : ''
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column', width:"100%"}}>
                <Card sx={{ width: "90%", margin: "5px 5px 5px 5px",}}>
                  <CardContent sx={{margin:"5px", }}>
                    <Typography variant="h6" component="div">
                      이 시기에 엄마는요!
                    </Typography>
                    < br/>
                    <Typography variant="body2">
                      - 어때요
                      <br />
                      - 그리고 어때요
                      <br />
                      - 정보리스트
                    </Typography>
                    <br />
                    <Box style={{textAlign: 'right'}}>
                      <Link to='/infomom'>
                        <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>더 궁금해요!</Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
                <Card sx={{ width: "90%", margin: "5px 5px 5px 5px" }}>
                  <CardContent >
                    <Typography variant="h6" component="div">
                      이 시기에 아이는요!
                    </Typography>
                    <Typography variant="body2">
                      - 어때요
                      <br />
                      - 그리고 어때요
                      <br />
                      - 정보리스트
                    </Typography>
                    <br />
                    <Box style={{textAlign: 'right'}}>
                      <Link to='/infobaby'>
                        <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>더 궁금해요!</Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
          {/* <InfiniteScrollComponent /> */}
          </ThemeProvider>
        </>
      ) : (
        <>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-bottom', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <img src={icon} alt="icon" style={{ width: '300px', height: '270px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-bottom', gap: 2 }}>
                  <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                    육아의 모든 것
                  </Typography>
                </Box>
                <img src={logo} alt="logo" style={{ width: '200px', height: '100px' }} />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 4, width: '50%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <div style={{ flex: 1 }}>
                    <KakaoLogin onSuccess={handleKakaoLoginSuccess} sx={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <NaverLogin setIsLoggedIn={setIsLoggedIn} onSuccess={handleNaverLoginSuccess} sx={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <GoogleLogin setIsLoggedIn={setIsLoggedIn} onSuccess={handleGoogleLoginSuccess} sx={{ width: '100%' }} />
                  </div>
                </Box>
              </Box>
            </Box>
          </Box>
          </ThemeProvider>
        </>
      )}
    </>
  );
}

export default Main;