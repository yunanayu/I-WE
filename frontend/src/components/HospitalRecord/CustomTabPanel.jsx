import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Grid } from "@mui/material"; 





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



export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = function () {
    
  }

  return (
    <Box sx={{ display:'flex',justifyContent:'center', textAlign:'center', width: '70%', border:1, borderRadius:1, borderColor: 'red', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab label="병원기록" {...a11yProps(0)} /> */}
          <Tab label={
            <Typography                             
            sx={{                                 
              border: '1px solid',                
              borderColor: 'inherit',             
              borderRadius: 3,                    
              px: 1,                              
              fontSize: '0.75rem',                
              fontWeight: 'bold',                 
            }}                                    
            >병원기록
            </Typography>} 
            {...a11yProps(0)} />
          <Tab label={
            <Typography                             
            sx={{                                 
              border: '1px solid',                
              borderColor: 'inherit',             
              borderRadius: 3,                    
              px: 1,                              
              fontSize: '0.75rem',                
              fontWeight: 'bold',                 
            }}                                    
            >접종 검사
            </Typography>} 
          {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          1111
        </CustomTabPanel>
        <CustomTabPanel value={value} index={0}>
          1111
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          2222
        </CustomTabPanel>
      </Box>
    </Box>
  );
}