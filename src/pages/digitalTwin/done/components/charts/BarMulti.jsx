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
      key: "2025/01/01",
      data: [
        { key: "饮食", data: 3 },
        { key: "旅游", data: 8 },
        { key: "建设", data: 5 },
        { key: "科研", data: 2 },
      ],
    },
    {
      key: "2025/04/01",
      data: [
        { key: "饮食", data: 7 },
        { key: "旅游", data: 4 },
        { key: "建设", data: 9 },
        { key: "科研", data: 1 },
      ],
    },
    {
      key: "2025/07/01",
      data: [
        { key: "饮食", data: 6 },
        { key: "旅游", data: 3 },
        { key: "建设", data: 10 },
        { key: "科研", data: 4 },
      ],
    },
    {
      key: "2025/10/01",
      data: [
        { key: "饮食", data: 3 },
        { key: "旅游", data: 1 },
        { key: "建设", data: 5 },
        { key: "科研", data: 7 },
      ],
    },
  ];

  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
      title='全国季度增长情况'
    >
      <div className="flex flex-col justify-between pt-4 pb-4 rounded-3xl  h-full">
        <div className="flex justify-between w-full pl-8 pr-8 mb-4">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#DAC5F9]" />
            <span className="text-[#9A9AAF] text-xs">饮食</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#40E5D1]" />
            <span className="text-[#9A9AAF] text-xs">旅游</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#9152EE]" />
            <span className="text-[#9A9AAF] text-xs">建设</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#5B14C5]" />
            <span className="text-[#9A9AAF] text-xs">科研</span>
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
