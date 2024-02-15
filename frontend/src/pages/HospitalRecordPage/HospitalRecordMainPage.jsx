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
import { getEssential } from '../../api/RecordApi';
import useMemberStore from '../../stores/userStore';
import moment from 'moment';

// 현재 URL을 가져옵니다.
var url = window.location.href;

// URL에서 쿼리 매개변수를 추출합니다.
var queryString = url.split('?')[1];

// 쿼리 매개변수를 파싱하여 데이터를 추출합니다.
var queryParams = new URLSearchParams(queryString);
var data = queryParams.get('data');

// 추출된 데이터를 사용합니다.
// console.log(data);



export function replaceAWithNumber(inputString) {
  // 'A' 또는 'B'를 제거하고 나머지 문자열에서 숫자만 추출합니다.
  var numberPart = inputString.replace(/[AB]/g, '').match(/\d+/);
  // 추출된 숫자가 있으면 해당 숫자를 반환하고, 없으면 null을 반환합니다.
  return numberPart ? parseInt(numberPart[0]) : null;
}

export const recordContext = createContext();

const HospitalRecordMainPage = () => {
  const navigate = useNavigate()

  const today = moment(new Date()).format("YYYY-MM-DD")
  // 이거 꼭 재설정
  const [initState, setInitState] = useState([])
  const [dayList,setDayList] = useState([])
  const [selectedDay, setSelectedDay] = useState(today)
  const [recordList, setRecordList] = useState([])
  const userNum = useMemberStore(state => state.userNum)
  const babyList = useMemberStore(state => state.babyList)
  const parentType = useMemberStore(state => state.parentType)
  const bornBabyList = babyList.filter((baby) => baby.status);
  const [babyrecord, setBabyrecord] = useState([])
  const [momrecord, setMomrecord] = useState([])
  useEffect(() => {
    setInitState([...babyrecord,...momrecord])
  }, [momrecord,babyrecord])


  useEffect(() => {
    if (parentType === 'MOTHER') {
    axios.get(`/api/hospital/mother/${userNum}`)
    .then((res) => {
      setMomrecord(res.data)
    })
    .catch((err) => console.log(err))
  }

  bornBabyList.map((baby) => {
      axios.get(`api/hospital/baby/${baby.num}`)
      .then((res) => {
        setBabyrecord((prevRecords) => [...prevRecords, ...res.data]);
        // setBabyrecord([...babyrecord,...res.data])
        // setBabyrecord(res.data)
      })
      .catch(err => console.log(err))
    })
  },[])


  useEffect(()=>{
    const dates = initState.map((item) => item.hospitalDate)
    setDayList(dates)
    
    if (selectedDay) {
      const data = initState.filter((item) => item.hospitalDate === selectedDay)
      setRecordList(data)
    } else {
      setRecordList(initState);
    }

  },[selectedDay, initState])


  return (
    <recordContext.Provider value={recordList}>
      <Container sx={{}}>
          <Box sx={{display:'flex',flexDirection: 'column',alignContent:'center',justifyContent:'center', height: 532}}>
            <CalendarPage dayList={dayList} setSelectedDay={setSelectedDay}/>
          </Box>
          <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
            <CustomTabPanel selectedDay={selectedDay}/>
          </Box>
      </Container>
      <Box sx={{height:100}}>

      </Box>
    </recordContext.Provider>
  );
};

export default HospitalRecordMainPage;