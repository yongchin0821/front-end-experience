我在使用 react three fiber + vite-plugin-pages 时，console 出现了`THREE.WebGLRenderer: Context Lost`报错，如何解决

# object

1. 阅读我的代码
2. 分析出问题的原因，给出解决办法

# code

```main.jsx
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";

import routes from "~react-pages";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
    // <> {useRoutes(routes)}</>
  );
}

const app = createRoot(document.getElementById("root"));

app.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

```src/pages/SlideShow/index.jsx
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import './index.css'

function App2() {
  return (
    <>
      <Leva hidden />
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App2;
```
