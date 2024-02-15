import React, { useRef, useState } from "react";
import useMemberStore from "./../../stores/userStore";
import axios from "axios";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import { getBabyList } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";
import 'dayjs/locale/ko'


const AddChild = (props) => {
  const navigate = useNavigate()
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
      window.alert('등록되었습니다!')
      getBabyList(userNum)
      props.setOpen(false)
    })
    .catch(err => console.log(err))
  };
  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FormControl>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">아기 상태</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            onClick={() => {
              setStatus("before")
              setInitState({...initState, status: false, pregnancyDate:moment(new Date()).format('YYYY-MM-DD'), birth:''})
            }}
            value="before"
            control={<Radio />}
            label="임신"
            name="precnancy"
          />
          <FormControlLabel
            onClick={() => {
              setStatus("after")
              setInitState({...initState, status: true, pregnancyDate:'', birth:moment(new Date()).format('YYYY-MM-DD')})
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
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">이름</p>
      <div>
        <TextField label='이름' name='name' onChange={handleChange} />
      </div>
      <FormControl>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">성별</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <div style={{display:'flex', flexDirection:'column'}}>
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="모름"
            name="gender"
            onChange={handleChange}
          />
          <div style={{display:'flex', justifyContent:'space-between'}} >
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
          </div>
          
          </div>
        </RadioGroup>
      </FormControl>
      <div style={{ mt:'10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <br />
          <DemoContainer components={['DatePicker']} >
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">임신 추측일</p>
            <DesktopDatePicker
              ref={dateInputBefore}
              label="임신 추측일"
              value={today}
              onChange={(newValue) => setInitState({...initState, pregnancyDate:moment(newValue.$d).format('YYYY-MM-DD')})}
              disableFuture 
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      </>
      }
      {status === 'after' &&
      <>
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">이름</p>
      <div>
        <TextField label='이름' name='name' onChange={handleChange} />
      </div>
      <FormControl>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">성별</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <div style={{display:'flex', justifyContent:'space-between'}}>
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
          </div>
        </RadioGroup>
        <br />
      </FormControl>
      <div style={{ mt:'10px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DemoContainer components={['DatePicker']}>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">출생일</p>
          <DesktopDatePicker
            ref={dateInputAfter}
            label="출생일"
            value={today}
            onChange={(newValue) => setInitState({...initState,  birth:moment(newValue.$d).format('YYYY-MM-DD')})}
            disableFuture 
          />
        </DemoContainer>
      </LocalizationProvider>
      </div>
      </>
      }
      </Box>
      <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={addChild} style={{ backgroundColor: '#fcafaf'}}>
            등록하기
          </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddChild;
