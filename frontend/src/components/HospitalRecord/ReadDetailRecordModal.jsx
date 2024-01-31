import { Box, Container, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';

const ReadDetailRecordModal = (props) => {
  // console.log(props.record)
  
  const record = props.record

  const checkupDate = moment(record.checkUpDate).format('YYYY년 MM월 DD일')

  useEffect(()=>{

  }, [record])

  return (
    <Container sx={{}}>
      <Typography variant='h5'>{checkupDate} 검진기록</Typography>
      <Typography variant='h6'>기본정보</Typography>
      <Box sx={{display:'flex'}}>
        <Typography>병원이름</Typography>
        <Typography>{record.hospitalName}</Typography>
        <Typography>진료의사</Typography>
        <Typography>{record.doctorName}</Typography>
      </Box>
      <Typography variant='h6'>검진내용</Typography>
      <Box sx={{display:'flex'}}>
        <Typography>검사 종류</Typography>
        <Typography>{record.checkupItem}</Typography>
        <Typography>접종 종류</Typography>
        <Typography>{record.vaccinItem}</Typography>
      </Box>
      <Typography variant='h6'>산모</Typography>
      <Box sx={{display:'flex'}}>
        <Typography>혈압</Typography>
        <Typography>혈압</Typography>
        <Typography>몸무게</Typography>
        <Typography>{record.momWeight}</Typography>
      </Box>
      <Typography variant='h6'>태아</Typography>
      <Box sx={{display:'flex'}}>
        <Typography>키</Typography>
        <Typography>{record.babyHeight}</Typography>
        <Typography>몸무게</Typography>
        <Typography>{record.babyWeight}</Typography>
        <Typography>머리둘레</Typography>
        <Typography>{record.babyDiameter}</Typography>
      </Box>
      <Typography variant='h5'>의사소견</Typography>
    </Container>
  );
};

export default ReadDetailRecordModal;