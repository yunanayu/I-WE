// store.js
// 위의 코드에서 initialState는 초기 상태를 정의하고, SET_SOCIAL_TOKEN은 액션 타입을 정의한 것입니다. 
// setSocialToken은 액션 생성자 함수로, 소셜 토큰을 전달받아 액션 객체를 생성하는 역할을 합니다. 
// reducer는 리듀서 함수로, 액션을 받아 상태를 업데이트하는 역할을 합니다. 
// createStore 함수를 사용하여 스토어를 생성합니다.

// 이제 KakaoLogin 컴포넌트에서 Redux를 사용하여 소셜 토큰을 저장할 수 있습니다.


import { createStore } from "redux";

// 초기 상태 정의
const initialState = {
  socialToken: null
};

// 액션 타입 정의
const SET_SOCIAL_TOKEN = "SET_SOCIAL_TOKEN";

// 액션 생성자 함수
export const setSocialToken = (token) => {
  return {
    type: SET_SOCIAL_TOKEN,
    payload: token
  };
};

// 리듀서 함수
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCIAL_TOKEN:
      return {
        ...state,
        socialToken: action.payload
      };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(reducer);

export default store;
