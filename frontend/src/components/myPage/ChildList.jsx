import React from 'react';
import useMemberStore from '../../stores/userStore';
import { Container, Typography } from '@mui/material';
import ReadChildCard from './ReadChildCard';

const ChildList = () => {
  const babyList = useMemberStore(state => state.babyList)
  console.log(babyList)
  return (
    <Container>
      <Typography> 아기 리스트 </Typography>
      {babyList.map((baby) => {
        return <ReadChildCard baby={baby}/>
      })}  
    </Container>
  );
};

export default ChildList;