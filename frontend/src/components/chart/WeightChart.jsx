import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsTooltip, ChartsXAxis, ChartsYAxis } from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { Typography } from "@mui/material";

// 엄마 주차별 몸무게 막대 그래프
function WeeklyWeightChart(props) {
  // num, motherNum, weight, recordDate
  const [momRecord, setMomRecord] = useState([]);
  // const babyRecord = props.babyRecord;

  const [selectedInterval, setSelectedInterval] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [momWeight, setMomWeight] = useState();

  useEffect(() => {
    // Call generateData when the component mounts
    const newData = generateData(selectedInterval);
    setChartData(newData);
  }, [selectedInterval]);

  useEffect(() => {
    if (props.recordData) {
      setMomRecord(props.recordData);
    }
    const newData = generateData(selectedInterval);
    setChartData(newData);
  }, [selectedInterval, props.recordData]);

  useEffect(() => {
    if (props.recordData) {
      const weightArr = momRecord.map((obj) => {
        return {
          weight: obj.weight,
          date: obj.recordDate,
        };
      });
      setMomWeight(weightArr);
      const newData = generateData(selectedInterval);
      setChartData(newData);
    }
  }, [momRecord]);

  useEffect(() => {
    if (momWeight && selectedInterval) {
      const newData = generateData(selectedInterval);
      setChartData(newData);
    }
  }, [momWeight, selectedInterval, props.recordData]);

  const handleToggleInterval = (event, newInterval) => {
    if (newInterval !== null) {
      setSelectedInterval(newInterval);
    }
  };

  const generateData = (interval) => {
    // console.log("momWeight : ???? " + JSON.stringify(momWeight));
    if (momWeight) {
      if (interval === 1) {
        let length = momWeight.length;
        // console.log(length);
        if (length < 6) {
          let tmp = momWeight.slice(0 - length);
          return tmp.map((obj) => {
            return { ...obj, date: obj.date.substr(5) };
          });
        }
        let tmp = momWeight.slice(-6);
        return tmp.map((obj) => {
          return { ...obj, date: obj.date.substr(5) };
        });
      } else if (interval === 2) {
        if (momWeight.length === 0) {
          return [];
        }
        let tmp = [];
        let arr = [...momWeight];
        arr.reverse();
        // console.log("뒤집어따 " + JSON.stringify(arr));
        let start = 0;
        for (let i = 0; i < 6; i++) {
          if (!arr[start]) break;
          let startDate = new Date(arr[start].date);
          let endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() - startDate.getDay());
          // console.log(endDate);
          let sum = arr[start].weight;
          let s = 1;
          for (let j = start + 1; j < start + 7; j++) {
            if (!arr[j] || new Date(arr[j].date).getDay() >= startDate.getDay() || startDate.getDate() - new Date(arr[j].date).getDate() > 6) {
              // console.log("조건 브레이크");
              break;
            }
            sum += arr[j].weight;
            s++;
          }
          start = start + s;
          // console.log("s ======== " + s);
          // console.log("start === " + start);
          // console.log("sum ==== " + sum);
          var arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];
          let dateString;
          dateString =
            ("0" + (endDate.getMonth() + 1)).slice(-2) +
            "-" +
            endDate.getDate() +
            "\n~" +
            ("0" + (startDate.getMonth() + 1)).slice(-2) +
            "-" +
            startDate.getDate();

          // console.log("몸무게 : " + (sum / s).toFixed(1) + "\n" + dateString);
          tmp.unshift({
            weight: (sum / s).toFixed(1),
            date: dateString,
          });
        }
        return tmp;
      } else if (interval === 3) {
        let tmp = [];
        let j = 1;
        for (let i = 0; i < 6; i++) {
          if (momWeight.length < j) {
            break;
          }
          let startDate = new Date(momWeight.at(0 - j).date);
          let wol = startDate.getMonth();
          let sum = momWeight.at(0 - j).weight;
          let endDate;
          let cnt = 1;
          j++;
          while (momWeight.length >= j) {
            endDate = new Date(momWeight.at(0 - j).date);
            let nextWol = endDate.getMonth();
            if (wol !== nextWol) break;
            sum += momWeight.at(0 - j).weight;
            cnt++;
            j++;
          }
          // console.log((sum / cnt).toFixed(1));
          tmp.unshift({
            weight: (sum / cnt).toFixed(1),
            date: wol + 1 + "월",
          });
        }
        return tmp;
      }
    }
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={24}> 날짜별 체중 </Typography>
      </Box>
      <ToggleButtonGroup size="small" value={selectedInterval} exclusive onChange={handleToggleInterval} aria-label="select-interval" sx={{ mb: 3 }}>
        <ToggleButton value={1}>일별</ToggleButton>
        <ToggleButton value={2}>주별</ToggleButton>
        <ToggleButton value={3}>월별</ToggleButton>
      </ToggleButtonGroup>

      <Paper sx={{ width: "100%", height: 300, paddingBottom: 1, mb: 2 }} elevation={3}>
        {/* @ts-ignore */}
        {chartData && ( // Render only if there is data
          <ResponsiveChartContainer
            series={[
              {
                type: "line",
                data: chartData.map((data) => data.weight),
                yAxisKey: "y-axis-id",
              },
            ]}
            xAxis={[
              {
                data: chartData.map((data) => data.date),
                scaleType: "band",
                id: "x-axis-id",
                tickLabelStyle: {
                  angle: 45,
                  dominantBaseline: "hanging",
                  textAnchor: "start",
                },
              },
            ]}
            yAxis={[
              {
                id: "y-axis-id",
                labelStyle: {
                  transform: "translateY(15px)",
                },
              },
            ]}
          >
            <LinePlot />
            <MarkPlot />
            <ChartsXAxis label="" position="bottom" axisId="x-axis-id" />
            <ChartsYAxis label="kg" position="left" axisId="y-axis-id" />
            <ChartsTooltip trigger="axis" />
          </ResponsiveChartContainer>
        )}
      </Paper>
    </Box>
  );
}

// 엄마 변화율 선 그래프 + 평균 변화율 막대 그래프
function ChangeChart(props) {
  const momRecord = props.recordData;
  const momBasis = props.basisData;
  const [babyData, setBabyData] = useState();
  const [status, setStatus] = useState();
  const [babyIndex, setBabyIndex] = useState();

  useEffect(() => {
    setBabyData(props.babyData);
    setStatus(props.status);
    setBabyIndex(props.babyIndex);
  }, [props]);

  // [주차][비만도 => 저체중, 평균, 과제충, 비만]
  const recommendWeightStart = [
    [0, 0, 0, 0],
    [0.04, 0.04, 0.04, 0.04],
    [0.08, 0.08, 0.08, 0.08],
    [0.1, 0.1, 0.1, 0.1],
    [0.2, 0.2, 0.2, 0.2],
    [0.2, 0.2, 0.2, 0.2],
    [0.2, 0.2, 0.2, 0.2],
    [0.3, 0.3, 0.3, 0.3],
    [0.3, 0.3, 0.3, 0.3],
    [0.4, 0.4, 0.4, 0.4],
    [0.4, 0.4, 0.4, 0.4],
    [0.5, 0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5, 0.5],
    [1.0, 0.9, 0.7, 0.7],
    [1.4, 1.3, 1.0, 0.8],
    [1.9, 1.7, 1.2, 1.0],
    [2.3, 2.1, 1.4, 1.2],
    [2.8, 2.5, 1.7, 1.3],
    [3.2, 2.9, 1.9, 1.5],
    [3.7, 3.3, 2.1, 1.7],
    [4.1, 3.7, 2.4, 1.8],
    [4.6, 4.1, 2.6, 2.0],
    [5.0, 4.5, 2.8, 2.2],
    [5.5, 4.9, 3.1, 2.3],
    [5.9, 5.3, 3.3, 2.5],
    [6.4, 5.7, 3.5, 2.7],
    [6.8, 6.1, 3.8, 2.8],
    [7.3, 6.5, 4.0, 3.0],
    [7.7, 6.9, 4.2, 3.2],
    [8.2, 7.3, 4.5, 3.3],
    [8.6, 7.7, 4.7, 3.5],
    [9.1, 8.1, 4.9, 3.7],
    [9.5, 8.5, 5.2, 3.8],
    [10.0, 8.9, 5.4, 4.0],
    [10.4, 9.3, 5.6, 4.2],
    [10.9, 9.7, 5.9, 4.3],
    [11.3, 10.1, 6.1, 4.5],
    [11.8, 10.5, 6.3, 4.7],
    [12.2, 10.9, 6.6, 4.8],
    [12.7, 11.3, 6.8, 5.0],
  ];

  const recommendWeightEnd = [
    [0, 0, 0, 0],
    [0.2, 0.2, 0.2, 0.2],
    [0.3, 0.3, 0.3, 0.3],
    [0.5, 0.5, 0.5, 0.5],
    [0.7, 0.7, 0.7, 0.7],
    [0.8, 0.8, 0.8, 0.8],
    [1.0, 1.0, 1.0, 1.0],
    [1.2, 1.2, 1.2, 1.2],
    [1.3, 1.3, 1.3, 1.3],
    [1.5, 1.5, 1.5, 1.5],
    [1.7, 1.7, 1.7, 1.7],
    [1.8, 1.8, 1.8, 1.8],
    [2.0, 2.0, 2.0, 2.0],
    [2.6, 2.5, 2.3, 2.3],
    [3.2, 3.0, 2.3, 2.3],
    [3.8, 3.5, 3.0, 2.8],
    [4.4, 4.1, 3.4, 3.0],
    [5.0, 4.6, 3.7, 3.3],
    [5.6, 5.1, 4.1, 3.6],
    [6.2, 5.6, 4.4, 3.8],
    [6.8, 6.1, 4.8, 4.1],
    [7.4, 6.6, 5.1, 4.4],
    [8.0, 7.1, 5.5, 4.6],
    [8.6, 7.7, 5.8, 4.9],
    [9.2, 8.2, 6.1, 5.1],
    [9.8, 8.7, 6.5, 5.4],
    [10.4, 9.2, 6.8, 5.7],
    [11.0, 9.7, 7.2, 5.9],
    [11.6, 10.2, 7.5, 6.2],
    [12.2, 10.7, 7.9, 6.5],
    [12.8, 11.2, 8.2, 6.7],
    [13.4, 11.8, 8.6, 7.0],
    [14.0, 12.3, 8.9, 7.2],
    [14.6, 12.8, 9.3, 7.5],
    [15.2, 13.3, 9.6, 7.8],
    [15.8, 13.8, 10.0, 8.0],
    [16.3, 14.3, 10.3, 8.3],
    [16.9, 14.8, 10.6, 8.5],
    [17.5, 15.4, 11.0, 8.8],
    [18.1, 15.9, 11.3, 9.1],
  ];

  const [momWeight, setMomWeight] = useState();
  const [basis, setBasis] = useState();
  const [bmi, setBmi] = useState();
  const [week, setWeek] = useState();
  const [chartData, setChartData] = useState([]);
  const [lineData, setLineData] = useState();

  useEffect(() => {
    if (momRecord && momBasis && babyData) {
      const weightArr = momRecord.map((obj) => {
        return {
          weight: obj.weight,
          date: obj.recordDate,
        };
      });
      setMomWeight(weightArr);
      setBasis(momBasis);
      setWeek(babyData[babyIndex].targetTime.substr(1));
      const bmi = (momBasis.basisWeight / (momBasis.height * momBasis.height)).toFixed(1);
      if (bmi < 18.5) {
        setBmi(0);
      } else if (bmi < 25) {
        setBmi(1);
      } else if (bmi < 30) {
        setBmi(2);
      } else {
        setBmi(3);
      }
    }
  }, [momRecord, momBasis, babyData, babyIndex]);

  useEffect(() => {
    if (momRecord) {
      const newData = generateData();
      setChartData(newData);
    }
    console.log(JSON.stringify(chartData));
  }, [momWeight, momRecord, babyIndex]);

  useEffect(() => {
    if (chartData && lineData) {
      props.diffUpdate(chartData);
      props.avgUpdate(lineData);
    }
    // console.log("BABY DATA !!!!!!!!!!!!" + JSON.stringify(babyData));
    // console.log("WEEK !!!!! " + week);
  }, [chartData, lineData]);

  const generateData = () => {
    if (momWeight) {
      if (momWeight.length === 0) {
        return [];
      }
      let tmp = [];
      let diff = [];
      let ld = [];
      let arr = [...momWeight];
      arr.reverse();
      // console.log("뒤집어따 " + JSON.stringify(arr));
      let w = 0;
      let start = 0;
      for (let i = 0; i < 6; i++) {
        if (!arr[start]) break;
        let startDate = new Date(arr[start].date);
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() - startDate.getDay());
        console.log(endDate);
        let sum = arr[start].weight;
        let s = 1;
        for (let j = start + 1; j < start + 7; j++) {
          if (!arr[j] || new Date(arr[j].date).getDay() >= endDate.getDay() || startDate.getDate() - new Date(arr[j].date).getDate() > 6) {
            // console.log("조건 브레이크");
            i--;
            break;
          }
          sum += arr[j].weight;
          s++;
        }
        start = start + s;
        // console.log("주차별 몸무게 " + (sum / s).toFixed(1));
        tmp.unshift({
          weight: (sum / s).toFixed(1),
          date: week - w,
        });
        // console.log("2222222222" + JSON.stringify(tmp));
        let dat;
        dat = {
          start: recommendWeightStart[week-w][bmi] - recommendWeightStart[week-w-1][bmi],
          end: recommendWeightEnd[week-w][bmi] - recommendWeightEnd[week-w-1][bmi],
          week: week - w,
        };

        ld.unshift(dat);
        w++;
      }
      if (ld.length > 1) {
        ld.shift();
      }
      setLineData(ld);
      console.log("기준!!!!\n" + JSON.stringify(lineData));

      for (let k = 0; k < tmp.length - 1; k++) {
        diff.push({
          weight: (tmp[k + 1].weight - tmp[k].weight).toFixed(1),
          date: tmp[k + 1].date,
        });
      }
      if (diff.length === 0) {
        // console.log(JSON.stringify(momBasis));
        diff.push({
          weight: momRecord[0].weight - momBasis.basisWeight,
          date: week,
        });
      }
      console.log("몸무게 변화율\n" + JSON.stringify(diff));
      return diff;
    }
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={24}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 350, paddingBottom: 1, mb: 2 }}>
        {/* @ts-ignore */}
        {chartData && lineData && (
          <ResponsiveChartContainer
            margin={{ top: 100 }}
            series={[
              {
                type: "bar",
                data: chartData.map((data) => data.weight),
                label: "증가율",
                id: "weight",
              },
              status === "B"
                ? {
                    type: "line",
                    data: lineData.map((data) => data.start),
                    label: "추천 최소치",
                  }
                : {},
              status === "B"
                ? {
                    type: "line",
                    data: lineData.map((data) => data.end),
                    label: "추천 최대치",
                  }
                : {},
            ]}
            xAxis={[
              {
                data: chartData.map((data) => data.date),
                scaleType: "band",
                id: "x-axis-id",
              },
            ]}
            yAxis={[
              {
                id: "y-axis-id",
              },
            ]}
          >
            <BarPlot />
            {status === "B" ? <LinePlot /> : <></>}
            {status === "B" ? <MarkPlot /> : <></>}
            <ChartsXAxis label={status === "A" ? "개월" : "주차"} position="bottom" axisId="x-axis-id" />
            <ChartsYAxis label="평균 체중 변화량" position="left" axisId="y-axis-id" />
            <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
            <ChartsTooltip trigger="axis" />
          </ResponsiveChartContainer>
        )}
      </Paper>
    </Box>
  );
}

export { ChangeChart, WeeklyWeightChart };
