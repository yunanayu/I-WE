import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  BarPlot,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  LinePlot,
  MarkPlot,
  ResponsiveChartContainer,
} from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement, PointElement, 
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  BoxPlotController,
  BoxAndWiskers,
} from "@sgratzl/chartjs-chart-boxplot";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BoxPlotController,
  BoxAndWiskers,
  LineController,
  LineElement, PointElement, 
  Title,
  Tooltip,
  Legend
);
/*
public String getTargetTime() {
        long diffSec = 0L;
        String targetTime = "";
        try {
            if (this.status) {
                targetTime += "A";
                diffSec = parseDate(LocalDate.now()) - parseDate(birth);
                targetTime += ((parseSecToDay(diffSec) / 28) + 1);
            } else {
                targetTime += "B";
                diffSec = parseDate(LocalDate.now()) - parseDate(pregnancyDate);
                targetTime += ((parseSecToDay(diffSec) / 7) + 1);
            }
        } catch (ParseException e) {
            log.info("Baby Parse Exception : {}", e.getMessage());
        }
        return targetTime;
    }
*/

const WeightChart = (props) => {

  const [weightRecord, setWeightRecord] = useState();
  const [percentile, setPercentile] = useState();
  const [weightData, setWeightData] = useState();
  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July"
    ],
    datasets: [
      {
        type: "boxplot",
        label: "Box Plot",
        order: 2,
        data: Array.from({ length: 7 }, () => [
          faker.number.int({ min: 80, max: 100 }),
          faker.number.int({ min: 20, max: 80 }),
          faker.number.int({ min: 0, max: 20 })
        ]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)"
      },
      {
        label: "Line Dataset",
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 20, max: 80 })),
        type: "line",
        borderColor: "skyblue",
        fill: false,
        order: 1
      }
    ]
  });

  useEffect(() => {
    if(props.weightRecord && props.percentile) {
      setWeightRecord(props.weightRecord);
      setPercentile(props.percentile);
    }
  }, [props.percentile, props.weightRecord])

  useEffect(() => {
    if(weightRecord) {
      let arr = [];
      let m = props.month;
      arr.push(weightRecord[weightRecord.length-1]);
      for(let i=weightRecord.length-1; i>=0; i--) {
        if(new Date(arr[0].recordDate).getMonth() !== new Date(weightRecord[i].recordDate).getMonth()){
          // const obj = {
          //   weight: weightRecord[i].weight,
          //   month: m
          // }
          // arr.unshift(obj);
          // m--;
          arr.unshift(weightRecord[i]);
        }
      }
      setWeightData(arr);
    }
  }, [weightRecord])

  useEffect(() => {
    console.log("weightDAta" + JSON.stringify(weightData));
    if(weightData) {
      const data = {
        labels: [],
        datasets: []
      }
      setChartData({})
    }
  }, [weightData])

  useEffect(() => { 
    const chartRef = new ChartJS('chartCanvas', {
      data: chartData,
      options: {
        maintainAspectRatio:false,
        plugins: {
          title: {
            display: true,
            text: 'Box Plot with Line'
          },
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        },
      }
    });

    return () => {
      chartRef.destroy();
    };
  }, [chartData]);

  return (
  <>
  <canvas id="chartCanvas" style={{ width: "100%", height: "100%" }} />
  </>
  )
}

function HeightChart(props) {
  return (
    <Box sx={{ width: "90%"}}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={28}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 320 }}>
        {
          <ResponsiveChartContainer
            margin={{ top: 100 }}
            series={[
              {
                type: "line",
                data: [1, 2, 3],
                label: "추천 최소치",
              },
              {
                type: "line",
                data: [4, 5, 6],
                label: "추천 최대치",
              },
            ]}
            xAxis={[
              {
                data: [1, 2, 3],
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
            <ChartsXAxis
              label="임신 주차"
              position="bottom"
              axisId="x-axis-id"
            />
            <ChartsYAxis label="키(cm)" position="left" axisId="y-axis-id" />
            <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
            <ChartsTooltip trigger="axis" />
          </ResponsiveChartContainer>
        }
      </Paper>
    </Box>
  );
}
function HeadChart(props) {
  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={28}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 350 }}>
        {
          <ResponsiveChartContainer
            margin={{ top: 100 }}
            series={[
              {
                type: "line",
                data: [1, 2, 3],
                label: "추천 최소치",
              },
              {
                type: "line",
                data: [4, 5, 6],
                label: "추천 최대치",
              },
            ]}
            xAxis={[
              {
                data: [1, 2, 3],
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
            <ChartsXAxis
              label="임신 주차"
              position="bottom"
              axisId="x-axis-id"
            />
            <ChartsYAxis
              label="머리 둘레(nm)"
              position="left"
              axisId="y-axis-id"
            />
            <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
            <ChartsTooltip trigger="axis" />
          </ResponsiveChartContainer>
        }
      </Paper>
    </Box>
  );
}

export { WeightChart, HeightChart, HeadChart };
