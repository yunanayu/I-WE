import axios from "axios";
import useMemberStore from "../stores/userStore";

export const getUserInfo = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/member'
    });
    const userNum = response.data.num;
    const userName = response.data.name
    //store에 저장 (회원정보)
    const babyResponse = await axios({
      method: 'get',
      url: `/api/baby/${userNum}`
    });

    const babyInfo = babyResponse.data;
    return babyInfo.length > 0 ? babyInfo : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserNumType = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/member'
    });
    const userInfo = response.data;
    //store에 저장 (회원정보)
    return userInfo
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBabyList = (userNum) => {
  axios({
    method:'get',
    url:`/api/baby/${userNum}`

  })
  .then((res) => {
    console.log('아기목록',res.data)
    useMemberStore.getState().setBabyList(res.data)
  })
  .catch((err) => console.log(err))
}
