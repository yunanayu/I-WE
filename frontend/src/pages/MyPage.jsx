import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMemberStore from '../stores/userStore';
import { Button, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

function MyPage() {
    const familyNum = useMemberStore(state => state.familyNum)

    const handleCopy = () => {
        // console.log(`${familyNum}이 복사되었습니다.`);NQE4st
      };
    return (
        <>
            <ThemeProvider theme={theme} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                    가족코드: {familyNum}
                </Typography>
                <CopyToClipboard text={familyNum}>
                    <Button variant="contained" color="primary" onClick={handleCopy}>
                    코드 복사
                    </Button>
                </CopyToClipboard>
            </ThemeProvider>
        </>
    );
}

export default MyPage;
