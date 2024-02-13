import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import UpdateChild from './UpdateChild';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ReadChildCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const baby = props.baby
  function calculateDueDate(pregnancyDate) {
    // pregnancyDate를 JavaScript Date 객체로 변환
    const startDate = new Date(pregnancyDate);
  
    // 출산 예정일을 계산하기 위해 임신 기간(280일)을 더함
    const dueDate = new Date(startDate.getTime() + 280 * 24 * 60 * 60 * 1000);
  
    // 예정일을 원하는 형식으로 변환하여 반환
    return dueDate.toLocaleDateString(); // 형식을 원하는 대로 변경할 수 있습니다.
  }
  
  console.log(baby)
  return (
    <Box>
      <Card sx={{ minWidth: 275, mb:2}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          아기 이름 : {baby.name}
        </Typography>
        {baby.birth === null ?
        <>
        <Typography>임신추측일(마지막 생리일) : {baby.pregnancyDate}</Typography>
        <Typography>출산 예정일: {calculateDueDate(baby.pregnancyDate)}</Typography>
        </>
        :
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          출산일 : {baby.birth}
        </Typography>
        }
        <Typography>성별: {baby.gender === 1 ? '남자' : (baby.gender === 2 ? '여자' : '모름')}</Typography>
      </CardContent>
      <Button onClick={handleOpen}>아기 수정</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <UpdateChild baby={baby}/>
        </Box>
        </Modal>
    </Card>
    </Box>
  );
};

export default ReadChildCard;