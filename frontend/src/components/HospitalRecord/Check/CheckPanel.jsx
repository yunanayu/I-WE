import React, { useEffect, useState } from "react";
import useMemberStore from "../../../stores/userStore";
import axios from "axios";
import { Box } from "@mui/system";
import Select from "@mui/joy/Select";
import Stack from "@mui/joy/Stack";
import Option from "@mui/joy/Option";
import { Typography } from "@mui/material";
import ReadVaccinCard from "../ReadVaccinCard";
import { getCheck } from "../../../api/RecordApi";
import NumberRangeSlider from "./RangeSlider";
import MotherCheck from "./MotherCheck";
import BabyCheck from "./BabyCheck";

export function getNumberFromString(str) {
  return parseInt(str.substring(1));
}
export const sortList = (data) => {
  return data.sort(
    (a, b) =>
      getNumberFromString(a.startTime) - getNumberFromString(b.startTime)
  );
};

const CheckPanel = () => {
  const [selectTarget, setSelectTarget] = useState(null);

  return (
    <Box sx={{mb:2}}>
      <Select placeholder="대상을 선택해주세요" variant="plain">
        <Option value="baby" onClick={() => setSelectTarget("baby")}>
          아기
        </Option>
        <Option value="mother" onClick={() => setSelectTarget("mother")}>
          엄마
        </Option>
      </Select>
      {selectTarget === "mother" && <MotherCheck />}
      {selectTarget === "baby" && <BabyCheck />}
    </Box>
  );
};

export default CheckPanel;
