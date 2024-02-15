import React, { useEffect, useRef, useState } from "react";
import useMemberStore from "./../../stores/userStore";
import axios from "axios";
import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import moment from "moment";
import SendIcon from '@mui/icons-material/Send';
import { getBabyList } from "../../api/UserApi";


const UpdateChild = (props) => {
  const userNum = useMemberStore(state => state.userNum)
  const baby = props.baby
  const today = dayjs(new Date())
  const [value, setValue]= useState(today)
  const motherNum = baby.motherNum;
  const [status, setStatus] = useState(null)
  const [initState, setInitState] = useState({
    name: baby.name,
    gender: baby.gender,
    birth: baby.birth,
    pregnancyDate: baby.pregnancyDate,
    status: baby.status,
  });
  const handleChange = (event) => {
    setInitState({...initState, [event.target.name] : event.target.value})
  };
  const dateInputBefore = useRef()
  const dateInputAfter = useRef()

  useEffect(()=> {
    if (baby.status) {
      setValue(dayjs(baby.birth))
      setStatus('after')
    }
    else{
      setValue(dayjs(baby.pregnancyDate))
      setStatus('before')
    }
  }, [])

  const addChild = () => {
    axios({
      method: "put",
      url: `/api/baby/update`,
      data: {
        babyNum: baby.num,
        name: initState.name,
        gender: initState.gender,
        birth: initState.birth,
        pregnancyDate: initState.pregnancyDate,
        status: initState.status,
      },
    })
    .then((res) => {
      window.alert('수정되었습니다.')
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
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">아기 상태</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={status} 
        >
          <FormControlLabel
            onClick={() => {
              setStatus("before")
              setInitState({...initState, status: false, birth:''})
            }}
            value="before"
            control={<Radio />}
            label="임신"
            name="precnancy"
          />
          <FormControlLabel
            onClick={() => {
              setStatus("after")
              setInitState({...initState, status: true,})
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
        <TextField label='태명' value={baby.name} name='name' onChange={handleChange} />
      </div>
      <FormControl>
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">성별</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={initState.gender}
        >
          <div style={{display:'flex', justifyContent:'center', flexDirection: 'column'}}>
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="모름"
              name="gender"
              onChange={handleChange}
            />
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
          </div>
        </RadioGroup>
      <br />
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">임신 추측일</p>
          <DesktopDatePicker
            ref={dateInputBefore}
            label="임신 추측일"
            name="pregnancyDate"
            // value={baby.pregnancyDate? moment(baby.pregnancyDate) : today}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
              setInitState({...initState, pregnancyDate:moment(newValue.$d).format('YYYY-MM-DD')})}}
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
      }
      {status === 'after' &&
      <>
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">이름</p>
      <TextField label='이름' defaultValue={baby.name} name='name' onChange={handleChange} />
      <FormControl>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large', mt:'10px' }} id="demo-radio-buttons-group-label">성별</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={initState.gender}
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
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">출생일</p>
          <DesktopDatePicker
            ref={dateInputAfter}
            label="출생일"
            name="birth"
            // value={baby.birth ? moment(baby.birth) : today}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
              setInitState({...initState, birth:moment(newValue.$d).format('YYYY-MM-DD')})}}
          />
        </DemoContainer>
      </LocalizationProvider>
      </>
      }
      </Box>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" endIcon={<SendIcon />} onClick={addChild} style={{ backgroundColor: '#fcafaf' }}>
            수정하기
          </Button>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default UpdateChild;