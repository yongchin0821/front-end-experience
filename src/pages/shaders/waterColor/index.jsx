import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import styles from "./index.module.css";

function App() {
  return (
    <>
      <Canvas
        className={styles.webgl}
        camera={{
          fov: 75,
          near: 0.01,
          far: 1000,
          position: [0, 0, 2],
        }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* <color attach="background" args={["#fefefe"]} /> */}
        <OrbitControls />
        <Experience />
      </Canvas>

      {/* <Canvas
        orthographic
        camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0, far: 1 }}
      >
        <Experience />
      </Canvas> */}
    </>
  );
}

export default App;
