import React, { createContext, useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import './CalendarStyle.css'
import { Box, Container, Grid, Typography } from "@mui/material"; 
import { recordContext } from '../../pages/HospitalRecordPage/HospitalRecordMainPage';


const CalendarPage = (props) => {

  // const dayList = useContext(recordContext)
  const dayList = props.dayList
  // console.log(dayList);
  const curDate = new Date()
  
  const cutMonth = moment(curDate).format('YYYY')
  
  const [value, onChange] = useState(curDate)
  
  props.setSelectedDay(moment(value).format('YYYY-MM-DD'))

  // 해당하는 데이터 넣으면 됨.

  // const activeDate = moment(value).format('YYYY-MM-DD')
  // const monthOfActiveDate = moment(value).format('YYYY-MM')
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate)
  // const getActiveMonth = (activeStartDate : moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM')
  //   setActiveMonth(newActiveMonth)
  // }

  const addContent = ({date}) => {
    const isToday = dayList.find((d) => d === moment(date).format('YYYY-MM-DD'))
    return ( isToday ?
      <>
        <div className='box'>
          <div className="dot"></div>
        </div> 
      </> : <></>
      )}

  return (
    <Container sx={{display:'flow', width:'100%',textAlign:'center',alignContent:'center',justifyContent:'center', height:'100%', paddingLeft:'0px', paddingRight:'0px', mt:'20px'}}>
        <Calendar 
        onChange={onChange} 
        value={value}
        locale='ko'   // 언어
        next2Label={null}   // 년 단위 이동 버튼
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        showNeighboringMonth={false}  // 앞 뒤 달 이어지는 날짜 보여주는 여부
        tileContent = {addContent}
        // onActiveStartDateChange={({ activeStartDate }) => 
        //   getActiveMonth(activeStartDate)}
        />
    </Container>
  );
};
export default CalendarPage;
