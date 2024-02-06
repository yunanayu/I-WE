import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ChangeChart, WeeklyWeightChart } from "../components/chart/WeightChart";
import { MomForm } from "./WeightForm";
import { Typography } from "@mui/material";
import axios from "axios";
import useMemberStore from "../stores/userStore";

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
function Info(props) {

  const [avgData, setAvgData] = useState();
  const [diffData, setDiffData] = useState();
  const [d, setD] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [week, setWeek] = useState();
  const [msg, setMsg] = useState();
  const [msg2, setMsg2] = useState();
  const [msg3, setMsg3] = useState();

  useEffect(() => {
    if (props.avg && props.diff) {
      setAvgData(props.avg);
      setDiffData(props.diff);
  
      const latestDiffData = props.diff[props.diff.length - 1];
      setD(latestDiffData);
      setStart(props.avg[props.avg.length - 1].start);
      setEnd(props.avg[props.avg.length - 1].end);
      setWeek(props.avg[props.avg.length - 1].week);
      setMsg(`저번주 보다 \n${latestDiffData.weight}kg 증가했어요.`);
  
      if (latestDiffData.weight >= start && latestDiffData.weight <= end) {
        setMsg2("체중이 평균 범위 내에서 증가하고 있어요.");
      } else if (latestDiffData.weight < start) {
        setMsg2("체중이 평균 밑이에요.");
        setMsg3("균형잡힌 식사를 추천드려요.");
      } else if (latestDiffData.weight > end) {
        setMsg2("체중이 평균보다 높아요.");
        setMsg3("식사량을 조절하시길 추천드려요.");
      }
    }
  }, [props.avg, props.diff, week, start, end]);
    

  return (
    <>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography fontSize={26}> {msg} </Typography>
        {msg2 && (<Typography fontSize={26}> {msg2} </Typography>)}
        {msg3 && (<Typography fontSize={26}> {msg3} </Typography>)}
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
  const [avgData, setAvgData] = useState();
  const [diffData, setDiffData] = useState();
  const motherNum = useMemberStore(state => state.babyList[0].motherNum)
  const babyNum = useMemberStore(state => state.babyList[0].num);

  useEffect(() => {
    const initData = async () => {
      await axios
        .get(`/api/motherRecord/${motherNum}`)
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
        .get(`/api/motherBasis/${motherNum}`)
        .then((response) => {
          let basis = response.data;
          setMomBasis(basis);
        })
        .catch((error) => {
          console.log("GET MOM BASIS ERROR\n" + error);
        });
    };
    const initBabyData = async () => {
      await axios.get(`/api/baby/${babyNum}`).then((response) => {
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
    // console.log("새로운 기록" + JSON.stringify(momRecord));
  };
  const onAvgUpdate = (data) => {
    setAvgData(data);
  };
  const onDiffUpdate = (data) => {
    setDiffData(data);
  };

  // console.log("엄마기록??? " + JSON.stringify(momRecord));

  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter, background: "pink" }}>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          {<Info avg={avgData} diff={diffData}/>}
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3}}>
          <MomForm data={recentRecord} recentUpdate={onUpdateRecent} />
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <WeeklyWeightChart recordData={momRecord} />
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <ChangeChart recordData={momRecord} basisData={momBasis} babyData={babyData} diffUpdate={onDiffUpdate} avgUpdate={onAvgUpdate}/>
        </Box>
      </Container>
    </>
  );
}

export default RecordMom;
