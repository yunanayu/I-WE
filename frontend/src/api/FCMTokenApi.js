import axios from "axios";

export const goDeviceToken = (token) => {
    axios({
      method:'patch',
      url:`api/member`,
      data:{
        'fcmToken' : `${token}`
      }
    })
    .then((res)=>{
      console.log('토큰 전송 완료')
    })
    .catch((err) => console.log(err))

  }
