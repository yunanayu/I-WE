import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMemberStore from "../../stores/userStore";
import moment from "moment";
import { Typography, Box, CardContent, Card } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import heart2 from '../../images/heart2.png';

const theme = createTheme({
  typography: {
    fontFamily: "Nanum Gothic, sans-serif",
  },
});

export default function InfoMain() {
  const babyList = useMemberStore((state) => state.babyList);
  // date = `A${months}`의 형태
  const [date, setDate] = useState(0); // 선택한 tab의 값
  const handleChange = (event, value) => {
    setDate(value);
  };
  // 각각의 정보 (Array형태)
  const [babybodyInfo, setBabybodyInfo] = useState([]);
  const [mombodyInfo, setMombodyInfo] = useState([]);
  const [babysugInfo, setBabysugInfo] = useState([]);
  const [momsugInfo, setMomsugInfo] = useState([]);
  const parentType = useMemberStore((state) => state.parentType);
  const [babyIndex, setBabyIndex] = useState(0);
  const [babyNum, setBabyNum] = useState(
    useMemberStore((state) => state.babyList[babyIndex].num)
  );
  const [status, setStatus] = useState(
    useMemberStore((state) => state.babyList[babyIndex].targetTime).substr(0, 1)
  );

  // 더 알아보기 누르면 나오는 창

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("more");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = babyList;
        const pregnancyDate = moment(info[babyIndex].pregnancyDate, "YYYY-MM-DD");
        const birthDate = moment(info[babyIndex].birth, "YYYY-MM-DD");
        const today = moment();
        const pregnancydays = today.diff(pregnancyDate, "days");
        const birthdays = today.diff(birthDate, "days");
        const pregnancyweeks = Math.floor(pregnancydays / 7 + 1);
        const birthmonths = Math.floor(birthdays / 30);
        console.log(pregnancyweeks);
        console.log(birthmonths);
        if (info[babyIndex].pregnancyDate === null) {
          setDate(`A${birthmonths}`);
        } else if (info[babyIndex].birth === null) {
          setDate(`B${pregnancyweeks}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [babyList, babyIndex]);

  // 선택한 탭에 따라 해당 정보를 가져오는 함수
  // 아기 신체
  const getBabyBodyInfo = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      return (
        <Box key={week}>
          {babybodyInfo.map((info, i) => (
            <div key={i}>
              - {info.content}
              <br />
              <br />
            </div>
          ))}
        </Box>
      );
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      return (
        <Box key={month}>
          {babybodyInfo.map((info, i) => (
            <div key={i}>
              - {info.content}
              <br />
              <br />
            </div>
          ))}
        </Box>
      );
    } else {
      return null;
    }
  };

  const getBabyBodyInfothree = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      const selectedBabybodyInfo = babybodyInfo
        .filter((info, i) => i < 3) // 최대 3개의 요소만 추출
        .map((info, i) => (
          <div key={i}>
            <br />- {info.content}
            <br />
          </div>
        ));
      return <Box key={week}>{selectedBabybodyInfo}</Box>;
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      const selectedBabybodyInfo = babybodyInfo
        .filter((info, i) => i < 3) // 최대 3개의 요소만 추출
        .map((info, i) => (
          <div key={i}>
            <br />- {info.content}
            <br />
          </div>
        ));
      return <Box key={month}>{selectedBabybodyInfo}</Box>;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const babybodyinforesponse = await axios({
          method: "get",
          url: `/api/info/baby/p/${date}`,
        });
        const babybodyinfodata = babybodyinforesponse.data;
        console.log(babybodyinfodata);

        setBabybodyInfo(babybodyinfodata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date]);

  // 엄마 신체
  const getMomBodyInfo = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      return (
        <Box key={week}>
          {mombodyInfo.map((info, i) => (
            <div key={i}>
              <br />- {info.content}
              <br />
            </div>
          ))}
        </Box>
      );
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      return (
        <Box key={month}>
          {mombodyInfo.map((info, i) => (
            <div key={i}>
              <br />- {info.content}
              <br />
            </div>
          ))}
        </Box>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mombodyinforesponse = await axios({
          method: "get",
          url: `/api/info/mother/p/${date}`,
        });
        const mombodyinfodata = mombodyinforesponse.data;
        setMombodyInfo(mombodyinfodata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date]);

  const getMomBodyInfothree = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      const selectedMombodyInfo = mombodyInfo
        .filter((info, i) => i < 3) // 최대 3개의 요소만 추출
        .map((info, i) => (
          <div key={i}>
            <br />- {info.content}
            <br />
          </div>
        ));
      return <Box key={week}>{selectedMombodyInfo}</Box>;
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      const selectedMombodyInfo = mombodyInfo
        .filter((info, i) => i < 3) // 최대 3개의 요소만 추출
        .map((info, i) => (
          <div key={i}>
            <br />- {info.content}
            <br />
          </div>
        ));
      return <Box key={month}>{selectedMombodyInfo}</Box>;
    } else {
      return null;
    }
  };

  // // 아기 및 엄마 권유

  // // 아기 권유
  const getBabySugInfo = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      return (
        <Box key={week}>
          {babysugInfo.map((info, i) => (
            <div key={i}>
              <br />- {info.content}
              <br />
            </div>
          ))}
        </Box>
      );
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      return (
        <Box key={month}>
          {babysugInfo.map((info, i) => (
            <div key={i}>
              <br />- {info.content}
              <br />
            </div>
          ))}
        </Box>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const babysuginforesponse = await axios({
          method: "get",
          url: `/api/info/baby/r/${date}`,
        });
        const babysuginfodata = babysuginforesponse.data;
        setBabysugInfo(babysuginfodata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date]);

  // 엄마 권유
  const getMomSugInfo = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      return (
        <Box key={week}>
          {momsugInfo.map((info, i) => (
            <div key={i}>
              <br />- {info.content}
              <br />
            </div>
          ))}
        </Box>
      );
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      return (
        <Box key={month}>
          {momsugInfo.map((info, i) => (
            <div key={i}>
              <br />- {info.content}
              <br />
            </div>
          ))}
        </Box>
      );
    } else {
      return null;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const momsuginforesponse = await axios({
          method: "get",
          url: `/api/info/mother/r/${date}`,
        });
        const momsuginfodata = momsuginforesponse.data;
        setMomsugInfo(momsuginfodata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [date]);

  const getMomSugInfothree = () => {
    if (date === 0) {
      // 0 주 탭 선택 시 표시할 정보
      return <Box>{/* 0 주에 해당하는 정보 표시 */}</Box>;
    } else if (typeof date === "string" && date.startsWith("B")) {
      const week = parseInt(date.substring(1));
      const selectedMomsugInfo = momsugInfo
        .filter((info, i) => i < 3) // 최대 3개의 요소만 추출
        .map((info, i) => (
          <div key={i}>
            <br />- {info.content}
            <br />
          </div>
        ));
      return <Box key={week}>{selectedMomsugInfo}</Box>;
    } else if (typeof date === "string" && date.startsWith("A")) {
      const month = parseInt(date.substring(1));
      const selectedMomsugInfo = momsugInfo
        .filter((info, i) => i < 3) // 최대 3개의 요소만 추출
        .map((info, i) => (
          <div key={i}>
            <br />- {info.content}
            <br />
          </div>
        ));
      return <Box key={month}>{selectedMomsugInfo}</Box>;
    } else {
      return null;
    }
  };

  const babyChange = (e) => {
    // console.log(babyList.findIndex((baby) => baby.num + "" === e.target.value));
    setBabyIndex(
      babyList.findIndex((baby) => baby.num + "" === e.target.value)
    );
    setBabyNum(e.target.value);
    setStatus(
      babyList[
        babyList.findIndex((baby) => baby.num + "" === e.target.value)
      ].targetTime.substr(0, 1)
    );
  };

  return (
    <>
      
        <Box sx={{textAlign: 'center', justifyContent: 'center'}}>
          <FormControl >
            <RadioGroup
              overlay
              name="member"
              orientation="horizontal"
              sx={{ display:'flex',justifyContent:'center', gap: 2 }}
              onChange={babyChange}
              value={babyNum}
            >
              {babyList.map((baby) => (
                <Sheet
                  component="label"
                  key={baby.num}
                  variant="outlined"
                  sx={{
                    p: 2,
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
                    sx={{
                      height:'0px',
                      mb: 2,
                    }}
                  />
                  <Typography level="body-sm" sx={{ mt: 1 }}>
                    {baby.name}
                  </Typography>
                </Sheet>
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <ThemeProvider
        theme={theme}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            opacity: "80%",
            bgcolor: "#FBBBB8",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={date}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            textColor="inherit"
          >
            <Box>
              <Tab label="0 주" value={0} />
            </Box>
            {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
              <Tab key={week} label={`${week}주`} value={`B${week}`} />
            ))}
            {Array.from({ length: 25 }, (_, i) => i).map((month) => (
              <Tab key={month} label={`${month}개월`} value={`A${month}`} />
            ))}
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            mt: "20px",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: "20px" }}
          >
            이 시기에 아이는요!
            <img src={heart2} width="40" height="30" alt="하트 이미지" />
          </Typography>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "90%",
              padding: "15px 15px 0px 15px",
            }}
          >
            {getBabyBodyInfothree()}
            <CardContent sx={{ padding: " 5px 10px 5px 10px " }}>
              <Box style={{ textAlign: "right" }}>
                <Button
                  onClick={handleClickOpen("babymore")}
                  size="small"
                  style={{ backgroundColor: "#FBBBB8", color: "white" }}
                >
                  궁금해요!
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={scroll}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  {scroll === "babymore" && (
                    <DialogTitle id="scroll-dialog-title">
                      아이 정보 더 알아보기
                    </DialogTitle>
                  )}
                  {scroll === "mommore" && (
                    <DialogTitle id="scroll-dialog-title">
                      엄마 정보 더알아보기
                    </DialogTitle>
                  )}
                  {scroll === "infomore" && (
                    <DialogTitle id="scroll-dialog-title">
                      정보 더알아보기
                    </DialogTitle>
                  )}

                  <DialogContent dividers={scroll === "babymore"}>
                    <DialogContentText
                      id="scroll-dialog-description"
                      tabIndex={-1}
                    >
                      {scroll === "babymore" && getBabyBodyInfo()}
                      {scroll === "mommore" && getMomBodyInfo()}
                      {scroll === "infomore" && (
                        <React.Fragment>
                          {getMomSugInfo()}
                          {getBabySugInfo()}
                        </React.Fragment>
                      )}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* 아빠는 보지 못하도록 */}
        {parentType !== "FATHER" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              mt: "20px",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: "20px" }}
            >
              이 시기에 엄마는요!
              <img src={heart2} width="40" height="30" alt="하트 이미지" />
            </Typography>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "90%",
                padding: "15px 15px 0px 15px",
              }}
            >
              {getMomBodyInfothree()}
              <CardContent>
                <Box style={{ textAlign: "right" }}>
                  <Button
                    onClick={handleClickOpen("mommore")}
                    size="small"
                    style={{ backgroundColor: "#FBBBB8", color: "white" }}
                  >
                    궁금해요!
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            mt: "20px",
            padding: "0px 0 40px",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: "20px" }}
          >
            아이를 위해서는요!
            <img src={heart2} width="40" height="30" alt="하트 이미지" />
          </Typography>
          <Card
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: "90%",
              padding: "15px 15px 0px 15px",
            }}
          >
            {getMomSugInfothree()}
            <CardContent>
              <Box style={{ textAlign: "right" }}>
                <Button
                  onClick={handleClickOpen("infomore")}
                  size="small"
                  style={{ backgroundColor: "#FBBBB8", color: "white" }}
                >
                  궁금해요!
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    </>
  );
}
