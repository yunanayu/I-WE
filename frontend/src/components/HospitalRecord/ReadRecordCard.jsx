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

// 데이터 받아오기


const ReadRecordCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(props.index)
  // console.log(props.record)
  return (
    <Card sx={{ Width: '70%', }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.record.checkUpDate}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.record.hospitalName}
        </Typography>
        <Typography variant="h5" component="div">
          {props.record.checkupItem}
        </Typography>
        {props.record.checkupItem? <MedicationIcon /> : <></>}

      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>상세보기</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReadDetailRecordModal record={props.record}/>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default ReadRecordCard;