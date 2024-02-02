import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";

function MomForm(props) {

  const data = props.data;
  const [recent, setRecent] = useState();
  const today = new Date();
  const [weight, setWeight] = useState();
  const [update, setUpdate] = useState(false);

  const changeWeight = (e) => {
    setWeight(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(update) {
      const data = {
        "num" : recent.num,
        "weight" : weight,
        "recordDate" : recent.recordDate
      }
      axios.put(`/api/motherRecord/${recent.num}`, data)
      .then((response) => {
        console.log("UPDATE OK\n" + response);
      }).catch((error) => {
        console.log("UPDATE FAIL\n" + error);
      })
    } else {
      const todayDate = today.getFullYear + "-" + (today.getMonth()+1) + "-" + today.getDay();
      const data = {
        "motherNum" : 1, // 계정정보에서 motherNum 받아오기
        "weight" : weight,
        "recordDate" : todayDate
      }
      axios.post("/api/motherRecord/create", data)
      .then((response) => {
        console.log("POST OK\n" + response);
      }).catch((error) => {
        console.log("POST FAIL\n" + error);
      })
    }
  }

  useEffect(() => {
    if (data) {
      setRecent(data);
    }
  }, [data]);

  useEffect(() => {
    if(recent){
      console.log("최근 데이터 " + JSON.stringify(recent));
      const recentDate = new Date(recent.recordDate);
      if(recentDate.getDay() === today.getDay() && recentDate.getMonth() === today.getMonth() && recentDate.getFullYear() === today.getFullYear()) {
        setUpdate(true);
        setWeight(recent.weight);
      }
    }
  }, [recent])

  return (
    <>
      <Box component="form" sx={{ mt: 3 }} onSubmit={submitHandler}>
        <Typography fontSize={28}> 오늘의 체중은? </Typography>
        <TextField
          name="momweight"
          fullWidth
          label="kg"
          type="number"
          inputProps={{ step: "0.1" }}
          value={weight}
          onChange={changeWeight}
        ></TextField>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >기록하기</Button>
      </Box>
    </>
  );
}

function BabyForm() {
  return (
    <div>
      <Box component="form" sx={{ mt: 3, mb: 3 }}>
        <Typography fontSize={20}> 몸무게 </Typography>
        <TextField
          name="babyweight"
          fullWidth
          label="kg"
          type="number"
          inputProps={{ step: "0.1" }}
        ></TextField>
        <Typography fontSize={20}> 키 </Typography>
        <TextField
          name="babyweight"
          fullWidth
          label="cm"
          type="number"
          inputProps={{ step: "0.1" }}
        ></TextField>
        <Typography fontSize={20}> 머리둘레 </Typography>
        <TextField
          name="babyweight"
          fullWidth
          label="cm"
          type="number"
          inputProps={{ step: "0.1" }}
        ></TextField>
      </Box>
    </div>
  );
}

export { MomForm, BabyForm };
