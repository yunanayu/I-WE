import React, { useEffect, useState } from 'react';
import useMemberStore from '../../stores/userStore';
import axios from 'axios';
import { Box } from '@mui/system';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Option from '@mui/joy/Option';
import { Typography } from '@mui/material';
import ReadVaccinCard from './ReadVaccinCard';
import { getCheck } from '../../api/RecordApi';
import NumberRangeSlider from './RangeSlider';


export function getNumberFromString(str) {
  return parseInt(str.substring(1));
}
export const  sortList = (data) => {
  return data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime))
}

const CheckPanel = () => {
  const babyList = useMemberStore(state => state.babyList)
  const userNum = useMemberStore(state => state.userNum)
  const [momCheckList, setMomCheckList] = useState([])
  // 현재 엄마 임신 상태
  const momStatus = babyList[babyList.length -1].status

  // 아기 기록 - 아기 여러명일때 고려하자.
  const [babyCheckList, setBabyCheckList] = useState([])

  // 출력해야하는 리스트!!!
  const [vaccineList, setVaccineList] = useState([])

  // 타겟, 카테고리(검사, 접종)
  const [selectTarget, setSelectTarget] = useState('all')
  const [selectType, setSelectType] = useState('all')
  
  // 배열의 index값임
  const [selectBaby, setSelectBaby] = useState(0)
  console.log(selectBaby)
  // 개월 수 필터링
  const [selectRange, setSelectRange] = useState([0, 144])

  // 태어난 babyList
  const bornBabyList = babyList.filter((baby) => {
    return baby.birth != null
  })
  
  const indexesOfBornBabies = bornBabyList.map((baby) => {
    return babyList.indexOf(baby);
  });
  
  console.log(indexesOfBornBabies);

  const setList = () => {
    var list = []
    if (selectType === 'all') {
      if (selectTarget === 'mother') {
        list = momCheckList
      }
      else {
        list = babyCheckList
      }
    }
    else if (selectType != 'all' && selectTarget === 'mother') {
      list = momCheckList.filter((item) => {
        return item.category === selectType
      })
    }
    else if (selectType != 'all' && selectTarget === 'baby') {
      list = babyCheckList.filter((item) => {
        return item.category === selectType
      })
    }
    setVaccineList(sortList(list))
  }
  


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

  // 회원가입 시 baby num 어디있는지 확인하기
  useEffect(() => {
    var babyCheck = []
    if (selectBaby != null) {
    const babyNum = babyList[selectBaby].num
    axios.get(`/api/check/baby/${babyNum}`)
    .then((res) => {
      console.log(res.data)
      babyCheck = res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
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

useEffect(() => {
  setList()
  var list = []
  if (selectType === 'all') {
    if (selectTarget === 'mother') {
      list = momCheckList
    }
    else {
      list = babyCheckList
    }
  }
  else if (selectType != 'all' && selectTarget === 'mother') {
    list = momCheckList.filter((item) => {
      return item.category === selectType
    })
  }
  else if (selectType != 'all' && selectTarget === 'baby') {
    list = babyCheckList.filter((item) => {
      return item.category === selectType
    })
  }
  setVaccineList(sortList(list))
}, [selectType])

useEffect(() => {
  setList()
  console.log(selectRange)
  if (selectTarget === 'baby') {
    const newList = babyCheckList.filter((item) => {
      const start = getNumberFromString(item.startTime)
      const end = getNumberFromString(item.endTime)
      console.log(start, end)
      return (
        // start >= selectRange[0] && end <= selectRange[1]
        selectRange[0] <= start  && end <= selectRange[1]
      )
    })
    console.log(newList)
    setVaccineList(newList)
  }
  else {
    const newList = momCheckList.filter((item) => {
      const start = getNumberFromString(item.startTime)
      const end = getNumberFromString(item.endTime)
      return (
        start >= selectRange[0] && end <= selectRange[1]
      )
    })
    setVaccineList(newList)
  }
}, [selectRange])

  return (
    <Box>
        <Select placeholder='대상을 선택해주세요' variant="plain" >
          {/* <Option value="all" onClick={() => setSelectTarget('all')}>전체보기</Option> */}
          <Option value="baby" onClick={() => setSelectTarget('baby') }>아기</Option>
          {/* 엄마 비 임신 상태일때는 안보임 */}
          {!momStatus && <Option value="mother" onClick={() => setSelectTarget('mother') }>엄마</Option>}
        </Select>
        {
        selectTarget === 'baby' 
          &&
        bornBabyList != null
        ?
          <Select defaultValue={bornBabyList[0].name} variant="plain">
            {indexesOfBornBabies.map((idx, index) => {
              const baby = babyList[idx]
              console.log(baby)
              return(
                <Option value={baby.name} key={index} onClick={() => setSelectBaby(idx)}>{baby.name}</Option>    
              )
            })}
          </Select>
          :
          <></>
        }
        {selectTarget !== 'all' &&
        <Select variant="plain" placeholder='검진/ 접종 여부 선택'>
          <Option value="all" onClick={() => setSelectType('all')}>접종 / 검진</Option>
          <Option value="검사" onClick={() => setSelectType('검사')}>검진</Option>
          <Option value="접종" onClick={() => setSelectType('접종')}>접종</Option>
        </Select>
        }
        {selectTarget === 'baby' &&
        <NumberRangeSlider setSelectRange={setSelectRange} target={selectTarget}/>
        }
        {
        vaccineList.length != 0? 
        vaccineList.map((vaccine, index) => {
            return(
              <ReadVaccinCard 
              key={index} index={index} 
              targetNum = { selectTarget === 'baby' ? babyList[selectBaby].num : userNum }
              babyIndex = {selectBaby}
              vaccine={vaccine}/>
            )
          }) : 
          <Typography>없음</Typography>
          }
    </Box>
  );
};

export default CheckPanel;