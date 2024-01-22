import { useState } from "react";

const useCustomSignup = () => {
  const [loading, setLoading] = useState(false);

  const doSignup = async (signupParam) => {
    setLoading(true);

    try {
      // 회원가입 요청을 서버에 보내는 비동기 함수를 호출합니다.
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupParam),
      });

      const data = await response.json();

      setLoading(false);

      return data;
    } catch (error) {
      setLoading(false);
      console.error("회원가입 실패:", error);
      return { error: "회원가입에 실패했습니다." };
    }
  };

  const moveToPath = (path) => {
    // 홈으로 이동하는 함수를 구현합니다.
    // 예시로 window.location.href를 사용했습니다.
    window.location.href = path;
  };

  return {
    doSignup,
    moveToPath,
    loading,
  };
};

export default useCustomSignup;
