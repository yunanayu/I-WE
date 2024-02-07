// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";
import { goDeviceToken } from "../api/FCMTokenApi";
import { useFcmStore } from "../stores/userStore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJC_FtqavkZ_z_UpZ0lb-nprbuKBwTKho",
  authDomain: "i-and-we-382f4.firebaseapp.com",
  projectId: "i-and-we-382f4",
  storageBucket: "i-and-we-382f4.appspot.com",
  messagingSenderId: "268481112825",
  appId: "1:268481112825:web:a5e61ab9c017d14ba1d028"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


export async function requestPermission() {
  // const setPermission = useFcmStore(state => state.setPermission)
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    // window.alert('알림 권한이 거절되었습니다.')
    return;
  }

  console.log("알림 권한이 허용됨");
  // alert 창 말고 다른 방식으로 출력해주기
  // window.alert('알림이 허용되었습니다.!')

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY
  });

  if (token) {
    console.log("token: ", token)
    goDeviceToken(token)
  } else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
   // 사용자가 구독을 취소할 때마다 토큰 삭제
  // window.addEventListener('beforeunload', async () => {
  //   console.log("페이지를 떠날 때 토큰을 삭제합니다.");
  //   try {
  //     await deleteToken(messaging, token);
  //     console.log("토큰 삭제 완료");
  //   } catch (error) {
  //     console.error("토큰 삭제 중 오류 발생:", error);
  //   }
  // });
}

// requestPermission();

