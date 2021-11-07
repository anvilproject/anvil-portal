import React, { FC } from "react";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

function getChartOptions() {
  const startYear = 2019;
  const monthDataByConsortium: Array<[string, Array<number>]> = [
    [
      "1000 Genomes",
      [0, 0, 41.24746970906762, 0.04554811050600001, 0, 0, 0, 0, 1.4205709577800065, 0, 0, 0, 15.166951096314506, 0, 15.097331035121826, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      "CCDG",
      [0, 0, 0, 0, 0, 0, 869.198394341894, 0, 0, 0, 9.749740747852936, 13.000315760110867, 138.61384710577855, 3.0405029270270805, 24.962089598942093, 2.8009355321870073, 99.38081187107953, 67.95218650116868, 3.757527643676172, 7.788260158379596, 6.6410410007398415, 9.311923897950939, 11.384718731918559, 1091.0348043747372, 195.1248401393772, 15.242934038133875, 5.756617436176997, 0.6843921787989985, 1.8120884053759625, 5.345219002360607, 0.4423685649419988, 0.007083319373, 42.69276817370153]
    ],
    [
      "CMG",
      [0, 0, 0, 0, 0, 0, 15.687935302137468, 0.7808175953490013, 0, 0.6128128666660013, 0.05743039497699999, 0, 0, 0, 0, 3.327096849879023, 0.592740952159, 16.45139555781797, 0.16892268232700003, 0.08006962953900013, 0, 0, 0, 0, 0, 0, 27.032599246683755, 0.7669798337469941, 3.402029688652009, 4.7635111998949995, 0.021813072116, 0, 23.46069759268432]
    ],
    [
      "Convergent Neuro",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.019527994124, 5.304560467816027, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      "GTEx (v8)",
      [0, 0, 0, 0, 0, 0, 0, 179.01608274871387, 0.049531960541, 0, 0.23568751218199852, 2.831758323104997, 0, 0, 0.002733772673, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000002505733, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      "HPRC",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.002047553691, 6.480807057602995, 5.4239798493749944, 6.988485520853159, 88.93277946110938, 9.027225391019, 0.1643150849199999, 9.624987752487995, 8.272057081780067, 0.238920883717, 13.443224799058976, 8.556774350035994, 15.104516369936949, 20.97689797706216]
    ],
    [
      "PAGE",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16.98311515566502, 0, 0, 0, 0, 0, 0.0010868438390000009, 0, 0]
    ],
    [
      "T2T",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.010249849747999999, 110.67035206444598, 0.022589064801, 9.519774953765003, 382.5480110870462]
    ],
    [
      "WGSPD1",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 145.63215896197053, 0, 0, 31.730904564461913, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
  ];

  const seriesInfo: Array<[string, Object]> = [];
  const startIndices: Record<string, number> = {};

  for (let i = 0; i < monthDataByConsortium.length; i += 1) {
    const [consortium, addedSizes] = monthDataByConsortium[i];
    let size = 0;
    const data = addedSizes.map((val) => {
      size += val;
      return size;
    });

    startIndices[consortium] = data.lastIndexOf(0);

    seriesInfo.push([
      consortium,
      {
        name: consortium,
        type: "line",
        stack: "data",
        areaStyle: {},
        emphasis: { focus: "series" },
        data,
      },
    ]);
  }

  const minStartIndex = Math.min(...Object.values(startIndices));

  const sortedData = seriesInfo.sort(([consortiumA], [consortiumB]) => {
    return startIndices[consortiumA] - startIndices[consortiumB];
  });

  const numMonths = monthDataByConsortium[0][1].length;
  const monthNames = [];

  for (let i = 0; i < numMonths; i += 1) {
    const monthNum = (i % 12) + 1;
    const fullYear = startYear + Math.floor(i / 12);

    if (i < minStartIndex) monthNames.push("");
    else
      monthNames.push(
        monthNum === 1
          ? { value: fullYear, textStyle: { fontWeight: "bold" } }
          : `${monthNum}/${fullYear % 100}`
      );
  }

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      name: "Time",
      nameLocation: "center",
      nameGap: 35,
      type: "category",
      boundaryGap: false,
      data: monthNames,
      splitLine: {
        show: true,
        interval: 11,
        lineStyle: {
          color: ["#bbb"],
        },
      },
      min: minStartIndex,
    },
    yAxis: {
      name: "Size (TB)",
      nameLocation: "center",
      nameGap: 53,
    },
    legend: {
      data: sortedData.map(([consortium]) => consortium),
    },
    series: sortedData.map(([, seriesDef]) => seriesDef),
  };
}

const DataIngestionChart: FC = (): JSX.Element => (
  <ReactEChartsCore echarts={echarts} option={getChartOptions()} />
);

export default DataIngestionChart;
