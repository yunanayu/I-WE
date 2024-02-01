import axios from "axios";


export const getUserInfo = async () => {
  await  axios({
    method:'get',
    url : `/api/member`
  })
  .then((res) => {
    console.log(res.data)
    const userNum = res.data.num
    //store에 저장 (회원정보)
    axios({
      method:'get',
      url : `/api/baby/${userNum}`
    })
    .then((res2) => {
      console.log(res2.data) // List(Array)로 받아질것임!!
      // store에 저장 (아이정보)
    })
    .catch((err) => console.log(err))
  })
  .catch((err) => console.log(err))
  
}

// '아이추가'하고 => 다시 /api/baby/${userNum} 호출해서 store에 다시 저장
// 아기가 추가되면 해당 아이를 새로 불러오기