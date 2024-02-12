import { Option, Select } from "@mui/joy";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useMemberStore from "../../../stores/userStore";
import ReadVaccinCard from "./../ReadVaccinCard";
import CheckCard from "./CheckCard";
import { sortList } from "./CheckPanel";

const MotherCheck = () => {
  const userNum = useMemberStore((state) => state.userNum);
  const babyList = useMemberStore((state) => state.babyList);
  const [momCheckList, setMomCheckList] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [type, setType] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/check/mother/${userNum}`)
      .then((res) => setMomCheckList(sortList(res.data)))
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
  return (
    <Box>
      {babyList[babyList.length - 1].status ? (
        "해당사항이 없습니다."
      ) : (
        <>
          <Select variant="plain" placeholder="검진/ 접종 여부 선택">
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
          {vaccineList.map((item, index) => {
            return <CheckCard key={index} item={item} num={userNum} />;
          })}
        </>
      )}
    </Box>
  );
};

export default MotherCheck;
