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
import { getEssential } from '../../api/RecordApi';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Option from '@mui/joy/Option';


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
  const navigate = useNavigate()
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

  const initState = React.useContext(recordContext)
  const [records, setRecords] = React.useState(initState)
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [momCheckList, setMomCheckList] = React.useState([])
  const [babyCheckList, setBabyCheckList] = React.useState([])
  const [vaccineList, setVaccineList] = React.useState([])
  // setVaccineList([...momCheckList,...babyCheckList])
  const [selectTarget, setSelectTarget] = React.useState('all')


  React.useEffect(()=>{
    function getNumberFromString(str) {
      return parseInt(str.substring(1));
  }
    axios({
      method :'get',
      url:`/api/check/mother/1`,
    })
    .then((res)=>{
      console.log(res.data)
      const list= res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
      setVaccineList(list)
      setMomCheckList(list)
    })
    .catch(err=>console.log(err))
    axios({
      method :'get',
      url:`/api/check/baby/34`,
    })
    .then((res)=>{
      console.log(res.data)
      const list= res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
      setBabyCheckList(list)
    })
    .catch(err=>console.log(err))
  }, [])

  React.useEffect(()=>{
    setRecords(initState)
    console.log('렌더링!')
    if(selectTarget === 'all') {
      setVaccineList([...momCheckList,...babyCheckList])
    } 
    else if(selectTarget === 'mother') {
      setVaccineList(momCheckList)
    }
    else {
      setVaccineList(babyCheckList)
    }
  },[initState, selectTarget,vaccineList])


  const targetChange = (target) => {
    // setSelectTarget(target)
    // vaccineList.map((vaccine) =>  )
  }



  return (
    <Box sx={{ display:'flex',justifyContent:'center', textAlign:'center', width: '100%', border:1, borderRadius:1, borderColor: 'red', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
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
          <Button 
          onClick={() => navigate('/momhospitalrecord',{state : {selectedDay:props.selectedDay}})}
          sx={{border:1, borderRadius:5, color:'#FBBBB8'}}>기록 추가하기</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{overflowY:'auto'}}
          >
            <Box sx={style}>
              <Box>
              </Box>
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
          
        <Select defaultValue="all" variant="plain" >
          <Option value="all" onClick={() => setSelectTarget('all')}>전체보기</Option>
          <Option value="mother" onClick={() => setSelectTarget('mother') }>엄마</Option>
          <Option value="baby" onClick={() => setSelectTarget('baby') }>아기</Option>
        </Select>
        {vaccineList.map((vaccine, index) => {
            return(
              <ReadVaccinCard key={index} index={index} vaccine={vaccine} target={selectTarget}/>
            )
          })}
        </CustomTabPanel>

      </Box>
    </Box>
  );
}