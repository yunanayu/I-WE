import React, { useState } from 'react';
import axios from 'axios';

const CheckCodePage = () => {
  const [code, setCode] = useState('');

  // 아빠가 입력한 familyNum이 기존에 존재하는지 확인해야함

  const handleConfirm = async () => {
    try {
      // 입력한 코드 값 확인 로직
      // 해당 url
      const response = await axios.get(`/api/code/${code}`);
      const existingCode = response.data.code;

      // 기존에 존재하는 값과 동일한 경우에 '/'로 이동
      if (code === existingCode) {
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
