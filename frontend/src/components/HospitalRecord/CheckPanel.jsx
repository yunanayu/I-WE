import React, { useEffect, useState } from 'react';
import useMemberStore from '../../stores/userStore';
import axios from 'axios';
import { Box } from '@mui/system';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Option from '@mui/joy/Option';
import { Typography } from '@mui/material';
import ReadVaccinCard from './ReadVaccinCard';


function getNumberFromString(str) {
  return parseInt(str.substring(1));
}


const CheckPanel = () => {
  const babyList = useMemberStore(state => state.babyList)
  const userNum = useMemberStore(state => state.userNum)
  console.log(userNum)
  const [momCheckList, setMomCheckList] = useState([])

  // 아기 기록 - 아기 여러명일때 고려하자.
  const [babyCheckList, setBabyCheckList] = useState([])

  // 출력해야하는 리스트!!!
  const [vaccineList, setVaccineList] = useState([])

  // 타겟, 카테고리(검사, 접종)
  const [selectTarget, setSelectTarget] = useState('all')
  const [selectType, setSelectType] = useState('all')
  // 배열의 index값임
  const [selectBaby, setSelectBaby] = useState(0)
  // console.log(selectBaby)

  useEffect(()=>{
    axios({
      method :'get',
      url:`/api/check/mother/${userNum}`,
    })
    .then((res)=>{
      console.log(res.data)
      const list= res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
      setMomCheckList(list)
    })
    .catch(err=>console.log(err))

    const babyNum = babyList[selectBaby].num
    axios.get(`/api/check/baby/${babyNum}`)
    .then((res) => {
      console.log(res.data)
      const list= res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
      setBabyCheckList(list)
    })
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    var babyCheck = []
    console.log('우리 사이 조았자나...')
    
    if (selectBaby != null) {
    const babyNum = babyList[selectBaby].num
    console.log(babyNum)
    axios.get(`/api/check/baby/${babyNum}`)
    .then((res) => {
      console.log(res.data)
      babyCheck = res.data
    })
    setBabyCheckList(babyCheck)
    }
    return
  }, [selectBaby])

  useEffect(() => {
    var list = []
    if (selectTarget === 'mother') {
      setVaccineList(momCheckList)
    }
    else {
      setVaccineList(babyCheckList)
    }
  },[selectTarget])
  return (
    <Box>
        <Select placeholder='대상을 선택해주세요' variant="plain" >
          <Option value="all" onClick={() => setSelectTarget('all')}>전체보기</Option>
          <Option value="mother" onClick={() => setSelectTarget('mother') }>엄마</Option>
          <Option value="baby" onClick={() => setSelectTarget('baby') }>아기</Option>
        </Select>
        {
        selectTarget == 'baby' 
          &&
          <Select defaultValue={babyList[0].name} variant="plain">
            {babyList.map((baby, index) => {
              console.log(index)
              return(
                <Option value={baby.name} onClick={() => setSelectBaby(index)}>{baby.name}</Option>    
              )
            })}
          </Select>
        }
        <Select defaultValue="all" variant="plain">
          <Option value="all" onClick={() => setSelectType('all')}>접종 / 검진</Option>
          <Option value="검사" onClick={() => setSelectType('검사')}>검진</Option>
          <Option value="접종" onClick={() => setSelectType('접종')}>접종</Option>
        </Select>
        {
        vaccineList.length != 0? 
        vaccineList.map((vaccine, index) => {
            return(
              <ReadVaccinCard key={index} index={index} vaccine={vaccine} target={selectTarget}/>
            )
          }) : 
          <Typography>없음</Typography>
          }
    </Box>
  );
};

export default CheckPanel;