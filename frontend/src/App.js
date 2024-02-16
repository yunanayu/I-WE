import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CssBaseline from '@mui/material/CssBaseline';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Face3Icon from '@mui/icons-material/Face3';
import PersonIcon from '@mui/icons-material/Person';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import RecordBaby from "./pages/RecordBaby";
import RecordMom from "./pages/RecordMom";
import MainPage from "./pages/MainPage";
import InfoMain from "./pages/InfoPage/InfoMainPage";
import MemberCheck from "./pages/MemberCheckPage";
import CheckCode from "./pages/CheckCodePage";
import AddChild from "./pages/AddChildPage";
import MyPage from "./pages/MyPage";
import DiaryPage from "./pages/DiaryPage"
import Chat from "./pages/WebSocketComponent"
import FindHospital from "./pages/FindHospitalPage"
import Community from "./pages/CommunityPage";

import HospitalRecordMainPage from "./pages/HospitalRecordPage/HospitalRecordMainPage";
import AddMomRecordPage from "./pages/HospitalRecordPage/AddHospitalRecordPage";
import UpdateHospitalRecord from "./pages/HospitalRecordPage/UpdateHospitalRecord";
import ChildList from "./components/myPage/ChildList";
import CodeSharePage from "./pages/MyPage/CodeSharePage";
import TestPage from './FCM/TestPage';
import InfoFather from "./components/father/InfoFather";


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

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
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
            <Route path="/chat" element={<Chat />} />

            <Route path="/recordmom" element={<RecordMom />} />
            <Route path="/recordbaby" element={<RecordBaby />} />
            <Route path="/hospitalrecord" element={<HospitalRecordMainPage />} />
            <Route path="/addrecord" element={<AddMomRecordPage />} />
            <Route path="/updaterecord" element={<UpdateHospitalRecord />} />
            <Route path="/babylist" element={<ChildList />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/fatherinfo" element={<InfoFather />} />
            <Route path="/codeshare" element={<CodeSharePage onLoginStatusChange={handleLoginStatusChange}/>} />
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
              label="메인"
              value="home"
              icon={<HomeIcon />}
              style={{ color: value === 'home' ? 'white' : 'inherit' }}
              onClick={() => setValue('home')}
            />
            <BottomNavigationAction
              component={Link}
              to="/hospitalrecord"
              label="병원기록"
              value="hospital"
              icon={<VaccinesIcon />}
              style={{ color: value === 'hospital' ? 'white' : 'inherit' }}
              onClick={() => setValue('hospital')}
            />
            <BottomNavigationAction
              component={Link}
              to="/recordmom"
              label="엄마기록"
              value="mom"
              icon={<Face3Icon/>}
              style={{ color: value === 'mom' ? 'white' : 'inherit' }}
              onClick={() => setValue('mom')}
            />
            <BottomNavigationAction
              component={Link}
              to="/recordbaby"
              label="아기기록"
              value="baby"
              icon={<ChildCareIcon/>}
              style={{ color: value === 'baby' ? 'white' : 'inherit' }}
              onClick={() => setValue('baby')}
            />
            <BottomNavigationAction
              component={Link}
              to="/mypage"
              label="내정보"
              value="mypage"
              icon={<AssignmentIndIcon/>}
              style={{ color: value === 'mypage' ? 'white' : 'inherit' }}
              onClick={() => setValue('mypage')}
            />
            </BottomNavigation>
          </div>
        )}
      </div>
    );
}
export default App;
