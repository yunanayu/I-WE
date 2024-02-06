import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BarPlot, ChartsXAxis, ChartsYAxis, LineChart, LinePlot, MarkPlot, ResponsiveChartContainer } from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import React, { useState, useEffect } from "react";
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

function WeightChart(props) {

  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={28}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 350 }}>
      {(<ResponsiveChartContainer
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
          <ChartsXAxis label="임신 주차" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis label="몸무게(g)" position="left" axisId="y-axis-id" />
          <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
        </ResponsiveChartContainer>
        )}
      </Paper>
    </Box>
  );
}
function HeightChart(props) {

  return (
    <Box sx={{ width: "90%" }}>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography fontSize={28}> 체중 증가율 </Typography>
      </Box>
      <Paper sx={{ width: "100%", height: 350 }}>
      {(<ResponsiveChartContainer
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
          <ChartsXAxis label="임신 주차" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis label="키(cm)" position="left" axisId="y-axis-id" />
          <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
        </ResponsiveChartContainer>
        )}
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
      {(<ResponsiveChartContainer
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
          <ChartsXAxis label="임신 주차" position="bottom" axisId="x-axis-id" />
          <ChartsYAxis label="머리 둘레(nm)" position="left" axisId="y-axis-id" />
          <ChartsLegend position={{ vertical: "top", horizontal: "right" }} />
        </ResponsiveChartContainer>
        )}
      </Paper>
    </Box>
  );
}


export { WeightChart, HeightChart, HeadChart };
