import axios from "axios"
import useMemberStore from "../stores/userStore"

export const getPush = () => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum
    }
  })
  .then((res) => {
    console.log(res.data)
    console.log('요청 완료')
  })
}