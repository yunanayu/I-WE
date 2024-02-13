import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import CssBaseline from '@mui/material/CssBaseline';
import NotificationsIcon from '@mui/icons-material/Notifications';

import RecordBaby from "./pages/RecordBaby";
import RecordMom from "./pages/RecordMom";
import MainPage from "./pages/MainPage";
import InfoMain from "./pages/InfoPage/InfoMainPage";
import MemberCheck from "./pages/MemberCheckPage";
import CheckCode from "./pages/CheckCodePage";
import AddChild from "./pages/AddChildPage";
import MyPage from "./pages/MyPage";
import DiaryPage from "./pages/DiaryPage"
import FindHospital from "./pages/FindHospitalPage"
import Community from "./pages/CommunityPage";

import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
import AddMomRecordPage from "./pages/HospitalRecordPage/AddHospitalRecordPage";
import UpdateHospitalRecord from "./pages/HospitalRecordPage/UpdateHospitalRecord";
import InfoSection from "./components/Infos/InfoSection";


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

  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
      <div className="App" style={{marginBottom: 55}}>
        <CssBaseline/>
        {parentLoggedIn ? (
          <ResponsiveAppBar style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}/>
        ) : (
          <></>
        )}        
        <div>
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
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="/hospital" element={<FindHospital />} />
            <Route path="/community" element={<Community />} />

            <Route path="/recordmom" element={<RecordMom />} />
            <Route path="/recordbaby" element={<RecordBaby />} />
            <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
            <Route path="/momhospitalrecord" element={<AddMomRecordPage />} />
            <Route path="/updaterecord" element={<UpdateHospitalRecord />} />
          </Routes>
        </div>
        {parentLoggedIn && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999 }}>
          <BottomNavigation
            value={value}
            onChange={handleChange}
            position="fixed"
            sx={{ width: '100%', backgroundColor: '#FBBBB8'}}
          >
            <BottomNavigationAction
              component={Link}
              to="/"
              label="Home"
              value="home"
              icon={<HomeIcon />}
              style={{ color: value === 'home' ? 'white' : 'inherit' }}
              onClick={() => setValue('home')}
            />
            <BottomNavigationAction
              component={Link}
              to="/diary"
              label="calendar"
              value="calendar"
              icon={<CalendarMonthIcon/>}
              style={{ color: value === 'calendar' ? 'white' : 'inherit' }}
              onClick={() => setValue('calendar')}
            />
            <BottomNavigationAction
              component={Link}
              to="/community"
              label="board"
              value="board"
              icon={<ContentPasteIcon/>}
              style={{ color: value === 'board' ? 'white' : 'inherit' }}
              onClick={() => setValue('board')}
            />
            <BottomNavigationAction
              component={Link}
              to="/alert"
              label="alert"
              value="alert"
              icon={<NotificationsIcon/>}
              style={{ color: value === 'alert' ? 'white' : 'inherit' }}
              onClick={() => setValue('alert')}
            />
            </BottomNavigation>
          </div>
        )}
      </div>
    );
}
export default App;
