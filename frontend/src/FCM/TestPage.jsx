import { Box, Button, useMediaQuery } from '@mui/material';
import React from 'react';
import { getPush } from './push';
import useMemberStore from '../stores/userStore';

const TestPage = () => {
  const babyList = useMemberStore(state => state.babyList)
  const babyNum = babyList[0].num
  return (
    <Box>
      <Button onClick={() => getPush(babyNum)}>알림요청!!!!</Button>
    </Box>
  );
};

export default TestPage;