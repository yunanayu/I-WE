// import React, { useEffect, useState } from 'react';
// import { Box } from '@mui/material';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CheckIcon from '@mui/icons-material/Check';
// import IconButton from '@mui/material/IconButton';
// import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
// import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
// import { updateComplete } from './../../api/RecordApi';
// import Modal from '@mui/material/Modal';
// import { replaceAWithNumber } from '../../pages/HospitalRecordPage/HospitalRecordMainPage';
// import moment from 'moment';
// import Stack from '@mui/material/Stack';
// import ChildCareIcon from '@mui/icons-material/ChildCare';
// import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
// import axios from 'axios';
// import useMemberStore from '../../stores/userStore';
// import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
// import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';

// const ReadVaccinCard = (props) => {
//   const [open, setOpen] = useState(false);
//   // 접종여부만 set 해주기
//   const [initState, setInitState] = useState(props.vaccine.complete)
//   const motherNum = useMemberStore(state=>state.userNum)
//   const babyList = useMemberStore(state => state.babyList)

//   useEffect(()=>{
//   },[initState])

//   const updateComplete = () => {
//     setInitState(!initState)
//     axios({
//       method:'put',
//       url:`/api/check/complete`,
//       data:{
//         targetNum: props.targetNum,
//         essentialNum:props.vaccine.essentialNum,
//         target:props.vaccine.target,
//         isComplete : !initState
//       }
//     }).then((res)=>{
//       // console.log(res)
//     })
//     .catch(err=>console.log(err))
//   }

//   // const pregnantDate = new Date()
//   // const pregnantDate = '2023-04-15'
//   // const birth = '2023-01-15'
//   // const start = new Date(pregnantDate)
//   // const end = new Date(pregnantDate)
//   // const [vaccineDate,setVaccineDate] = useState({
//   //   startDate : '',
//   //   endDate : ''
//   // })

//   //날짜 계산
//   // const calculateDate = () => {
//   //   var startdate = ''
//   //   var enddate = ''

//   //   if (props.vaccine.startTime[0] === 'A') {
//   //     const date  = {
//   //       startDate : start.setMonth(pregnantDate.getMonth() + replaceAWithNumber(props.vaccine.startTime)),
//   //       endDate : end.setMonth(pregnantDate.getMonth() + replaceAWithNumber(props.vaccine.endTime)),
//   //     } 
//   //     startdate = moment(date.startDate).format('YYYY년MM월DD일')
//   //     enddate = moment(date.endDate).format('YYYY년MM월DD일')
//   //   }
//   //   else {
//   //     const date  = {
//   //       startDate : start.setDate(pregnantDate.getDay() + replaceAWithNumber(props.vaccine.startTime)*7),
//   //       endDate : end.setDate(pregnantDate.getDay() + replaceAWithNumber(props.vaccine.endTime)*7),
//   //     } 
//   //     startdate = moment(date.startDate).format('YYYY년MM월DD일')
//   //     enddate = moment(date.endDate).format('YYYY년MM월DD일')
//   //   }
//   //   setVaccineDate({startDate:startdate, endDate:enddate})
//   //   }





//   const pregnantDate = '2023-04-15';
//   // const pregnantDate = babyList[props.babyIndex].pregnancyDate
//   const birth = babyList[props.babyIndex].birth;
//   const start = new Date(pregnantDate);
//   const end = new Date(pregnantDate);
//   const [vaccineDate, setVaccineDate] = useState({
//     startDate: '',
//     endDate: ''
//   });
  
//   // 날짜 계산
//   const calculateDate = () => {
//     let startdate = '';
//     let enddate = '';
  
//     if (props.vaccine.startTime[0] === 'A') {
//       const startDate = new Date(birth);
//       const endDate = new Date(birth);
  
//       startDate.setMonth(startDate.getMonth() + replaceAWithNumber(props.vaccine.startTime));
//       endDate.setMonth(endDate.getMonth() + replaceAWithNumber(props.vaccine.endTime));
  
//       startdate = moment(startDate).format('YYYY년MM월DD일');
//       enddate = moment(endDate).format('YYYY년MM월DD일');
//     } else {
//       start.setDate(start.getDate() + replaceAWithNumber(props.vaccine.startTime) * 7);
//       end.setDate(end.getDate() + replaceAWithNumber(props.vaccine.endTime) * 7);
  
//       startdate = moment(start).format('YYYY년MM월DD일');
//       enddate = moment(end).format('YYYY년MM월DD일');
//     }
//     setVaccineDate({ startDate: startdate, endDate: enddate });
//   };
  

//   useEffect(() => {
//     calculateDate()
//     // setInitState(props.vaccine.complete)
//   }, [props.vaccine])

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <Card sx={{pb:3, mb:3}}>
//       <CardContent sx={{display:'flex', justifyContent:'center'}}>
//         <Box>
//           <Box sx={{display:'flex'}}>
//             {props.vaccine.category === '접종' ? <VaccinesOutlinedIcon fontSize='large'/> : <LocalHospitalOutlinedIcon fontSize='large'/>}
//             { props.vaccine.target === 'baby' ? <ChildCareIcon fontSize='large'/> : <PregnantWomanIcon fontSize='large'/>}
//             <Typography variant="h6" component="div" sx={{pl:2}}>
//               {props.vaccine.title}
//             </Typography>
//           </Box>

//         </Box>
//         <Box>
//           {initState? 
//             <IconButton onClick={updateComplete}>
//               <CheckCircleOutlineTwoToneIcon />
//             </IconButton>
//             :
//             <IconButton onClick={updateComplete}>
//               <RadioButtonUncheckedTwoToneIcon />
//             </IconButton>
//           }
//         </Box>
//       </CardContent>
//       <div>
//         <Button onClick={() => setOpen(true)}>설명 보기</Button>
//         <Modal
//           open={open}
//           onClose={() => setOpen(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography sx={{ mb: 1.5 }} color="text.secondary">
//               {props.vaccine.description}
//             </Typography>
//           </Box>
//         </Modal>
//       </div>
//       <CardActions>
//         {/* <Button size="small">상세보기</Button> */}
//       </CardActions>
//       <Stack spacing={1}>
//         <Typography variant="overline">권장 접종 기간</Typography>
//         <Typography variant="caption">{vaccineDate.startDate} - {vaccineDate.endDate}</Typography>
//       </Stack>
//     </Card>
//   );
// };

// export default ReadVaccinCard;


import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import RadioButtonUncheckedTwoToneIcon from '@mui/icons-material/RadioButtonUncheckedTwoTone';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import axios from 'axios';
import useMemberStore from '../../stores/userStore';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import { replaceAWithNumber } from '../../pages/HospitalRecordPage/HospitalRecordMainPage';

const ReadVaccinCard = (props) => {
  const [open, setOpen] = useState(false);
  const [initState, setInitState] = useState(props.vaccine.complete);
  const motherNum = useMemberStore((state) => state.userNum);
  const babyList = useMemberStore((state) => state.babyList);
  const theme = useTheme();

  const updateComplete = () => {
    setInitState(!initState);
    axios({
      method: 'put',
      url: `/api/check/complete`,
      data: {
        targetNum: props.targetNum,
        essentialNum: props.vaccine.essentialNum,
        target: props.vaccine.target,
        isComplete: !initState,
      },
    })
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => console.log(err));
  };


  const pregnantDate = babyList[props.babyIndex].pregnancyDate
  const birth = babyList[props.babyIndex].birth;
  const start = new Date(pregnantDate);
  const end = new Date(pregnantDate);
  const [vaccineDate, setVaccineDate] = useState({
    startDate: '',
    endDate: '',
  });

  const calculateDate = () => {
    let startdate = '';
    let enddate = '';

    if (props.vaccine.startTime[0] === 'A') {
      const startDate = new Date(birth);
      const endDate = new Date(birth);

      startDate.setMonth(startDate.getMonth() + replaceAWithNumber(props.vaccine.startTime));
      endDate.setMonth(endDate.getMonth() + replaceAWithNumber(props.vaccine.endTime));

      startdate = moment(startDate).format('YYYY년MM월DD일');
      enddate = moment(endDate).format('YYYY년MM월DD일');
    } else {
      start.setDate(start.getDate() + replaceAWithNumber(props.vaccine.startTime) * 7);
      end.setDate(end.getDate() + replaceAWithNumber(props.vaccine.endTime) * 7);

      startdate = moment(start).format('YYYY년MM월DD일');
      enddate = moment(end).format('YYYY년MM월DD일');
    }
    setVaccineDate({ startDate: startdate, endDate: enddate });
  };

  useEffect(() => {
    calculateDate();
    // setInitState(props.vaccine.complete)
  }, [props.vaccine]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300, // Adjust as needed
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card sx={{ pb: 3, mb: 3 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'center', textAlign:'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {props.vaccine.category === '접종' ? <VaccinesOutlinedIcon fontSize="large" /> : <LocalHospitalOutlinedIcon fontSize="large" />}
          {props.vaccine.target === 'baby' ? <ChildCareIcon fontSize="large" /> : <PregnantWomanIcon fontSize="large" />}
          <Typography variant="h6" component="div" sx={{ pl: 2, flexWrap: 'wrap' , textAlign:'center'  }}>
            {/* {props.vaccine.title} */}
            {props.vaccine.title.split(' ').reduce((prev, curr) => {
                const isNewLineNeeded = (prev.length + curr.length > 5) || (prev.length > 0 && prev.length + curr.length === 5);
                return isNewLineNeeded ? `${prev}\n${curr}` : `${prev} ${curr}`;
              })}
          </Typography>
        </Box>
        <IconButton onClick={updateComplete} style={{ fontSize: '2rem'}}>
          {initState ? <CheckCircleOutlineTwoToneIcon /> : <RadioButtonUncheckedTwoToneIcon />}
        </IconButton>
      </CardContent>
      <div>
        <Button onClick={() => setOpen(true)} sx={{color:'#FBBBB8'}}>설명 보기</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.vaccine.description}
            </Typography>
          </Box>
        </Modal>
      </div>
      <CardActions>
        {/* <Button size="small">상세보기</Button> */}
      </CardActions>
      <Stack spacing={1}>
        <Typography variant="overline">권장 접종 기간</Typography>
        <Typography variant="caption">{vaccineDate.startDate} - {vaccineDate.endDate}</Typography>
      </Stack>
    </Card>
  );
};

export default ReadVaccinCard;
