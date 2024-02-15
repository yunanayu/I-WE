import React, { useEffect, useState } from 'react';
import { changeComplete, momChangeComplete } from '../../../api/RecordApi';
import useMemberStore from '../../../stores/userStore';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import { Box } from '@mui/material';
import { replaceAWithNumber } from '../../../pages/HospitalRecordPage/HospitalRecordMainPage';
import moment from 'moment';


const CheckCard = (props) => {
  const [open, setOpen] = useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300, // Adjust as needed
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const babyList = useMemberStore(state => state.babyList)
  const item = props.item
  const num = props.num
  const babyNum = props.babyNum
  const [complete, setComplete] = useState(item.complete)
  const [date, setDate] = useState({start:'', end:''})
  const updateComplete = () => {
    setComplete(!complete)
    if (item.target === 'baby') {
      changeComplete(num,item.essentialNum, 'baby', !item.complete )
    } else {
    momChangeComplete(num, item.essentialNum, item.target, !item.complete , babyNum)
    }
  }


  // 날짜 계산
  useEffect(() => {
    setComplete(item.complete)
    let startdate = '';
    let enddate = '';
    if (item.target === "baby") {
      const babyBirthDate = props.date.birth; // 2024-02-01
      const start = new Date(babyBirthDate);
      const end = new Date(babyBirthDate);
      const startTime = replaceAWithNumber(item.startTime);
      const endTime = replaceAWithNumber(item.endTime);
      start.setMonth(start.getMonth() + startTime);
      end.setMonth(end.getMonth() + endTime);
      startdate = moment(start).format('YYYY년MM월DD일')
      enddate = moment(end).format('YYYY년MM월DD일')
    }
    else {
      const pregnacyDate = babyList[babyList.length -1].pregnancyDate
      const start = new Date(pregnacyDate);
      const end = new Date(pregnacyDate);
      const startTime = replaceAWithNumber(item.startTime);
      const endTime = replaceAWithNumber(item.endTime);
      start.setDate(start.getDate() + startTime*7);
      end.setDate(end.getDate() + endTime*7);
      startdate = moment(start).format('YYYY년MM월DD일')
      enddate = moment(end).format('YYYY년MM월DD일')

    }
    setDate({ start: startdate, end: enddate });
  }, [item]);
  
  useEffect(() => {

  }, [item, date, complete])

  return (
    <Card sx={{ pb: 3, mb: 3 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'center', textAlign:'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {item.category === '접종' ? <VaccinesOutlinedIcon fontSize="large" /> : <LocalHospitalOutlinedIcon fontSize="large" />}
            {item.target === 'baby' ? <ChildCareIcon fontSize="large" /> : <PregnantWomanIcon fontSize="large" />}
            <Typography variant="h6" component="div" sx={{ pl: 2, flexWrap: 'wrap' , textAlign:'center'  }}>
              {item.title.split(' ').reduce((prev, curr) => {
                  const isNewLineNeeded = (prev.length + curr.length > 5) || (prev.length > 0 && prev.length + curr.length === 5);
                  return isNewLineNeeded ? `${prev}\n${curr}` : `${prev} ${curr}`;
                })}
            </Typography>
          </Box>
        <IconButton
          onClick={updateComplete}
          style={{ fontSize: '2rem' }}
        >
          {complete ? <CheckCircleOutlineTwoToneIcon fontSize="large" style={{ color: 'green' }} /> : <RadioButtonUncheckedTwoToneIcon fontSize="large" />}
        </IconButton>
      </CardContent>
      <div>
        <Button onClick={() => setOpen(true)} sx={{color:'#FBBBB8'}}>설명 보기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.description}
            </Typography>
          </Box>
        </Modal>
      </div>
      <CardActions>
      </CardActions>
      <Stack spacing={1}>
        <Typography variant="overline">권장 접종 기간</Typography>
        <Typography variant="caption">{date.start} - {date.end}</Typography>
      </Stack>
    </Card>
  );
};

export default CheckCard;