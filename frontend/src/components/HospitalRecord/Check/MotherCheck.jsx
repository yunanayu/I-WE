import { Option, Select } from "@mui/joy";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMemberStore from "../../../stores/userStore";
import ReadVaccinCard from "./../ReadVaccinCard";
import CheckCard from "./CheckCard";
import { sortList } from "./CheckPanel";
import RangeSlider from "./RangeSlider";

const MotherCheck = () => {
  const userNum = useMemberStore((state) => state.userNum);
  const babyList = useMemberStore((state) => state.babyList);
  const motherNum = babyList[babyList.length -1].motherNum
  const babyNum = babyList[babyList.length -1].num
  console.log(babyNum)
  const [momCheckList, setMomCheckList] = useState([]);
  // 필터링 되어 저장되는 값
  const [vaccineList, setVaccineList] = useState([]);
  const [type, setType] = useState("all");
  const [selectRange, setSelectRange] = useState([0, 40]);
  useEffect(() => {
    axios
      .get(`/api/check/mother/${userNum}/${babyNum}`)
      .then((res) => {
        setMomCheckList(sortList(res.data));
        setVaccineList(sortList(res.data));
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (type === "all") {
      setVaccineList(momCheckList);
    } else {
      const list = momCheckList.filter((item) => {
        return item.category === type;
      });
      setVaccineList(list);
    }
  }, [type]);

  // useEffect(() => {
  //   if (type === "all") {
  //     setVaccineList(momCheckList);
  //   } else {
  //     const filteredList = momCheckList.filter(
  //       (item) => item.category === type
  //     );
  //     setVaccineList(filteredList);
  //   }
  // }, [type, momCheckList]);

  // useEffect(() => {
  //   const filteredList = momCheckList.filter((item) => {
  //     const { startTime, endTime } = item;
  //     return startTime >= selectRange[0] && endTime <= selectRange[1];
  //   });
  //   setVaccineList(filteredList);
  // }, [selectRange, momCheckList]);

  return (
    <Box>
      {babyList[babyList.length - 1].status ? (
        "해당사항이 없습니다."
      ) : (
        <>
          {/* <Select variant="plain" placeholder="검진/ 접종 여부 선택"> */}
          <Select variant="plain" defaultValue="all">
            <Option value="all" onClick={() => setType("all")}>
              접종 / 검진
            </Option>
            <Option value="접종" onClick={() => setType("접종")}>
              접종
            </Option>
            <Option value="검진" onClick={() => setType("검사")}>
              검진
            </Option>
          </Select>
          {/* <RangeSlider setSelectRange={setSelectRange} target="mother" /> */}
          {vaccineList.map((item, index) => {
            return <CheckCard key={index} item={item} num={motherNum} />;
          })}
        </>
      )}
    </Box>
  );
};

export default MotherCheck;
