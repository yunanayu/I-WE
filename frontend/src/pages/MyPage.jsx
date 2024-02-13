import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography, Box, Button, Container } from "@mui/material";
import useMemberStore from "../stores/userStore";
import ChildList from "../components/myPage/ChildList";
import { CopyToClipboard } from "react-copy-to-clipboard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const theme = createTheme({
  typography: {
    fontFamily: "Nanum Gothic, sans-serif",
  },
});
// familyNum 받아오기
function MyPage() {
  const familyNum = useMemberStore((state) => state.familyNum);
  const handleCopy = () => {};
  return (
    <Container>
        <ThemeProvider
            theme={theme}
            sx={{ display: "flex", justifyContent: "center" }}
        >
            <Typography>마이페이지</Typography>
            <Typography
            margin="10px"
            variant="h5"
            align="center"
            sx={{ mt: 4, mb: 2, color: "gray" }}
            >
            가족코드: {familyNum}
            </Typography>
            <CopyToClipboard text={familyNum}>
            <Button variant="contained" color="primary" onClick={handleCopy}>
                코드 복사
            </Button>
            </CopyToClipboard>
        </ThemeProvider>
        <ChildList />
    <Box sx={{width:400, border:1, borderColor:"primary"}}>
        <nav aria-label="secondary mailbox folders">
            <List>
            <ListItem disablePadding>
                <ListItemButton>
                <ListItemText primary="아기 목록" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
                </ListItemButton>
            </ListItem>
            </List>
        </nav>
      </Box>
    </Container>
  );
}

export default MyPage;
