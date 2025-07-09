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
          fov: 70,
          near: 0.001,
          far: 1000,
          position: [0, 0, 2],
        }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* <color attach="background" args={["#000000"]} /> */}
        <OrbitControls />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
