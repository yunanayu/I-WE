import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { WeightChart, HeightChart, HeadChart } from "../components/chart/BabyChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BabyForm } from "./WeightForm";
import { BabyCarousel } from "./BabyCarousel";
import { Button, Divider, IconButton, Modal, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import useMemberStore from "../stores/userStore";
import heart2 from "../images/heart3.png";

dayjs.locale("ko");
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
  width: "75vw",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius:"10px",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  typography: {
    fontFamily: "Dongle, sans-serif",
    fontWeightRegular: 400,
    fontStyleRegular: 'normal',
  },
});
const wordtheme = createTheme({
  typography: {
    fontFamily: 'Poor Story, system-ui',
    fontWeightRegular: 400,
    fontStyleRegular: 'normal',
  },
});

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
    setPercentile();
    if (props.percentile && props.recentRecord) {
      setPercentile(props.percentile);
    } else {
      setPercentile();
    }
    console.log(percentile);
  }, [props.percentile, props.babyNum, props.recentRecord, percentile]);

  tmp.setMonth(tmp.getMonth() - 3);
  tmp.setFullYear(tmp.getFullYear() + 1);
  tmp.setDate(tmp.getDate() + 7);
  const pBirth = Math.ceil(Math.abs(today.getTime() - tmp.getTime()) / (1000 * 60 * 60 * 24)) - 1;

  const dDay = Math.ceil(Math.abs(today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)) - 1;
  return (
    <>
      <Box sx={{ mt: 3, mb: 3 }}>
        {props.status === "A" && percentile ? (
          <>
          <Box>
            <Typography theme={theme} fontSize={36} sx={{ ...setCenter }}>
              D+{dDay}
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography theme={theme} fontSize={30} textAlign="center" sx={{ margin: '0px' }}>
                체　　중 : 상위 {percentile.weightPercentile}%
              </Typography>
              <Typography theme={theme} fontSize={30} textAlign="center" sx={{ margin: '0px' }}>
                신　　장 : 상위 {percentile.heightPercentile}%
              </Typography>
              <Typography theme={theme} fontSize={30} textAlign="center" sx={{ margin: '0px' }}>
                머리둘레 : 상위 {percentile.circumferencePercentile}%
              </Typography>
            </Box>
          </Box>
            
          </>
        ) : props.status === "A" ? (
          <Typography theme={theme} fontSize={34}> D+{dDay} </Typography>
        ) : (
          <>
            <Typography theme={theme} fontSize={40} textAlign={"center"}>
              임신 {props.targetTime} 주차 <br /> D-{pBirth -1}
            </Typography>
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
  const [babyIndex, setBabyIndex] = useState(0);
  const [babyNum, setBabyNum] = useState(useMemberStore((state) => state.babyList[babyIndex].num));

  const babyList = useMemberStore((state) => state.babyList);
  const motherNum = useMemberStore((state) => state.userNum);
  const targetTime = useMemberStore((state) => state.babyList[babyIndex].targetTime).substr(1);
  const status = useMemberStore((state) => state.babyList[babyIndex].targetTime).substr(0, 1);
  const babyName = useMemberStore((state) => state.babyList[babyIndex].name);
  const pregnancyDate = useMemberStore((state) => state.babyList[babyIndex].pregnancyDate);
  const birthDate = useMemberStore((state) => state.babyList[babyIndex].birth);
  const gender = useMemberStore((state) => state.babyList[babyIndex].gender);
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
  }, [recentRecord, birthDate]);

  useEffect(() => {
    if (recentRecordMonth && recentRecordMonth < 200) {
      if (status === "A") {
        setBorn(true);
        console.log("recent record: \n" + JSON.stringify(recentRecord));
        const init2 = async () => {
          await axios
            .get(`/api/growth/${gender}/${recentRecordMonth}/${recentRecord.height}/${recentRecord.weight}/${recentRecord.circumference}`)
            .then((response) => {
              const data = response.data;
              setPercentileRecord(data);
            })
            .catch((error) => {
              setRecentRecord();
              setRecentRecordMonth();
              setPercentileRecord();
              console.log(error);
            });
        };
        init2();
      } else {
          setBorn(false);
        }
      console.log(born);
    }
  }, [status, recentRecord, babyNum, recentRecordMonth]);

  useEffect(() => {
    const init = async () => {
      await axios
        .get(`/api/babyRecord/${babyNum}`)
        .then((response) => {
          setBabyRecord(response.data);
          const recent = response.data[response.data.length - 1];
          setRecentRecord(recent);
          // console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          setBabyRecord();
          setRecentRecord();
          setRecentRecordMonth();
          setPercentileRecord();
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
            height: r.height,
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

  const submitFunction = (update, data) => {
    if(update) {
      setRecentRecord(data);
      setBabyRecord((prevRecord) => {
        let updatedRecord = [];
        if (babyRecord) {
          updatedRecord = prevRecord.slice(0, -1);
        }
        updatedRecord.push(data);
        return updatedRecord;
      });
    } else {
      setRecentRecord(data);
      if(babyRecord){
        setBabyRecord([...babyRecord, data]);
      } else {
        setBabyRecord([data]);
      }
    }
    recordClose();
  };

  const babyChange = (e) => {
    // console.log(babyList.findIndex((baby) => baby.num + "" === e.target.value));
    setBabyIndex(babyList.findIndex((baby) => baby.num + "" === e.target.value));
    setBabyNum(e.target.value);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter }}>
        <FormControl>
          <RadioGroup overlay name="member" orientation="horizontal" sx={{ gap: 2 }} onChange={babyChange} value={babyNum}>
            {babyList.map((baby) => (
              <Sheet
                component="label"
                key={baby.num}
                variant="outlined"
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "sm",
                  borderRadius: "md",
                }}
              >
                <Radio
                  value={baby.num || ""}
                  variant="soft"
                />
                <Typography level="body-sm" sx={{ mt: 1 }}>
                  {baby.name}
                </Typography>
              </Sheet>
            ))}
          </RadioGroup>
        </FormControl>
        <Box maxWidth="md" sx={{ ...commonStyles, ...setCenter, borderRadius: 3, height:'200px' }}>
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
              babyNum={babyNum}
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
                  오늘의 {babyName} 
                  <br />기록하기
                </Button>
                <Button
                  style={{ whiteSpace: "pre-line" }}
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
                  {babyName}
                  <br />
                  사진보기
                </Button>
              </Stack>
              {/* 기록용 모달 */}
              <Modal open={record} onClose={recordClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <Box sx={{ ...setCenter, ...style }}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" sx={setCenter}>
                        <Stack direction={"row"} spacing={2}>
                          {dayjs(date).format("YYYY-MM-DD")}
                          <ButtonDatePicker disableFuture value={date} onChange={(newValue) => setDate(newValue)} format={"YYYY-MM-DD"} />
                        </Stack>
                      </Typography>
                      <BabyForm gender={gender} data={babyRecord} recentData={recentRecord} dateSelected={date} babyNum={babyNum} isBorn={born} onSubmit={submitFunction} />
                    </Box>
                  </LocalizationProvider>
                </Box>
              </Modal>

              {/* 사진용 모달 */}
              <Modal open={picture} onClose={pictureClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ ...setCenter, ...style }}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {babyName}의 사진
                    <img src={heart2} width="40" height="30" alt="하트 이미지" />
                  </Typography>
                  {babyRecord ? (
                    <BabyCarousel babyRecord={babyRecord}></BabyCarousel>
                  ) : (
                    <Typography id="modal-modal-description" variant="h6" component="h2">
                      기록이 없습니다.
                    </Typography>
                  )}
                </Box>
              </Modal>
            </Box>
            <Box
              maxWidth="md"
              sx={{
                ...commonStyles,
                ...setCenter,
                borderRadius: 3,
                height: 400,
              }}
            >
              {babyRecord ? (
                <WeightChart weightRecord={weightRecord} percentile={percentileRecord} month={recentRecordMonth} />
              ) : (
                <Typography theme={wordtheme} id="modal-modal-description" variant="h5" component="h2" sx={{ mb: '20px', fontWeight: 'bold' }}>
                  아이의 오늘을 <br /> 기록해주세요
                </Typography>
              )}
            </Box>
            {babyRecord ? (
              <Box
                maxWidth="md"
                sx={{
                  ...commonStyles,
                  ...setCenter,
                  borderRadius: 3,
                  height: 400,
                }}
              >
                <HeightChart heightRecord={heightRecord} percentile={percentileRecord} month={recentRecordMonth} />
              </Box>
            ) : (
              <></>
            )}
            {babyRecord ? (
              <Box
                maxWidth="md"
                sx={{
                  ...commonStyles,
                  ...setCenter,
                  borderRadius: 3,
                  height: 400,
                  mb: 15
                }}
              >
                <HeadChart headRecord={headRecord} percentile={percentileRecord} month={recentRecordMonth} />
              </Box>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <Box maxWidth="md" sx={{ ...setCenter }}>
              <Button
                variant="outlined"
                onClick={recordOpen}
                sx={{
                  ...setCenter,
                  width: "60vw",
                  boxShadow: 3,
                  borderRadius: 5,
                  backgroundColor: "background.paper",
                  color: "black",
                  mt:'5px',
                  mb:'5px'
                }}
              >
                오늘 {babyName} 기록하기
              </Button>
              {/* 기록용 모달 */}
              <Modal open={record} onClose={recordClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                    <Box sx={{ ...setCenter, ...style }}>
                      <Typography id="modal-modal-title" variant="h6" component="h2" sx={setCenter}>
                        <Stack direction={"row"} spacing={2}>
                          {dayjs(date).format("YYYY-MM-DD")}
                          <ButtonDatePicker disableFuture value={date} onChange={(newValue) => setDate(newValue)} format={"YYYY-MM-DD"} />
                        </Stack>
                      </Typography>
                      <BabyForm gender={gender} data={babyRecord} recentData={recentRecord} dateSelected={date} babyNum={babyNum} isBorn={born} onSubmit={submitFunction} />
                    </Box>
                  </LocalizationProvider>
                </Box>
              </Modal>
            </Box>
            <Box maxWidth="md" sx={{ ...setCenter, ...commonStyles, borderRadius: 3, mb: 15 }}>
              <Typography theme={wordtheme} id="modal-modal-title" variant="h5" component="h2" sx={{ mt:'10px'}}>
                {babyName}의 사진
                <img src={heart2} width="40" height="30" alt="하트 이미지" />
              </Typography>
              <br />
              {babyRecord ? (
                <BabyCarousel babyRecord={babyRecord}></BabyCarousel>
              ) : (
                <Typography theme={wordtheme} id="modal-modal-description" variant="h5" component="h2" sx={{ mb: '20px', fontWeight: 'bold' }}>
                  아이의 오늘을 <br /> 기록해주세요
                </Typography>
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default RecordBaby;
