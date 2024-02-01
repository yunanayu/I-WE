import React, { createContext, useEffect, useState } from 'react';
import CalendarPage from '../../components/HospitalRecord/CalendarPage';
import CustomTabPanel from  '../../components/HospitalRecord/CustomTabPanel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import '../../FCM/firebase-messaging-sw'
import axios from 'axios';

// 기록이 있는지 이 페이지에서 확인 후 있으면 prop으로 내려주고 없으면 기록 추가 모달 창
const initState = [
    { checkUpDate : '2024-02-05',
      checkupItem :'1차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.8',
      babyHeight:'40',
      babyDiameter:'15', },
    { checkUpDate : '2024-02-05',
      checkupItem :'1차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.8',
      babyHeight:'40',
      babyDiameter:'15', },
    { checkUpDate : '2024-02-06',
      checkupItem :'1차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.8',
      babyHeight:'40',
      babyDiameter:'15', },
    { checkUpDate : '2024-02-09',
      checkupItem :'1차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.8',
      babyHeight:'40',
      babyDiameter:'15', },
    { checkUpDate : '2024-02-09',
      checkupItem :'1차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.8',
      babyHeight:'40',
      babyDiameter:'15', },
    { checkUpDate : '2024-02-18',
      checkupItem :'2차 정기검진',
      hospitalName:'싸피 산부인과',
      doctorName:'김싸피',
      momWeight:'80',
      babyName : '이싸피',
      babyWeight:'0.9',
      babyHeight:'45',
      babyDiameter:'16', },
  ]


export const recordContext = createContext()

const HospitalRecordMainPage = () => {
  const navigate = useNavigate()

  // const [momRecordList, setMomRecordList] = useState([])

  const [dayList,setDayList] = useState([])

  const [selectedDay, setSelectedDay] = useState()
  console.log(selectedDay);
  const [recordList, setRecordList] = useState([])
  console.log(recordList);
  useEffect(()=>{
    // const data = getMomDate()
    // setRecordList(data)
    const dates = initState.map((item) => item.checkUpDate)
    setDayList(dates)
    
    
    if (selectedDay) {
      // const filteredRecords = initState.filter((item) => item.checkUpDate === selectedDay);
      // setRecordList(filteredRecords);
      const data = initState.filter((item) => item.checkUpDate === selectedDay)
      setRecordList(data)
    } else {
      // If no day is selected, display all records
      setRecordList(initState);
    }

  },[selectedDay])



  return (
    <recordContext.Provider value={recordList}>
      <Container sx={{width:'100%'}}>
        <Container sx={{width:'80%',alignContent:'center',justifyContent:'center',}}>
          <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
            <CalendarPage dayList={dayList} setSelectedDay={setSelectedDay}/>
          </Box>
          <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
            <CustomTabPanel selectedDay={selectedDay}/>
          </Box>
        </Container>
      </Container>
    </recordContext.Provider>
  );
};

export default HospitalRecordMainPage;