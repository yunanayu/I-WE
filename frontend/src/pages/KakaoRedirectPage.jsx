// KakaoLogin.jsx

import React, { useEffect } from "react";
import axios from "axios";
import kakaologin from "../images/kakaologin.png";
import { useNavigate } from "react-router-dom";

function KakaoLogin({ setIsLoggedIn }) {
  const BackURL = `http://localhost:8080/oauth2/authorization/kakao`;
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("로그인눌림");
    window.location.href = BackURL;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("accessToken");

        if (code) {
          console.log("토큰:", code);
          document.cookie = `token=${code}`;
          setIsLoggedIn(true); // 로그인 성공 시 isLoggedIn 상태를 true로 설정

          navigate("/"); // 로그인이 완료되면 '/'로 이동
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setIsLoggedIn, navigate]);

  axios.interceptors.request.use(
    (config) => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div>
      <button onClick={handleLogin} style={{ width: "100%", border: "none", background: "none" }}>
        <img src={kakaologin} alt="naverLogin" style={{ width: '80px', height: '80px' }} />
      </button>
    </div>
  );
}

export default KakaoLogin;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import kakaologin from "../images/kakaologin.png";

// function KakaoLogin() {
//   const BackURL = `http://localhost:8080/oauth2/authorization/kakao`;
//   const [userToken, setuserToken] = useState();

//   const handleLogin = () => {
//     console.log("로그인눌림");
//     window.location.href = BackURL;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get("accessToken");

//         if (code) {
//           console.log("토큰:", code);
//           const config = {
//             headers: {
//               Authorization: `Bearer ${code}`,
//             },
//           };

//           const response = await axios.get('https://kapi.kakao.com/v2/user/me', config);
//           console.log("카카오API 응답:", response.data);
//           const nickname = response.data.properties.nickname;
//           setuserToken(nickname);

//           localStorage.clear();
//           localStorage.setItem("token", code);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   axios.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return (
//     <div>
//       <button onClick={handleLogin} style={{ width: "100%", border: "none", background: "none" }}>
//         <img src={kakaologin} alt="naverLogin" style={{ width: '80px', height: '80px' }} />
//       </button>
//     </div>
//   );
// }

// export default KakaoLogin;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import kakaologin from "../images/kakaologin.png";

// function KakaoLogin() {
//   const BackURL = `http://localhost:8080/oauth2/authorization/kakao`;

//   const [userNickname, setUserNickname] = useState();

//   const handleLogin = () => {
//     console.log("로그인눌림");
//     window.location.href = BackURL;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get("accessToken");

//         //서버 accessToken받아오기 성공 했을 경우
//         if (code) {
//           console.log("토큰:", code);

//           // 헤더를 사용하여 카카오API에 요청 보내기
//           const response = await axios.get('https://kapi.kakao.com/v2/user/me', config);
//           console.log("카카오API 응답:", response.data);
//           const nickname = response.data.properties.nickname;
//           setUserNickname(nickname);

//           localStorage.clear();
//           localStorage.setItem("token", code);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <button onClick={handleLogin} style={{ width: "100%", border: "none", background: "none" }}>
//         <img src={kakaologin} alt="naverLogin" style={{ width: '80px', height: '80px' }} />
//       </button>
//     </div>
//   );
// }

// export default KakaoLogin;
