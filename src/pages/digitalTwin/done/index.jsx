import Scene from "./Scene";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas className="webgl">
        <group scale={0.09}>
          <Scene />
        </group>
        <directionalLight position={[1, 1, 0]} />
        <ambientLight color={"0x404040"} intensity={3} />
        <axesHelper args={[5]} />
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </>
  );
}

export default App;
