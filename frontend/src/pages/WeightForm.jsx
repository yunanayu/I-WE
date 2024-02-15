import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import useMemberStore from "../stores/userStore";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import { files } from "@storybook/addon-knobs";

dayjs.locale("ko");

function MomForm(props) {
  const data = props.data;
  const [recent, setRecent] = useState();
  const today = useMemo(() => new Date(), [recent]); // Memoize today to avoid unnecessary re-renders
  const [weight, setWeight] = useState();
  const [update, setUpdate] = useState(false);
  const motherNum = useMemberStore((state) => state.babyList[0].motherNum);

  const changeWeight = (e) => {
    setWeight(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (update) {
      const data = {
        num: recent.num,
        weight: weight,
        recordDate: recent.recordDate,
      };
      const put = async () => {
        await axios
          .put(`/api/motherRecord/update`, data)
          .then((response) => {
            console.log("UPDATE OK\n" + response);
          })
          .catch((error) => {
            console.log("UPDATE FAIL\n" + error);
          });
      };
      put();
      props.recentUpdate(data);
    } else {
      let recent;
      let todayDate = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
      // console.log(todayDate);
      let data = {
        motherNum: motherNum, // 계정정보에서 motherNum 받아오기
        weight: weight,
        recordDate: todayDate,
      };
      const post = async () =>
        await axios
          .post("/api/motherRecord/create", data)
          .then((response) => {
            console.log("POST OK\n" + JSON.stringify(response.data));
            recent = response.data;
            props.onPostSuccess(recent);
          })
          .catch((error) => {
            console.log("POST FAIL\n" + error);
          });
      post();
    }
  };

  useEffect(() => {
    if (data) {
      setRecent(data);
    }
  }, [data]);

  useEffect(() => {
    if (recent) {
      // console.log("최근 데이터 " + JSON.stringify(recent));
      const recentDate = new Date(recent.recordDate);
      if (recentDate.getDay() === today.getDay() && recentDate.getMonth() === today.getMonth() && recentDate.getFullYear() === today.getFullYear()) {
        setUpdate(true);
        setWeight(recent.weight);
      }
    }
  }, [recent, today]);

  return (
    <>
      <Box component="form" sx={{ mt: 3, textAlign: "center" }} onSubmit={submitHandler}>
        <Typography style={{ color: "black", fontWeight: "bold", fontSize: "large", marginBottom: 2 }}> 오늘의 체중은? </Typography>
        <Stack direction={"row"} spacing={2} sx={{ textAlign: "center", justifyContent: "center", mb: 2 }}>
          <TextField
            sx={{ width: "50%" }}
            name="momweight"
            fullWidth
            label="kg"
            type="number"
            inputProps={{ step: "0.1" }}
            value={weight || ""}
            onChange={changeWeight}
          ></TextField>

          <Button type="submit" variant="contained" sx={{ mb: 2, width: "20%" }}>
            기록
          </Button>
        </Stack>
      </Box>
    </>
  );
}

const BabyForm = React.forwardRef((props, ref) => {
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
    width: "66vw",
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [data, setData] = useState();
  const [dateSelected, setDateSelected] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [circumference, setCircumference] = useState();
  const [recentData, setRecentData] = useState();
  const [update, setUpdate] = useState(false);
  // 해당 날짜에 기록(파일) 있으면 받아오기
  const [file, setFile] = useState();
  const [isBorn, setIsBorn] = useState(false);
  const today = new Date();

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
    console.log(Array.from(e.target.files));
  };

  const changeWeight = (e) => {
    setWeight(e.target.value);
  };
  const changeHeight = (e) => {
    setHeight(e.target.value);
  };
  const changeCircumference = (e) => {
    setCircumference(e.target.value);
  };

  const uploadFile = (e) => {
    const formData = new FormData();

    file.map((file) => {
      formData.append("files", file);
    });

    console.log(Array.from(formData));
  };

  useEffect(() => {
    if (props.isBorn) {
      setIsBorn(true);
    }
  }, [props.isBorn]);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
      setRecentData(props.recentData);
    }
    if (props.dateSelected) {
      setDateSelected(props.dateSelected);
      // console.log("아기기록 !!!!" + props.data);
      // console.log("선택 날짜 !!!! " + props.dateSelected);
    }
  }, [props.data, props.dateSelected, props.recentData]);

  useEffect(() => {
    if (recentData) {
      // console.log("최근 데이터 " + JSON.stringify(recent));
      const recentDate = new Date(recentData.recordDate);
      if (recentDate.getDay() === today.getDay() && recentDate.getMonth() === today.getMonth() && recentDate.getFullYear() === today.getFullYear()) {
        setUpdate(true);
        setWeight(recentData.weight);
        setHeight(recentData.height);
        setCircumference(recentData.circumference);
        setFile(recentData.image);
        setUpdate(true);
      }
    }
  }, [recentData]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (update) {
      console.log(dateSelected);
      let data = new FormData();
      if (file) {
        const obj = {
          "num": recentData.num,
          "babyNum": props.babyNum,
          "height": height,
          "weight": weight,
          "circumference": circumference,
          "recordDate": recentData.recordDate,
        };
        const json = JSON.stringify(obj);
        const blob = new Blob([json], {
          type: 'application/json'
        })
        data.append("dto", blob);
        data.append("files", file);
      } else {
        const obj = {
          "num": recentData.num,
          "babyNum": props.babyNum,
          "height": height,
          "weight": weight,
          "circumference": circumference,
          "recordDate": recentData.recordDate,
        };
        const json = JSON.stringify(obj);
        const blob = new Blob([json], {
          type: 'application/json'
        })
        data.append("dto", blob);
      }
      const put = async () => {
        await axios
          .put("/api/babyRecord/update", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("UPDATE OK\n" + response);
            props.onSubmit(response.data);

          })
          .catch((error) => {
            console.log("UPDATE FAIL\n" + error);
          });
      };
      put();
    } else {
      let date = dateSelected.year() + "-" + ("0" + (dateSelected.month() + 1)).slice(-2) + "-" + ("0" + dateSelected.date()).slice(-2);
      console.log(date);
      let data = new FormData();
      if (file) {
        const obj = {
          "babyNum": props.babyNum,
          "height": height,
          "weight": weight,
          "circumference": circumference,
          "recordDate": date,
        };
        const json = JSON.stringify(obj);
        const blob = new Blob([json], {
          type: 'application/json'
        })
        data.append("dto", blob);
        file.map((file) => {
          data.append("files", file);
        })
        console.log(data);
      } else {
        const obj = {
          "babyNum": props.babyNum,
          "height": height,
          "weight": weight,
          "circumference": circumference,
         "recordDate": date,
        };
        const json = JSON.stringify(obj);
        const blob = new Blob([json], {
          type: 'application/json'
        })
        data.append("dto", blob);
        data.append("files", []);
      }
      const post = async () => {
        await axios.post("/api/babyRecord/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            console.log("POST OK\n" + JSON.stringify(response));
            props.onSubmit(response.data);
          })
          .catch((error) => {
            console.log("POST FAIL\n" + error);
          });
      };
      post();
    }
  };

  return (
    <div>
      <Box component="form" onSubmit={submitHandler}>
        <Box
          maxWidth="sm"
          sx={{
            ...commonStyles,
            ...setCenter,
            borderRadius: 3,
            width: "40vw",
          }}
        >
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "medium" }}> 몸무게 </Typography>
            <TextField
              name="babyweight"
              fullWidth
              label="kg"
              type="number"
              inputProps={{ step: "0.1" }}
              value={weight || ""}
              onChange={changeWeight}
            ></TextField>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "medium" }}> 키 </Typography>
            <TextField
              name="babyheight"
              fullWidth
              label="cm"
              type="number"
              inputProps={{ step: "0.1" }}
              value={height || ""}
              onChange={changeHeight}
            ></TextField>
            <Typography style={{ color: "black", fontWeight: "bold", fontSize: "medium" }}> 머리둘레 </Typography>
            <TextField
              name="babyhead"
              fullWidth
              label="nm"
              type="number"
              inputProps={{ step: "0.1" }}
              value={circumference || ""}
              onChange={changeCircumference}
            ></TextField>
          </Box>
          {isBorn ? (
            <Box
              maxWidth="sm"
              margin={1}
              sx={{
                ...commonStyles,
                ...setCenter,
                borderRadius: 3,
                width: "40vw",
              }}
            >
              <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} fullWidth>
                오늘의 사진
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Box>
          ) : (
            <Box
              maxWidth="sm"
              margin={1}
              sx={{
                ...commonStyles,
                ...setCenter,
                borderRadius: 3,
                width: "40vw",
              }}
            >
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth>
                초음파 사진
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Box>
          )}
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: "25vw" }}>
            기록하기
          </Button>
        </Box>
      </Box>
    </div>
  );
});

export { MomForm, BabyForm };
