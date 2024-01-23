import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

const RecordCalendar = () => {
  
  const curDate = new Date()

  const [value, onChange] = useState(curDate)
  
  // 해당하는 데이터 넣으면 됨.
  const dayList = [
    '2024-01-10',
    '2024-01-21',
    '2024-01-02',
    '2024-01-14',
    '2024-01-27',
    '2024-02-27',
    '2024-03-27',
  ];

  // const activeDate = moment(value).format('YYYY-MM-DD')
  // const monthOfActiveDate = moment(value).format('YYYY-MM')
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate)
  // const getActiveMonth = (activeStartDate : moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM')
  //   setActiveMonth(newActiveMonth)
  // }

  
  return (
    <div>
      <Calendar 
      onChange={onChange} 
      value={value}
      locale='ko'   // 언어
      next2Label={null}   // 년 단위 이동 버튼
      prev2Label={null}
      formatDay={(locale, date) => moment(date).format('D')}
      showNeighboringMonth={false}  // 앞 뒤 달 이어지는 날짜 보여주는 여부
      // tileContent={addContent}
      tileContent = {({date}) => {
        const isToday = dayList.find((d) => d === moment(date).format('YYYY-MM-DD'))
        return ( isToday ?
          <>
         <div className='box'>
           <div className="dot"></div>
         </div>
          </>
          : <></>
        )
      }}
      // onActiveStartDateChange={({ activeStartDate }) => 
      //   getActiveMonth(activeStartDate)}

      />
      {/* 현재 클릭한 날짜 */}
      <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")} 
      </div>
    </div>
  );
};

export default RecordCalendar;