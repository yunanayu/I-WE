import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis, ChartsYAxis } from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { Typography } from "@mui/material";

// 엄마 주차별 몸무게 막대 그래프
function WeeklyWeightChart(props) {
  // num, motherNum, weight, recordDate
  const momRecord = props.recordData;
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
    if (momRecord) {
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

  const handleToggleInterval = (event, newInterval) => {
    if (newInterval !== null) {
      setSelectedInterval(newInterval);
    }
  };

  const generateData = (interval) => {
    console.log("momWeight : ???? " + JSON.stringify(momWeight));
    if (momWeight) {
      const recent = momWeight.at(-1).date;
      if (interval === 1) {
        let length = momWeight.length;
        console.log(length);
        if(length < 6){
          let tmp = momWeight.slice(0-length);
          return tmp;
        }
        let tmp = momWeight.slice(-6);
        return tmp.map((obj) => {
          return {...obj, date: obj.date.substr(5)}
        });
      } else if (interval === 2) {
        let tmp = [];
        let j = 1;

        for (let i = 0; i < 6; i++) {
          if(momWeight.length < j) {
            return tmp;
          }
          let startDate = new Date(momWeight.at(0 - j).date);
          let yoil = startDate.getDay();
          let sum = momWeight.at(0 - j).weight;
          let cnt = 1;
          j++;
          if(momWeight.length < j) {
            tmp.unshift({weight: sum, date: startDate});
            return tmp;
          }
          let endDate;
          while (momWeight.length >= j && yoil > 0) {
            endDate = new Date(momWeight.at(0 - j).date);
            yoil = endDate.getDay();
            if (Math.floor(startDate - endDate) / (1000 * 60 * 60 * 24) < 7) {
              sum += momWeight.at(0 - j).weight;
              cnt++;
            }
            j++;
          }
          var arrDayStr = ["일", "월", "화", "수", "목", "금", "토"];
          let dateString =
            endDate.getMonth() + 1 +
            "월 " +
            endDate.getDate() +
            "일 (" +
            arrDayStr[endDate.getDay()] +
            ")" +
            " ~ " +
            (startDate.getMonth() + 1) +
            "월 " +
            startDate.getDate() +
            "일 (" +
            arrDayStr[startDate.getDay()] +
            ")";
          console.log("몸무게 : " + (sum / cnt).toFixed(1));
          tmp.unshift({
            weight: (sum / cnt).toFixed(1),
            date: dateString,
          });
        }
        return tmp;
      } else if (interval === 3) {
        let tmp = [];
        let j = 1;
        for(let i=0; i<6; i++){
          if(momWeight.length < j) {
            break;
          }
          let startDate = new Date(momWeight.at(0-j).date);
          let wol = startDate.getMonth();
          let sum = momWeight.at(0-j).weight;
          let endDate;
          let cnt = 1;
          j++;
          while(momWeight.length >= j) {
            endDate = new Date(momWeight.at(0-j).date);
            let nextWol = endDate.getMonth();
            if(wol !== nextWol) break;
            sum += momWeight.at(0-j).weight;
            cnt++;
            j++;
          }
          console.log((sum / cnt).toFixed(1));
          tmp.unshift({
            weight: (sum / cnt).toFixed(1),
            date : (wol+1) + '월'
          })
        }
        return tmp;
      }
    }
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={28}> 날짜별 체중 </Typography>
      </Box>
      <ToggleButtonGroup
        size="small"
        value={selectedInterval}
        exclusive
        onChange={handleToggleInterval}
        aria-label="select-interval"
        sx={{ mb: 3 }}
      >
        <ToggleButton value={1}>일별</ToggleButton>
        <ToggleButton value={2}>주별</ToggleButton>
        <ToggleButton value={3}>월별</ToggleButton>
      </ToggleButtonGroup>

      <Paper sx={{ width: "100%", height: 300 }}>
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
                  dominantBaseline: 'hanging',
                  textAnchor: 'start',
                },
                labelStyle: {
                  transform: 'translateY(15px)',
                },
              },
            ]}
            yAxis={[
              {
                id: "y-axis-id",
              },
            ]}
          >
            <LinePlot />
            <MarkPlot />
            <ChartsXAxis label="" position="bottom" axisId="x-axis-id"/>
            <ChartsYAxis label="kg" position="left" axisId="y-axis-id" />
          </ResponsiveChartContainer>
        )}
      </Paper>
    </Box>
  );
}

// 엄마 변화율 선 그래프 + 평균 변화율 막대 그래프
function ChangeChart(props) {
  const momRecord = props.recordData;
  useEffect(() => {
    
  })
  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={28}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 350 }}>
        {/* @ts-ignore */}
        <ResponsiveChartContainer
          margin={{ top: 100 }}
          series={[
            {
              type: "bar",
              data: [1, 2, 3, 2, 1],
              label: "평균 증가율",
            },
            {
              type: "line",
              data: [4, 3, 1, 3, 4],
              label: "현재 증가율",
            },
          ]}
          xAxis={[
            {
              data: ["A", "B", "C", "D", "E"],
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
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis label="임신 주차" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis label="Y axis" position="left" axisId="y-axis-id" />
          <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
        </ResponsiveChartContainer>
      </Paper>
    </Box>
  );
}

export { ChangeChart, WeeklyWeightChart };
