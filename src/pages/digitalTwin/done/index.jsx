import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Home } from "./Home";
import styles from "./index.module.css";
import { useEffect } from "react";
import Scene from "./Scene";

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

function App() {
  useEffect(() => {
    // const el = document.querySelector(".ctr");
    // const { width, height } = {
    //   width: 1920,
    //   height: 1080,
    // };

    // el.style.transformOrigin = "top left";
    // // el.style.transition = "transform 0.2s ease-in-out";

    // const init = () => {
    //   const scaleX = innerWidth / width;
    //   const scaleY = innerHeight / height;
    //   const scale = Math.min(scaleX, scaleY);
    //   console.log(`dv${scale}`);
    //   const left = (innerWidth - width * scale) / 2;
    //   const top = (innerHeight - height * scale) / 2;
    //   el.style.transform = `translate(${left}0px,${top}px) scale(${scale})`;
    //   console.log(111);
    //   console.log(el.style.width, el.style.height);
    // };

    const el = document.querySelector(".ctr");
    const designWidth = 1920;
    const designHeight = 1080;

    const init = () => {
      const scaleX = window.innerWidth / designWidth;
      const scaleY = window.innerHeight / designHeight;
      const scale = Math.min(scaleX, scaleY);

      const newWidth = designWidth * scale;
      const newHeight = designHeight * scale;

      el.style.width = `${newWidth}px`;
      el.style.height = `${newHeight}px`;

      // 可选：居中显示
      el.style.position = "absolute";
      el.style.left = `${(window.innerWidth - newWidth) / 2}px`;
      el.style.top = `${(window.innerHeight - newHeight) / 2}px`;
    };

    init();
    window.addEventListener("resize", init);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <>
      {/* <div className="ctr" style={{ position: "absolute" }}> */}
      <Canvas
        className={styles.webgl}
        style={{ width: "100%", height: "100%" }}
      >
        <group rotation={[-0.35, 0, 0]} scale={0.09}>
          <Scene />
        </group>
        <directionalLight position={[1, 1, 0]} />
        <ambientLight color={"0x404040"} intensity={3} />
        <axesHelper args={[5]} />
        <OrbitControls enablePan enableRotate />
      </Canvas>
      <div className="ctr" style={{ position: "absolute" }}>
        <Home />
      </div>
    </>
  );
}

export default App;
