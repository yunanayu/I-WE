import { Box, Button, Container, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReadDetailRecordModal = (props) => {
  const record = props.record
  const babyName = props.babyname
  // console.log(props.record)
  // console.log(babyName)
  const checkupDate = moment(record.hospitalDate).format('YYYY년 MM월 DD일')

  useEffect(()=>{
    

  }, [record])
  const navigate = useNavigate()
  const goUpdate = () => {
    navigate(`/updaterecord`,{state : {record:record}})
  }

  return (
    <Container sx={{}}>
      <Typography variant='h5'>{checkupDate} <br />검진기록</Typography>
      <Typography variant='h6' sx={{mt:1}}>- 기본정보</Typography>
      <Box sx={{display:'flex',mt:2, mb:3}}>
      <TextField
          id="standard-read-only-input"
          label="병원이름"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={record.hospitalName}
        />
      {
      babyName !== 'mother' 
      ?
      <TextField
          id="standard-read-only-input"
          label="기록대상"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={babyName}
      />
      :
      <></>
      }
      <TextField
          id="standard-read-only-input"
          label="진료의사"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={record.doctor}
        />
      </Box>
      <Box sx={{display:'flex', flexDirection:'column', mb:1}}>
        <TextField
          id="standard-read-only-input"
          label="검진 내용"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={record.content}
          sx={{mb:1}}
        />
        <TextField
          id="standard-read-only-input"
          label="검진 결과"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={record.result}
          sx={{mb:1}}
        />
      <TextField
          id="standard-read-only-input"
          label="의사 소견"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          value={record.comment}
          sx={{mb:1}}
        />
      </Box>
      {/* <IconButton aria-label="delete" disabled color="primary" >
        <DeleteIcon />
      </IconButton> */}
      <Box sx={{display:'flex', justifyContent:'right'}}>
        <Button 
        onClick={goUpdate}
        sx={{color:'#FBBBB8', justifyContent:'right'}}
        >수정하기
        </Button>
      </Box>
    </Container>
  );
};

export default ReadDetailRecordModal;