import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import "./index.css";

function App() {
  return (
    <>
      <Canvas
        className="webgl"
        camera={{
          fov: 70,
          near: 0.001,
          far: 1000,
          position: [0, 0, 2],
        }}
      >
        {/* <color attach="background" args={["#000000"]} /> */}
        <OrbitControls />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
