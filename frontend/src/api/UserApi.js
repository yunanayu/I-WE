import axios from "axios";


export const getUserInfo = (accessToken) => {
  axios({
    method:'get',
    url : `api/member`
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((err) => console.log(err))
  console.log('유저 정보 가져옴!!!><@@');
}

// 비동기로 진행 동기로 진행하면 코드가 안됐음
// export const getUserInfo = async () => {
//   try {
//     const response = await axios({
//       method: 'get',
//       url: '/api/member'
//     });

//     const userNum = response.data.num;

//     const babyResponse = await axios({
//       method: 'get',
//       url: `/api/baby/${userNum}`
//     });

//     const babyInfo = babyResponse.data;
//     return babyInfo.length > 0 ? babyInfo : null;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };