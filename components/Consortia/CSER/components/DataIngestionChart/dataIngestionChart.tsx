import { CardSection } from "@databiosphere/findable-ui/lib/components/common/Card/card.styles";
import { RoundedPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { EChartsCoreOption } from "echarts";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import React, { FC, useEffect, useRef } from "react";
import chartData from "./chart-data.json";
import { Card } from "./dataIngestionChart.styles";

const EXCLUDED_CONSORTIA = ["Unspecified"];

const { monthDataByConsortium, startYear } = chartData;

echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

type TooltipSeriesInfo = {
  axisValueLabel: string;
  data: number;
  marker: string;
  seriesName: string;
};

type BasicEchartsPart = {
  // Simplified type for ECharts graph components
  // Only the properties necessary to find the parent series's type and index
  __ecComponentInfo?: {
    index: number;
    mainType: string;
  };
  parent?: BasicEchartsPart;
};

function fixDecimalPlaces(n: number, places: number): string {
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

// eslint-disable-next-line sonarjs/cognitive-complexity -- TODO?
function formatTooltip(
  hoverIndex: React.MutableRefObject<null | number>,
  seriesInfoObjects: Array<TooltipSeriesInfo>
): HTMLElement {
  const elemsBySeriesIndex: { [key: number]: HTMLElement } = {};

  const container: HTMLElement = document.createElement("div");
  container.innerHTML = `
    <div style="font-size:14px;color:#666;font-weight:400;line-height:1;"></div>
  `;

  const positionLabel = seriesInfoObjects[0].axisValueLabel;
  container.children[0].textContent = positionLabel.includes("/")
    ? positionLabel
    : `1/${positionLabel.substring(2, 4)}`;

  seriesInfoObjects.forEach((seriesPoint, i) => {
    if (seriesPoint.data > 0) {
      container.insertAdjacentHTML(
        "beforeend",
        `<div style="padding: 5px; margin: 0 -5px; border-radius: 3px; line-height: 1;">
          <div style="margin: 0px 0 0; line-height: 1;">
            <span></span>
            <span style="font-size: 14px; color: #666; font-weight: 400; margin-left: 2px;"></span>
            <span style="float: right; margin-left: 20px; font-size: 14px; color: #666; font-weight: 900;"></span>
            <div style="clear: both;"></div>
          </div>
          <div style="clear: both;"></div>
        </div>`
      );
      const newChild = container.children[
        container.childElementCount - 1
      ] as HTMLElement;
      elemsBySeriesIndex[i] = newChild;
      const line = newChild.children[0];
      line.children[0].outerHTML = seriesPoint.marker;
      line.children[1].textContent = seriesPoint.seriesName;
      line.children[2].textContent = `${fixDecimalPlaces(
        seriesPoint.data,
        2
      )} TB`;
    }
  });

  if (container.childElementCount > 1) {
    (container.children[1] as HTMLElement).style.marginTop = "5px";
    (
      container.children[container.childElementCount - 1] as HTMLElement
    ).style.marginBottom = "-5px";
  }

  let hoverElem: null | HTMLElement = null;
  if (hoverIndex.current !== null) {
    hoverElem = elemsBySeriesIndex[hoverIndex.current] || null;
    if (hoverElem !== null) hoverElem.style.background = "#eee";
  }
  setTimeout(() => {
    if (hoverElem !== null) hoverElem.style.background = "";
    if (hoverIndex.current !== null) {
      hoverElem = elemsBySeriesIndex[hoverIndex.current] || null;
      if (hoverElem !== null) hoverElem.style.background = "#eee";
    }
  }, 50);

  return container;
}

function getChartOptions(
  hoverIndex: React.MutableRefObject<null | number>
): EChartsCoreOption {
  const seriesInfo: Array<[string, object]> = [];
  const startIndices: Record<string, number> = {};

  for (let i = 0; i < monthDataByConsortium.length; i += 1) {
    const [consortium, addedSizes] = monthDataByConsortium[i];
    if (EXCLUDED_CONSORTIA.includes(consortium)) continue;
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
        areaStyle: {},
        data,
        emphasis: { focus: "series" },
        name: consortium,
        stack: "data",
        type: "line",
      },
    ]);
  }

  const minStartIndex = Math.min(...Object.values(startIndices));

  const sortedData = seriesInfo.sort(([consortiumA], [consortiumB]) => {
    return (
      startIndices[consortiumA] - startIndices[consortiumB] ||
      [consortiumA, consortiumB].sort().indexOf(consortiumA) * 2 - 1
    );
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
          ? { textStyle: { fontWeight: "bold" }, value: fullYear }
          : `${monthNum}/${fullYear % 100}`
      );
  }

  return {
    grid: {
      bottom: 55,
      right: 20,
      top: 70,
    },
    legend: {
      data: sortedData.map(([consortium]) => consortium),
      width: "70%",
    },
    series: sortedData.map(([, seriesDef]) => seriesDef),
    tooltip: {
      axisPointer: {
        type: "cross",
      },
      formatter: formatTooltip.bind(null, hoverIndex),
      trigger: "axis",
    },
    xAxis: {
      boundaryGap: false,
      data: monthNames,
      min: minStartIndex,
      name: "Time",
      nameGap: 32,
      nameLocation: "center",
      splitLine: {
        interval: 11,
        lineStyle: {
          color: ["#bbb"],
        },
        show: true,
      },
      type: "category",
    },
    yAxis: {
      name: "Size (TB)",
      nameGap: 48,
      nameLocation: "center",
    },
  };
}

function getParentSeriesIndex(initPart?: BasicEchartsPart): number | null {
  let part = initPart;

  while (part && part?.__ecComponentInfo?.mainType !== "series") {
    part = part.parent;
  }

  if (part?.__ecComponentInfo?.mainType === "series") {
    return part.__ecComponentInfo.index;
  }

  return null;
}

const DataIngestionChart: FC = (): JSX.Element => {
  const chart = useRef<ReactEChartsCore>(null);
  const hoverIndex = useRef<null | number>(null);
  useEffect(() => {
    function handleMouse(info: { target: BasicEchartsPart }): void {
      hoverIndex.current = getParentSeriesIndex(info.target);
    }

    const zr = chart.current?.getEchartsInstance().getZr();
    zr?.on("mousemove", handleMouse);
    return (): void => zr?.handler && zr.off("mousemove", handleMouse);
  });
  return (
    <Card component={RoundedPaper}>
      <CardSection>
        <ReactEChartsCore
          ref={chart}
          echarts={echarts}
          option={getChartOptions(hoverIndex)}
          style={{ height: "400px" }}
        />
      </CardSection>
    </Card>
  );
};

export default DataIngestionChart;
