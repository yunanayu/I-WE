import { Option, Select } from '@mui/joy';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMemberStore from '../../../stores/userStore';
import axios from 'axios';
import CheckCard from './CheckCard';
import { sortList } from './CheckPanel';

const BabyCheck = () => {
  const BabyList = useMemberStore(state => state.babyList)
  const [babyCheck, setBabyCheck] = useState([])
  const [vaccineList, setVaccineList] = useState([])
  const [selectBaby, setSelectBaby] = useState(null)
  const [type, setType] = useState(null)
  const bornBabyList = BabyList.filter(baby => baby.status);

  useEffect(() => {
    axios.get(`/api/check/baby/${selectBaby}`)
    .then(res => setBabyCheck(sortList(res.data)))
    .catch(err => console.error(err))
  },[selectBaby])

  useEffect(() => {
    if (type === 'all') {
      setVaccineList(babyCheck)
    }
    else if (type === '접종') {
      const list = babyCheck.filter((item) => item.category === '접종')
      setVaccineList(list)
    }
    else {
      const list = babyCheck.filter((item) => item.category === '검사')
      setVaccineList(list)
    }
  }, [type])
  return (
    <Box>
      <Select
        variant="plain"
        placeholder="아기 선택"
        >
      {bornBabyList.map(baby => (
        <Option 
        onClick={() => {
          setSelectBaby(baby.num)
          setType(null)
        }} 
        value={baby.name}>{baby.name}</Option>))}
      </Select>
      {selectBaby !== null &&
      <Select
        variant="plain"
        placeholder="검진/ 접종 여부 선택"
      >
        <Option value="all" onClick={() => setType("all")}>접종 / 검진</Option>
        <Option value="접종" onClick={() => setType("접종")}>접종</Option>
        <Option value="검진" onClick={() => setType("검사")}>검진</Option>
      </Select>
      }
      {vaccineList.map((item, index) => {
        return <CheckCard key={index} item={item} num={selectBaby} date={BabyList.find(baby => baby.num === selectBaby)}
        />
      })}


    </Box>   
  );
};

export default BabyCheck;