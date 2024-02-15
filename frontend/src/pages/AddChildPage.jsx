import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import 'dayjs/locale/ko'
import useMemberStore from './../stores/userStore';
import { requestPermission } from '../FCM/firebase-messaging-sw';

function AddChild({ setSpouseStatus }) {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [pregnancyDate, setPregnancyDate] = useState("");
  const [childGender, setChildGender] = useState("");
  const [pregnancyStatus, setPregnancyStatus] = useState("pregnancy");
  const [birthDate, setBirthDate] = useState("");
  const [momBasicWeight, setMomBasicWeight] = useState("");
  const [momBasicHeight, setMomBasicHeight] = useState("");
  const setBabyList = useMemberStore(state => state.setBabyList)
  const setUserNum = useMemberStore(state => state.setUserNum)
  const setUserName = useMemberStore(state => state.setUserName)
  const setParentType = useMemberStore(state => state.setParentType)
  const setProfileImage = useMemberStore(state => state.setProfileImage)

  const handleBasisMomWeightChange = (event) => {
    setMomBasicWeight(event.target.value);
  };
  const handleBasisMomHeightChange = (event) => {
    setMomBasicHeight(event.target.value);
  };

  const handleChildNameChange = (event) => {
    setChildName(event.target.value);
  };

  const handlePregnancyDateChange = (date) => {
    const formattedDate = dayjs(date.$d).format("YYYY-MM-DD");
    setPregnancyDate(formattedDate);
  };

  const handleBirthDateChange = (date) => {
    const formattedDate = dayjs(date.$d).format("YYYY-MM-DD");
    setBirthDate(formattedDate);
  };

  const handleChildGenderChange = (event) => {
    setChildGender(event.target.value);
  };

  const handlePregnancyStatusChange = (event) => {
    setPregnancyStatus(event.target.value);
  };
  
  const handleAddChild = async () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    var code;
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'token') {
        code = cookieValue;
      }
    }

    var userNum;
    var parentType
    var userName
    var profileImage
    // 사용자 정보 요청해서 Authorization에 넣기
    try {
      const response = await axios.get('/api/member',
        {
          headers: {
            'Authorization' : code
          }
        }
      );
      userNum = response.data.num;
      parentType = response.data.parentType;
      userName = response.data.name;
      profileImage = response.data.profileImage;
    } catch(e) {
      console.log("회원정보 받아오기 실패")
    }
    // user type, pk, name 저장
    setUserNum(userNum)
    setParentType(parentType)
    setUserName(userName)
    setProfileImage(profileImage)

    const momBasis = {
      motherNum: userNum,
      basisWeight: momBasicWeight,
      height: momBasicHeight,
    }

    const requestBaby = {
      motherNum: userNum, // 해당 유저의 num
      name: childName,
      gender: childGender === "MALE" ? 1 : childGender === "FEMALE" ? 2 : 0, // 남자=1 여자=2 모름=0
      birth: new Date(birthDate), // 아이의 생일
      pregnancyDate: new Date(pregnancyDate), // 임신 날짜
      status: pregnancyStatus === "pregnancy" ? true : false, // 임신 상태인지 여부를 true 또는 false로 설정
    };

    var babyList = []
    // 아기정보 post
    try {
      const response = await axios.post(`/api/baby`, requestBaby, // requestBaby 정보 전달
      {
          headers: {
            'Authorization' : code
          }
        }
      );
      setBabyList(response.data)
      const babyInfo = response.data
      babyList = response.data

    } catch(e) {
      console.log("아기정보 등록 실패")
    }
    // setBabyList(...babyList)
    console.log("아기정보 등록 성공");
    try {
      await axios.post(`/api/motherBasis/create`, momBasis, // requestBaby 정보 전달
      {
          headers: {
            'Authorization' : code
          }
        }
      );

    } catch(e) {
      console.log("엄마 기본정보 등록 실패")
    }
    requestPermission()
    navigate("/");
  };  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', width: '300px', backgroundColor: 'whitesmoke', margin: '60px 20px', padding: '10px', borderRadius: '15px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems:'center',textAlign: 'center' }}>
            {/* <div style={{ position: 'fixed', top: 90 }}> */}
            <FormLabel sx={{ fixed:'top',pointerEvents: 'none', color: 'black', fontWeight: 'bold', fontSize: 'x-large' }} id="demo-radio-buttons-group-label">현재 당신은?</FormLabel>
            <br />
            <RadioGroup
              row
              defaultValue="pregnancy"
              name="pregnancy-status"
              value={pregnancyStatus}
              onChange={handlePregnancyStatusChange}
            >
              <FormControlLabel value="pregnancy" control={<Radio />} label="임신 중" />
              <FormControlLabel value="nonpragnancy" control={<Radio />} label="출산" />
            </RadioGroup>
            {/* </div> */}
          </FormControl>
        </div>

        {pregnancyStatus === "pregnancy" ? (
          <>
            <div style={{margin:'10px 0px 0px '}}>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}>임신 전 당신의 몸무게는?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                
                <TextField
                  label="kg"
                  inputProps={{ step: "0.1" }}
                  value={momBasicWeight}
                  onChange={handleBasisMomWeightChange}
                />
              </div>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}>임신 전 당신의 키는?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="cm"
                  value={momBasicHeight}
                  onChange={handleBasisMomHeightChange}
                />
              </div>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">아이의 태명은?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="아이 태명"
                  value={childName}
                  onChange={handleChildNameChange}
                />
              </div>
              <FormControl>
                
                  <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">아이의 성별은?</p>
                <RadioGroup
                  name="child-gender"
                  value={childGender}
                  onChange={handleChildGenderChange}
                >
                  <div style={{display:'flex', justifyContent:'center', flexDirection: 'column'}}>
                    {/* <FormControlLabel value="NONE" control={<Radio />} label="모름" /> */}
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <FormControlLabel value="MALE" control={<Radio />} label="남자" />
                    <FormControlLabel value="FEMALE" control={<Radio />} label="여자" />
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <div>
                <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">임신 추측일은?</p>
              </div>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DemoContainer components={['DatePicker']}>
                  <DesktopDatePicker
                    label="임신 추측일 (마지막 생리 날짜)"
                    value={pregnancyDate}
                    onChange={handlePregnancyDateChange}
                    shouldDisableDate={(day) => {
                      return dayjs(day).isAfter(dayjs(), 'day');
                    }} />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <br />
            <Button sx={{ backgroundColor: '#FBBBB8', color: 'white' }} variant="contained" onClick={handleAddChild}>우리 아이와 만나러 가기</Button>
          </>
          
        ) : pregnancyStatus === "nonpragnancy" ? (
          <>
            <div style={{margin:'10px 0px 0px '}}>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}>임신 전 당신의 몸무게는?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="kg"
                  inputProps={{ step: "0.1" }}
                  value={momBasicWeight}
                  onChange={handleBasisMomWeightChange}
                />
              </div>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }}>임신 전 당신의 키는?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="cm"
                  value={momBasicHeight}
                  onChange={handleBasisMomHeightChange}
                />
              </div>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">아이의 이름은?</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                  label="아이 이름"
                  value={childName}
                  onChange={handleChildNameChange}
                />
              </div>
              <FormControl>
                <div>
                  <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">아이의 성별은?</p>
                </div>
                <RadioGroup
                  name="child-gender"
                  value={childGender}
                  onChange={handleChildGenderChange}
                >
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <FormControlLabel value="MALE" control={<Radio />} label="남자" />
                    <FormControlLabel value="FEMALE" control={<Radio />} label="여자" />
                  </div>
                </RadioGroup>
              </FormControl>
              <div>
                <p style={{ color: 'black', fontWeight: 'bold', fontSize: 'large' }} id="demo-radio-buttons-group-label">아이의 생일은?</p>
              </div>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
                <DemoContainer components={['DesktopDatePicker ']}>
                  <DesktopDatePicker  
                    label="출산일" 
                    value={birthDate}
                    onChange={handleBirthDateChange}
                    shouldDisableDate={(day) => {
                      return dayjs(day).isAfter(dayjs(), 'day');
                    }}/>
                </DemoContainer>
              </LocalizationProvider>

            </div>
            <br />
            <Button sx={{ backgroundColor: '#FBBBB8', color: 'white' }} variant="contained" onClick={handleAddChild}>우리 아이와 만나러 가기</Button>
          </>
        ) : null}
      
    </div>
    </div>
  );
}

export default AddChild;