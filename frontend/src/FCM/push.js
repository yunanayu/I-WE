import axios from "axios"
import useMemberStore from "../stores/userStore"

export const getPush = () => {
  console.log(useMemberStore.getState().userNum)
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      // num : useMemberStore.getState().userNum,
      num : 1,
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ'
    }
  })
  .then((res) => {
    // console.log(res.data)
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}