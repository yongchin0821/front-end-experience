import React, { useRef } from "react";
import SpotlightCard from "../SpotlightCard";
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
  GridlineSeries,
  Gridline,
} from "reaviz";

export default function ImgFloor() {
  const multiCategorySmallBlock = [
    {
      key: "2025/04/01",
      data: [
        { key: "XML", data: 3 },
        { key: "JSON", data: 8 },
        { key: "HTTPS", data: 5 },
        { key: "SSH", data: 2 },
      ],
    },
    {
      key: "2025/04/02",
      data: [
        { key: "XML", data: 7 },
        { key: "JSON", data: 4 },
        { key: "HTTPS", data: 9 },
        { key: "SSH", data: 1 },
      ],
    },
    {
      key: "2025/04/03",
      data: [
        { key: "XML", data: 6 },
        { key: "JSON", data: 3 },
        { key: "HTTPS", data: 10 },
        { key: "SSH", data: 4 },
      ],
    },
    {
      key: "2025/04/04",
      data: [
        { key: "XML", data: 3 },
        { key: "JSON", data: 1 },
        { key: "HTTPS", data: 5 },
        { key: "SSH", data: 7 },
      ],
    },
  ];

  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <div className="flex flex-col justify-between pt-4 pb-4 rounded-3xl  h-full">
        <div className="flex justify-between w-full pl-8 pr-8 mb-4">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#DAC5F9]" />
            <span className="text-[#9A9AAF] text-xs">XML</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#40E5D1]" />
            <span className="text-[#9A9AAF] text-xs">JSON</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#9152EE]" />
            <span className="text-[#9A9AAF] text-xs">HTTPS</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#5B14C5]" />
            <span className="text-[#9A9AAF] text-xs">SSH</span>
          </div>
        </div>
        <BarChart
          id="simple-multi-gradient"
          data={multiCategorySmallBlock}
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
                      // format={(text) => `${text.slice(0, 8)}...`}
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
                  width={6}
                  glow={{
                    blur: 20,
                    opacity: 0.7,
                  }}
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} offset="0%" stopOpacity={0} />,
                        <GradientStop key={2} offset="100%" stopOpacity={1} />,
                      ]}
                    />
                  }
                />
              }
              colorScheme={["#DAC5F9", "#40E5D1", "#9152EE", "#5B14C5"]}
              layout="vertical"
              type="grouped"
              groupPadding={30}
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
