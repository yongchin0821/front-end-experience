import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { useControls } from "leva";
import "./index.css";

function App() {
  const { clearColor } = useControls({
    clearColor: "#1d1f2a",
  });

  return (
    <Canvas
      shadows
      camera={{ position: [7, 7, 7], fov: 25, near: 0.1, far: 100 }}
    >
      <color attach="background" args={[clearColor]} />
      <Experience />
    </Canvas>
  );
}

export default App;
