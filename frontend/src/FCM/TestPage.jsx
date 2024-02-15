import { Box, Button, Container, useMediaQuery } from '@mui/material';
import React from 'react';
import { getPush, getPush1, getPush2, getPush3, getPush4, getPush5, getPush6, getPush7, getPush8 } from './push';
import useMemberStore from '../stores/userStore';

const TestPage = () => {
  const babyList = useMemberStore(state => state.babyList)
  const babyNum = babyList[0].num
  return (
    <Container>
      <Box sx={{display : 'flex'}}>
      {/* 1. 단순 정보 info 페이지로 넘기기 */}
      <Button onClick={() => getPush1(babyNum)}>1</Button>
      {/* 2. 접종 정보 */}
      <Button onClick={() => getPush2(babyNum)}>2</Button>
      </Box>
      <Box  sx={{display : 'flex'}}>
      <Button onClick={() => getPush3(babyNum)}>3</Button>
      <Button onClick={() => getPush4(babyNum)}>4</Button>
      </Box>
      <Box  sx={{display : 'flex'}}>
      <Button onClick={() => getPush5(babyNum)}>5</Button>
      <Button onClick={() => getPush6(babyNum)}>6</Button>
      </Box>
      <Box sx={{display : 'flex'}}>
      <Button onClick={() => getPush7(babyNum)}>7</Button>
      <Button onClick={() => getPush8(babyNum)}>8</Button>
      </Box>
    </Container>
  );
};

export default TestPage;