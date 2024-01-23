import axios from "axios";
import naverLogin from "../images/naverlogin.png";

function NaverLogin() {
  const Rest_api_key = "Ms3dTzEKxVT4uW7mI3vC";
  const redirect_uri = "http://localhost:3000/auth";
  const state = "AZ4ZyeTrwO";
  const NaverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${Rest_api_key}&response_type=code&redirect_uri=${redirect_uri}&state=${state}`;

  const handleLogin = () => {
    window.location.href = NaverURL;
  };

  const handleAccessToken = (code) => {
    axios.post("https://api.example.com/token", { code })
      .then((response) => {
        const accessToken = response.data.access_token;
        // Access Token을 사용하여 추가적인 작업 수행
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <img src={naverLogin} alt="naverLogin" onClick={handleLogin} className="h-20" />
  );
}

export default NaverLogin;
