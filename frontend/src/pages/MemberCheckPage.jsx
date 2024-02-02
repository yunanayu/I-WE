import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


// const theme = createTheme({
//   typography: {
//     fontFamily: 'Nanum Gothic, sans-serif',
//   },
// });


function MemberCheckPage({ setSpouseStatus }) {
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState(""); // 선택된 멤버 (husband, wife)

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  const handleConfirm = () => {
    if (selectedMember === "husband") {
      // 남편인 경우, 공유 코드 입력 페이지로 이동
      navigate("/inputShareCode");
    } else if (selectedMember === "wife") {
      // 아내인 경우, 아이 추가 페이지로 이동
      navigate("/addChild");
    } else {
      // 선택된 멤버가 없는 경우 예외 처리
      console.error("멤버를 선택해주세요.");
    }
  };

  return (
    <div>
      <h2>남편인지 아내인지 선택해주세요.</h2>
      <div>
        <button onClick={() => handleSelectMember("husband")}>남편</button>
        <button onClick={() => handleSelectMember("wife")}>아내</button>
      </div>
      <button onClick={handleConfirm}>확인</button>
    </div>
  );
}

export default MemberCheckPage;