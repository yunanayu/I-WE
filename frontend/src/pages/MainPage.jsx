import React, { useEffect, useState } from 'react';
import icon from "../images/icon.png";
import logo from "../images/logo.png";
import axios from "axios";
import { Box, Typography, Card  } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import GoogleLogin from "./GoogleRedirectPage";
import KakaoLogin from "./KakaoRedirectPage";
import NaverLogin from "./NaverRedirectPage";
import mainprofile from '../images/mainprofile.png';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

const Main = ({ onLoginStatusChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); //해당 유저 정보 받아오기

  const handleKakaoLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleKakaoLoginFailure = () => {
    setIsLoggedIn(false)
  }
  const handleNaverLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleNaverLoginFailure = () => {
    setIsLoggedIn(false)
  }
  const handleGoogleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleGoogleLoginFailure = () => {
    setIsLoggedIn(false)
  }

  const fetchUserInfo = async () => {
    try {
      // 사용자 정보를 가져오는 API 호출
      const response = await axios.get('/api/user');
      // API 호출이 성공하면 사용자 정보를 상태 변수에 저장
      setUserInfo(response.data);
    } catch (error) {
      console.error('사용자 정보를 가져오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    if (document.cookie) {
      setIsLoggedIn(true);
      onLoginStatusChange(true);
    } else{
      setIsLoggedIn(false);
      onLoginStatusChange(false);
    }
  
  },  [onLoginStatusChange]);

  return (
    <>
      {isLoggedIn ? (
        <>
        <ThemeProvider theme={theme}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ flexDirection: 'column', width: '50%', height: '50%', borderRadius: '50%', backgroundColor: 'gray', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: '3px', borderStyle: 'solid' }}>
                <img src={mainprofile} alt="mainprofile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
                <Typography margin="10px" variant="h6" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  oo님의 oo이는
                </Typography>
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  oo주차에요
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width:"90%"}}>
                <Card sx={{ width: "50%", margin: "5px 5px 5px 5px" }}>
                  <CardContent sx={{margin:"5px"}}>
                    <Typography variant="h6" component="div">
                      이 시기에 
                    </Typography>
                    <Typography variant="h6" component="div" style={{textAlign: 'right'}}>
                      엄마는요!
                    </Typography>
                    < br/>
                    <Typography variant="body2">
                      - 어때요
                      <br />
                      - 그리고 어때요
                      <br />
                      - 정보리스트
                    </Typography>
                    <Box style={{textAlign: 'right'}}>
                      <Link to='/infomom'>
                        <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}}>더 궁금해요!</Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
                <Card sx={{ width: "50%", margin: "5px 5px 5px 5px" }}>
                  <CardContent>
                  <Typography variant="h6" component="div">
                      이 시기에 
                    </Typography>
                    <Typography variant="h6" component="div" style={{textAlign: 'right'}}>
                      아기는요!
                    </Typography>
                    < br/>
                    <Typography variant="body2">
                      - 어때요
                      <br />
                      - 그리고 어때요
                      <br />
                      - 정보리스트
                    </Typography>
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