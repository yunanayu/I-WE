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