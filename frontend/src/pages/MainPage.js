import React, { useState } from 'react';
import BasicLayout from "../layouts/BasicLayout";
import Basic from "../components/navbar/Basic";
import icon from "../images/icon.png";
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
          
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img src={icon} alt="icon" style={{ width: '80px', height: '80px' }} />
            
            <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
              Login
            </Typography>
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
        </>
      )}
    </>
  );
}

export default Main;
