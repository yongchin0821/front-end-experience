import React, { useRef } from "react";
import SpotlightCard from "../SpotlightCard";
import {
  StackedBarChart,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearYAxisTickLabel,
  StackedBarSeries,
  Bar,
  Gradient,
  GradientStop,
  GridlineSeries,
  Gridline,
} from "reaviz";

export default function ImgFloor() {
  const multiCategory = [
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
      <div className="flex flex-col justify-between pt-4 pb-4 rounded-3xl  w-[500px] h-[350px] overflow-hidden">
      <div className="pb-8"></div>

        <div className={"flex-grow px-4"}>
          <StackedBarChart
            id="horizontal-stacked-gradient"
            data={multiCategory}
            yAxis={
              <LinearYAxis
                type="category"
                tickSeries={
                  <LinearYAxisTickSeries
                    label={
                      <LinearYAxisTickLabel
                        format={(text) => `${text.slice(0, 5)}...`}
                      />
                    }
                  />
                }
              />
            }
            xAxis={
              <LinearXAxis
                type="value"
                axisLine={null}
                tickSeries={
                  <LinearXAxisTickSeries
                    label={null}
                    line={null}
                    tickSize={30}
                  />
                }
              />
            }
            series={
              <StackedBarSeries
                layout="horizontal"
                bar={
                  <Bar
                    glow={{
                      blur: 20,
                      opacity: 0.5,
                    }}
                    gradient={
                      <Gradient
                        stops={[
                          <GradientStop key={1} offset="0%" stopOpacity={0} />,
                          <GradientStop
                            key={2}
                            offset="100%"
                            stopOpacity={1}
                          />,
                        ]}
                      />
                    }
                  />
                }
                padding={0.35}
                colorScheme={["#9152EE", "#40D3F4", "#40E5D1", "#4C86FF"]}
              />
            }
            gridlines={
              <GridlineSeries line={<Gridline strokeColor="#7E7E8F75" />} />
            }
          />
        </div>
      </div>
    </SpotlightCard>
  );
}
