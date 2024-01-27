// import { useEffect } from "react";
// import axios from "axios";

// const Auth = () => {
//   const params = new URL(document.URL).searchParams;
//   const code = params.get("code");

//   useEffect(() => {
//     const sendDataToBackend = async () => {
//       try {
//         let authorizationUrl = "";

//         if (code) {
//           if (code.startsWith("카카오에서 받아온 토큰의 시작 부분")) {
//             authorizationUrl = "http://localhost:8080/oauth2/authorization/kakao";
//           } else if (code.startsWith("네이버에서 받아온 토큰의 시작 부분")) {
//             authorizationUrl = "http://localhost:8080/oauth2/authorization/naver";
//           } else if (code.startsWith("구글 받아온 토큰의 시작 부분")) {
//             authorizationUrl = "http://localhost:8080/oauth2/authorization/google";
//           }

//           await axios.post(authorizationUrl, { accessToken: code });
//           console.log("Code sent to backend successfully!");
//         }
//       } catch (error) {
//         console.error("Failed to send code to backend:", error);
//       }
//     };

//     sendDataToBackend();
//   }, [code]);

//   return <div>{code}</div>;
// };

// export default Auth;




// // const Auth = () => {
// //   const params = new URL(document.URL).searchParams;
// //   const code = params.get("code");

// //   return <div>{code}</div>;
// // };

// // export default Auth;



// // import { useEffect } from "react";
// // import axios from "axios";

// // const Auth = () => {
// //   useEffect(() => {
// //     const params = new URL(document.URL).searchParams;
// //     const code = params.get("code");

// //     const sendDataToBackend = async () => {
// //       try {
// //         await axios.post("http://localhost:8080/login", { code });
// //         console.log("Code sent to backend successfully!");
// //       } catch (error) {
// //         console.error("Failed to send code to backend:", error);
// //       }
// //     };

// //     if (code) {
// //       sendDataToBackend();
// //     }
// //   }, []);

// //   return null;
// // };

// // export default Auth;