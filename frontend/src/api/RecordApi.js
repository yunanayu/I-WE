import axios from "axios";


export const getCheck = (userNum, target) => {
  const res = axios.get(`/api/check/${target}/${userNum}`)
  return res.data
}


export const getMomDate = (userNum) => {
  axios({
    method :'get',
    url:`/api/check/mother/${userNum}`,
  })
  .then((res)=>{
    console.log(res.data)
    // const list= res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
    // setMomCheckList(list)
  })
  .catch(err=>console.log(err))
}


export const getBabyList = async () => {
  await axios({
    method :'get',
    url : `url`,
  })
  .then((res)=>{
    console.log(res.data);
  })
  .catch(err => console.log(err))
} 


// 전체 정보 조회 가능 (app, mother, baby)
export const getEssential = (target) => {
  function getNumberFromString(str) {
    // 문자열에서 "a" 다음에 오는 숫자만 추출하여 숫자로 반환합니다.
    return parseInt(str.substring(1));
}
  
  axios.get(`/api/check/mother/1`)
  .then((res)=>{
    console.log(res.data)
    const list= res.data.sort((a, b) => getNumberFromString(a.startTime) - getNumberFromString(b.startTime));
    console.log(list)
    return list
    // setVaccineList(res.data)
  })
  .catch(err=>console.log(err))
  // return res 
}


// 아이, 산모 검진/검사/접종 완료여부 변경
export const updateComplete = async (data) => {
  await axios({
    method : 'put',
    url : `/api/check/complete`,
    data
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch(err => console.log(err))
}



export const changeComplete = (targetNum, essentialNum, target, isComplete) => {
  console.log(targetNum)
  axios({
    method: 'put',
    url: `/api/check/complete`,
    data: {
      targetNum: targetNum,
      essentialNum: essentialNum,
      target: target,
      isComplete: isComplete,
    },
  })
    .then((res) => {
      window.alert('변경되었습니다.')
    })
    .catch((err) => console.log(err));
} 



export const momChangeComplete = (targetNum, essentialNum, target, isComplete, babyNum) => {
  axios({
    method: 'put',
    url: `/api/check/complete`,
    data: {
      targetNum: targetNum,
      essentialNum: essentialNum,
      target: target,
      isComplete: isComplete,
      babyNum :babyNum
    },
  })
    .then((res) => {
      window.alert('변경되었습니다.')
    })
    .catch((err) => console.log(err));
} 