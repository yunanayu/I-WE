import React, { useEffect, useState } from 'react';
import CalendarPage from '../../components/HospitalRecord/CalendarPage';
import CustomTabPanel from  '../../components/HospitalRecord/CustomTabPanel';
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import '../../FCM/firebase-messaging-sw'
import axios from 'axios';

// 기록이 있는지 이 페이지에서 확인 후 있으면 prop으로 내려주고 없으면 기록 추가 모달 창
const initState = [
    { checkUpDate : '2024-01-05',
      checkupItem :'1차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.8',
      babyHeight:'40',
      babyDiameter:'15', },
    { checkUpDate : '2024-01-07',
      checkupItem :'2차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.9',
      babyHeight:'45',
      babyDiameter:'16', },
  ]

const HospitalRecordMainPage = () => {
  const navigate = useNavigate()

  // const [momRecordList, setMomRecordList] = useState([])

  // setMomRecordList([
  //   { checkUpDate : '2024-01-05',
  //     checkupItem :'1차 정기검진',
  //     hospitalName:'싸피 산부인과',
  //     doctorName:'김싸피',
  //     momWeight:'80',
  //     babyName : '이싸피',
  //     babyWeight:'0.8',
  //     babyHeight:'40',
  //     babyDiameter:'15', },
  //   { checkUpDate : '2024-01-07',
  //     checkupItem :'2차 정기검진',
  //     hospitalName:'싸피 산부인과',
  //     doctorName:'김싸피',
  //     momWeight:'80',
  //     babyName : '이싸피',
  //     babyWeight:'0.9',
  //     babyHeight:'45',
  //     babyDiameter:'16', },
  // ])
  const [dayList,setDayList] = useState([])
  // console.log(dayList)

  useEffect(()=>{
    // getMomDate()
    const dates = initState.map((item) => item.checkUpDate)
    setDayList(dates)
  },[])



  return (
    <Container>
      <Container sx={{width:'80%',alignContent:'center',justifyContent:'center'}}>
        <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
          <CalendarPage dayList={dayList}/>
        </Box>
        <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
          <CustomTabPanel />
        </Box>
      </Container>
    </Container>
  );
};

export default HospitalRecordMainPage;