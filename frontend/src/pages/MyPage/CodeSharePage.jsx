import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useMemberStore from "../../stores/userStore";

const theme = createTheme({
  typography: {
    fontFamily: "Nanum Gothic, sans-serif",
  },
});
const CodeSharePage = () => {
  const familyNum = useMemberStore((state) => state.familyNum);
  const handleCopy = () => {};
  return (
    <ThemeProvider
      theme={theme}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Box sx={{borderRadius:3, backgroundColor:'#f5f5f5', p:1}}>
        <Typography
          margin="10px"
          variant="h5"
          align="center"
          sx={{ mt: 4, mb: 2, color: "gray" }}
        >
        {familyNum}
        </Typography>
      </Box>
      <CopyToClipboard text={familyNum}>
        <Button variant="outlined" sx={{borderColor:'#bdbdbd',color:'black', width:'80%'}} onClick={handleCopy}>
          코드 복사
        </Button>
      </CopyToClipboard>
    </ThemeProvider>
  );
};

export default CodeSharePage;
