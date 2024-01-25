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

const BabyRecordPage = () => {

    const babyList = [
      {name:'서싸피'},
      {name:'이싸피'},
      {name:'박싸피'},
      {name:'정싸피'},
      {name:'전싸피'},
      {name:'최사피'},
    ]
    const [state, setState] = useState({
      babyName : '',
      babyWeight:'',
    })
  
  
    
    const handleChange = (event) => {
      setState({...state, [event.target.name] : event.target.value})
    };
  

  return (
    <Container sx={{pt:10}}>
      <Typography variant='h4'>아기기록 페이지</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">아기이름</InputLabel>
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
    </Container>
    );
};

export default BabyRecordPage;