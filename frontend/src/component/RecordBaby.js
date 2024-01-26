import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ChangeChart, WeeklyWeightChart } from "./MomWeightChart";
import { Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "dayjs/locale/ko";

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
function Info() {
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

// props 설정, form 전송 객체, 차트 데이터 입력 필요
function RecordBaby() {
  const [picture, setPicture] = useState(false);
  const pictureOpen = () => setPicture(true);
  const pictureClose = () => setPicture(false);
  const [record, setRecord] = useState(false);
  const recordOpen = () => setRecord(true);
  const recordClose = () => setRecord(false);

  return (
    <>
      <Container maxWidth="lg" sx={{ ...setCenter, background: "skyblue" }}>
        <Box sx={{ ...setCenter, m: 3 }}>
          <Typography fontSize={34}>{pregWeek} 주차</Typography>
          <Typography fontSize={24} color={"hotpink"}>
            {pregWeek} D-???
          </Typography>
        </Box>
        <Box
          maxWidth="md"
          sx={{ ...commonStyles, ...setCenter, borderRadius: 3 }}
        >
          {<Info />}
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
              오늘의 OO이 기록하기
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
              OO이 사진보기
            </Button>
          </Stack>
          {/* 기록용 모달 */}
          <Modal
            open={record}
            onClose={recordClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <LocalizationProvider  izationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={setCenter}
                >
                  <DatePicker />
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </LocalizationProvider>
          </Modal>

          {/* 사진용 모달 */}
          <Modal
            open={picture}
            onClose={pictureClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
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

export default RecordBaby;
