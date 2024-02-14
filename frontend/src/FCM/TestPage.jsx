import { Box, Button, useMediaQuery } from '@mui/material';
import React from 'react';
import { getPush, getPush1, getPush2, getPush3, getPush4, getPush5, getPush6, getPush7, getPush8 } from './push';
import useMemberStore from '../stores/userStore';

const TestPage = () => {
  const babyList = useMemberStore(state => state.babyList)
  const babyNum = babyList[0].num
  return (
    <Box>
      {/* 1. 단순 정보 info 페이지로 넘기기 */}
      <Button onClick={() => getPush1(babyNum)}>111111</Button>
      {/* 2. 접종 정보 */}
      <Button onClick={() => getPush2(babyNum)}>222222222</Button>
      <Button onClick={() => getPush3(babyNum)}>3333333333</Button>
      <Button onClick={() => getPush4(babyNum)}>44444444</Button>
      <Button onClick={() => getPush5(babyNum)}>55555</Button>
      <Button onClick={() => getPush6(babyNum)}>666666</Button>
      <Button onClick={() => getPush7(babyNum)}>77777777777</Button>
      <Button onClick={() => getPush8(babyNum)}>888888888</Button>
    </Box>
  );
};

export default TestPage;