import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

const HeathRecordPage = () => {
  
  const curDate = new Date()

  const [value, onChange] = useState(curDate)
  
  const dayList = [
    '2024-01-10',
    '2024-01-21',
    '2024-01-02',
    '2024-01-14',
    '2024-01-27',
  ];
  // const activeDate = moment(value).format('YYYY-MM-DD')
  // const monthOfActiveDate = moment(value).format('YYYY-MM')
  // const [activeMonth, setActiveMonth] = useState(monthOfActiveDate)
  // const getActiveMonth = (activeStartDate : moment.MomentInput) => {
  //   const newActiveMonth = moment(activeStartDate).format('YYYY-MM')
  //   setActiveMonth(newActiveMonth)
  // }

  // const addContent = ({date} : any) => {
  //   const contents = []

  //   if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
  //     contents.push(
  //       <>
  //         <div className="dot"></div>
  //         {/* <Image
  //           src="icons/baby-face-icon.svg"
  //           className="diaryImg"
  //           width="26"
  //           height="26"
  //           alt="today is..."
  //         />
  //         <img src={img1} width='50px'/> */}
  //       </>
  //     )
  //   }
  //   return <div>{contents}</div>
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
      tileContent = {({date, view}) => {
        const contents = []
        if (dayList.find((d) => d === moment(date).format('YYYY-MM-DD'))) {
          contents.push(<div className='dot'></div>)
        }
        return (
          <>
            <div>
              {contents}
            </div>
          </>
        )
      }}
      // onActiveStartDateChange={({ activeStartDate }) => 
      //   getActiveMonth(activeStartDate)}

      />
      <div className="text-gray-500 mt-4">
        {moment(value).format("YYYY년 MM월 DD일")} 
      </div>
    </div>
  );
};

export default HeathRecordPage;