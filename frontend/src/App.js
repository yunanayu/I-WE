import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import RecordBaby from "./pages/RecordBaby";
import RecordMom from "./pages/RecordMom";
import MainPage from "./pages/MainPage";
import InfoMain from "./pages/InfoPage/InfoMainPage";
import InfoMom from "./pages/InfoPage/InfoMomPage";
import InfoBaby from "./pages/InfoPage/InfoBabyPage";
import InfoDad from "./pages/InfoPage/InfoDadPage";

import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
// import './FCM/firebase-messaging-sw'

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
          element={<MainPage onLoginStatusChange={handleLoginStatusChange} />}
        />
        <Route
          exact
          path="/loginSuccess"
          element={<MainPage onLoginStatusChange={handleLoginStatusChange} />}
        />
        <Route path="/infomain" element={<InfoMain />} />
        <Route path="/infomom" element={<InfoMom />} />
        <Route path="/infobaby" element={<InfoBaby />} />
        <Route path="/infodad" element={<InfoDad />} />
        <Route path="/recordmom" element={<RecordMom />} />
        <Route path="/recordbaby" element={<RecordBaby />} />
        <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
      </Routes>
    </div>
  );
}
export default App;
