import React, { useState } from 'react';
import CalendarPage from '../../components/HospitalRecord/CalendarPage';
import CustomTabPanel from  '../../components/HospitalRecord/CustomTabPanel';
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

// 기록이 있는지 이 페이지에서 확인 후 있으면 prop으로 내려주고 없으면 기록 추가 모달 창


const HospitalRecordMainPage = () => {
  const navigate = useNavigate()

  const [value, setValue] = useState('1')



  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const goRecord = (target) => {
    if (target == 'baby') {
      navigate(`/babyrcd`)
    } else {
      navigate(`/momrcd`)
    }
  }
  return (
    <Container>
      <Container sx={{width:'80%',alignContent:'center',justifyContent:'center'}}>
        <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
          <CalendarPage />
        </Box>
        <Box sx={{display:'flex',alignContent:'center',justifyContent:'center'}}>
          <CustomTabPanel />
        </Box>
        {/* <div className='recordbox'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="병원기록" value="1" />
                <Tab label="접종 검사" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">병원 기록 리스트 출력!</TabPanel>
            <TabPanel value="2">접종 검사 리스트 출력!</TabPanel>
          </TabContext>
        </div> */}
      </Container>



      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{overflowY:'auto'}}
        >
          <Box sx={style}>
            <Box>
              {/* <BabyRecordPage /> */}

            </Box>
            {/* <Button
            onClick={goRecord('baby')}
            >아기 
            </Button>
            <Button
            onClick={goRecord('mom')}
            >엄마
            </Button> */}
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default HospitalRecordMainPage;