import axios from "axios";
import accessToken from "../pages/KakaoLoginPage.jsx";




export const getMemberWithAccessToken = async(accessToken) => {
    

  const res = await axios.get(`http://localhost:3000/loginSuccess?accessToken=${accessToken}`)

  return res.data

}
