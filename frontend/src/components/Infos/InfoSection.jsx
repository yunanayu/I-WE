import axios from "axios";
import React, { useEffect } from "react";

const InfoSection = () => {
  useEffect(() => {
    const API_URL =
      "https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=0&limit=10";
    axios.get(API_URL).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <p>ㅎㅇㅎㅇ</p>
    </div>
  );
};

export default InfoSection;
