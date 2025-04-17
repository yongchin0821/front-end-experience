import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Experience } from "../components/Experience";
import "./index.css";

function App() {
  return (
    <Canvas
      
      camera={{ position: [0, 2, 2], fov: 75, near: 0.1, far: 200 }}
    >
      <color attach="background" args={["#000000"]} />
      <OrbitControls />
      <Experience />
      {/* <EffectComposer>
        <Bloom luminanceThreshold={1} intensity={1.25} mipmapBlur />
      </EffectComposer> */}
    </Canvas>
  );
}

export default App;
