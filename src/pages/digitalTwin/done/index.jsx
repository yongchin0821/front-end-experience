import Scene from "./Scene";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Home } from "./Home";
import styles from "./index.module.css";

function App() {
  return (
    <>
      <Canvas className={styles.webgl}>
        <group rotation={[-0.35, 0, 0]} scale={0.09}>
          <Scene />
        </group>
        <directionalLight position={[1, 1, 0]} />
        <ambientLight color={"0x404040"} intensity={3} />
        <axesHelper args={[5]} />
        <OrbitControls enablePan enableRotate />
      </Canvas>
      <Home />
    </>
  );
}

export default App;
