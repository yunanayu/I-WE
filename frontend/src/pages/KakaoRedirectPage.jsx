import React, { useEffect } from "react";
import axios from "axios";
import kakaologin from "../images/kakaologin.png";
import { useNavigate } from "react-router-dom";
import { requestPermission } from "../FCM/firebase-messaging-sw";
import { getUserInfo } from "../api/UserApi";
import useMemberStore, { setMember } from "../stores/userStore";

function KakaoLogin({ setIsLoggedIn }) {
  const BackURL = process.env.REACT_APP_KAKAO_LOGIN_URL || `/oauth2/authorization/kakao`;
  const navigate = useNavigate();
  const setBabyList = useMemberStore(state => state.setBabyList)
  const setUserNum = useMemberStore(state => state.setUserNum)
  // const setUserName = useMemberStore(state => state.setUserName)
  const setParentType = useMemberStore(state => state.setParentType)
  const handleLogin = () => {
    // console.log(process.env.REACT_APP_KAKAO_LOGIN_URL);
    window.location.href = BackURL;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("accessToken");
        const status = urlParams.get("status");

      if (code && status === 'success') {
        // console.log("토큰:", code);
        document.cookie = `token=${code}`;
        setIsLoggedIn(true); // 로그인 성공 시 isLoggedIn 상태를 true로 설정    
        setMember()
        // 알림 허용 req 
        requestPermission()
        navigate("/"); // 로그인이 완료되면 '/'로 이동
      } 
      else if (code && status === 'addInfo') {
        // console.log("토큰:", code);
        document.cookie = `token=${code}`;
        setIsLoggedIn(true); // 로그인 성공 시 isLoggedIn 상태를 true로 설정
        // 추가정보입력
        navigate("/addInfo"); // 로그인이 완료되면 '/'로 이동
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
        config.headers.Authorization = `${token}`;
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
        <img src={kakaologin} alt="kakaologin" style={{ width: '80px', height: '80px' }} />
      </button>
    </div>
  );
}

export default KakaoLogin;