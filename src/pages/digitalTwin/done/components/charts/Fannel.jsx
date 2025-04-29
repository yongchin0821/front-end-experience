import React, { useRef } from "react";
import SpotlightCard from "../SpotlightCard";
import {
  FunnelChart,
  FunnelAxis,
  FunnelAxisLabel,
  FunnelAxisLine,
  FunnelSeries,
  FunnelArc,
  Count,
  Gradient,
  GradientStop,
  BarLabel,
  GridlineSeries,
  Gridline,
} from "reaviz";
import { motion } from "motion/react";

export default function ImgFloor() {
  const simpleFunnelData = [
    { key: "DLP", data: 13 },
    { key: "SIEM", data: 2 },
    { key: "Endpoint", data: 7 },
  ];
  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <div className="flex flex-col pt-4 pb-4  rounded-3xl w-[500px] h-[560px] overflow-hidden">
        <div className="pb-8"></div>
        <FunnelChart
          id="layered"
          height={330}
          data={simpleFunnelData}
          series={
            <FunnelSeries
              arc={
                <FunnelArc
                  colorScheme={["#EE409430", "#EE409475", "#EE4094"]}
                  gradient={null}
                  variant="layered"
                  glow={{
                    blur: 30,
                    color: "#EE409499",
                  }}
                />
              }
              axis={
                <FunnelAxis
                  label={
                    <FunnelAxisLabel fill="#000000" className="font-bold" />
                  }
                  line={<FunnelAxisLine strokeColor={"#000000"} />}
                />
              }
            />
          }
        />
        <div className="flex w-full pl-8 pr-8 justify-between pb-2 pt-3">
          <div className="flex flex-col gap-2 w-1/2">
            <span className="text-xl">Critical Incidents</span>
            <div className="flex items-center gap-2">
              <Count
                className="font-mono text-4xl font-semibold"
                from={0}
                to={321}
              />
              <div className="flex bg-[rgb(232,64,69)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#F08083]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M5.50134 9.11119L10.0013 4.66675M10.0013 4.66675L14.5013 9.11119M10.0013 4.66675L10.0013 16.3334"
                    stroke="#F08083"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
                12%
              </div>
            </div>
            <span className="text-[#9A9AAF] text-sm">
              Compared to 293 last week
            </span>
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <span className="text-xl">Total Incidents</span>
            <div className="flex items-center gap-2">
              <Count
                className="font-mono text-4xl font-semibold"
                from={0}
                to={1120}
              />
              <div className="flex bg-[rgb(64,229,209)]/40 p-1 pl-2 pr-2 items-center rounded-full text-[#40E5D1]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M14.4987 11.8888L9.99866 16.3333M9.99866 16.3333L5.49866 11.8888M9.99866 16.3333V4.66658"
                    stroke="#40E5D1"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
                4%
              </div>
            </div>
            <span className="text-[#9A9AAF] text-sm">
              Compared to 1.06k last week
            </span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
