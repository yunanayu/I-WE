import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

function MomForm() {
  return (
    <>
      <Box component="form" sx={{ mt: 3 }}>
        <Typography fontSize={34}> 오늘의 체중은? </Typography>
        <TextField
          name="momweight"
          fullWidth
          label="kg"
          type="number"
          inputProps={{ step: "0.1" }}
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
      <Box component="form" sx={{ mt: 3 }}>
        <Typography fontSize={34}> 오늘의 체중은? </Typography>
        <TextField
          name="momweight"
          fullWidth
          label="kg"
          type="number"
          inputProps={{ step: "0.1" }}
        ></TextField>
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >기록하기</Button>
    </div>
  );
}

export { MomForm, BabyForm };
