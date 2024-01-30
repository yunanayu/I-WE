// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: "BH6R89JwPbY6YVdPUEln1vyJ_yLw3tJlPR3yjOLGzxSbGcu7qlIGRfOGuu8Ncp4CZfh5JnPJ_f-Q_y6G18QuTvw",
  });

  if (token) {
    console.log("token: ", token)
  } else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();

