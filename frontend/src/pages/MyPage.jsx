import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography  } from '@mui/material';
import useMemberStore from '../stores/userStore';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

// familyNum 받아오기
function MyPage() {
    const familyNum = useMemberStore(state => state.familyNum)

    return (
        <>
            <ThemeProvider theme={theme} sx={{display:'flex', justifyContent:'center'}} >
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                    가족코드 : {familyNum}
                </Typography>
            </ThemeProvider>
        </>
    );
}

export default MyPage;
