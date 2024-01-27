import React, { useEffect, useState } from "react";
import axios from "axios";
import kakaologin from "../images/kakaologin.png";

function KakaoLogin() {
  const BackURL = `http://localhost:8080/oauth2/authorization/kakao`;

  const [userNickname, setUserNickname] = useState();

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

          // 카카오API 헤더 추출을 위한 요청 설정
          const config = {
            headers: {
              Authorization: `Bearer ${code}`, // 카카오API 헤더에 accessToken 추가
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          };

          // 헤더를 사용하여 카카오API에 요청 보내기
          const response = await axios.get('https://kapi.kakao.com/v2/user/me', config);
          console.log("카카오API 응답:", response.data);
          const nickname = response.data.properties.nickname;
          setUserNickname(nickname);

          window.location.href="/";
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button
        onClick={handleLogin}
        style={{ width: "100%", border: "none", background: "none" }}
      >
        <img
          src={kakaologin}
          alt="kakaologin"
          style={{ width: "80px", height: "80px" }}
        />
      </button>
      <h2>사용자 정보</h2>
      <p>닉네임: {userNickname}</p>
    </div>
  );
}

export default KakaoLogin;