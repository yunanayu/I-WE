import { Box, Typography } from '@mui/material';
import React, { useState, ChangeEvent, useEffect } from 'react';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import FeedIcon from '@mui/icons-material/Feed';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DescriptionIcon from '@mui/icons-material/Description';
import FaceIcon from '@mui/icons-material/Face';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const UpdateHospitalRecord = (props) => {

  const navigate = useNavigate()

  const location = useLocation()
  const record = location.state.record
  const [value, setValue] = useState(dayjs(record.hospitalDate))
  const [state, setState] = useState({
    targetNum : record.targetNum,
    title :record.title,
    checkupItem :record.content,
    hospitalName:record.hospitalName,
    doctorName:record.doctor,
    checkupResult:record.result,
    doctorOpinion: record.comment,
    target : record.target,
    selectDay :record.selectDay

  })

    const submit = () => {
      axios({
        method:'put',
        url : `/api/hospital/update`,
        data:{
          num: record.num,
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
        window.alert("수정하였습니다.")
        navigate('/hospitalrecord')
      })
      .catch((err)=>{
        console.log(err)
        window.alert('수정실패')
      })
    }
  
  const handleChange = (event) => {
    setState({ ...state , [event.target.name] : event.target.value })
  };
  
  return (
    <Container sx={{ padding:3, margin:2, pb:8 }}>
      <Box sx={{display:'flex', pb:3}}>
      <Typography sx={{fontWeight:'bold'}} variant='h4'>검진 기록 수정하기 </Typography>
        <HealingOutlinedIcon fontSize='large'/>
      </Box>
      <FormControl>
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><PersonIcon/> 검진 대상</p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={state.target}
          onChange={handleChange}
        >
          <FormControlLabel value="mother" control={<Radio />} label="엄마" name='target'/>
          <FormControlLabel value="baby" control={<Radio />} label="아기" name='target'/>
        </RadioGroup>
      </FormControl>
      <Box sx={{display:'flex', flexDirection:'column', width:'100%', pt:3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><CalendarMonthIcon/> 검진 날짜</p>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="검진 날짜 선택"
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
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
            label={'검진목적'}
            value={state.title}
            onChange={handleChange}
            sx={{width:'70%', pr:5, mt:1}}
          />
      </Box>
      <Box>
        <Box sx={{display:'flex', pt:4}}>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><LocalHospitalIcon/> 병원정보</p>
        </Box>
        <Box sx={{ display:'flex',flexDirection:'column', pb:4, width:'100%'}}>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}><FiberManualRecordIcon/> 병원명</p>
          <TextField
            id="outlined-controlled"
            name='hospitalName'
            label={'병원이름'}
            value={state.hospitalName}
            onChange={handleChange}
            sx={{width:'70%', pr:5}}
          />
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}><FiberManualRecordIcon/> 담당의사</p>
          <TextField 
            id="outlined-basic" 
            name='doctorName'
            // variant="outlined" 
            label={'담당의사'}
            value={state.doctorName}
            onChange={handleChange}
            sx={{width:'70%', pr:5}}
          />
        </Box>
        <Box>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><DescriptionIcon/> 검진내용</p>
          <TextField
          id="outlined-textarea"
          name='checkupItem'
          placeholder="검진내용"
          value={state.checkupItem}
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
          value={state.checkupResult}
          // label="검진결과"
          name='checkupResult'
          placeholder="검진결과"
          onChange={handleChange}
          multiline
          sx={{width:'90%'}}
          >

          </TextField>
        </Box>
      </Box>
      {/* ------------------------------------------------------------------------------------------------------- */}

      <Box sx={{pb:5}}>
        <Box sx={{display:'flex', pt:2}}>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'x-large' }}><FaceIcon fontSize='large'/> 의사소견</p>
        </Box>
      <TextField
          id="outlined-textarea"
          label="의사소견"
          name='doctorOpinion'
          placeholder="의사소견"
          value={state.doctorOpinion}
          multiline
          onChange={handleChange}
          sx={{width:'100%'}}
        />
      </Box>
      <Box sx={{display:'flex', justifyContent:'right', mr:4, mb:4}}>
        <Button  variant="outlined" sx={{borderColor:'#FBBBB8', color:'#FBBBB8', mr:1}} onClick={() => navigate('/hospitalrecord')}>
          취소하기
        </Button>
        <Button  variant="outlined" sx={{borderColor:'#FBBBB8', color:'#FBBBB8'}} onClick={submit}>
          수정하기
        </Button>
      </Box>
    </Container>

  );
};
export default UpdateHospitalRecord;