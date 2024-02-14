import React, { useEffect } from 'react';
import useMemberStore from '../../stores/userStore';
import { Box, Button, Container, Typography } from '@mui/material';
import ReadChildCard from './ReadChildCard';
import Modal from '@mui/material/Modal';
import AddChild from './AddChild';

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
const ChildList = () => {
  const babyList = useMemberStore(state => state.babyList)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
  }, [babyList])
  console.log(babyList)
  return (
    <Container sx={{ mb:5 , pb:5}}>
      <Typography> 아기 리스트 </Typography>
      <Button onClick={handleOpen}>아기 등록하기</Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
          <AddChild setOpen={setOpen}/>
      </Box>
      </Modal>
      {babyList.map((baby) => {
        return <ReadChildCard baby={baby}/>
      })}  
    </Container>
  );
};

export default ChildList;