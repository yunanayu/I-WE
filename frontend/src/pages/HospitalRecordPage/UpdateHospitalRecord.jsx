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

const UpdateHospitalRecord = (props) => {

  const navigate = useNavigate()

  const location = useLocation()
  const record = location.state.record
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
          value={state.target}
          onChange={handleChange}
        >
          <FormControlLabel value="mother" control={<Radio />} label="엄마" name='target'/>
          <FormControlLabel value="baby" control={<Radio />} label="아기" name='target'/>
        </RadioGroup>
      </FormControl>
      <Box sx={{display:'flex', width:'100%', pt:3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="검진 날짜 선택"
              value={moment(state.hospitalDate)}
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
          <TextField
            id="outlined-controlled"
            name='title'
            label={'검진목적'}
            value={state.title}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />

      </Box>
      <Box>
        <Box sx={{display:'flex', pt:4}}>

          <Typography variant='h4'>병원정보</Typography>
        </Box>
        <Box sx={{ display:'flex', pb:4, width:'100%', pt:5 }}>
          <TextField
            id="outlined-controlled"
            name='hospitalName'
            label={'병원이름'}
            value={state.hospitalName}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />
          <TextField 
            id="outlined-basic" 
            name='doctorName'
            // variant="outlined" 
            label={'담당의사'}
            value={state.doctorName}
            onChange={handleChange}
            sx={{width:'30%', pr:5}}
          />
        </Box>
        {/* <Box>
          <Typography 
          variant='h5'
          >검진사진</Typography>
          <FileUpload />
        </Box> */}
        <Box>
          <Typography variant='h5'>검진내용</Typography>
          <TextField
          id="outlined-textarea"
          // label="검진결과"
          name='checkupItem'
          placeholder="검진내용"
          value={state.checkupItem}
          onChange={handleChange}
          multiline
          sx={{width:'100%'}}
          >
          </TextField>
        </Box>
        <Box>
          <Typography variant='h5'>검진결과</Typography>
          <TextField
          id="outlined-textarea"
          value={state.checkupResult}
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
          value={state.doctorOpinion}
          multiline
          onChange={handleChange}
          sx={{width:'100%'}}
        />
      </Box>
      <Box sx={{display:'flex', justifyContent:'right'}}>
        <Button  variant="outlined" sx={{borderColor:'#FBBBB8', color:'#FBBBB8'}} onClick={submit}>
          수정하기
        </Button>
      </Box>
    </Container>

  );
};
export default UpdateHospitalRecord;