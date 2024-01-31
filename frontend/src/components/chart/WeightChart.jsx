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
function WeeklyWeightChart() {
  // 몸무게
  const weight = [];
  // 날짜
  const date = [];

  const [selectedInterval, setSelectedInterval] = useState(2);
  const [chartData, setChartData] = useState([]);

  const handleToggleInterval = (event, newInterval) => {
    if (newInterval !== null) {
      setSelectedInterval(newInterval);
    }
  };

  const generateData = (interval) => {
    // Generate data based on the selected interval (daily, weekly, monthly)
    const data = [1, 2, 3, 4, 5, 6];
    // Implement logic to aggregate data based on the interval if needed
    return data.map((value) => ({ x: value, y: value * interval }));
  };

  useEffect(() => {
    // Call generateData when the component mounts
    const newData = generateData(selectedInterval);
    setChartData(newData);
    console.log(newData);
    console.log(chartData);
  }, [selectedInterval]);

  return (
    <Box sx={{ width: "90%", }}>
      <Box sx={{ mt: 3, textAlign: 'center'}}>
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
        <ToggleButton value={2}>일별</ToggleButton>
        <ToggleButton value={3}>주별</ToggleButton>
        <ToggleButton value={4}>월별</ToggleButton>
      </ToggleButtonGroup>

      <Paper sx={{ width: "100%", height: 300 }}>
        {/* @ts-ignore */}
        {chartData.length > 0 && ( // Render only if there is data
            <ResponsiveChartContainer
              series={[
                {
                  type: 'line',
                  data: chartData.map((dataPoint) => (dataPoint.y )),
                  yAxisKey : 'y-axis-id',
                },
              ]}
              xAxis={[
                {
                  data: chartData.map((dataPoint) => dataPoint.x),
                  scaleType: 'band',
                  id: 'x-axis-id',
                },
              ]}
              yAxis={[{
                id: 'y-axis-id'
              }]}
            >
              <LinePlot />
          <MarkPlot />
              <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
              <ChartsYAxis label="Y axis" position="left" axisId="y-axis-id" />
            </ResponsiveChartContainer>
          )}
        </Paper>
    </Box>
  );
}

// 엄마 변화율 선 그래프 + 평균 변화율 막대 그래프
function ChangeChart(props) {
  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: 'center'}}>
        <Typography fontSize={28}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 350 }}>
        {/* @ts-ignore */}
        <ResponsiveChartContainer
        margin={{top: 100}}
          series={[
            {
              type: "bar",
              data: [1, 2, 3, 2, 1],
              label: '평균 증가율',
            },
            {
              type: "line",
              data: [4, 3, 1, 3, 4],
              label: '현재 증가율'
            },
          ]}
          xAxis={[
            {
              data: ["A", "B", "C", "D", "E"],
              scaleType: "band",
              id: "x-axis-id",
            },
          ]}
          yAxis={[{
            id: 'y-axis-id'
          }]}
        >
          <BarPlot />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis label="임신 주차" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis label="Y axis" position="left" axisId="y-axis-id" />
          <ChartsLegend position= {{ vertical: 'top', horizontal: 'right'}}/>
        </ResponsiveChartContainer>
      </Paper>
    </Box>
  );
}

export { ChangeChart, WeeklyWeightChart };
