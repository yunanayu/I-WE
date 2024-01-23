import {RouterProvider, BrowserRouter, Route, Routes} from "react-router-dom";
import root from "./router/root";
// import KakaoRedirect from "./components/login/kakao/KakaoRedirect";
// import GoogleRedirect from "./components/login/google/GoogleRedirect";
// import NaverRedirect from "./components/login/naver/NaverRedirect";


function App() {
  return (
    <RouterProvider router={root}></RouterProvider>
    // <Routes>
    //   <Route path="/" element={<MainPage />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/authkakao" element={<KakaoRedirect />} />
    //   <Route path="/authgoogle" element={<GoogleRedirect />} />
    //   <Route path="/authnaver" element={<NaverRedirect />} 
    // </Routes>
  );
}
export default App;