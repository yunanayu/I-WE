import React, { useEffect, useState } from 'react';
import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Typography, Card } from '@mui/material';
import GoogleLogin from "./GoogleRedirectPage";
import KakaoLogin from "./KakaoRedirectPage";
import NaverLogin from "./NaverRedirectPage";
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
  const [date, setDate] = useState(0) //선택한 아기의 날짜
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
        setBabyName(babyname);
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
                      <br />
                      {baby.name}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
                <Typography margin="10px" variant="h4" align="center" sx={{ mt: 4, mb: 2, color: 'gray', fontWeight:'bold' }}>
                  {babyName}
                </Typography>
                <Typography margin="10px" variant="h6" align="center" sx={{ mt: 4, mb: 2, color: 'gray', fontWeight:'bold' }}>
                  {particle}
                </Typography>
                <Typography margin="10px" variant="h4" align="center" sx={{ mt: 4, mb: 2, color: 'gray', fontWeight:'bold' }}>
                  {daysSincePregnancy ? (
                    `${daysSincePregnancy} 주차`
                    ) : ( daysSinceBirth ? `${monthSinceBirth}개월` : ''
                  )}
                </Typography>
              </Box>
              <Box sx={{backgroundColor:'whitesmoke'}}>
                {/* 엄마카드정보 */}
                <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column', width:"100%"}}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: '10px' }}>
                    이 시기에 엄마는요!
                    <ControlPointIcon onClick={handleIconClick} style={{ textAlign: 'right' }}/>
                    <Box >
                    </Box>
                  </Typography>
                  <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", padding: "15px 15px 15px 15px" }}>
                    {getMomBodyInfothree()}
                  </Card>
                </Box>
                {/* 아기 카드 정보 */}
                <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column', width:"100%"}}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mt:'10px', mb: '10px' }}>
                    이 시기에 아기는요!
                  </Typography>
                  <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: "90%", padding: "15px 15px 15px 15px" }}>
                    {getBabyBodyInfothree()}
                  </Card>
                </Box>
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