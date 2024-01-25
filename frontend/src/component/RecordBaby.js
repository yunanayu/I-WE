import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ChangeChart, WeeklyWeightChart } from "./MomWeightChart";
import { BabyForm } from "./WeightForm";
import { Typography } from "@mui/material";

// 주차별 몸무게, 머리둘레, 키
const weight = [];
const height = [];
const headspan = [];
// 평균 몸무게
const weightAvg = [];
// 평균 키
const heightAvg = [];
// 평균 머리둘레
const headspanAvg = [];

// 임신 주차
const pregWeek = null;

// 가운데 정렬 css
const setCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

// 박스 기본 css
const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  width: "66vw",
};

// 평균과 비교하여 메세지 출력
function Info() {
  // 주차 비교
  // 평균값 3개 뽑기
  // 크면 파랑 작으면 빨강
  return (
    <>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography fontSize={34}>123 </Typography>
      </Box>
    </>
  );
}

// props 설정, form 전송 객체, 차트 데이터 입력 필요 
function RecordMom() {
  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter, background: "skyblue" }}>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          {<Info />}
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          123
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          <WeeklyWeightChart />
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          <ChangeChart />
        </Box>
      </Container>
    </>
  );
}

export default RecordMom;
