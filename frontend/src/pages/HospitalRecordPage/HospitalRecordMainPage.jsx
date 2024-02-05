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

// 기록이 있는지 이 페이지에서 확인 후 있으면 prop으로 내려주고 없으면 기록 추가 모달 창
// const initState = [
//     { target : 'mother',
//       title : '1차 정기검진',
//       hospitalName:'싸피 산부인과',
//       doctor :'김싸피',
//       hospitalDate:'2024-02-05',
//       content: '정기검진',
//       result: '정상',
//       comment : '이상없음',
//     },
//     { target : 'mother',
//       title : '2차 정기검진',
//       hospitalName:'싸피 산부인과',
//       doctor :'이싸피',
//       hospitalDate:'2024-02-06',
//       content: '정기검진',
//       result: '정상',
//       comment : '이상없음',
//     },
//     { target : 'mother',
//       title : '3차 정기검진',
//       hospitalName:'싸피 산부인과',
//       doctor :'박싸피',
//       hospitalDate:'2024-02-07',
//       content: '정기검진',
//       result: '정상',
//       comment : '이상없음',
//     },
//     { target : 'baby',
//       title : '1차 정기검진',
//       hospitalName:'싸피 소아과',
//       doctor :'최싸피',
//       hospitalDate:'2024-02-07',
//       content: '정기검진', 
//       result: '정상',
//       comment : '이상없음',
//     },
//   ]

// export function replaceAWithNumber(inputString) {
//     // 'A'를 제거하고 나머지 문자열에서 숫자만 추출합니다.
//     var numberPart = inputString.replace('A', '').match(/\d+/);
//     // 추출된 숫자가 있으면 해당 숫자를 반환하고, 없으면 null을 반환합니다.
//     return numberPart ? parseInt(numberPart[0]) : null;
//   }

// export const recordContext = createContext()


export function replaceAWithNumber(inputString) {
  // 'A' 또는 'B'를 제거하고 나머지 문자열에서 숫자만 추출합니다.
  var numberPart = inputString.replace(/[AB]/g, '').match(/\d+/);
  // 추출된 숫자가 있으면 해당 숫자를 반환하고, 없으면 null을 반환합니다.
  return numberPart ? parseInt(numberPart[0]) : null;
}


export const recordContext = createContext();



const HospitalRecordMainPage = () => {
  const navigate = useNavigate()

  const [initState, setInitState] = useState([])
  // const [momRecordList, setMomRecordList] = useState([])
  // console.log(initState)
  const [dayList,setDayList] = useState([])

  const [selectedDay, setSelectedDay] = useState()
  // console.log(selectedDay);
  const [recordList, setRecordList] = useState([])
  // console.log(recordList);


  useEffect(() => {
    axios.get(`/api/hospital/mother/1`)
    .then((res) => {
      console.log(res.data);
      setInitState(res.data)
    })
    .catch((err) => console.log(err))

    // axios.post(`/api/baby`, {
    //   motherNum : 1,
    //   name: '이싸피',
    //   pregnancyDate: null,
    //   birth : '2024-01-02'
    // })
    // .then((res) => {
    //   console.log(res);
    //   // setInitState(res.data)
    // })
    // .catch((err) => console.log(err))
  },[])


  useEffect(()=>{
    // const data = getMomDate()
    // setRecordList(data)
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