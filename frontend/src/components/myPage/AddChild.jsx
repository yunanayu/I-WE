import React, { useRef, useState } from "react";
import useMemberStore from "./../../stores/userStore";
import axios from "axios";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import { getBabyList } from "../../api/UserApi";

const AddChild = () => {
  const userNum = useMemberStore(state => state.userNum)
  const BabyList = useMemberStore((state) => state.babyList);
  const motherNum = BabyList[0].motherNum;
  const [status, setStatus] = useState(null)
  const today = dayjs(moment(new Date()).format('YYYY-MM-DD'))
  const [initState, setInitState] = useState({
    name: "",
    gender: 0,
    birth: null,
    pregnancyDate: null,
    status: false,
  });
  const handleChange = (event) => {
    setInitState({...initState, [event.target.name] : event.target.value})
  };
  const dateInputBefore = useRef()
  const dateInputAfter = useRef()

  const addChild = () => {
    // if (initState.birth === null && initState.pregnancyDate) {
    //   if ()
    // }
    // console.log(initState)
    axios({
      method: "post",
      url: `/api/baby`,
      data: {
        motherNum: motherNum,
        name: initState.name,
        gender: initState.gender,
        birth: initState.birth,
        pregnancyDate: initState.pregnancyDate,
        status: initState.status,
      },
    })
    .then((res) => {
      // console.log(res)
      getBabyList(userNum)
    })
    .catch(err => console.log(err))
  };
  return (
    <Container>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          임신 여부
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            onClick={() => {
              setStatus("before")
              setInitState({...initState, status: false, pregnancyDate:'', birth:''})
            }}
            value="before"
            control={<Radio />}
            label="임신"
            name="precnancy"
          />
          <FormControlLabel
            onClick={() => {
              setStatus("after")
              setInitState({...initState, status: true, pregnancyDate:'', birth:''})
          }}
            value="after"
            control={<Radio />}
            label="출산"
            name="precnancy"
          />
        </RadioGroup>
      </FormControl>
      <Box>
      {status === 'before' &&
      <>
      <TextField label='이름' name='name' onChange={handleChange} />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          성별
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="모름"
            name="gender"
            onChange={handleChange}
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="남자"
            name="gender"
            onChange={handleChange}
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="여자"
            name="gender"
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            ref={dateInputBefore}
            label="임신 추측일"
            value={today}
            onChange={(newValue) => setInitState({...initState, pregnancyDate:moment(newValue.$d).format('YYYY-MM-DD')})}
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
      }
      {status === 'after' &&
      <>
      <TextField label='이름' name='name' onChange={handleChange} />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          성별
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="남자"
            name="gender"
            onChange={handleChange}
          />
          <FormControlLabel
            value="2"
            control={<Radio />}
            label="여자"
            name="gender"
            onChange={handleChange}
          />
        </RadioGroup>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            ref={dateInputAfter}
            label="출생일"
            value={today}
            onChange={(newValue) => setInitState({...initState, birth:moment(newValue.$d).format('YYYY-MM-DD')})}
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
      }
      </Box>
      <Button variant="contained" endIcon={<SendIcon />} onClick={addChild}>
        등록하기
      </Button>
    </Container>
  );
};

export default AddChild;
