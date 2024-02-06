import React, { useState } from 'react';
import axios from 'axios';
import useMemberStore from '../stores/userStore';

const CheckCodePage = () => {
  // 입력받은 code
  const [code, setCode] = useState('');
  // 저장된 familyNum 확인하기
  const userNum = useMemberStore(state => state.userNum)
  const familyNum = useMemberStore(state => state.familyNum)

  // 아빠가 입력한 familyNum이 기존에 존재하는지 확인해야함

  const handleConfirm = async () => {
    try {
      // 입력한 코드 값 확인 로직
      
      // 기존에 존재하는 값과 동일한 경우에 '/'로 이동
      if (code === familyNum) {
        window.location.href = '/';
      } else {
        console.log('입력한 코드와 기존 코드가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log('코드 확인에 실패했습니다.', error);
    }
  };

  return (
    <div>
      <h1>코드 확인 페이지</h1>
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleConfirm}>확인</button>
    </div>
  );
};

export default CheckCodePage;
