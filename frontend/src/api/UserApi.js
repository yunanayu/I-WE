import axios from "axios";

export const getUserInfo = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/member'
    });
    const userNum = response.data.num;
    const userName = response.data.name
    // console.log(userName)
    //store에 저장 (회원정보)
    const babyResponse = await axios({
      method: 'get',
      url: `/api/baby/${userNum}`
    });

    const babyInfo = babyResponse.data;
    // console.log(babyInfo) // List(Array)로 받아질것임!! {num: 2, motherNum: 3, fatherNum: null, name: 'babe', gender: null, …}
    // store에 저장 (아이정보)
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