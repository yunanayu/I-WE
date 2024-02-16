import React, { useEffect, useState } from 'react';
import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Box, Typography, Card } from '@mui/material';
import Button from '@mui/material/Button';
import GoogleLogin from "./GoogleRedirectPage";
import KakaoLogin from "./KakaoRedirectPage";
import NaverLogin from "./NaverRedirectPage";
import b1 from '../images/1.jpg';
import b2 from '../images/2.jpg';
import heart from '../images/heart.png';
import heart2 from '../images/heart2.png';

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

const wordtheme = createTheme({
  typography: {
    fontFamily: 'Poor Story, system-ui',
    fontWeightRegular: 400,
    fontStyleRegular: 'normal',
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
  const [date, setDate] = useState(0) //선택한 아기의 날짜
  const [status, setStatus] = useState('')
  // 임신 시
  const [daysSincePregnancy, setDaysSincePregnancy] = useState(null);
  const [daysSinceBirth, setDaysSinceBirth] = useState(null);
  // 출산 시
  const [daysAfterBirth, setDaysAfterBirth] = useState(null);
  const [daysBeforeBirth, setDaysBeforeBirth] = useState(null);
  const [monthSinceBirth, setMonthsSinceBirth] = useState(null)
  // 엄마 정보
  const [mombodyInfo, setMombodyInfo] = useState([]);
  // 아기 정보
  const [babybodyInfo, setBabybodyInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = babyList
        const babyname = info[babyNum].name
        const babystatus = info[babyNum].status
        setBabyName(babyname);
        setStatus(babystatus)
        const pregnancyDate = moment(info[babyNum].pregnancyDate, 'YYYY-MM-DD');
        const birthDate = moment(info[babyNum].birth, 'YYYY-MM-DD');
        const today = moment();
        const pregnancydays = today.diff(pregnancyDate, 'days');
        const birthdays = today.diff(birthDate, 'days');
        const pregnancyweeks = Math.floor(pregnancydays / 7 + 1)
        const birthweeks = Math.floor(birthdays / 7 + 1)
        const birthmonths = Math.floor(birthdays / 30);

        if (info[babyNum].pregnancyDate === null){ // 출산 개월
          setDate(`A${birthmonths}`);
        } else if (info[babyNum].birth === null){ // 임신 주차
          setDate(`B${pregnancyweeks}`);
        }
        // 출산예정일
        const suggestDate = (280 - pregnancydays);
        // 출산 후 

        setDaysBeforeBirth(suggestDate);
        setDaysAfterBirth(birthdays);
        setDaysSincePregnancy(pregnancyweeks);
        setDaysSinceBirth(birthweeks)
        setMonthsSinceBirth(birthmonths)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [babyList, babyNum]);

  // 엄마 info데이터 가져오기
  useEffect(() => {
    if(userNum !== 0){
      if(date !== 0){
        const fetchData = async () => {
        try {
          const mombodyinforesponse = await axios({
            method: 'get',
            url: `/api/info/mother/p/${date}`
          });
          const mombodyinfodata = mombodyinforesponse.data;
          setMombodyInfo(mombodyinfodata);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      }
      
    }
  }, [date]);
  
  const getMomBodyInfothree = () => {
    if (mombodyInfo.length > 0) {
      const selectedMombodyInfo = mombodyInfo
        .filter((info, i) => i < 1) // 최대 1개의 요소만 추출
        .map((info, i) => {
          const content = info.content.length > 100 ? `${info.content.slice(0, 100)}...` : info.content;
          return (
            <div key={i}>
              - {content}
              <br />
            </div>
          );
        });
      return selectedMombodyInfo;
    }
    return null;
  };
  

  // 아기 info데이터 가져오기
  useEffect(() => {
    if(userNum !== 0){
      if(date !== 0){
        const fetchData = async () => {
        try {
          const babybodyinforesponse = await axios({
            method: 'get',
            url: `/api/info/baby/p/${date}`
          });
          const babybodyinfodata = babybodyinforesponse.data;
          setBabybodyInfo(babybodyinfodata);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      }
    }
  }, [date]);

  const getBabyBodyInfothree = () => {
    if (babybodyInfo.length > 0) {
      const selectedBabybodyInfo = babybodyInfo
        .filter((info, i) => i < 1) // 최대 1개의 요소만 추출
        .map((info, i) => {
          const content = info.content.length > 100 ? `${info.content.slice(0, 100)}...` : info.content;
          return (
            <div key={i}>
              - {content}
              <br />
            </div>
          );
        });
      return selectedBabybodyInfo;
    }
    return null;
  };

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

  // 아기 이름에 따라 는/이는
    const particle = (() => {
      if (babyName && babyName.length > 0) {
        const lastChar = babyName[babyName.length - 1];
        if (lastChar) {
          return lastChar.match(/[가-힣]/) ? (lastChar.charCodeAt(0) - 0xac00) % 28 > 0 ? '이는' : '는' : '';
        }
      }
      return '';
    })();

    const handleIconClick = () => {
      window.location.href = '/infomain';
    };

  return (
    <>
      {isLoggedIn ? (
        <>
        <ThemeProvider theme={theme}>
          <Box sx={{ width:'100%' , display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150vh', mt: 8, mb:8}}>
            <Box sx={{ display: 'flex',  alignItems: 'center', flexDirection: 'column'}}>
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      {baby.status === false ? <div style={{ textAlign: 'center' }}>D - {daysBeforeBirth}</div> : baby.status === true ? <div style={{ textAlign: 'center' }}>D + {daysAfterBirth}</div> : ''}
                      {baby.gender === 1 ? <img src={b2} alt={baby.name} style={{ borderRadius: '50%' }} /> : baby.gender === 2 ? <img src={b1} alt={baby.name} style={{ borderRadius: '50%' }} /> : null}
                      {baby.status === false ? <div style={{ textAlign: 'center' }}>{baby.pregnancyDate}</div> : baby.status === true ? <div style={{ textAlign: 'center' }}>{baby.birth}</div> : null}
                      {/* <div style={{ textAlign: 'center' }}>{baby.pregnancyDate}</div>
                      <div style={{ textAlign: 'center' }}>{baby.birth}</div>
                      <div style={{ textAlign: 'center' }}>{baby.status}</div> */}

                      <div style={{ textAlign: 'center' }}>{baby.name}</div>
                    </div>

                  </SwiperSlide>
                ))}
              </Swiper>
              <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: 'baseline',}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline',ml:'40px' }}>
              <Typography
                margin="10px"
                variant="h4"
                align="center"
                theme={wordtheme}
                sx={{ mt: 4, mb: 2, color: 'gray',fontFamily: 'Poor Story, system-ui',fontStyle: 'normal', fontWeight:'bold' }}
              >
                  {babyName}
                </Typography>
                <Typography margin="10px" theme={wordtheme} variant="h6" align="center" sx={{ mt: 4, mb: 2, color: 'gray', fontWeight:'bold' }}>
                  {particle}
                </Typography>
                <Typography margin="10px" theme={wordtheme} variant="h4" align="center" sx={{ mt: 2, mb: 2, color: 'gray', fontWeight:'bold' }}>                  
                  {status === false ? (
                    `${daysSincePregnancy} 주차`
                    ) : ( status === true ? `${monthSinceBirth}개월` : ''
                  )}
                                  
                </Typography>
              </Box>
              <img src={heart} width="50" height="50" alt="하트 이미지" />
              </Box>
              <Box sx={{backgroundColor:'whitesmoke', borderRadius:'10%', margin:'10px 10px 60px 10px',}}>
                {/* 엄마카드정보 */}
                <Box sx={{ display: 'flex', alignItems:'center',  justifyContent:'center', flexDirection: 'column', width:"100%"}}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt:'10px', mb: '10px' }}>
                    이 시기에 엄마는요!
                    <img src={heart2} width="40" height="30" alt="하트 이미지" />
                  </Typography>
                  <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", padding: "15px 15px 15px 15px" }}>
                    {getMomBodyInfothree()}
                  </Card>
                </Box>
                {/* 아기 카드 정보 */}
                <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column', width:"100%", mb:'5px'}}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt:'10px', mb: '10px' }}>
                    이 시기에 아기는요!
                    <img src={heart2} width="40" height="30" alt="하트 이미지" />
                  </Typography>
                  <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", padding: "15px 15px 15px 15px" }}>
                    {getBabyBodyInfothree()}
                  </Card>
                </Box>
                <div style={{ textAlign: 'right', margin:'10px 20px', alignItems:'center' }}>
                  <Button sx={{ backgroundColor: '#FBBBB8', color: 'whitesmoke' }} variant="contained" onClick={handleIconClick}>더알아보기<ArrowCircleRightOutlinedIcon></ArrowCircleRightOutlinedIcon></Button>
                </div> 
              </Box>
            </Box>
          </Box>
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
                    <KakaoLogin setIsLoggedIn={setIsLoggedIn} onSuccess={handleKakaoLoginSuccess} sx={{ width: '100%' }} />
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