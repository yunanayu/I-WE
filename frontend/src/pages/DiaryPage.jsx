import React from "react";
import commingsoon from "../images/soon.png";

function Diary() {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <h2>서비스 준비 중입니다</h2>
          <img src={commingsoon} alt="commingsoon" style={{ width: '90%' }} />
        </div>
      </>
    );
  }
  
  export default Diary; 
