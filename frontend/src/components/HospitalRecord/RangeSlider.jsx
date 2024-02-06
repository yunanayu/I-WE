import React, { useEffect, useState } from 'react';
import { Grid, Typography, Slider } from '@mui/material';

function NumberRangeSlider(props) {
  const setSelectRange = props.setSelectRange
  const target = props.target
  const [range, setRange] = useState([1, 144]); // 시작 숫자와 종료 숫자를 배열로 관리


  useEffect(() => {
    setSelectRange(range)
  },[range])



  const handleChange = (event, newValue) => {
    setRange(newValue);
  };


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Slider
          value={range}
          onChange={handleChange}
          min={1}
          max={144}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={(value) => `${value}`}
          sx={{color:'#FBBBB8'}}
        />
        <Typography id="range-slider" gutterBottom>
          {range[0]}개월 - {range[1]}개월
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NumberRangeSlider;
