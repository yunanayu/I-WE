// import axios from "axios";
// // import kakaologin from "../images/kakaologin.png";

// function KakaoLogin() {
//   const Rest_api_key = "cbf2a4cf73492b91b5ee284c75cb34a5";
//   const redirect_uri = "http://localhost:3000/auth";
//   const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

//   const handleLogin = () => {
//     window.location.href = KakaoURL;
//   };

//   const handleAccessToken = (code) => {
//     axios.post("https://api.example.com/token", { code })
//       .then((response) => {
//         const accessToken = response.data.access_token;
//         // Access Token을 사용하여 추가적인 작업 수행
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };


//   return (
//     <a alt="kakaologin" onClick={handleLogin} className="w-full h-20">kakao</a>
//     // <img src={kakaologin} alt="kakaologin" onClick={handleLogin} className="w-full h-20" />

//   );
// }

// export default KakaoLogin;

import axios from "axios";
import kakaologin from "../images/kakaologin.png";

function KakaoLogin() {
  const Rest_api_key = "";
  const redirect_uri = "http://localhost:3000/auth";
  const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KakaoURL;
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
    <div>
      <button onClick={handleLogin} style={{ width: '100%', border: 'none', background: 'none' }}>
        <img src={kakaologin} alt="kakaologin" style={{ width: '80px', height: '80px' }} />
      </button>
    </div>
  );
}

export default KakaoLogin;
