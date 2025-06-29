import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Experience } from "./components/Experience";
import { Content } from "./components/Content";
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
          position: [0, 0, 8],
        }}
        // 在 Experience 里，我们直接调用了 gl.render(simScene) 和 gl.render(points)，而没有去渲染默认的那个scene。
        // Three.js 的 WebGLRenderer 默认在每次渲染前会清空画布，清空用的是「清空色」（clearColor），在 alpha 通道打开的情况下，这个清空色是透明黑 (0,0,0,0)。
        // 透明画布下，透出的就是页面下层的 DOM 背景，通常是白色（或者你没设的其它颜色）。
        // 所以你看到白底——并不是 <Experience /> 背景本身填了白，而是「透明」透出了 HTML/CSS 的白。
        // gl={{ alpha: false }}
      >
        <color attach="background" args={["#000000"]} />
        <OrbitControls />
        <Experience />
      </Canvas>
      <Content></Content>
    </>
  );
}

export default App;
