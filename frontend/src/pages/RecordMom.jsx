import React, { useState, useEffect, memo } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ChangeChart, WeeklyWeightChart } from "../components/chart/WeightChart";
import { MomForm } from "./WeightForm";
import { Typography } from "@mui/material";
import axios from "axios";
import useMemberStore from "../stores/userStore";

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
const Info = (props) => {
  const [avgData, setAvgData] = useState();
  const [diffData, setDiffData] = useState();
  const [d, setD] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [week, setWeek] = useState();
  const [msg, setMsg] = useState();
  const [msg2, setMsg2] = useState();
  const [msg3, setMsg3] = useState();
  const [msg4, setMsg4] = useState();
  const [msg5, setMsg5] = useState();

  useEffect(() => {}, [props.momRecord]);

  useEffect(() => {
    if (props.avg && props.diff) {
      setAvgData([...props.avg]);
      setDiffData([...props.diff]);
    }
  }, [props.avg, props.diff, week, start, end]);

  useEffect(() => {
    if (avgData && diffData) {
      const latestDiffData = props.diff[props.diff.length - 1];
      setD(latestDiffData);
      setStart(props.avg[props.avg.length - 1].start);
      setEnd(props.avg[props.avg.length - 1].end);
      setWeek(props.avg[props.avg.length - 1].week);
      // eslint-disable-next-line no-useless-concat
      setMsg(`체중이 지난주보다`);
      setMsg5(`${latestDiffData.weight}kg 증가했어요.`);

      if (latestDiffData.weight >= start && latestDiffData.weight <= end) {
        setMsg2("체중이 평균 범위 내에서 증가하고 있어요.");
        setMsg3("이대로만 유지해요.");
      } else if (latestDiffData.weight < start) {
        setMsg2("체중이 평균 밑이에요.");
        setMsg3("균형잡힌 식사를 추천드려요.");
      } else if (latestDiffData.weight > end) {
        setMsg2("체중이 평균보다");
        setMsg3("빠르게 증가하고 있어요.");
        setMsg4("식사량의 조절이 필요해요.");
      }
    } else {
      setMsg(`기록을 추가해보세요`);
    }
    // console.log(111);
  }, [avgData, diffData]);

  return (
    <>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography fontSize={20} variant="body2" style={{ whiteSpace: "pre-line" }}>
          {" "}
          {msg}{" "}
        </Typography>
        <Typography fontSize={26} variant="body2" style={{ whiteSpace: "pre-line" }}>
          {" "}
          {msg5}{" "}
        </Typography>
        {msg2 && (
          <Typography fontSize={20} variant="body2" style={{ whiteSpace: "pre-line" }} sx={{ mt: 1 }}>
            {" "}
            {msg2}{" "}
          </Typography>
        )}
        {msg3 && (
          <Typography fontSize={20} variant="body2" style={{ whiteSpace: "pre-line" }}>
            {" "}
            {msg3}{" "}
          </Typography>
        )}
        {msg4 && (
          <Typography fontSize={16} variant="body2" style={{ whiteSpace: "pre-line" }} sx={{ mt: 1 }}>
            {" "}
            {msg4}{" "}
          </Typography>
        )}
      </Box>
    </>
  );
};

// props 설정, form 전송 객체, 차트 데이터 입력 필요
// 전송 후 배열에 입력, 디비에 저장
function RecordMom() {
  const [recentRecord, setRecentRecord] = useState(null);
  const [momRecord, setMomRecord] = useState(null);
  const [momBasis, setMomBasis] = useState(null);
  const [babyData, setBabyData] = useState(null);
  const [avgData, setAvgData] = useState();
  const [diffData, setDiffData] = useState();
  const motherNum = useMemberStore((state) => state.babyList[0].motherNum);
  const babyNum = useMemberStore((state) => state.babyList[0].num);
  const status = useMemberStore((state) => state.babyList[0].targetTime).substr(0, 1);

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
      let updatedMomRecord = [];
      if (momRecord) {
        updatedMomRecord = prevMomRecord.slice(0, -1);
      }
      updatedMomRecord.push(data);
      return updatedMomRecord;
    });
  };

  const updateChartData = (data) => {
    setRecentRecord(data);
    setMomRecord((prevMomRecord) => {
      const updatedMomRecord = prevMomRecord ? [...prevMomRecord, data] : [data];
      // console.log("새로운 기록" + JSON.stringify(updatedMomRecord));
      return [...updatedMomRecord];
    });
  };

  const onAvgUpdate = (data) => {
    setAvgData([...data]);
    // console.log(JSON.stringify(avgData))
  };
  const onDiffUpdate = (data) => {
    setDiffData([...data]);
    // console.log(JSON.stringify(diffData))
  };

  // console.log("엄마기록??? " + JSON.stringify(momRecord));

  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter }}>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          {<Info record={momRecord} avg={avgData} diff={diffData} />}
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <MomForm data={recentRecord} recentUpdate={onUpdateRecent} onPostSuccess={updateChartData} />
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <WeeklyWeightChart recordData={momRecord} />
        </Box>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          <ChangeChart recordData={momRecord} basisData={momBasis} babyData={babyData} diffUpdate={onDiffUpdate} avgUpdate={onAvgUpdate} status={status} />
        </Box>
      </Container>
    </>
  );
}

export default RecordMom;
