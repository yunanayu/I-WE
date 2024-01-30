import React from 'react';
import { getMomOne } from '../../api/RecordApi';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



// 데이터 받아오기
const initState = {
  date : '2024-01-04',
  hospitalName : '싸피 산부인과',
  checkUpName : '1차 정기검진',
  checkUpName : '1차 정기검진',
}


const ReadRecordCard = () => {
  return (
    <Card sx={{ minWidth: 500, }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {initState.date}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {initState.hospitalName}
        </Typography>
        <Typography variant="h5" component="div">
          {initState.checkUpName}
        </Typography>

        <Typography variant="body2">
          아이콘
          <br />
          넣기
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">상세보기</Button>
      </CardActions>
    </Card>
  );
};

export default ReadRecordCard;