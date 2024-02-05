import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Card  } from '@mui/material';
import useMemberStore from '../stores/userStore';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

// userNum을 가지고 familyNum 받아오기

function MyPage() {
    const userNum  = useMemberStore(state => state.userNum);
    const [familyNum, setFamilyNum] = useState(null);

    useEffect(() => {
        const fetchFamilyNum = async () => {
            try {
                const response = await axios.get(`/api/member/${userNum}`);
                setFamilyNum(response.data.familyNum);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFamilyNum();
    }, [userNum]);

    return (
        <>
            <ThemeProvider theme={theme} sx={{display:'flex', justifyContent:'center'}} >
                <Typography>
                    가족코드 : {familyNum}
                </Typography>
            </ThemeProvider>
        </>
    );
}

export default MyPage;
