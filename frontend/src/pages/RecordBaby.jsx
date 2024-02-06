import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
  WeightChart,
  HeightChart,
  HeadChart,
} from "../components/chart/BabyChart";
import { BabyForm } from "./WeightForm";
import { BabyCarousel } from "./BabyCarousel";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
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
  return (
    <>
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography fontSize={28}> 통계 문구 </Typography>
      </Box>
    </>
  );
}

function ButtonField(props) {
  const { setOpen, id, disabled, InputProps: { ref } = {} } = props;

  return (
    <IconButton
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      onClick={() => setOpen?.((prev) => !prev)}
    >
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
  const status = useMemberStore((state) => state.babyList[0].targetTime).substr(0,1);
  const babyName = useMemberStore((state) => state.babyList[0].name);

  
  const [born, setBorn] = useState(false);
  const [babyRecord, setBabyRecord] = useState(null);
  const [recentRecord, setRecentRecord] = useState();

  useEffect(() => {
    if (status === 'A') {
      setBorn(true);
    } else {
      setBorn(false);
    }
  }, [status]);

  useEffect(() => {
    const init = async () => {
      await axios
        .get(`/api/babyRecord/${babyNum}`)
        .then((response) => {
          setBabyRecord(response.data);
          const recent = response.data[response.data.length-1];
          setRecentRecord(recent);
        })
        .catch((error) => {
          console.log("GET BABY RECORD ERROR\n" + error);
        });
    };
    init();
  }, [babyNum]);

 
  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter, background: "skyblue" }}>
        <Box sx={{ ...setCenter, m: 3 }}>
          {status === "A" ? (
            <Typography fontSize={34}>D+{targetTime}</Typography>
          ) : (
            <>
              <Typography fontSize={34}>{targetTime} 주차</Typography>
            </>
          )}
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          {<Info born={born} recentRecord={recentRecord} babyName={babyName} targetTime={targetTime}/>}
        </Box>
        <Box maxWidth="md" sx={{ ...setCenter }}>
          <Stack
            direction={"row"}
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
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
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ko"
              >
                <Box sx={{ ...setCenter, ...style }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={setCenter}
                  >
                    <Stack direction={"row"} spacing={2}>
                      {dayjs(date).format("YYYY-MM-DD")}
                      <ButtonDatePicker
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        format={"YYYY-MM-DD"}
                      />
                      {console.log(date)}
                    </Stack>
                  </Typography>
                  {<BabyForm data={babyRecord} recentData={recentRecord} dateSelected={date} babyNum={babyNum} isBorn={born}/>}
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
                Text in a modal
              </Typography>
              <BabyCarousel></BabyCarousel>
            </Box>
          </Modal>
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          <WeightChart />
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        > 
          <HeightChart />
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          <HeadChart />
        </Box>
      </Container>
    </>
  );
}

export default RecordBaby;
