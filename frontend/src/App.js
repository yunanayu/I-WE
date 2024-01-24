import {RouterProvider, BrowserRouter, Route, Routes} from "react-router-dom";
import root from "./router/root";
// import KakaoRedirect from "./components/login/kakao/KakaoRedirect";
// import GoogleRedirect from "./components/login/google/GoogleRedirect";
// import NaverRedirect from "./components/login/naver/NaverRedirect";


function App() {
  return (
    <RouterProvider router={root}></RouterProvider>
  );
}
export default App;