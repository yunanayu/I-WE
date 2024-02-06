import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './reducers'; // rootReducer는 여러 개의 리듀서를 합친 것입니다.

import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import RecordBaby from "./pages/RecordBaby";
import RecordMom from "./pages/RecordMom";
import MainPage from "./pages/MainPage";
import InfoMain from "./pages/InfoPage/InfoMainPage";
import InfoMom from "./pages/InfoPage/InfoMomPage";
import InfoBaby from "./pages/InfoPage/InfoBabyPage";
import InfoForBaby from "./pages/InfoPage/InfoForBabyPage";
import TipPage from "./pages/TipPage";
import MemberCheck from "./pages/MemberCheckPage";
import CheckCode from "./pages/CheckCodePage";
import AddChild from "./pages/AddChildPage";

import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
import AddBabyRecordPage from "./pages/HospitalRecordPage/AddBabyRecordPage";
import AddMomRecordPage from "./pages/HospitalRecordPage/AddMomRecordPage";
import UpdateHospitalRecord from "./pages/HospitalRecordPage/UpdateHospitalRecord";
// import './FCM/firebase-messaging-sw'

// const store = createStore(rootReducer);


function App() {

  const [parentLoggedIn, setParentLoggedIn] = useState(false);
  const handleLoginStatusChange = (status) => {
    // Update the parent component state
    setParentLoggedIn(status);
  };

  
  useEffect(() => {
    if (document.cookie) {
      handleLoginStatusChange(true); // 로그인 성공 시 상태를 true로 설정
    } else {
      handleLoginStatusChange(false); // 로그아웃 또는 로그인 실패 시 상태를 false로 설정
  }
  }, []);

  return (
    // <Provider store={store}> {/* Provider로 store를 전달 */}
      <div className="App">
        {parentLoggedIn ? <ResponsiveAppBar /> : <></>}
        {/* <ResponsiveAppBar></ResponsiveAppBar> */}
        <Routes>
          <Route
            exact
            path="/"
            element={<MainPage onLoginStatusChange={handleLoginStatusChange} />}
          />
          <Route
            exact
            path="/loginSuccess"
            element={<MainPage onLoginStatusChange={handleLoginStatusChange} />}
          />
          <Route
            exact
            path="/addInfo"
            element={<MemberCheck onLoginStatusChange={handleLoginStatusChange} />}
          />
          <Route
            exact
            path="/inputShareCode"
            element={<CheckCode onLoginStatusChange={handleLoginStatusChange} />}
          />
          <Route
            exact
            path="/addChild"
            element={<AddChild onLoginStatusChange={handleLoginStatusChange} />}
          />
          <Route path="/infomain" element={<InfoMain />} />
          <Route path="/infomom" element={<InfoMom />} />
          <Route path="/infobaby" element={<InfoBaby />} />
          <Route path="/infoforbaby" element={<InfoForBaby />} />

        <Route path="/recordmom" element={<RecordMom />} />
        <Route path="/recordbaby" element={<RecordBaby />} />
        <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
        <Route path="/babyhospitalrecord" element={<AddBabyRecordPage />} />
        <Route path="/momhospitalrecord" element={<AddMomRecordPage />} />
        <Route path="/updaterecord" element={<UpdateHospitalRecord />} />
        <Route path="/tips" element={<TipPage />} />
      </Routes>
    </div>
    );
}
export default App;
