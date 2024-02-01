import React, { useState } from 'react';
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


// 데이터 받아오기
// const initState = {
//   date : '2024-01-04',
//   hospitalName : '싸피 산부인과',
//   vaccinName : 'B형 간염 1차',
//   status : true ,
// }

const ReadVaccinCard = (props) => {
  const [open, setOpen] = useState(false);
  const [initState, setInitState] = useState(props.vaccine)
  console.log(initState);
  const updateComplete = () => {
    setInitState({...initState, complete : !initState.complete})
    // updateComplete({
    //   targetNum : 1 , 
    //   essentialNum : 1,
    //   target : 'baby',
    //   isComplete : !initState.complet
    //   })
  }

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
    <Card sx={{ Width: '70%', }}>
      <CardContent sx={{display:'flex', justifyContent:'center'}}>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {initState.num}
        </Typography> */}
        <Box>
          <Typography variant="h6" component="div">
            {initState.title}
          </Typography>
        </Box>
        <Box>
          {initState.complete? 
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
              {initState.description}
            </Typography>
          </Box>
        </Modal>
      </div>
      <CardActions>
        {/* <Button size="small">상세보기</Button> */}
      </CardActions>
    </Card>
  );
};

export default ReadVaccinCard;