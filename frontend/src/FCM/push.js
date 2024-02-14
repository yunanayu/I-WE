import axios from "axios"
import useMemberStore from "../stores/userStore"

export const getPush1 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '일어나',
      content : '밥먹어',
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
      title: '접종 알림',
      content : 'A형 간염 1차 접종',
      key : 'record'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush3 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'momWeight'
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
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'birthday'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush5 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'chat'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush6 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'tip'
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
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'picture'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush8 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'babydata'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}