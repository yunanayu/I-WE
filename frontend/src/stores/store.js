// // reducer는 액션을 받아 상태를 업데이트
// // createStore 함수를 사용하여 스토어 생성
// import { createStore } from 'redux';


// // 초기 상태 정의
// const initialState = {
//   userInfo: null,
//   babyInfo: null
// };

// // 액션 생성자 함수
// export const setUserInfo = (userInfo) => {
//   return {
//     type: 'SET_USER_INFO',
//     payload: userInfo
//   };
// };

// export const setBabyInfo = (babyInfo) => {
//   return {
//     type: 'SET_BABY_INFO',
//     payload: babyInfo
//   };
// };


// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_USER_INFO':
//       return {
//         ...state,
//         userInfo: action.payload
//       };
//     case 'SET_BABY_INFO':
//       return {
//         ...state,
//         babyInfo: action.payload
//       };
//     default:
//       return state;
//   }
// };

// // 스토어 생성
// const store = createStore(userReducer);

// export default store;
