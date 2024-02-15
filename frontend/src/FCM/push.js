import axios from "axios"
import useMemberStore from "../stores/userStore"


export const getPush = (title, content, key) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title : title,
      content:content,
      key : key
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}


export const getPush1 = () => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title : `20주차의 산모는요!`,
      content: `자궁의 갑작스러운 증가에 하루 4-6회 정도 배가 단단히 뭉치는 느낌을 받아요!`,
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush2 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '20주차의 산모는요!',
      content : `조산의 위험이 있으므로 외출 시 주의해주세요!`,
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}

// 엄마
export const getPush3 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '36주차의 산모는요!',
      content : '언제 출산이 다가올지 모릅니다.어떤 상황에도 대처할 수 있도록 출산준비를 점검하세요!',
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
// 아빠
export const getPush11 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '36주차의 산모는요!',
      content : '언제 출산이 다가올지 모릅니다. 만약의 상황에 아내가 병원에 갈 수 있는 교통편, 도와줄 사람 등을 모두 체크하세요.',
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}


export const getPush4 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '20주차의 아기는요!',
      content : '양수의 양이 늘어나 자유롭게 움직이므로 위치가 자주 변하며 태동이 확실해집니다.',
      key:'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}

// 엄마에게 - 산후우울증
export const getPush5 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '출산 후 산모는요!',
      content : '이 시기에는 산후 우울증을 조심해야해요!',
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}

//아빠에게 산후우울증
export const getPush6 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '출산 후 산모는요!',
      content : '이 시기에는 산후 우울증이 찾아올 수 있어요! 가족의 도움이 필요합니다.',
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}

export const getPush7 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '27주차에 돌입했어요.',
      content : '아기의 청력이 거의 완성 되었습니다.소리와 리듬에 반응을 보이는 태아를 위해 엄마나 아빠가 읽어주는 동시는 좋은 태교 방법입니다.',
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}

//----------시연알람----------------------------------

// 1. 접종여부 체크 알람
export const getPush8 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'B형 간염 3차 접종',
      content : '2024년02월07일까지 B형 간염 3차 접종 잊지마세요.',
      key : 'record'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}

// 2. 사진 모아보기 + 아기성장 백분위 차트
export const getPush9 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: `이번주 ${useMemberStore.getState().babyList[0].name}를 기록해주세요`,
      content : '2월 1일에 마지막으로 기록하셨어요.',
      key : 'babydata'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}


export const getPush10 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '이번주 엄마의 체중을 기록해주세요.',
      content : '2월 1일에 마지막으로 기록하셨어요.',
      key : 'momWeight'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}