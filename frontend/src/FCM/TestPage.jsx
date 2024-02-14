import { Box, Button } from '@mui/material';
import React from 'react';
import { getPush } from './push';

const TestPage = () => {
  return (
    <Box>
      <Button onClick={() => getPush()}>알림요청!!!!</Button>
    </Box>
  );
};

export default TestPage;