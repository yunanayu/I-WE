import React, { useEffect, useState } from 'react';
import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { Box, Typography } from '@mui/material';
import GoogleLogin from "./GoogleRedirectPage";
import KakaoLogin from "./KakaoRedirectPage";
import NaverLogin from "./NaverRedirectPage";
import Basic from '../components/navbar/Basic';
import mainprofile from '../images/mainprofile.png';


const Main = ({ onLoginStatusChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  console.log(isLoggedIn)

  useEffect(() => {
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
          <Basic setIsLoggedIn={setIsLoggedIn}/>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Box sx={{ flexDirection: 'column', width: '50%', height: '50%', borderRadius: '50%', backgroundColor: 'gray', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: '3px', borderStyle: 'solid' }}>
                <img src={mainprofile} alt="mainprofile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
                <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  oo님의 oo이는
                </Typography>
                <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                  oo주차에요
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  병원찾기
                </Box>
                <Box>
                  다이어리
                </Box>
                <Box>
                  커뮤니티
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

export default Main;
