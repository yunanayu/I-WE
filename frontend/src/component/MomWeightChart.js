import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { LineChart } from "@mui/x-charts/LineChart";

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
    setChartData(generateData(selectedInterval));
  }, [selectedInterval]);

  return (
    <div>
      <ToggleButtonGroup
        size="small"
        value={selectedInterval}
        exclusive
        onChange={handleToggleInterval}
        aria-label="select-interval"
        sx={{ mt: 5 }}
      >
        <ToggleButton value={2}>일별</ToggleButton>
        <ToggleButton value={3}>주별</ToggleButton>
        <ToggleButton value={4}>월별</ToggleButton>
      </ToggleButtonGroup>
      <ResponsiveChartContainer series={}>
        <LineChart
          data={chartData}
          xAxis={[{ dataKey: "x" }]}
          series={[{ dataKey: "y" }]}
        />
      </ResponsiveChartContainer>
    </div>
  );
}

// 엄마 변화율 선 그래프 + 평균 변화율 막대 그래프
function ChangeChart(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", height: 300 }}>
        {/* @ts-ignore */}
        <ResponsiveChartContainer
          series={[
            {
              type: "bar",
              data: [1, 2, 3, 2, 1],
            },
            {
              type: "line",
              data: [4, 3, 1, 3, 4],
            },
          ]}
          xAxis={[
            {
              data: ["A", "B", "C", "D", "E"],
              scaleType: "band",
              id: "x-axis-id",
            },
          ]}
        >
          <BarPlot />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
        </ResponsiveChartContainer>
      </Paper>
    </Box>
  );
}

export { ChangeChart, WeeklyWeightChart };
