import React, { useRef } from "react";
import SpotlightCard from "../SpotlightCard";
import {
  BarList,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  BarListSeries,
  Bar,
  Gradient,
  GradientStop,
  BarLabel,
  GridlineSeries,
  Gridline,
} from "reaviz";

export default function ImgFloor() {
  const labelsData = [
    { key: "DLP", data: 13 },
    { key: "SIEM", data: 2 },
    { key: "Endpoint", data: 7 },
  ];
  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <div className="flex flex-col pt-4 pb-4 rounded-3xl w-[375px] h-[560px] overflow-hidden">
        <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
          Incident Report
        </h3>
        <BarList
          id="labels-gradient"
          data={labelsData}
          series={
            <BarListSeries
              valuePosition="end"
              colorScheme={[
                "#0D4ED2",
                "#4C86FF",
                "#40D3F4",
                "#40E5D1",
                "#DAC5F9",
                "#9152EE",
                "#5B14C5",
              ]}
            ></BarListSeries>
          }
        />
      </div>
    </SpotlightCard>
  );
}
