import { useRef, useState } from "react";
import SpotlightCard from "./components/SpotlightCard";
import { BarList } from "reaviz";
import Cardone from "./components/Cardone";
import Cardtwo from "./components/Cardtwo";
import "./index.css";

export function Home() {
  // update with your own items
  const items = [
    { label: "平台", href: "" },
    { label: "three", href: "" },
    { label: "shader", href: "" },
  ];

  const items_list_map = [
    ["数据治理平台", "yongchin's blog"],
    ["Slide Show"],
    ["hologram", "morphing", "dissolve"],
  ];

  const [items_list, setItem] = useState(["数据治理平台", "yongchin's blog"]);

  return (
    <div className="doc flex flex-col justify-between">
      <div className="header text-white text-center">
        <div id="content">
          <p className="text-9xl">Greetings</p>
        </div>
      </div>
      <div className="body text-white grid h-full grid-cols-2 place-content-between place-items-end odd:place-items-start">
        <div className="content">
          <div style={{ minHeight: "400px", position: "relative" }}></div>
        </div>
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          Content goes here
          <BarList
            data={[
              { key: "DLP", data: 13 },
              { key: "Endpoint", data: 7 },
              { key: "SIEM", data: 2 },
            ]}
          />
        </SpotlightCard>
        <Cardone />

        <Cardtwo />
      </div>
      <div className="footer min-h-24">dsdsad</div>
    </div>
  );
}

export default Home;
