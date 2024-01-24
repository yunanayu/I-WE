import React, { useState } from 'react';
import BasicLayout from "../layouts/BasicLayout";
import Basic from "../components/navbar/Basic";
import icon from "../images/icon.png";
import logo from "../images/logo.png";
import { Box, Typography } from '@mui/material';
import GoogleLogin from "./GoogleLoginPage";
import KakaoLogin from "./KakaoLoginPage";
import NaverLogin from "./NaverLoginPage";

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <BasicLayout>
          <Basic />
        </BasicLayout>
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
                    <KakaoLogin sx={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <NaverLogin sx={{ width: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <GoogleLogin sx={{ width: '100%' }} />
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
