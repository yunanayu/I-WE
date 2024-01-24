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

const MomRecordPage = () => {
  
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
  const [state, setState] = useState({
    // checkUpDate : '',
    selectDay : '',
    checkupItem :'',
  })
  // console.log(state.selectDay);
  
  return (
    <Box>
      <Typography variant='h1'>ㅎㅇㅎㅇ</Typography>
      <Box sx={{display:'flex',border:1, borderColor:'red', width:'70%' }}>
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
        <TextField
          id="outlined-read-only-input"
          label=" 검진 날짜"
          value={state.selectDay == '' ? '검진날짜를 선택해주세요':state.selectDay}
          InputProps={{
            readOnly: true,
          }}
        />
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
      <Box sx={{border:1, borderColor:'blue'}}>

      </Box>
    </Box>
  );
};

export default MomRecordPage;