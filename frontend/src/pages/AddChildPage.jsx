import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function AddChild({ setSpouseStatus }) {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [pregnancyDate, setPregnancyDate] = useState("");
  const [childGender, setChildGender] = useState("");

  const handleChildNameChange = (event) => {
    setChildName(event.target.value);
  };

  const handlePregnancyDateChange = (event) => {
    setPregnancyDate(event.target.value);
  };

  const handleChildGenderChange = (event) => {
    setChildGender(event.target.value);
  };

  const handleAddChild = () => {
    // 입력된 정보를 이용하여 아이를 추가하는 로직을 구현하세요
    console.log("아이 추가 - 이름:", childName, "임신 날짜:", pregnancyDate, "성별:", childGender);
    // 추가한 후에 다른 페이지로 이동하거나 추가적인 작업을 수행할 수 있습니다.
    navigate("/"); // '/'로 이동하도록 지정합니다.
  };

  return (
    <div>
      <TextField
        label="아이의 이름"
        value={childName}
        onChange={handleChildNameChange}
      />
      <TextField
        label="임신한 날짜"
        value={pregnancyDate}
        onChange={handlePregnancyDateChange}
      />
      <FormControl>
        <FormLabel>성별</FormLabel>
        <RadioGroup
          name="child-gender"
          value={childGender}
          onChange={handleChildGenderChange}
        >
          <FormControlLabel value="남자" control={<Radio />} label="남자" />
          <FormControlLabel value="여자" control={<Radio />} label="여자" />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" onClick={handleAddChild}>아이 추가</Button>
    </div>
  );
}

export default AddChild;
