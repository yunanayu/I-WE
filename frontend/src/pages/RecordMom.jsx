import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ChangeChart, WeeklyWeightChart } from "../components/chart/WeightChart";
import { MomForm } from "./WeightForm";
import { Typography } from "@mui/material";
import axios from "axios";
import { initialize } from "workbox-google-analytics";

// 주차별 몸무게
const weightWeekly = [];
// 평균 몸무게
const weightAvg = null;
// 임신 주차
const pregWeek = null;
// status 구하는 함수 필요
const status = "avg";
// 입력받을 오늘 몸무게
const weightToday = null;

// 띄워줄 메세지
const infoMessage = [
  { stat: "low", msg: "평균보다 낮습니다" },
  { stat: "avg", msg: "평균치입니다" },
  { stat: "high", msg: "평균보다 높습니다" },
];

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

// low, avg, high에 맞춰서 메세지 출력
function Info() {
  const text = infoMessage.find((element) => {
    if (element.stat === status) return true;
  });
  return (
    <>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography fontSize={34}> {text.msg} </Typography>
      </Box>
    </>
  );
}

// props 설정, form 전송 객체, 차트 데이터 입력 필요
// 전송 후 배열에 입력, 디비에 저장
function RecordMom() {
  const [recentRecord, setRecentRecord] = useState(null);
  const [momRecord, setMomRecord] = useState(null);
  const [momBasis, setMomBasis] = useState(null);
  const [babyData, setBabyData] = useState(null);

  useEffect(() => {
    const initData = async () => {
      await axios
        .get("/api/motherRecord/1")
        .then((response) => {
          let data = response.data;
          setMomRecord(data);
          setRecentRecord(data.at(-1));
        })
        .catch((error) => {
          console.log("GET MOM RECORD ERROR\n" + error);
        });
    };
    const initBasis = async () => {
      await axios
        .get("/api/motherBasis/1")
        .then((response) => {
          let basis = response.data;
          setMomBasis(basis);
        })
        .catch((error) => {
          console.log("GET MOM BASIS ERROR\n" + error);
        });
    };
    const initBabyData = async () => {
      await axios.get("/api/baby/1").then((response) => {
        let bData = response.data;
        setBabyData(bData);
      });
    };
    initData();
    initBasis();
    initBabyData();
  }, []);

  const onUpdateRecent = (data) => {
    setRecentRecord(data);
    setMomRecord((prevMomRecord) => {
      const updatedMomRecord = prevMomRecord.slice(0, -1);
      updatedMomRecord.push(data);
      return updatedMomRecord;
    });
    console.log("새로운 기록" + JSON.stringify(momRecord));
  };

  console.log("엄마기록??? " + JSON.stringify(momRecord));

  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter, background: "pink" }}>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          {<Info />}
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3, padding: 2 }}>
          <MomForm data={recentRecord} recentUpdate={onUpdateRecent} />
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <WeeklyWeightChart recordData={momRecord} />
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <ChangeChart recordData={momRecord} basisData={momBasis} babyData={babyData} />
        </Box>
      </Container>
    </>
  );
}

export default RecordMom;
