import React from 'react';
import BasicLayout from "../layouts/BasicLayout";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GoogleLogin from "./GoogleLoginPage";
import KakaoLogin from "./KakaoLoginPage";
import NaverLogin from "./NaverLoginPage";

const LoginPage = () => {
  return (
    <BasicLayout>
      <Box sx={{display: 'flex', justifyContent:"center", alignItems:"center", flexDirection: 'column'}}>
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2, color:"gray"}}>
          Login
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:"center", borderRadius: 8, padding: 4, width: '50%' }}>
          <Box sx={{ display: 'flex', justifyContent:"center", gap: 2 }}>
            <div style={{ flex: 1 }}>
              <KakaoLogin sx={{width:'100%'}}/>
            </div>
            <div style={{ flex: 1 }}>
              <NaverLogin sx={{width:'100%'}}/>
            </div>
            <div style={{ flex: 1 }}>
              <GoogleLogin sx={{width:'100%'}}/>
            </div>
          </Box>
        </Box>
      </Box>
    </BasicLayout> 
  );
}
 
export default LoginPage;
