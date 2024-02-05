import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

function MomForm() {

  const [weight, setWeight] = useState();

  const changeWeight = (e) => {
    setWeight(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Box component="form" sx={{ mt: 3 }}>
        <Typography fontSize={28}> 오늘의 체중은? </Typography>
        <form onsubmit={submitHandler}>
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
      </form>
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
