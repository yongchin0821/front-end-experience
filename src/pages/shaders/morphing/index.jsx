import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useControls } from "leva";
import "./index.css";

function App() {
  const { clearColor } = useControls({
    clearColor: "#160920",
  });

  return (
    <Canvas
      
      gl={{ antialias: true }} // 开启抗锯齿
      camera={{
        position: [0, 0, 8 * 2],
        fov: 35,
        near: 0.1,
        far: 100,
      }}
    >
      <color attach="background" args={[clearColor]} />
      <Experience />
    </Canvas>
  );
}

export default App;
