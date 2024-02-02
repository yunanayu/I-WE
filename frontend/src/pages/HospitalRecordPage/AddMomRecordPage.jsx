import { Box, Typography } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
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
import FileUpload from '../../components/HospitalRecord/FileUpload';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import { ThemeProvider, createTheme } from '@mui/system';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useLocation, useNavigate } from 'react-router-dom';

const AddMomRecordPage = () => {
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

  const navigate = useNavigate()

  const location = useLocation()
  const selectedDay = location.state.selectedDay

  const [value, setValue] = React.useState('mother');

  const today = dayjs(moment(new Date()).format('YYYY-MM-DD'))  // 추후에 선택한 날짜로 변경하기
  const [state, setState] = useState({
    // checkUpDate : '',
    selectDay : selectedDay,
    title : '',
    checkupItem :'',
    hospitalName:'',
    doctorName:'',
    checkupResult: '', // 새로운 속성 추가
    doctorOpinion: '',
    target : '',
    // ------------------
    momWeight:'',
    babyName : '',
    babyWeight:'',
    babyHeight:'',
    babyDiameter:'',
  })
  console.log(state);
    // useEffect(() => {
    //   console.log(' 렌더링!')
    // }, [state])


    const submit = () => {
      axios({
        method:'post',
        url : `api/hospital/create`,
        data:{
          target : state.target,  // baby or mom
          // targetNum 수정하기
          targetNum : 1,  // pk
          title : state.title,   // 간단 정보
          hospitalName : state.hospitalName,  //
          doctor : state.doctorName,
          hospitalDate : state.selectDay,
          content : state.checkupItem,
          result : state.checkupResult,
          comment : state.doctorOpinion,

          }
      })
      .then((res)=>{
        console.log(res)
        window.alert("등록하였습니다.!")
        navigate('/hospitalrecord')
      })
      .catch((err)=>{
        console.log(err)
        window.alert('등록실패 ㅋㅎㅋㅎ')
      })
    //   await axios({

    //   })
    }

    const theme = createTheme({
      palette: {
        primary: '#FBBBB8',
      },
    });
  
  const handleChange = (event) => {
    setState({...state, [event.target.name] : event.target.value})
    console.log(event.target.value)
  };

  // console.log(state.selectDay);
  // console.log(state.hospitalName);
  // console.log(state.doctorName);
  // console.log(state.babyName);
  
  return (
    <Container sx={{pt:10,  border:1,}}>
      <Box sx={{display:'flex', pb:2}}>
        <Typography variant='h3'>검진 기록하기 </Typography>
        <HealingOutlinedIcon fontSize='large'/>
      </Box>
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">검진 대상</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="mother" control={<Radio />} label="엄마" name='target' onChange={handleChange} />
          <FormControlLabel value="baby" control={<Radio />} label="아기" name='target' onChange={handleChange}/>
        </RadioGroup>
      </FormControl>
      <Box sx={{display:'flex', width:'100%', pt:3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <DateCalendar onChange={(e) => setState({...state, checkUpDate : moment(e.$d).format('YYYY-MM-DD')})}/> */}
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="검진 날짜 선택"
              // value={moment(selectedDay)}
              value={today}
              onChange={(newValue) => {
                console.log(newValue)
                setState({...state, selectDay : moment(newValue.$d).format('YYYY-MM-DD')})
              }}
              sx={{
                width:'10%'
              }}
              />
          </DemoContainer>
        </LocalizationProvider>

        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={checkupList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="검진" />}
          onChange={(e)=>{
            console.log(e.target.innerText)
            setState({...state, checkupItem : e.target.innerText})
          }}
        /> */}
          <TextField
            id="outlined-controlled"
            name='title'
            label={state.title == '' ? '검진목적을 입력하세요' : '검진목적'}
            value={state.title == '' ? '' : state.title}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={vaccinList}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="접종" />}
          onChange={(e)=>{
            console.log(e.target.innerText)
            setState({...state, checkupItem : e.target.innerText})
          }}
        /> */}
      </Box>
      <Box>
        <Box sx={{display:'flex', pt:4}}>
          {/* <PregnantWomanIcon fontSize='large'/>
          <Typography variant='h4'>산모기록</Typography> */}
          <Typography variant='h4'>병원정보</Typography>
        </Box>
        <Box sx={{ display:'flex', pb:4, width:'100%', pt:5 }}>
          <TextField
            id="outlined-controlled"
            name='hospitalName'
            label={state.hospitalName == '' ? '병원이름을 입력하세요' : '병원이름'}
            value={state.hospitalName == '' ? '' : state.hospitalName}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />
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
        {/* <Box>
          <Typography variant='h5'>산모정보</Typography>
          <TextField
          label="몸무게"
          name='momWeight'
          id="outlined-start-adornment"
          type='number'
          onChange={handleChange}
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            endAdornment:<InputAdornment position="end">kg</InputAdornment>
          }}
        />
        </Box> */}
        <Box>
          <Typography variant='h5'>검진사진</Typography>
          <FileUpload />
        </Box>
        <Box>
          <Typography variant='h5'>검진결과</Typography>
          <TextField
          id="outlined-textarea"
          // label="검진결과"
          name='checkupResult'
          placeholder="검진결과"
          onChange={handleChange}
          multiline
          sx={{width:'100%'}}
          >

          </TextField>
        </Box>
      </Box>
      {/* ------------------------------------------------------------------------------------------------------- */}



{/* 
      <Box sx={{display:'flex', pb:5, pt:4}}>
        <ChildCareIcon fontSize='large'/>
        <Typography variant='h4'>태아기록</Typography>
      </Box>
      <Box>
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
            {babyList.map((baby) => {
              return(
              <MenuItem value={baby.name}>{baby.name}</MenuItem>
            )})}
          </Select>
        </FormControl>
      </Box>
      <Typography variant='h5'>태아 정보</Typography>
      <Box sx={{display:'flex', width:'100%'}}>
        <TextField
          label="키"
          name='babyHeight'
          type='number'
          id="outlined-start-adornment"
          sx={{ m: 1, width: '20%' }}
          placeholder='키'
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
          onChange={handleChange}
        />
        <TextField
          label="몸무게"
          name='babyWeight'
          type='number'
          id="outlined-start-adornment"
          sx={{ m: 1, width: '20%' }}
          placeholder='몸무게'
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          onChange={handleChange}
        />
        <TextField
          label="머리둘레"
          name='babyDiameter'
          type='number'
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
          <Typography variant='h5'>초음파 사진</Typography>
          <FileUpload />
        </Box> */}



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
          onChange={handleChange}
          sx={{width:'100%'}}
        />
      </Box>
      <Box sx={{display:'flex', justifyContent:'right'}}>
        <Button  variant="outlined" sx={{borderColor:'#FBBBB8', color:'#FBBBB8'}} onClick={submit}>
          등록하기
        </Button>
      </Box>
    </Container>

  );
};
export default AddMomRecordPage;