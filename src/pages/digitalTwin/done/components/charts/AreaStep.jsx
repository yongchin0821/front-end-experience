import React, { useRef } from "react";
import SpotlightCard from "../SpotlightCard";
import {
  AreaChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearXAxisTickLabel,
  AreaSeries,
  Area,
  Gradient,
  GradientStop,
  GridlineSeries,
  Gridline,
} from "reaviz";

export default function ImgFloor() {
  const areaMultiSeriesInterpolationStepData = [
    {
      key: "Lateral Movement",
      data: [
        { key: new Date("04/01/2025"), data: 3 },
        { key: new Date("04/02/2025"), data: 7 },
        { key: new Date("04/03/2025"), data: 9 },
        { key: new Date("04/04/2025"), data: 2 },
        { key: new Date("04/05/2025"), data: 5 },
        { key: new Date("04/06/2025"), data: 8 },
        { key: new Date("04/07/2025"), data: 4 },
      ],
    },
    {
      key: "Discovery",
      data: [
        { key: new Date("04/01/2025"), data: 6 },
        { key: new Date("04/02/2025"), data: 1 },
        { key: new Date("04/03/2025"), data: 10 },
        { key: new Date("04/04/2025"), data: 4 },
        { key: new Date("04/05/2025"), data: 7 },
        { key: new Date("04/06/2025"), data: 3 },
        { key: new Date("04/07/2025"), data: 9 },
      ],
    },
    // {
    //   key: "Execution",
    //   data: [
    //     { key: new Date("04/01/2025"), data: 5 },
    //     { key: new Date("04/02/2025"), data: 8 },
    //     { key: new Date("04/03/2025"), data: 2 },
    //     { key: new Date("04/04/2025"), data: 10 },
    //     { key: new Date("04/05/2025"), data: 6 },
    //     { key: new Date("04/06/2025"), data: 1 },
    //     { key: new Date("04/07/2025"), data: 7 }
    //   ]
    // }
  ];

  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
      title="全国全年经济情况"
    >
      <div className="flex flex-col justify-between pt-4 pb-4 rounded-3xl  h-full overflow-hidden">
        <div className="flex w-full pl-8 pr-8 gap-14 mb-4">
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#5B14C5]" />
            <span className="text-[#9A9AAF] text-xs">DLP</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 bg-[#DAC5F9]" />
            <span className="text-[#9A9AAF] text-xs">Threat Intel</span>
          </div>
        </div>
        <AreaChart
          id="multi-series-interpolation-step"
          data={areaMultiSeriesInterpolationStepData}
          xAxis={
            <LinearXAxis
              type="time"
              tickSeries={
                <LinearXAxisTickSeries
                  label={
                    <LinearXAxisTickLabel
                      format={(v) =>
                        new Date(v).toLocaleDateString("en-US", {
                          month: "numeric",
                          day: "numeric",
                        })
                      }
                      fill="#9A9AAF"
                    />
                  }
                  tickSize={30}
                />
              }
            />
          }
          yAxis={
            <LinearYAxis
              axisLine={null}
              tickSeries={
                <LinearYAxisTickSeries line={null} label={null} tickSize={20} />
              }
            />
          }
          series={
            <AreaSeries
              type="grouped"
              interpolation="step"
              area={
                <Area
                  gradient={
                    <Gradient
                      stops={[
                        <GradientStop key={1} stopOpacity={0} />,
                        <GradientStop
                          key={2}
                          offset="100%"
                          stopOpacity={0.4}
                        />,
                      ]}
                    />
                  }
                />
              }
              colorScheme={["#5B14C5", "#DAC5F9", "#B58BF3"]}
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
