import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, Box, Button  } from '@mui/material';
import useMemberStore from '../stores/userStore';
import ChildList from "../components/myPage/ChildList";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const theme = createTheme({
    typography: {
        fontFamily: 'Nanum Gothic, sans-serif',
    },
});
// familyNum 받아오기
function MyPage() {
    const familyNum = useMemberStore(state => state.familyNum)
    const handleCopy = () => {};
    return (
        <>
            <ThemeProvider theme={theme} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography>마이페이지</Typography>
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                    가족코드: {familyNum}
                </Typography>
                <CopyToClipboard text={familyNum}>
                    <Button variant="contained" color="primary" onClick={handleCopy}>
                    코드 복사
                    </Button>
                </CopyToClipboard>
            </ThemeProvider>
            <ChildList />
        </>
    );
}

export default MyPage;
