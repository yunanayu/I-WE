import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import axios from 'axios';
import FileUpload from '../../components/HospitalRecord/FileUpload';

const AddBabyRecordPage = () => {
  const babyList = [
    {name:'서싸피'},
    {name:'이싸피'},
    {name:'박싸피'},
    {name:'정싸피'},
    {name:'전싸피'},
    {name:'최사피'},
  ]

  const checkupList = [
    { label:'IST'},
    { label:'NIPT'},
    { label:'융모막검사'},
    ]
  const vaccinList = [
    {label:'인플루엔자'},
    {label:'파상풍, 디프테리아,및 백일 기침 (백일해)'},
    {label:'냠냠'},
  ] 

  const today = dayjs(moment(new Date()).format('YYYY-MM-DD'))  // 추후에 선택한 날짜로 변경하기
  const initState = {
    // checkUpDate : '',
    selectDay : moment(new Date()).format('YYYY-MM-DD'),
    checkupItem :'',
    hospitalName:'',
    doctorName:'',
    momWeight:'',
    babyName : '',
    babyWeight:'',
    babyHeight:'',
    babyDiameter:'',

  }
  const [state, setState] = useState({...initState})


  
  const handleChange = (event) => {
    setState({...state, [event.target.name] : event.target.value})
    console.log(event.target.value)
  };

  // console.log(state.selectDay);
  // console.log(state.hospitalName);
  // console.log(state.doctorName);
  // console.log(state.babyName);
  
  return (
    <Container sx={{pt:10}}>
      <Typography variant='h3'>아가 기록페이지</Typography>
      <Box sx={{display:'flex', width:'100%', pt:3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <DateCalendar onChange={(e) => setState({...state, checkUpDate : moment(e.$d).format('YYYY-MM-DD')})}/> */}
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="검진 날짜 선택"
              value={today}
              onChange={(newValue) => {
                setState({...state, selectDay : moment(newValue.$d).format('YYYY-MM-DD')})
              }}
              sx={{
                width:'10%'
              }}
              />
          </DemoContainer>
        </LocalizationProvider>
        {/* <TextField
          id="outlined-read-only-input"
          label=" 검진 날짜"
          placeholder={state.selectDay == '' ? '검진날짜를 선택해주세요':state.selectDay}
          value={state.selectDay}
          InputProps={{
            readOnly: true,
          }}
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={checkupList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="검진" />}
          onChange={(e)=>console.log(e.target.innerText)}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={vaccinList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="접종" />}
          onChange={(e)=>console.log(e.target.innerText)}
        />
      </Box>
      <Box>
        <Box sx={{display:'flex', pb:5, pt:4}}>
          <ChildCareIcon fontSize='large'/>
          <Typography variant='h4'>아가기록</Typography>
        </Box>
        <Box sx={{pb:3}}>
          <Typography variant='h5'>아기 이름</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">태명?이름?</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name='babyName'
              value={state.babyName} 
              label="아기 선택하기"
              onChange={handleChange}
            >
              {/* <MenuItem value=""><em>None</em></MenuItem> */}
              {babyList.map((baby) => {
                return(
                <MenuItem value={baby.name}>{baby.name}</MenuItem>
              )})}
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
        </Box>


        <Typography variant='h5'>병원정보</Typography>
        <Box sx={{ display:'flex', pb:4, width:'100%', pt:5 }}>
          <TextField
            id="outlined-controlled"
            name='hospitalName'
            label={state.hospitalName == '' ? '병원이름을 입력하세요' : '병원이름'}
            value={state.hospitalName == '' ? '' : state.hospitalName}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />

          {/* <TextField
            required
            name='hospitalName'
            id="outlined-required"
            label="병원이름"
            placeholder={state.hospitalName == '' ? '병원이름을 입력하세요' : ''}
            value={state.hospitalName == '' ? '' : state.hospitalName}
            onChange={handleChange}
          /> */}

          {/* <Typography variant='h5'>담당의사</Typography> */}

          <TextField 
            id="outlined-basic" 
            name='doctorName'
            variant="outlined" 
            label={state.doctorName == '' ? '담당의사를 입력하세요' : '담당의사'}
            value={state.doctorName == '' ? '' : state.doctorName}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />
        </Box>


        <Typography variant='h5'>아기 정보</Typography>
        <Box sx={{display:'flex', width:'100%'}}>
          {/* <Typography>키</Typography> */}
          <TextField
            label="키"
            name='babyHeight'
            id="outlined-start-adornment"
            sx={{ m: 1, width: '20%' }}
            placeholder='키'
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            onChange={handleChange}
          />
          {/* <Typography>몸무게</Typography> */}
          <TextField
            label="몸무게"
            name='babyWeight'
            id="outlined-start-adornment"
            sx={{ m: 1, width: '20%' }}
            placeholder='몸무게'
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
            onChange={handleChange}
          />
          {/* <Typography>머리둘레</Typography> */}
          <TextField
            label="머리둘레"
            name='babyDiameter'
            id="outlined-start-adornment"
            sx={{ m: 1, width: '20%' }}
            placeholder='머리둘레'
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant='h5'>검진사진</Typography>
          <FileUpload />
        </Box>
        <Box>
          <Typography variant='h5'>검진결과</Typography>
          <TextField
          id="outlined-textarea"
          // label="검진결과"
          name='doctorOpinion'
          placeholder="검진결과"
          multiline
          sx={{width:'100%'}}
          >

          </TextField>
        </Box>
      </Box>
      {/* ------------------------------------------------------------------------------------------------------- */}







      <Box sx={{pb:5}}>
        <Box sx={{display:'flex', pb:3, pt:4}}>
          <LocalHospitalIcon fontSize='large'/>
          <Typography variant='h4'>의사소견</Typography>
        </Box>
      <TextField
          id="outlined-textarea"
          label="의사소견"
          name='doctorOpinion'
          placeholder="의사소견"
          multiline
          sx={{width:'100%'}}
        />
      </Box>
      <Box sx={{display:'flex', justifyContent:'right'}}>
        <Button  variant="outlined" >
          등록하기
        </Button>
      </Box>
    </Container>
  );
};
export default AddBabyRecordPage;