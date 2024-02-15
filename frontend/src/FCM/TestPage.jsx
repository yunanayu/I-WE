import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { getPush, getPush1, getPush10, getPush11, getPush2, getPush3, getPush4, getPush5, getPush6, getPush7, getPush8, getPush9 } from './push';
import useMemberStore from '../stores/userStore';

const TestPage = () => {
  const babyList = useMemberStore(state => state.babyList)
  const babyNum = babyList[0].num
  return (
    <Container>
      <Typography>엄마 아빠 같은 버튼 누르면 됨</Typography>
      <Box sx={{display : 'flex'}}>
      {/* 1. 단순 정보 info 페이지로 넘기기 */}
      <Button onClick={() => getPush1(babyNum)}>엄마신체정보알람(20주차)(엄마 아빠 둘 다)</Button>
      {/* 2. 접종 정보 */}
      <Button onClick={() => getPush2(babyNum)}>엄마 권유 20주차 엄마아빠둘다</Button>
      <Button onClick={() => getPush4(babyNum)}>엄마 아빠에게 아가 상태 공유 20주차</Button>
      <Button onClick={() => getPush7(babyNum)}>엄마 아빠에게 아가 상태 공유 27주차</Button>
      </Box>
      <Typography>엄마 아빠 버튼 각각 누르면 됨</Typography>
      <Box  sx={{display : 'flex'}}>
      <Button onClick={() => getPush3(babyNum)}>36주 이후 엄마 권유</Button>
      <Button onClick={() => getPush11(babyNum)}>36주 이후 아빠 권유</Button>
      </Box>
      <Box  sx={{display : 'flex'}}>
      <Button onClick={() => getPush5(babyNum)}>엄마 산후우울증 경고</Button>
      <Button onClick={() => getPush6(babyNum)}>아빠 산후우울증 경고</Button>
      </Box>
      <Typography>시연용 알람 여기부턴 그냥ㄴ 한사람만 보여줄거입니다.</Typography>
      <Box>
      <Button onClick={() => getPush8(babyNum)}>1. 접종 여부 알람</Button>
      <Button onClick={() => getPush9(babyNum)}>2. 아기성장백분위차트</Button>
      <Button onClick={() => getPush10(babyNum)}>3. 엄마 체중 기록</Button>
      </Box>
    </Container>
  );
};

export default TestPage;