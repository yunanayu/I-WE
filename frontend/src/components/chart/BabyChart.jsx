import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { BoxPlotController, BoxAndWiskers } from "@sgratzl/chartjs-chart-boxplot";

ChartJS.register(CategoryScale, LinearScale, BoxPlotController, BoxAndWiskers, LineController, LineElement, PointElement, Title, Tooltip, Legend);

const WeightChart = (props) => {
  const [weightRecord, setWeightRecord] = useState();
  const [percentile, setPercentile] = useState();
  const [weightData, setWeightData] = useState();
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "boxplot",
        label: "Box Plot",
        order: 2,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Line Dataset",
        data: [],
        type: "line",
        borderColor: "skyblue",
        fill: false,
        order: 1,
      },
    ],
  });

  useEffect(() => {
    if (props.weightRecord && props.percentile) {
      setWeightRecord(props.weightRecord);
      setPercentile(props.percentile);
    }
  }, [props.percentile, props.weightRecord]);

  useEffect(() => {
    if (weightRecord) {
      let arr = [];
      let m = props.month;
      let obj = {
        weight: weightRecord[weightRecord.length - 1].weight,
        recordDate: weightRecord[weightRecord.length - 1].recordDate,
        month: m,
      };
      m--;
      arr.push(obj);
      for (let i = weightRecord.length - 1; i>=0; i--) {
        if (new Date(arr[0].recordDate).getMonth() !== new Date(weightRecord[i].recordDate).getMonth()) {
          const obj = {
            weight: weightRecord[i].weight,
            recordDate: weightRecord[i].recordDate,
            month: m,
          };
          arr.unshift(obj);
          m--;
        }
        if(arr.length >= 5) break;
      }
      setWeightData(arr);
    }
  }, [weightRecord, props.month]);

  useEffect(() => {
    if (weightData && percentile) {
      let a = [...percentile.weight99thPercentiles].reverse().slice(5 - weightData.length, percentile.length);
      let b = [...percentile.weight75thPercentiles].reverse().slice(5 - weightData.length, percentile.length);
      let c = [...weightData].reverse();
      let d = [...percentile.weight25thPercentiles].reverse().slice(5 - weightData.length, percentile.length);
      let e = [...percentile.weight1stPercentiles].reverse().slice(5 - weightData.length, percentile.length);
      let f = [...weightData];
      const data = {
        labels: weightData.map((obj) => {
          return obj.month + "개월";
        }),
        datasets: [
          {
            type: "boxplot",
            label: "체중 백분위수",
            order: 2,
            data: Array.from({ length: weightData.length >= 5 ? 5 : weightData.length }, () => [a.pop(), b.pop(), c.pop().weight, d.pop(), e.pop()]),

            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "체중",
            data: f.map((obj) => {
              return obj.weight;
            }),
            type: "line",
            borderColor: "skyblue",
            fill: false,
            order: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [weightData]);

  useEffect(() => {
    const chartRef = new ChartJS("chartCanvas", {
      data: chartData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "체중 백분위 차트",
          },
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      chartRef.destroy();
    };
  }, [chartData]);

  return (
    <>
      <canvas id="chartCanvas" style={{ width: "100%", height: "100%" }} />
    </>
  );
};

const HeightChart = (props) => {
  const [heightRecord, setHeightRecord] = useState();
  const [percentile, setPercentile] = useState();
  const [heightData, setHeightData] = useState();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        type: "boxplot",
        label: "Box Plot",
        order: 2,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Line Dataset",
        data: [],
        type: "line",
        borderColor: "skyblue",
        fill: false,
        order: 1,
      },
    ],
  });

  useEffect(() => {
    if (props.heightRecord && props.percentile) {
      setHeightRecord(props.heightRecord);
      setPercentile(props.percentile);
    }
  }, [props.percentile, props.heightRecord]);

  useEffect(() => {
    if (heightRecord) {
      let arr = [];
      let m = props.month;
      let obj = {
        height: heightRecord[heightRecord.length - 1].height,
        recordDate: heightRecord[heightRecord.length - 1].recordDate,
        month: m,
      };
      m--;
      arr.push(obj);
      for (let i = heightRecord.length - 1; i >= 0; i--) {
        if (new Date(arr[0].recordDate).getMonth() !== new Date(heightRecord[i].recordDate).getMonth()) {
          const obj = {
            height: heightRecord[i].height,
            recordDate: heightRecord[i].recordDate,
            month: m,
          };
          arr.unshift(obj);
          m--;
        }
        if(arr.length >= 5) break;
      }
      setHeightData(arr);
    }
  }, [heightRecord, props.month]);

  useEffect(() => {
    if (heightData && percentile) {
      let a = [...percentile.height99thPercentiles].reverse().slice(5 - heightData.length, percentile.length);
      let b = [...percentile.height75thPercentiles].reverse().slice(5 - heightData.length, percentile.length);
      let c = [...heightData].reverse();
      let d = [...percentile.height25thPercentiles].reverse().slice(5 - heightData.length, percentile.length);
      let e = [...percentile.height1stPercentiles].reverse().slice(5 - heightData.length, percentile.length);
      let f = [...heightData];

      const data = {
        labels: heightData.map((obj) => {
          return obj.month + "개월";
        }),
        datasets: [
          {
            type: "boxplot",
            label: "신장 백분위수 차트",
            order: 2,
            data: Array.from({ length: heightData.length >= 5 ? 5 : heightData.length }, () => [a.pop(), b.pop(), c.pop().height, d.pop(), e.pop()]),

            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "신장",
            data: f.map((obj) => {
              return obj.height;
            }),
            type: "line",
            borderColor: "skyblue",
            fill: false,
            order: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [heightData, percentile]);

  useEffect(() => {
    const chartRef = new ChartJS("chartCanvas2", {
      data: chartData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "신장 백분위",
          },
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      chartRef.destroy();
    };
  }, [chartData]);

  return (
    <>
      <canvas id="chartCanvas2" style={{ width: "100%", height: "100%" }} />
    </>
  );
};

const HeadChart = (props) => {
  const [headRecord, setHeadRecord] = useState();
  const [percentile, setPercentile] = useState();
  const [headData, setHeadData] = useState();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        type: "boxplot",
        label: "Box Plot",
        order: 2,
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Line Dataset",
        data: [],
        type: "line",
        borderColor: "skyblue",
        fill: false,
        order: 1,
      },
    ],
  });

  useEffect(() => {
    if (props.headRecord && props.percentile) {
      setHeadRecord(props.headRecord);
      setPercentile(props.percentile);
    }
  }, [props.percentile, props.headRecord]);

  useEffect(() => {
    if (headRecord) {
      let arr = [];
      let m = props.month;
      let obj = {
        head: headRecord[headRecord.length - 1].head,
        recordDate: headRecord[headRecord.length - 1].recordDate,
        month: m,
      };
      m--;
      arr.push(obj);
      for (let i = headRecord.length - 1; i >= 0; i--) {
        if (new Date(arr[0].recordDate).getMonth() !== new Date(headRecord[i].recordDate).getMonth()) {
          const obj = {
            head: headRecord[i].head,
            recordDate: headRecord[i].recordDate,
            month: m,
          };
          arr.unshift(obj);
          m--;
        }
        if(arr.length >= 5) break; 
      }
      setHeadData(arr);
    }
  }, [headRecord, props.month]);

  useEffect(() => {
    if (headData && percentile) {
      let a = [...percentile.circumference99thPercentiles].reverse().slice(5 - headData.length, percentile.length);
      let b = [...percentile.circumference75thPercentiles].reverse().slice(5 - headData.length, percentile.length);
      let c = [...headData].reverse();
      let d = [...percentile.circumference25thPercentiles].reverse().slice(5 - headData.length, percentile.length);
      let e = [...percentile.circumference1stPercentiles].reverse().slice(5 - headData.length, percentile.length);
      let f = [...headData];

      const data = {
        labels: headData.map((obj) => {
          return obj.month + "개월";
        }),
        datasets: [
          {
            type: "boxplot",
            label: "머리둘레 백분위 차트",
            order: 2,
            data: Array.from({ length: headData.length >= 5 ? 5 : headData.length }, () => [a.pop(), b.pop(), c.pop().head, d.pop(), e.pop()]),

            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "머리둘레",
            data: f.map((obj) => {
              return obj.head;
            }),
            type: "line",
            borderColor: "skyblue",
            fill: false,
            order: 1,
          },
        ],
      };
      setChartData(data);
    }
  }, [headData, percentile]);

  useEffect(() => {
    const chartRef = new ChartJS("chartCanvas3", {
      data: chartData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "머리둘레 백분위 차트",
          },
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      chartRef.destroy();
    };
  }, [chartData]);

  return (
    <>
      <canvas id="chartCanvas3" style={{ width: "100%", head: "100%" }} />
    </>
  );
};

export { WeightChart, HeightChart, HeadChart };
