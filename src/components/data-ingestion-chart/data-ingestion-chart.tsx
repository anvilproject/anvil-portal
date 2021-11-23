/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data ingestion chart component.
 */

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

type TooltipSeriesInfo = {
  axisValueLabel: string;
  marker: string;
  seriesName: string;
  data: number;
};

function fixDecimalPlaces(n: number, places: number) {
  const str = n.toString();
  const dotIndex = str.indexOf(".");
  if (dotIndex === -1) {
    return str.concat(".", "0".repeat(places));
  }
  const presentPlaces = str.length - dotIndex - 1;
  if (presentPlaces > places) {
    return str.substring(0, dotIndex + 1 + places);
  }
  return str.concat("0".repeat(places - presentPlaces));
}

function formatTooltip(seriesInfoObjects: Array<TooltipSeriesInfo>) {
  const container = document.createElement("div");
  container.innerHTML = `
    <div style="font-size:14px;color:#666;font-weight:400;line-height:1;"></div>
  `;
  const positionLabel = seriesInfoObjects[0].axisValueLabel;
  container.children[0].textContent = positionLabel.includes("/")
    ? positionLabel
    : `1/${positionLabel.substring(2, 4)}`;
  seriesInfoObjects.forEach((seriesPoint) => {
    if (seriesPoint.data > 0) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div style="margin: 10px 0 0; line-height: 1;">
          <div style="margin: 0px 0 0; line-height: 1;">
            <span></span>
            <span style="font-size: 14px; color: #666; font-weight: 400; margin-left: 2px;"></span>
            <span style="float: right; margin-left: 20px; font-size: 14px; color: #666; font-weight: 900;"></span>
            <div style="clear: both;"></div>
          </div>
          <div style="clear: both;"></div>
        </div>`
      );
      const line =
        container.children[container.childElementCount - 1].children[0];
      line.children[0].outerHTML = seriesPoint.marker;
      line.children[1].textContent = seriesPoint.seriesName;
      line.children[2].textContent = `${fixDecimalPlaces(
        seriesPoint.data,
        2
      )} TB`;
    }
  });
  return container;
}

function getChartOptions() {
  const startYear = 2019;
  const monthDataByConsortium: Array<[string, Array<number>]> = [
    [
      "1000 Genomes",
      [0, 0, 41.24746970906762, 0.04554811050600001, 0, 0, 0, 0, 1.4205709577800065, 0, 0, 0, 15.166951096314506, 0, 15.097331035121826, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      "CCDG",
      [0, 0, 0, 0, 0, 0, 869.198394341894, 0, 0, 0, 9.749740747852936, 13.000315760110867, 138.61384710577855, 3.0405029270270805, 24.962089598942093, 2.8009355321870073, 99.38081187107953, 67.95218650116868, 3.757527643676172, 3.0491351215149884, 6.6410410007398415, 9.311923897950939, 11.384718731918559, 1091.0348043747372, 195.1248401393772, 15.242934038133875, 5.756617436176997, 0.6843921787989985, 1.8120884053759625, 5.345219002360607, 0.4423685649419988, 0.007083319373, 42.246717693564676, 3.5406103100401354, 0.040951869446, 0]
    ],
    [
      "CMG",
      [0, 0, 0, 0, 0, 0, 15.687935302137468, 0.7808175953490013, 0, 0.6128128666660013, 0.05743039497699999, 0, 0, 0, 0, 3.327096849879023, 0.592740952159, 16.45139555781797, 0.16892268232700003, 0.08006962953900013, 0, 0, 0, 0, 0, 0, 27.032599246683755, 0.7669798337469941, 3.402029688652009, 4.7635111998949995, 0.021813072116, 0, 23.46069759268432, 0.6806787733889997, 0, 0]
    ],
    [
      "Convergent Neuro",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.019527994124, 5.304560467816027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      "GTEx (v8)",
      [0, 0, 0, 0, 0, 0, 0, 179.01608274871387, 0.049531960541, 0, 0.23568751218199852, 2.831758323104997, 0, 0, 0.002733772673, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000002505733, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    [
      "HPRC",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.002047553691, 6.480807057602995, 5.4239798493749944, 6.988485520853159, 88.93277946110938, 9.027225391019, 0.1643150849199999, 9.624987752487995, 8.272057081780067, 0.238920883717, 13.443224799058976, 8.556774350035994, 15.10451636443495, 20.97689797706216, 0, 19.688462734222963, 8.545786496501997]
    ],
    [
      "PAGE",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16.98311515566502, 0, 0, 0, 0, 0, 0.0010868438390000009, 0, 0, 0, 0, 0]
    ],
    [
      "T2T",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.010249849747999999, 110.67035206444598, 0.022589064801, 9.519774953765003, 382.5480110870462, 56.75229338107303, 12.119580304264998, 0]
    ],
    [
      "WGSPD1",
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 145.63215896197053, 0, 0, 31.730904564461913, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  ];

  const seriesInfo: Array<[string, Object]> = [];
  const startIndices: Record<string, number> = {};

  for (let i = 0; i < monthDataByConsortium.length; i += 1) {
    const [consortium, addedSizes] = monthDataByConsortium[i];
    let size = 0;
    const data = addedSizes.map((val) => {
      size += val;
      return size || null;
    });

    if (data.includes(null)) data[data.lastIndexOf(null)] = 0;

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
    grid: {
      right: 20,
      top: 70,
      bottom: 55,
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: formatTooltip,
    },
    legend: {
      data: sortedData.map(([consortium]) => consortium),
      width: "70%",
    },
    series: sortedData.map(([, seriesDef]) => seriesDef),
  };
}

const DataIngestionChart: FC = (): JSX.Element => (
  <ReactEChartsCore
    echarts={echarts}
    option={getChartOptions()}
    style={{ height: "400px" }}
  />
);

export default DataIngestionChart;
