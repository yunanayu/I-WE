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
    })
    .catch((err) => console.log(err))

  }
