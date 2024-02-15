import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useMemberStore from "../../stores/userStore";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

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

const CodeSharePage = () => {
  const familyNum = useMemberStore((state) => state.familyNum);
  const handleCopy = () => {};
  return (
    <ThemeProvider
      theme={theme}
      sx={{ display: "flex", justifyContent: "center"}}
    >
      <Typography
        margin="10px"
        variant="h6"
        align="center"
        theme={wordtheme}
        sx={{
          mt: 7,
          color: 'gray',
          fontFamily: 'Poor Story, system-ui',
          fontWeight: 400,
          fontStyle: 'normal',
        }}
      >
        아빠에게 가족코드로<br />사랑하는 아이를 공유해보세요!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection:'column', alignItems:'center' }}>
        <Box sx={{backgroundColor:'#f5f5f5', p:1 , width:"90%", borderRadius:'10px', margin:'30px'}}>
          <Typography
            margin="10px"
            variant="h5"
            align="center"
            sx={{ mt: 2, mb: 2, color: "gray", fontWeight:'bold' }}
          >
          {familyNum}
          </Typography>
        </Box>
        <CopyToClipboard text={familyNum}>
          <Button variant="outlined" sx={{borderColor:'#bdbdbd',color:'black', width:'80%'}} onClick={handleCopy}>
            가족 코드 복사하기 <ContentCopyOutlinedIcon/>
          </Button>
        </CopyToClipboard>
      </Box>
      
    </ThemeProvider>
  );
};

export default CodeSharePage;
