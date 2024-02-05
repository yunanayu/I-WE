import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import { updateComplete } from './../../api/RecordApi';
import Modal from '@mui/material/Modal';
import { replaceAWithNumber } from '../../pages/HospitalRecordPage/HospitalRecordMainPage';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import axios from 'axios';

const ReadVaccinCard = (props) => {
  // console.log(props)
  const [open, setOpen] = useState(false);
  // 접종여부만 set 해주기
  const [initState, setInitState] = useState(props.vaccine.complete)

  useEffect(()=>{
    console.log('재렌더링');
    // axios.get(`/api/check/mother/1`)
    // .then(res=>console.log(res.data))
    // .catch(err=>console.log(err))
  },[initState])

  const updateComplete = () => {
    setInitState(!initState)
    console.log(props.vaccine.essentialNum);
    axios({
      method:'put',
      url:`/api/check/complete`,
      data:{
        targetNum:1,
        essentialNum:props.vaccine.essentialNum,
        target:'mother',
        isComplete : true
      }
    }).then((res)=>{
      console.log(initState)
      console.log(res)})
    .catch(err=>console.log(err))
  }

  const pregnantDate = new Date()
  const start = new Date(pregnantDate)
  const end = new Date(pregnantDate)
  const [vaccineDate,setVaccineDate] = useState({
    startDate : '',
    endDate : ''
  })

  //날짜 계산
  const calculateDate = () => {
    var startdate = ''
    var enddate = ''

    if (props.vaccine.startTime[0] === 'A') {
      const date  = {
        startDate : start.setMonth(pregnantDate.getMonth() + replaceAWithNumber(props.vaccine.startTime)),
        endDate : end.setMonth(pregnantDate.getMonth() + replaceAWithNumber(props.vaccine.endTime)),
      } 
      startdate = moment(date.startDate).format('YYYY년MM월DD일')
      enddate = moment(date.endDate).format('YYYY년MM월DD일')
    }
    else {
      const date  = {
        startDate : start.setDate(pregnantDate.getDay() + replaceAWithNumber(props.vaccine.startTime)*7),
        endDate : end.setDate(pregnantDate.getDay() + replaceAWithNumber(props.vaccine.endTime)*7),
      } 
      startdate = moment(date.startDate).format('YYYY년MM월DD일')
      enddate = moment(date.endDate).format('YYYY년MM월DD일')
    }
    setVaccineDate({startDate:startdate, endDate:enddate})
    }

  useEffect(() => {
    calculateDate()
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card sx={{pb:3, mb:3}}>
      <CardContent sx={{display:'flex', justifyContent:'center'}}>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {initState.num}
        </Typography> */}
        <Box>
          <Box sx={{display:'flex'}}>
            { props.vaccine.target === 'baby' ? <ChildCareIcon fontSize='large'/> : <PregnantWomanIcon fontSize='large'/>}
            <Typography variant="h6" component="div" sx={{pl:2}}>
              {props.vaccine.title}
            </Typography>
          </Box>

        </Box>
        <Box>
          {initState? 
            <IconButton onClick={updateComplete}>
              <CheckCircleOutlineTwoToneIcon />
            </IconButton>
            :
            <IconButton onClick={updateComplete}>
              <RadioButtonUncheckedTwoToneIcon />
            </IconButton>
          }
        </Box>
      </CardContent>
      <div>
        <Button onClick={() => setOpen(true)}>설명 보기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.vaccine.description}
            </Typography>
          </Box>
        </Modal>
      </div>
      <CardActions>
        {/* <Button size="small">상세보기</Button> */}
      </CardActions>
      <Stack spacing={1}>
        <Typography variant="overline">권장 접종 기간</Typography>
        <Typography variant="caption">{vaccineDate.startDate} - {vaccineDate.endDate}</Typography>
      </Stack>
    </Card>
  );
};

export default ReadVaccinCard;