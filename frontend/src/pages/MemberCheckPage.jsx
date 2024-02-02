import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import axios  from "axios";

function MemberCheckPage({ setSpouseStatus }) {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(""); // 선택된 멤버 (husband, wife)

  const handleSelectMember = (event) => {
    setSelectedMember(event.target.value);
  };

  const handleConfirm = () => {
    const response = 
    axios({
        headers: {
          "Authorization" : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZm4wMjJAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcwNjg1MTcyNSwiZXhwIjoxNzA2ODUzNTI1fQ.wWK-9MSwfpBkj_Cc_B9jQRmPZPTtsO74YAZM1A1mG-4"  
        },
        method: 'get',
        url: '/api/member'
    });
    console.log(response.data);
    const userNum = response.data.num;
    console.log(userNum);

    axios({
        method: 'get',
        url: `/api/member/parent?userNum=${userNum}&parentType=${selectedMember}`
    });
    console.log("남편/아내 등록 성공")
    
    if (selectedMember === "male") {
      // 남편인 경우, 공유 코드 입력 페이지로 이동
      navigate("/inputShareCode");
    } else if (selectedMember === "female") {
      // 아내인 경우, 아이 추가 페이지로 이동
      navigate("/addChild");
    } else {
      // 선택된 멤버가 없는 경우 예외 처리
      console.error("멤버를 선택해주세요.");
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue=""
        name="radio-buttons-group"
        value={selectedMember}
        onChange={handleSelectMember}
      >
        <FormControlLabel value="female" control={<Radio />} label="엄마" />
        <FormControlLabel value="male" control={<Radio />} label="아빠" />
      </RadioGroup>
        <Button size="small" style={{backgroundColor: '#FBBBB8', color: 'white'}} onClick={handleConfirm}>확인</Button>
    </FormControl>
  );
}

export default MemberCheckPage;



// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';

// const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
//   ({ theme, checked }) => ({
//     '.MuiFormControlLabel-label': checked && {
//       color: theme.palette.primary.main,
//     },
//   }),
// );

// function MyFormControlLabel(props) {
//   const radioGroup = useRadioGroup();

//   let checked = false;

//   if (radioGroup) {
//     checked = radioGroup.value === props.value;
//   }

//   return <StyledFormControlLabel checked={checked} {...props} />;
// }

// MyFormControlLabel.propTypes = {
//   /**
//    * The value of the component.
//    */
//   value: PropTypes.any,
// };

// export default function UseRadioGroup() {
//   return (
//     <RadioGroup name="use-radio-group" defaultValue="first">
//       <MyFormControlLabel value="first" label="First" control={<Radio />} />
//       <MyFormControlLabel value="second" label="Second" control={<Radio />} />
//     </RadioGroup>
//   );
// }