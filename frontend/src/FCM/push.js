import axios from "axios"
import useMemberStore from "../stores/userStore"

export const getPush1 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title : `축하합니다!`,
      content: `소중한 ${useMemberStore.getState().babyList[0].name}가 태어났어요!`,
      key : 'info'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush2 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '이시기에 엄마는요!',
      content : `${useMemberStore.getState().userName}님에게 필요한 정보 보러가기`,
      key : 'record'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush3 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ뭐지 무저? 이게 뭐죠?',
      content : '태아가 커져서 근육 덩어리인 자궁이 갑작스러운 증가에 수축하려는 성질을 보여 하루 4~6회 정도 배가 단단히 뭉치는 느낌을 받기도 합니다. ',
      key : 'momWeight'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush4 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ이건 content 얼마나 길게 나오는지 확인하는것입니다.^_^ 일단 길게 적어적어',
      content : '소변을 자주 봐도 개운하지 않으며, 구토감이 있으면 방광염이나 신우신염을 의심해 볼 수 있습니다. 방광에 소변이 고이면 대장균을 비롯한 각종 세균이 방광염을 일으키고 방광에 있던 세균이 신장의 신우로 올라가면 신우신염을 일으킵니다. 신우신염은 신장이 있는 옆구리가 아프고 오한, 고열, 전신무력 증세가 나타납니다.',
      key : 'birthday'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush5 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '아기의 청력 발달이 거의 완성 되었습니다. 이제 밖에서 들리는 소리와 리듬에 반응을 보이는 태아를 위해 엄마나 아빠가 읽어주는 동시는 좋은 태교 방법입니다. 엄마 아빠의 목소리, 그 속에 담긴 리듬감이 이제 몸의 발달에서 점차 뇌의 발달로 집중되는 아기에게는 더 없이 좋은 뇌 자극법일 수 있습니다.',
      content : '이건 타이틀이 얼마나 길게 나오는지',
      key : 'chat'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush6 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '아기의 청력 발달이 거의 완성 되었습니다. 이제 밖에서 들리는 소리와 리듬에 반응을 보이는 태아를 위해 엄마나 아빠가 읽어주는 동시는 좋은 태교 방법입니다. 엄마 아빠의 목소리, 그 속에 담긴 리듬감이 이제 몸의 발달에서 점차 뇌의 발달로 집중되는 아기에게는 더 없이 좋은 뇌 자극법일 수 있습니다.',
      content : '아기의 청력 발달이 거의 완성 되었습니다. 이제 밖에서 들리는 소리와 리듬에 반응을 보이는 태아를 위해 엄마나 아빠가 읽어주는 동시는 좋은 태교 방법입니다. 엄마 아빠의 목소리, 그 속에 담긴 리듬감이 이제 몸의 발달에서 점차 뇌의 발달로 집중되는 아기에게는 더 없이 좋은 뇌 자극법일 수 있습니다.',
      key : 'tip'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush7 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: '20주차에 돌입했어요.',
      content : '아기의 청력 발달이 거의 완성 되었습니다. 이제 밖에서 들리는 소리와 리듬에 반응을 보이는 태아를 위해 엄마나 아빠가 읽어주는 동시는 좋은 태교 방법입니다. 엄마 아빠의 목소리, 그 속에 담긴 리듬감이 이제 몸의 발달에서 점차 뇌의 발달로 집중되는 아기에게는 더 없이 좋은 뇌 자극법일 수 있습니다.',
      key : 'picture'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}
export const getPush8 = (babyNum) => {
  axios({
    method:'post',
    url:`api/cheat`,
    data:{
      num : useMemberStore.getState().userNum,
      title: 'ㅎㅇㅎㅇ',
      content : 'ㅋㅎㅋㅎㅋㅎㅋㅎㅋ',
      key : 'babydata'
    }
  })
  .then((res) => {
    console.log('요청 완료')
  })
  .catch(err => console.log(err))
}