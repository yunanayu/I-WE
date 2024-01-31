import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import RecordBaby from "./pages/RecordBaby";
import RecordMom from "./pages/RecordMom";
import MainPage from "./pages/MainPage";
import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
import AddBabyRecordPage from "./pages/HospitalRecordPage/AddBabyRecordPage";
import AddMomRecordPage from "./pages/HospitalRecordPage/AddMomRecordPage";
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
        <Route path="/recordmom" element={<RecordMom />} />
        <Route path="/recordbaby" element={<RecordBaby />} />
        <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
        <Route path="/babyhospitalrecord" element={<AddBabyRecordPage />} />
        <Route path="/momhospitalrecord" element={<AddMomRecordPage />} />
      </Routes>
    </div>
  );
}
export default App;
