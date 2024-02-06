import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useMemberStore from '../stores/userStore';

function CheckCode({setSpouseStatus}) {
  const navigate = useNavigate();
  const [familycode, setfamilyCode] = useState('');
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  console.log(familycode)

  const handleCheckCode = async () => {
    var code;
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'token') {
        code = cookieValue;
      }
    }

    var userNum;

    // 사용자 정보 요청해서 Authorization에 넣기
    try {
      const response = await axios.get('/api/member',
        {
          headers: {
            'Authorization' : code
          }
        }
      );
      userNum = response.data.num;
    } catch(e) {
      console.log("회원정보 받아오기 실패")
    }
    console.log(userNum);

    // 아기정보 get
    // try {
    //   const response = await axios.get(`/api/baby`, requestBaby, // requestBaby 정보 전달
    //   {
    //       headers: {
    //         'Authorization' : code
    //       }
    //     }
    //   );
    //   console.log(response.data);
    // } catch(e) {
    //   console.log("아기정보 등록 실패")
    // }
    // console.log("아기정보 등록 성공")
    // navigate("/");

    // 공유코드로 fatherNum에 userNum 넣기
    try {
      const response = await axios.put(`/api/family/share`, {
        fatherNum : userNum,
        code: familycode
      });

      console.log(response.data);
    } catch (error) {
      console.log('코드 확인 실패', error);
    }
    console.log("코드 확인 성공")
    navigate("/");
  };

  return (
      <div>
        <h1>코드 확인 페이지</h1>
        <input type="text" value={familycode} onChange={(e) => setfamilyCode(e.target.value)} />
        <button onClick={handleCheckCode}>확인</button>
      </div>
    );

}

export default CheckCode;