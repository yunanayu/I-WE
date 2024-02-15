import React, { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import useMemberStore from '../stores/userStore';
import { requestPermission } from '../FCM/firebase-messaging-sw';


const theme = createTheme({
  typography: {
    fontFamily: "Nanum Gothic, sans-serif",
  },
});
const wordtheme = createTheme({
  typography: {
    fontFamily: 'Poor Story, system-ui',
    fontWeightRegular: 400,
    fontStyleRegular: 'normal',
  },
});

function CheckCode({setSpouseStatus}) {
  const navigate = useNavigate();
  const [familycode, setfamilyCode] = useState('');
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  console.log(familycode)

  const handleCheckCode = async () => {
    var code;
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'token') {
        code = cookieValue;
      }
    }

    var userNum;

    // 사용자 정보 요청해서 Authorization에 넣기
    try {
      const response = await axios.get('/api/member',
        {
          headers: {
            'Authorization' : code
          }
        }
      );
      userNum = response.data.num;
    } catch(e) {
      console.log("회원정보 받아오기 실패")
    }
    console.log(userNum);

    try {
      const response = await axios.put(`/api/family/share`, {
        fatherNum : userNum,
        code: familycode
      });
      console.log(response.data);
    } catch (error) {
      console.log('코드 확인 실패', error);
    }
    console.log("코드 확인 성공")
    requestPermission()
    navigate("/");
  };

  return (
      <Typography
        margin="10px"
        variant="h5"
        align="center"
        sx={{
          mt: 7,
          color: 'gray',
          fontWeight: 400,
          fontStyle: 'normal',
        }}
      >
        가족코드를 입력해주세요
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection:'column', alignItems:'center', mt: 4 }}>
          <input type="text" value={familycode} onChange={(e) => setfamilyCode(e.target.value)} />
          <Button variant="outlined" sx={{backgroundColor:'#FBBBB8', borderColor:'#bdbdbd',color:'black', width:'50%', mt: 3 }} onClick={handleCheckCode}>
            아이 만나러 가기<Diversity1Icon/>
          </Button>
        </Box>
      </Typography>
      
    );

}

export default CheckCode;