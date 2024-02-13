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
  console.log(baby)
  return (
    <Box>
      <Card sx={{ minWidth: 275, mb:2}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          아기 이름 : {baby.name}
        </Typography>
        {baby.birth === null ?
        <Typography>임신추측일(마지막 생리일) : {baby.pregnancyDate}</Typography>
        :
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          출산일 : {baby.birth}
        </Typography>
        }
      </CardContent>
      <Button onClick={handleOpen}>아기 수정</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <UpdateChild />
        </Box>
        </Modal>
    </Card>
    </Box>
  );
};

export default ReadChildCard;