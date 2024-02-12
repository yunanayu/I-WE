import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { WeightChart, HeightChart, HeadChart } from "../components/chart/BabyChart";
import { BabyForm } from "./WeightForm";
import { BabyCarousel } from "./BabyCarousel";
import { Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// 평균과 비교하여 메세지 출력
function Info(props) {
  // 주차 비교
  // 평균값 3개 뽑기
  // 크면 파랑 작으면 빨강
  const today = new Date();
  const birthDate = new Date(props.birthDate);
  const pregnancyDate = new Date(props.pregnancyDate);
  const tmp = new Date(pregnancyDate);
  const [percentile, setPercentile] = useState();
  useEffect(() => {
    if (props.percentile) {
      setPercentile(props.percentile);
    }
  }, [props.percentile]);

  tmp.setMonth(tmp.getMonth() - 3);
  tmp.setFullYear(tmp.getFullYear() + 1);
  tmp.setDate(tmp.getDate() + 7);
  const pBirth = Math.ceil(Math.abs(today.getTime() - tmp.getTime()) / (1000 * 60 * 60 * 24)) - 1;

  const dDay = Math.ceil(Math.abs(today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)) - 1;

  return (
    <>
      <Box sx={{ ...setCenter, mt: 3, mb: 3 }}>
        {props.status === "A" && percentile ? (
          <>
            <Typography fontSize={34}> D+{dDay} </Typography>
            <Typography fontSize={23}> 체중 상위 {percentile.weightPercentile}% </Typography>
            <Typography fontSize={23}> 신장 상위 {percentile.heightPercentile}% </Typography>
            <Typography fontSize={23}> 머리둘레 상위 {percentile.circumferencePercentile}% </Typography>
          </>
        ) : (
          <>
            <Typography fontSize={34}>임신 {props.targetTime} 주차</Typography>
            <Typography fontSize={28}> D-{pBirth} </Typography>
          </>
        )}
      </Box>
    </>
  );
}

function ButtonField(props) {
  const { setOpen, id, disabled, InputProps: { ref } = {} } = props;

  return (
    <IconButton variant="outlined" id={id} disabled={disabled} ref={ref} onClick={() => setOpen?.((prev) => !prev)}>
      <CalendarMonthIcon />
    </IconButton>
  );
}

function ButtonDatePicker(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <DatePicker
      slots={{ field: ButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
}

// props 설정, form 전송 객체, 차트 데이터 입력 필요
function RecordBaby() {
  const [picture, setPicture] = useState(false);
  const pictureOpen = () => setPicture(true);
  const pictureClose = () => setPicture(false);
  const [record, setRecord] = useState(false);
  const recordOpen = () => setRecord(true);
  const recordClose = () => setRecord(false);
  const [date, setDate] = useState(dayjs());
  const motherNum = useMemberStore((state) => state.babyList[0].motherNum);
  const babyNum = useMemberStore((state) => state.babyList[0].num);
  const targetTime = useMemberStore((state) => state.babyList[0].targetTime).substr(1);
  const status = useMemberStore((state) => state.babyList[0].targetTime).substr(0, 1);
  const babyName = useMemberStore((state) => state.babyList[0].name);
  const pregnancyDate = useMemberStore((state) => state.babyList[0].pregnancyDate);
  const birthDate = useMemberStore((state) => state.babyList[0].birth);
  const gender = useMemberStore((state) => state.babyList[0].gender);
  console.log(status);
  const [recentRecordMonth, setRecentRecordMonth] = useState();
  const [born, setBorn] = useState(false);
  const [babyRecord, setBabyRecord] = useState(null);
  const [recentRecord, setRecentRecord] = useState();
  const [weightRecord, setWeightRecord] = useState();
  const [heightRecord, setHeightRecord] = useState();
  const [headRecord, setHeadRecord] = useState();
  const [percentileRecord, setPercentileRecord] = useState();

  useEffect(() => {
    if (recentRecord) {
      setRecentRecordMonth(() => {
        const d = new Date(recentRecord.recordDate);
        const b = new Date(birthDate);
        return (d.getFullYear() - b.getFullYear()) * 12 + d.getMonth() - b.getMonth() + 1;
      });
    }
  }, [recentRecord]);

  useEffect(() => {
    if (recentRecordMonth) {
      if (status === "A") {
        setBorn(true);
        const init2 = async () => {
          await axios
            .get(
              `/api/growth/${gender + 1}/${recentRecordMonth}/${recentRecord.height}/${recentRecord.weight}/${
                recentRecord.circumference
              }`
            )
            .then((response) => {
              const data = response.data;
              setPercentileRecord(data);
            })
            .catch((error) => {
              console.log(error);
            });
        };
        init2();
      } else {
        setBorn(false);
      }
    }
  }, [status, recentRecord, recentRecordMonth]);

  useEffect(() => {
    const init = async () => {
      await axios
        .get(`/api/babyRecord/${babyNum}`)
        .then((response) => {
          setBabyRecord(response.data);
          const recent = response.data[response.data.length - 1];
          setRecentRecord(recent);
        })
        .catch((error) => {
          console.log("GET BABY RECORD ERROR\n" + error);
        });
    };
    init();
  }, [babyNum]);

  useEffect(() => {
    if (babyRecord) {
      setWeightRecord(
        babyRecord.map((r) => {
          return {
            recordDate: r.recordDate,
            weight: r.weight,
          };
        })
      );
      setHeightRecord(
        babyRecord.map((r) => {
          return {
            recordDate: r.recordDate,
            height: r.weight,
          };
        })
      );
      setHeadRecord(
        babyRecord.map((r) => {
          return {
            recordDate: r.recordDate,
            head: r.circumference,
          };
        })
      );
    }
  }, [babyRecord]);

  const submitFunction = (data) => {
    let arr = [...babyRecord];
    if (recentRecord) {
      arr.pop();
      arr.push(data);
    }
    setRecentRecord(data);
    arr.push(data);
    setBabyRecord([...arr]);
    recordClose();
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter, background: "skyblue" }}>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}>
          {
            <Info
              born={born}
              recentRecord={recentRecord}
              babyName={babyName}
              targetTime={targetTime}
              status={status}
              pregnancyDate={pregnancyDate}
              birthDate={birthDate}
              percentile={percentileRecord}
            />
          }
        </Box>

        {status === "A" ? (
          <>
            <Box maxWidth="md" sx={{ ...setCenter }}>
              <Stack direction={"row"} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Button
                  variant="outlined"
                  onClick={recordOpen}
                  sx={{
                    ...setCenter,
                    width: "28vw",
                    boxShadow: 3,
                    borderRadius: 5,
                    backgroundColor: "background.paper",
                    color: "black",
                  }}
                >
                  오늘의 {babyName} 기록하기
                </Button>
                <Button
                  variant="outlined"
                  onClick={pictureOpen}
                  sx={{
                    ...setCenter,
                    width: "28vw",
                    boxShadow: 3,
                    borderRadius: 5,
                    backgroundColor: "background.paper",
                    color: "black",
                  }}
                >
                  {babyName} 사진보기
                </Button>
              </Stack>
              {/* 기록용 모달 */}
              <Modal
                open={record}
                onClose={recordClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <Box sx={{ ...setCenter, ...style }}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" sx={setCenter}>
                        <Stack direction={"row"} spacing={2}>
                          {dayjs(date).format("YYYY-MM-DD")}
                          <ButtonDatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            format={"YYYY-MM-DD"}
                          />
                        </Stack>
                      </Typography>
                      {
                        <BabyForm
                          data={babyRecord}
                          recentData={recentRecord}
                          dateSelected={date}
                          babyNum={babyNum}
                          isBorn={born}
                          onSubmit={submitFunction}
                        />
                      }
                    </Box>
                  </LocalizationProvider>
                </Box>
              </Modal>

              {/* 사진용 모달 */}
              <Modal
                open={picture}
                onClose={pictureClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={{ ...setCenter, ...style }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {babyName}의 사진
                  </Typography>
                  <BabyCarousel></BabyCarousel>
                </Box>
              </Modal>
            </Box>
            <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3, height: 400 }}>
              <WeightChart weightRecord={weightRecord} percentile={percentileRecord} month={recentRecordMonth} />
            </Box>
            <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3, height: 400 }}>
              <HeightChart heightRecord={heightRecord} percentile={percentileRecord} month={recentRecordMonth} />
            </Box>
            <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3, height: 400 }}>
              <HeadChart headRecord={headRecord} percentile={percentileRecord} month={recentRecordMonth} />
            </Box>
          </>
        ) : (
          <>
            <Box maxWidth="md" sx={{ ...setCenter }}>
              <Button
                variant="outlined"
                onClick={recordOpen}
                sx={{
                  ...setCenter,
                  width: "66vw",
                  boxShadow: 3,
                  borderRadius: 5,
                  backgroundColor: "background.paper",
                  color: "black",
                }}
              >
                오늘의 {babyName} 기록하기
              </Button>
              {/* 기록용 모달 */}
              <Modal
                open={record}
                onClose={recordClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <Box sx={{ ...setCenter, ...style }}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" sx={setCenter}>
                        <Stack direction={"row"} spacing={2}>
                          {dayjs(date).format("YYYY-MM-DD")}
                          <ButtonDatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            format={"YYYY-MM-DD"}
                          />
                        </Stack>
                      </Typography>
                      {
                        <BabyForm
                          data={babyRecord}
                          recentData={recentRecord}
                          dateSelected={date}
                          babyNum={babyNum}
                          isBorn={born}
                          onSubmit={submitFunction}
                        />
                      }
                    </Box>
                  </LocalizationProvider>
                </Box>
              </Modal>
            </Box>
            <Box maxWidth="md" sx={{ ...setCenter, ...commonStyles, borderRadius: 3 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {babyName}의 사진
              </Typography>
              <BabyCarousel></BabyCarousel>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default RecordBaby;
