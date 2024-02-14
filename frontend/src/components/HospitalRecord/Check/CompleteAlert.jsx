import { Box } from '@mui/material';
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const CompleteAlert = () => {
  return (
    <Box>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">변경되었습니다.</Alert>
    </Box>
  );
};

export default CompleteAlert;