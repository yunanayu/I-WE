import React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';


// 데이터 받아오기
const initState = {
  date : '2024-01-04',
  hospitalName : '싸피 산부인과',
  vaccinName : 'B형 간염 1차',
  status : true ,
}

const ReadVaccinCard = () => {
  return (
    <Card sx={{ Width: '70%', }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {initState.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {initState.hospitalName}
        </Typography>
        <Typography variant="h5" component="div">
          {initState.vaccinName}
        </Typography>
        {initState.status? <CheckIcon />: <></>}
      </CardContent>
      <CardActions>
        <Button size="small">상세보기</Button>
      </CardActions>
    </Card>
  );
};

export default ReadVaccinCard;