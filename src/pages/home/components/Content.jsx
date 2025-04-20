import { useRef, useState } from "react";
import GooeyNav from "./GooeyNav";
import AnimatedList from "./AnimatedList";

import "./index.css";

export function Content() {
  // update with your own items
  const items = [
    { label: "平台", href: "" },
    { label: "three", href: "" },
    { label: "shader", href: "" },
  ];

  const items_list_map = [
    ["数据治理平台", "yongchin's blog"],
    ["Slide Show", "Item 2", "Item 3"],
    ["mophi", "dsd", "dsads"],
  ];

  const [items_list, setItem] = useState(["数据治理平台", "yongchin's blog"]);

  const navEmit = (data) => {
    // console.log("子组件传递的数据:", data);
    // items_list.current = items_list_map[data];
    setItem(items_list_map[data]);
  };

  const address = {
    数据治理平台: "https://yongchin.cn/demo-digitalplatform",
    "yongchin's blog": "https://yongchin.cn/",
  };
  const openWindow = (item, index) => {
    if (address[item]) {
      window.open(address[item], "_blank");
    }
  };

  return (
    <div className="doc">
      <div className="h-screen flex content text-white justify-around items-center">
        <div id="left">
          <div id="content">
            <p className="text-9xl">Greetings</p>
            <p className="text-5xl">Thanks for browsing yongchin's demo</p>
          </div>

          <div style={{ height: "600px", position: "relative" }}>
            <GooeyNav
              navEmit={navEmit}
              items={items}
              animationTime={600}
              pCount={15}
              minDistance={20}
              maxDistance={42}
              maxRotate={75}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              timeVariance={300}
            />

            <AnimatedList
              items={items_list}
              onItemSelect={(item, index) => openWindow(item, index)}
              showGradients={true}
              enableArrowNavigation={true}
              displayScrollbar={true}
            />
          </div>
        </div>
        <div id="right">
          <p className="text-9xl"></p>
        </div>
      </div>
    </div>
  );
}

export default Content;
