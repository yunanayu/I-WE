import React, { useState } from 'react';
import { getMomOne } from '../../api/RecordApi';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicationIcon from '@mui/icons-material/Medication';
import Modal from '@mui/material/Modal';
import ReadDetailRecordModal from './ReadDetailRecordModal';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import useMemberStore from '../../stores/userStore';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ReadRecordCard = (props) => {
  // console.log(props)
  const target = props.record.target
  const num = props.record.targetNum
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const babyList = useMemberStore(state => state.babyList)
  const baby = babyList.find((baby) => {
    return baby.num === num 
  })


  return (
    <Card sx={{ width: '100%', mb: 3, }}>
      <CardContent>
        {target === 'baby'
        &&
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          아기이름 : {baby.name}
        </Typography>
        }
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          병원 : {props.record.hospitalName}
        </Typography>
        <Box sx={{display:'flex', justifyContent:'center'}}>
          {props.record.target === 'mother'? <PregnantWomanIcon /> : <ChildCareIcon/>}
          <Typography variant="h5" component="div" ml={2}>
            방문 목적 : {props.record.title}
          </Typography>
        </Box>

      </CardContent>
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Button size="small" onClick={handleOpen} sx={{color:'#FBBBB8'}}>상세보기</Button>
      </Box>
      <CardActions>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReadDetailRecordModal 
            record={props.record}
            babyname = {target === 'baby' ? baby.name : 'mother'}
            />
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default ReadRecordCard;