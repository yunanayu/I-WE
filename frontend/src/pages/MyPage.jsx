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
  const parentType = useMemberStore(state => state.parentType)
  const profileImage = useMemberStore(state => state.profileImage)
  const familyNum = useMemberStore((state) => state.familyNum);
  const userName = useMemberStore(state => state.userName)
  return (
    <Container>
      <Box sx={{display:'flex',justifyContent:'center', textAlign:'center'}}>
      </Box>
      <Box sx={{display:'flex', m:5, alignItems:'center', justifyContent:'space-evenly', width:'80%' }}>
        {profileImage ? (
          <Avatar sx={{ width: 56, height: 56 }} src={profileImage} />
        ) : (
          <Avatar sx={{ width: 56, height: 56 }} src="/broken-image.jpg" />
        )}
        <div style={{display:'flex', textAlign:'center'}}>
          <Typography variant="h5" sx={{fontWeight:'bold', textAlign:'center'}}>{userName}</Typography>
          <Typography variant="h6"> 님 반갑습니다!</Typography>
        </div>
      </Box>
      <Divider sx={{mb:2}}/>
      <Box sx={{ width: 400 }}>
        <Typography variant="caption" display="block" gutterBottom sx={{pl:2}}>나의 정보</Typography>
        <nav aria-label="secondary mailbox folders">
          <List>
          {parentType !== "FATHER" && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/codeshare")}>
                <ListItemText primary="가족 코드" />
                <KeyboardArrowRightSharpIcon color="disabled" />
              </ListItemButton>
            </ListItem>
          )}
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
