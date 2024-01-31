import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Grid } from "@mui/material"; 
import ReadRecordCard from './ReadRecordCard';
import ReadVaccinCard from './ReadVaccinCard';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { recordContext } from '../../pages/HospitalRecordPage/HospitalRecordMainPage';

const vaccineList = [
  {
  date : '2024-02-04',
  hospitalName : '싸피 산부인과',
  vaccinName : 'B형 간염 1차',
  status : true ,
  },
  {
  date : '2024-02-08',
  hospitalName : '싸피 산부인과',
  vaccinName : 'B형 간염 2차',
  status : false ,
  },
  {
  date : '2024-02-17',
  hospitalName : '싸피 소아과',
  vaccinName : '인플루엔자',
  status : true ,
  },
  {
  date : '2024-02-08',
  hospitalName : '싸피 산부인과',
  vaccinName : 'BCG',
  status : false ,
  },
]




function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function BasicTabs(props) {
  const initState = React.useContext(recordContext)
  const [value, setValue] = React.useState(0);
  const [records, setRecords] = React.useState(initState)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    // boxShadow: 24,
    p: 4,
  };


  return (
    <Box sx={{ display:'flex',justifyContent:'center', textAlign:'center', width: '70%', border:1, borderRadius:1, borderColor: 'red', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab label="병원기록" {...a11yProps(0)} /> */}
          <Tab label={
            <Typography                             
            sx={{                                 
              border: '1px solid',                
              borderColor: '#FBBBB8',             
              borderRadius: 3,                    
              px: 1,                              
              fontSize: '0.75rem',                
              fontWeight: 'bold',
              color:'#FBBBB8'                 
            }}                                    
            >병원기록
            </Typography>} 
            {...a11yProps(0)} />
          <Tab label={
            <Typography                             
            sx={{                                 
              border: '1px solid',                
              borderColor: '#FBBBB8',             
              borderRadius: 3,                    
              px: 1,                              
              fontSize: '0.75rem',                
              fontWeight: 'bold',      
              color:'#FBBBB8'           
            }}                                    
            >접종 검사
            </Typography>} 
          {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
        {records.length === 0 ? 
          <div>
          <Button onClick={handleOpen} sx={{border:1, borderRadius:5, color:'#FBBBB8'}}>기록 추가하기</Button>
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
        :
          <div>
          {records.map((record) => {
            return(
              <ReadRecordCard value={value} index={0} record={record}/>
            )
          })}
          </div>
        }
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        {vaccineList.map((vaccine) => {
            return(
              <ReadVaccinCard value={value} index={0} vaccine={vaccine}/>
            )
          })}
        </CustomTabPanel>

      </Box>
    </Box>
  );
}