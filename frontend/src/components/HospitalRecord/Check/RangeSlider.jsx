import React, { useEffect, useState } from "react";
import { Grid, Typography, Slider } from "@mui/material";

function NumberRangeSlider(props) {
  const setSelectRange = props.setSelectRange;
  const target = props.target;
  const [range, setRange] = useState([0, 144]); // 시작 기간 종료 기간을 배열로 관리

  useEffect(() => {
    if (target === "mother") {
      setRange([0, 40]);
    } else {
      setRange([0, 24]);
    }
  }, []);

  useEffect(() => {
    setSelectRange(range);
  }, [range]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Slider
          value={range}
          onChange={handleChange}
          min={0}
          max={target === 'mother'? '40' : '24'}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={(value) => `${value}`}
          sx={{ color: "#FBBBB8" }}
        />
        {target === "mother" ? (
          <Typography id="range-slider" gutterBottom>
            {range[0]}주 - {range[1]}주
          </Typography>
        ) : (
          <Typography id="range-slider" gutterBottom>
            {range[0]}개월 - {range[1]}개월
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default NumberRangeSlider;
