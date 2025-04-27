import React, { useRef } from "react";
import SpotlightCard from "./SpotlightCard";
import {
  BarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  BarSeries,
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
      <div className="flex flex-col pt-4 pb-4 bg-black rounded-3xl shadow-[11px_21px_3px_rgba(0,0,0,0.06),14px_27px_7px_rgba(0,0,0,0.10),19px_38px_14px_rgba(0,0,0,0.13),27px_54px_27px_rgba(0,0,0,0.16),39px_78px_50px_rgba(0,0,0,0.20),55px_110px_86px_rgba(0,0,0,0.26)] w-[375px] h-[560px] overflow-hidden">
        <h3 className="text-3xl text-left p-7 pt-6 pb-8 font-bold text-white">
          Incident Report
        </h3>
        <BarChart
          id="labels-gradient"
          data={labelsData}
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
            />
          }
          xAxis={
            <LinearXAxis
              type="category"
              tickSeries={
                <LinearXAxisTickSeries
                  label={
                    <LinearXAxisTickLabel
                      padding={10}
                      rotation={-45}
                      format={(text) => `${text.slice(0, 5)}...`}
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          series={
            <BarSeries
              bar={
                <Bar
                  glow={{
                    blur: 20,
                    opacity: 0.3,
                  }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />,
                      ]}
                    />
                  }
                  label={<BarLabel fill="" position={"top"} padding={15} />}
                />
              }
              colorScheme={[
                "#0D4ED2",
                "#4C86FF",
                "#40D3F4",
                "#40E5D1",
                "#DAC5F9",
                "#9152EE",
                "#5B14C5",
              ]}
              padding={0.2}
            />
          }
          gridlines={
            <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
          }
        />
      </div>
    </SpotlightCard>
  );
}
