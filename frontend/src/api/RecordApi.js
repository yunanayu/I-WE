import axios from "axios";

export const getMomOne = async (param) => {
  const res = await axios.get(`url`)
  return res.data
}


export const getMomDate = async () => {
  const res = await axios({
    method : 'get',
    url : `url`
  })
  .then ((res) => {
    console.log(res.data)
    // setMomRecordList(res.data)
  })
  .catch((err) => console.log(err))
  return res.data
}


export const getBabyList = async () => {
  await axios({
    method :'get',
    url : `url`,
  })
  .then((res)=>{
    console.log(res.data);
  })
  .catch(err => console.log(err))
} 
// 전체 정보 조회 가능 (app, mother, baby)
export const getEssential = async (target) => {
  // await axios({
  //   method : 'get',
  //   url:`/api/essential/${target}`,
  // })
  // .then((res) => {
  //   console.log(res)
  //   const babyEssentialList = 
  //   res.data.map((data) => {
  //     'vaccinName' : data.title,
      
  //   })
  //   return babyEssentialList 
  // })
  // .catch(err=>console.log(err))
  const vaccineList = [
    {
    // "num": 2,
    "essentialNum" : 1,
    "title": "BCG 접종",
    "description": "\"BCG 백신은 결핵균에 의한 치명적인 결핵을 예방하는 약물이다. 영·유아 및 소아의 결핵 감염 예방을 위해 출생 후 가능하면 빨리 접종할 것이 권장된다. 약독화 생백신을 피내 또는 경피 접종하며, 대부분 접 종 후 국소 부작용이 나타나지만 2~3개월 이내에 사라진다.\"",
    "complete" : true,
    "startTime": "A0",
    "endTime": "A1",
    // "target": "baby",
    "category": "접종"
    },
    {
    // "num": 2,
    "essentialNum" : 1,
    "title": "인플루엔자",
    "description": "\"BCG 백신은 결핵균에 의한 치명적인 결핵을 예방하는 약물이다. 영·유아 및 소아의 결핵 감염 예방을 위해 출생 후 가능하면 빨리 접종할 것이 권장된다. 약독화 생백신을 피내 또는 경피 접종하며, 대부분 접 종 후 국소 부작용이 나타나지만 2~3개월 이내에 사라진다.\"",
    "complete" : false,
    "startTime": "A4",
    "endTime": "A6",
    // "target": "baby",
    "category": "접종"
    },
    {
    // "num": 2,
    "essentialNum" : 1,
    "title": "B형 간염",
    "description": "\"BCG 백신은 결핵균에 의한 치명적인 결핵을 예방하는 약물이다. 영·유아 및 소아의 결핵 감염 예방을 위해 출생 후 가능하면 빨리 접종할 것이 권장된다. 약독화 생백신을 피내 또는 경피 접종하며, 대부분 접 종 후 국소 부작용이 나타나지만 2~3개월 이내에 사라진다.\"",
    "complete" : true,
    "startTime": "A7",
    "endTime": "A8",
    // "target": "baby",
    "category": "접종"
    },

    ]
  return vaccineList
}


// 아이, 산모 검진/검사/접종 완료여부 변경
export const updateComplete = async (data) => {
  await axios({
    method : 'put',
    url : `/api/check/complete`,
    data
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch(err => console.log(err))
}

// export const updateComplete = async () => {
//   await axios({
//     method : ''
//   })
// }