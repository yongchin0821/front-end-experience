import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import "./index.css";
import { Content } from "./components/Content";

function App() {
  return (
    <>
      <Canvas
        className="webgl"
        camera={{ position: [0, 0, 5], fov: 75, near: 1, far: 500 }}
      >
        {/* <color attach="background" args={["#000000"]} /> */}
        <OrbitControls />
        <Experience />
      </Canvas>
      <Content />
    </>
  );
}

export default App;
