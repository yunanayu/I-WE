import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import axios  from "axios";
import useMemberStore from "../stores/userStore";
import { Box, Typography, Card } from '@mui/material';


function MemberCheckPage({ setSpouseStatus }) {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(""); // 선택된 멤버 (FATHER, MOTHER)
  const setUserNum = useMemberStore(state => state.setUserNum)

  const handleSelectMember = (event) => {
    setSelectedMember(event.target.value);
  };
  const handleConfirm = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("accessToken");
    var userNum;
    if(code) {
      document.cookie = `token=${code}`;
    }
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
      setUserNum(userNum)
    } catch(e) {
      console.log("회원정보 받아오기 실패")
    }

    // 남편/아내 정보 업데이트
    try {
      const response = await axios.put(`/api/member/parent?num=${userNum}&parentType=${selectedMember}`, null,
        {
          headers: {
            'Authorization' : code
          }
        }
      );

      console.log(response);
    } catch(e) {
      console.log("회원정보 받아오기 실패")
    }
    // console.log("남편/아내 등록 성공")
    
    if (selectedMember === "FATHER") {
      // 남편인 경우, 공유 코드 입력 페이지로 이동
      navigate("/inputShareCode");
    } else if (selectedMember === "MOTHER") {
      // 아내인 경우, 아이 추가 페이지로 이동
      navigate("/addChild");
    } else {
      // 선택된 멤버가 없는 경우 예외 처리
      console.error("멤버를 선택해주세요.");
    }
  };

  return (
    <Box sx={{ backgroundColor: 'whitesmoke', margin: '20px', padding: '10px' }}>
  <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">선택해주세요</FormLabel>
    <RadioGroup
      display="flex"
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue=""
      name="radio-buttons-group"
      value={selectedMember}
      onChange={handleSelectMember}
    >
      <FormControlLabel value="MOTHER" control={<Radio />} label="엄마" />
      <FormControlLabel value="FATHER" control={<Radio />} label="아빠" />
    </RadioGroup>
    <Button
      size="small"
      sx={{ backgroundColor: '#FBBBB8', color: 'white' }}
      onClick={handleConfirm}
    >
      확인
    </Button>
  </FormControl>
</Box>

  );
}

export default MemberCheckPage;