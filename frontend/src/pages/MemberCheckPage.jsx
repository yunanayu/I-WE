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
  const [selectedMember, setSelectedMember] = useState("MOTHER"); // 선택된 멤버 (FATHER, MOTHER)
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'70vh'  }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', width:'300px', backgroundColor: 'whitesmoke', margin: '20px', padding: '10px', borderRadius:'15px' }}>
        <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormLabel sx={{ pointerEvents: 'none', color:'black', fontWeight:'bold', fontSize:'x-large',  mb:'30px'}} id="demo-radio-buttons-group-label">당신은 아이의?</FormLabel>
          <br />
          <RadioGroup
            row
            name="position"
            defaultValue="MOTHER"            
            value={selectedMember}
            onChange={handleSelectMember}
          >
            <FormControlLabel labelPlacement="bottom" value="MOTHER" control={<Radio />} label="엄마" />
            <FormControlLabel labelPlacement="bottom" value="FATHER" control={<Radio />} label="아빠" />
          </RadioGroup>
          <br />
          <Button
            size="mid"
            sx={{ backgroundColor: '#FBBBB8', color: 'white' }}
            onClick={handleConfirm}
          >
            다음  →
          </Button>
        </FormControl>
      </Box>
    </div>

  );
}

export default MemberCheckPage;