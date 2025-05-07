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
  BarLabel,
  GridlineSeries,
  Gridline,
} from "reaviz";
import { motion } from "motion/react";

export default function ImgFloor() {
  const labelsData = [
    { key: "农业", data: 10 },
    { key: "能源", data: 2 },
    { key: "金属", data: 7 },
    { key: "化工", data: 9 },
    { key: "建设", data: 2 },
    { key: "餐饮", data: 7 },
  ];
  return (
    <SpotlightCard
      className="custom-spotlight-card"
      spotlightColor="rgba(0, 229, 255, 0.2)"
      title="全国商品分类销售"
    >
      <div className="flex flex-col pt-4 h-full text-xs">
        <div className="pb-4"></div>
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
                      format={(text) => `${text.slice(0, 5)}`}
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
        <div className="flex flex-col pl-2 pr-2 font-mono divide-y divide-[#262631]">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex w-full pb-2 pt-2 items-center gap-2"
          >
            <div className="flex flex-row gap-2 items-center w-1/2 text-[#9A9AAF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9.92844 1.25411C9.32947 1.25895 8.73263 1.49041 8.28293 1.94747L1.92062 8.41475C1.02123 9.32885 1.03336 10.8178 1.94748 11.7172L8.41476 18.0795C9.32886 18.9789 10.8178 18.9667 11.7172 18.0526L18.0795 11.5861C18.0798 11.5859 18.08 11.5856 18.0803 11.5853C18.979 10.6708 18.9667 9.18232 18.0526 8.28291L11.5853 1.92061C11.1283 1.47091 10.5274 1.24926 9.92844 1.25411ZM9.93901 2.49597C10.2155 2.49373 10.4926 2.59892 10.7089 2.81172L17.1762 9.17403C17.6087 9.59962 17.6139 10.2767 17.1884 10.7097L10.8261 17.1761C10.4005 17.6087 9.72379 17.614 9.29123 17.1884L2.82394 10.826C2.39139 10.4005 2.38613 9.72378 2.81174 9.29121L9.17404 2.82393C9.38684 2.60765 9.66256 2.4982 9.93901 2.49597ZM9.99028 5.40775C9.82481 5.41034 9.66711 5.47845 9.55178 5.59714C9.43645 5.71583 9.37289 5.87541 9.37505 6.04089V11.0409C9.37388 11.1237 9.38918 11.2059 9.42006 11.2828C9.45095 11.3596 9.4968 11.4296 9.55495 11.4886C9.6131 11.5476 9.6824 11.5944 9.75881 11.6264C9.83522 11.6583 9.91722 11.6748 10 11.6748C10.0829 11.6748 10.1649 11.6583 10.2413 11.6264C10.3177 11.5944 10.387 11.5476 10.4451 11.4886C10.5033 11.4296 10.5492 11.3596 10.58 11.2828C10.6109 11.2059 10.6262 11.1237 10.625 11.0409V6.04089C10.6261 5.95731 10.6105 5.87435 10.5789 5.79694C10.5474 5.71952 10.5006 5.64922 10.4415 5.59019C10.3823 5.53115 10.3119 5.48459 10.2344 5.45326C10.1569 5.42192 10.0739 5.40645 9.99028 5.40775ZM10 12.9159C9.77904 12.9159 9.56707 13.0037 9.41079 13.16C9.25451 13.3162 9.16672 13.5282 9.16672 13.7492C9.16672 13.9702 9.25451 14.1822 9.41079 14.3385C9.56707 14.4948 9.77904 14.5826 10 14.5826C10.2211 14.5826 10.433 14.4948 10.5893 14.3385C10.7456 14.1822 10.8334 13.9702 10.8334 13.7492C10.8334 13.5282 10.7456 13.3162 10.5893 13.16C10.433 13.0037 10.2211 12.9159 10 12.9159Z"
                  fill="#E84045"
                />
              </svg>
              <span className="truncate text-xs">Mean Time to Respond</span>
            </div>
            <div className="flex gap-2 w-1/2 justify-end">
              <span className="font-semibold text-white">6 Hours</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="28"
                  height="28"
                  rx="14"
                  fill="#E84045"
                  fillOpacity="0.4"
                />
                <path
                  d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                  stroke="#F08083"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.05,
            }}
            className="flex w-full pb-2 pt-2 items-center gap-2"
          >
            <div className="flex flex-row gap-2 items-center text-base w-1/2 text-[#9A9AAF]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10.0001 1.66663C5.40511 1.66663 1.66675 5.40499 1.66675 9.99996C1.66675 14.5949 5.40511 18.3333 10.0001 18.3333C14.5951 18.3333 18.3334 14.5949 18.3334 9.99996C18.3334 5.40499 14.5951 1.66663 10.0001 1.66663ZM10.0001 2.91663C13.9195 2.91663 17.0834 6.08054 17.0834 9.99996C17.0834 13.9194 13.9195 17.0833 10.0001 17.0833C6.08066 17.0833 2.91675 13.9194 2.91675 9.99996C2.91675 6.08054 6.08066 2.91663 10.0001 2.91663ZM9.99032 5.82434C9.8247 5.82693 9.66688 5.89515 9.55152 6.01401C9.43616 6.13288 9.37271 6.29267 9.37508 6.45829V10.625C9.37391 10.7078 9.38921 10.79 9.42009 10.8669C9.45098 10.9437 9.49683 11.0137 9.55498 11.0726C9.61313 11.1316 9.68243 11.1785 9.75884 11.2104C9.83525 11.2424 9.91725 11.2589 10.0001 11.2589C10.0829 11.2589 10.1649 11.2424 10.2413 11.2104C10.3177 11.1785 10.387 11.1316 10.4452 11.0726C10.5033 11.0137 10.5492 10.9437 10.5801 10.8669C10.611 10.79 10.6263 10.7078 10.6251 10.625V6.45829C10.6263 6.37464 10.6107 6.2916 10.5792 6.21409C10.5477 6.13658 10.501 6.06618 10.4418 6.00706C10.3826 5.94794 10.3121 5.9013 10.2346 5.86992C10.157 5.83853 10.074 5.82303 9.99032 5.82434ZM10.0001 12.5C9.77907 12.5 9.56711 12.5878 9.41083 12.744C9.25455 12.9003 9.16675 13.1123 9.16675 13.3333C9.16675 13.5543 9.25455 13.7663 9.41083 13.9225C9.56711 14.0788 9.77907 14.1666 10.0001 14.1666C10.2211 14.1666 10.4331 14.0788 10.5893 13.9225C10.7456 13.7663 10.8334 13.5543 10.8334 13.3333C10.8334 13.1123 10.7456 12.9003 10.5893 12.744C10.4331 12.5878 10.2211 12.5 10.0001 12.5Z"
                  fill="#E84045"
                />
              </svg>
              <span className="truncate text-xs">Incident Response Time</span>
            </div>
            <div className="flex gap-2 w-1/2 justify-end">
              <span className="font-semibold text-sx text-white">4 Hours</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="28"
                  height="28"
                  rx="14"
                  fill="#E84045"
                  fillOpacity="0.4"
                />
                <path
                  d="M9.50134 12.6111L14.0013 8.16663M14.0013 8.16663L18.5013 12.6111M14.0013 8.16663L14.0013 19.8333"
                  stroke="#F08083"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
      ;
    </SpotlightCard>
  );
}
