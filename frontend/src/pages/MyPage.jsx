import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, Box  } from '@mui/material';
import useMemberStore from '../stores/userStore';
import AddChild from "../components/myPage/AddChild";
import ChildList from "../components/myPage/ChildList";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const theme = createTheme({
  typography: {
    fontFamily: 'Nanum Gothic, sans-serif',
  },
});

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

// familyNum 받아오기
function MyPage() {
    const familyNum = useMemberStore(state => state.familyNum)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <ThemeProvider theme={theme} sx={{display:'flex', justifyContent:'center'}} >
                <Typography>마이페이지</Typography>
                <Typography margin="10px" variant="h5" align="center" sx={{ mt: 4, mb: 2, color: 'gray' }}>
                    가족코드 : {familyNum}
                </Typography>
            </ThemeProvider>
            <ChildList />
            <Button onClick={handleOpen}>아기 등록하기</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <AddChild />
            </Box>
            </Modal>
        </>
    );
}

export default MyPage;
