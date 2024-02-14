import React from "react";
import { Typography, Box, Button, Container, Avatar } from "@mui/material";
import useMemberStore from "../stores/userStore";
import ChildList from "../components/myPage/ChildList";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FileUpload from "../components/HospitalRecord/FileUpload";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";

// familyNum 받아오기
function MyPage() {
  const navigate = useNavigate();
  const profileImage = useMemberStore(state => state.profileImage)
  const familyNum = useMemberStore((state) => state.familyNum);
  const userName = useMemberStore(state => state.userName)
  return (
    <Container>
        <Typography variant="h6" gutterBottom sx={{m:5}}>마이페이지</Typography>
      <Box sx={{display:'flex', m:5,}}>
        {profileImage ? (
          <Avatar sx={{ width: 56, height: 56 }} src={profileImage} />
        ) : (
          <Avatar sx={{ width: 56, height: 56 }} src="/broken-image.jpg" />
        )}
        <Typography sx={{ml:2, pt:1}}>{userName} 님 반갑습니다!</Typography>
      </Box>
      <Divider sx={{mb:2}}/>
      <Box sx={{ width: 400 }}>
        <Typography variant="caption" display="block" gutterBottom sx={{pl:2}}>나의 가족</Typography>
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/codeshare")}>
                <ListItemText primary="가족 코드 보기" />
                <KeyboardArrowRightSharpIcon color="disabled" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="아기 목록"
                  onClick={() => navigate("/babylist")}
                />
                <KeyboardArrowRightSharpIcon color="disabled" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </Container>
  );
}

export default MyPage;
