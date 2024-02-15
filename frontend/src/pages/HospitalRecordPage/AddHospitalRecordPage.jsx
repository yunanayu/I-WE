import { Box, Typography } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from "dayjs";
import 'dayjs/locale/ko'
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
import { Option, Select } from '@mui/joy';
import useMemberStore from '../../stores/userStore';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import FeedIcon from '@mui/icons-material/Feed';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DescriptionIcon from '@mui/icons-material/Description';
import FaceIcon from '@mui/icons-material/Face';
const AddMomRecordPage = () => {
  const babyList = useMemberStore(state => state.babyList)
  const motherNum = babyList[0].motherNum 
  const navigate = useNavigate()
  const [target, setTarget] = useState('')
  const location = useLocation()
  const selectedDay = location.state.selectedDay
  const bornBabyList = babyList.filter((baby) => baby.status);
  const today = dayjs(moment(new Date()).format('YYYY-MM-DD'))  // 추후에 선택한 날짜로 변경하기
  const [state, setState] = useState({
    selectDay : selectedDay,
    title : '',
    checkupItem :'',
    hospitalName:'',
    doctorName:'',
    checkupResult: '',
    doctorOpinion: '',
    target : '',
    targetNum : 0,
  })
    const submit = () => {
      console.log(state.targetNum)
      axios({
        method:'post',
        url : `api/hospital/create`,
        data:{
          target : state.target,  // baby or mother
          // targetNum 수정하기
          targetNum : state.targetNum,  // pk
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
        window.alert("등록하였습니다.")
        navigate('/hospitalrecord')
      })
      .catch((err)=>{
        console.log(err)
        window.alert('등록실패')
      })
    }
  
  const handleChange = (event) => {
    setState({...state, [event.target.name] : event.target.value})
  };

  useEffect(() => {
    if (state.target === 'mother') {
      setState({...state, targetNum:motherNum})
    }
  },[state.target])
  
  return (
    <Container sx={{ padding:3, margin:2, pb:8 }}>
      <Box sx={{display:'flex', pb:3,}}>
        <Typography sx={{fontWeight:'bold'}} variant='h4'>검진 기록하기 </Typography>
        <HealingOutlinedIcon fontSize='large'/>
      </Box>
      <FormControl>
        <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><PersonIcon/> 검진 대상</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel 
          value="mother" control={<Radio />} label="엄마" name='target' onChange={handleChange} />
          <FormControlLabel onClick={()=> setTarget('baby')} value="baby" control={<Radio />} label="아기" name='target' onChange={handleChange}/>
        </RadioGroup>
      </FormControl>
      {(target === "baby" && bornBabyList !== 0 )?
      <Select variant="plain" placeholder="아기 선택" sx={{width:'65%'}}>
        {bornBabyList.map((baby) => (
          <Option name='targetNum' 
          onClick={() => {
            setState({...state, targetNum:baby.num})
            }} 
          value={baby.num}>{baby.name}</Option>))}
      </Select>
      :
      <></>
      }
      <Box sx={{display:'flex', flexDirection:'column', width:'100%', pt:3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DemoContainer components={['DatePicker']}>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><CalendarMonthIcon/> 검진 날짜</p>
            <DatePicker
              label="검진 날짜 선택"
              disableFuture
              value={today}
              onChange={(newValue) => {
                setState({...state, selectDay : moment(newValue.$d).format('YYYY-MM-DD')})
              }}
              sx={{
                width:'60%'
              }}
              />
          </DemoContainer>
        </LocalizationProvider>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><CheckIcon/> 검진 목적</p>
          <TextField
            id="outlined-controlled"
            name='title'
            label={state.title == '' ? '검진목적을 입력하세요' : '검진목적'}
            value={state.title == '' ? '' : state.title}
            onChange={handleChange}
            sx={{width:'70%', pr:5, mt:1}}
          />
      </Box>

      <Box>
        <Box sx={{display:'flex', pt:4}}>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><LocalHospitalIcon/> 병원정보</p>
        </Box>
        <Box sx={{ display:'flex', flexDirection:'column', pb:4, width:'100%'}}>
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}><FiberManualRecordIcon/> 병원명</p>
            <TextField
              id="outlined-controlled"
              name='hospitalName'
              label={state.hospitalName == '' ? '병원이름을 입력하세요' : '병원이름'}
              value={state.hospitalName == '' ? '' : state.hospitalName}
              onChange={handleChange}
              sx={{width:'70%', pr:5}}
            />
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}><FiberManualRecordIcon/> 담당의사</p>
            <TextField 
              id="outlined-basic" 
              name='doctorName'
              variant="outlined" 
              label={state.doctorName == '' ? '담당의사를 입력하세요' : '담당의사'}
              value={state.doctorName == '' ? '' : state.doctorName}
              onChange={handleChange}
              sx={{width:'70%', pr:5}}
            />
          </Box>
          <Box>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><DescriptionIcon/> 검진내용</p>
          <TextField
          id="outlined-textarea"
          // label="검진결과"
          name='checkupItem'
          placeholder="검진내용"
          onChange={handleChange}
          multiline
          sx={{width:'90%'}}
          >
          </TextField>
        </Box>
        <Box>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><FeedIcon/> 검진결과</p>
          <TextField
          id="outlined-textarea"
          name='checkupResult'
          placeholder="검진결과"
          onChange={handleChange}
          multiline
          sx={{width:'90%'}}
          >
          </TextField>
        </Box>
      </Box>
      <Box sx={{pb:5}}>
        <Box sx={{display:'flex', pt:4}}>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><FaceIcon fontSize='large'/> 의사소견</p>
        </Box>
      <TextField
          id="outlined-textarea"
          label="의사소견"
          name='doctorOpinion'
          placeholder="의사소견"
          multiline
          onChange={handleChange}
          sx={{width:'90%'}}
        />
      </Box>
      <Box sx={{display:'flex', justifyContent:'right', mr:4, mb:4}}>
        <Button  variant="outlined" sx={{borderColor:'#FBBBB8', color:'#FBBBB8', mr:1}} onClick={() => navigate('/hospitalrecord')}>
          취소하기
        </Button>
        <Button  variant="outlined" sx={{borderColor:'#FBBBB8', color:'#FBBBB8'}} onClick={submit}>
          등록하기
        </Button>
      </Box>
    </Container>

  );
};
export default AddMomRecordPage;