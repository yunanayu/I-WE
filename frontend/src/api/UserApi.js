import axios from "axios";


// 비동기로 진행 동기로 진행하면 코드가 안됐음
export const getUserInfo = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: '/api/member'
    });
    const userNum = response.data.num;
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

// '아이추가'하고 => 다시 /api/baby/${userNum} 호출해서 store에 다시 저장
// 아기가 추가되면 해당 아이를 새로 불러오기
// 아이추가 함수