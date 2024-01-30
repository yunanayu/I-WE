import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import RecordBaby from "./pages/RecordBaby";
import RecordMom from "./pages/RecordMom";
import MainPage from "./pages/MainPage";
import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
import "./App.css";


function App() {

  const [parentLoggedIn, setParentLoggedIn] = useState(false);
  const handleLoginStatusChange = (status) => {
    // Update the parent component state
    setParentLoggedIn(status);
  };

  return (
    <div className="App">
      {parentLoggedIn ? <ResponsiveAppBar /> : <></>}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainPage
              onLoginStatusChange={handleLoginStatusChange}
            />
          }
        />
        <Route
          exact
          path="/loginSuccess"
          element={
            <MainPage
              onLoginStatusChange={handleLoginStatusChange}
            />
          }
        />
        <Route path="/recordmom" element={<RecordMom />} />
        <Route path="/recordbaby" element={<RecordBaby />} />
        <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
      </Routes>
    </div>
  );
}
export default App;


// import React, { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
// import RecordBaby from "./pages/RecordBaby";
// import RecordMom from "./pages/RecordMom";
// import MainPage from "./pages/MainPage";
// import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
// import "./App.css"; // CSS 파일을 import 합니다.


// function App() {

//   const [parentLoggedIn, setParentLoggedIn] = useState(false);
//   const handleLoginStatusChange = (status) => {
//     // Update the parent component state
//     setParentLoggedIn(status);
//   };

//   return (
//     <div className="App">
//       {parentLoggedIn ? <ResponsiveAppBar /> : <></>}
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={<MainPage onLoginStatusChange={handleLoginStatusChange} />}
//         />
//         <Route
//           exact
//           path="/loginSuccess"
//           element={<MainPage onLoginStatusChange={handleLoginStatusChange} />}
//         />
//         <Route path="/recordmom" element={<RecordMom />} />
//         <Route path="/recordbaby" element={<RecordBaby />} />
//         <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
//       </Routes>
//     </div>
//   );
// }
// export default App;
