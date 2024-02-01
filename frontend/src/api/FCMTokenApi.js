import axios from "axios";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";

export const goDeviceToken = async (token) => {
    await axios({
      method:'patch',
      url:`api/member`,
      data:{
        'fcmToken' : `${token}`
      }
    })
    .then((res)=>console.log(res))
    .catch((err) => console.log(err))

  }
