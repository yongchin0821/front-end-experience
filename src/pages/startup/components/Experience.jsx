import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

export const Experience = () => {
  // const camera = useThree((state) => state.camera);
  // const scene = useThree((state) => state.scene);
  // const { camera, raycaster } = useThree();

  const meshRef = useRef();

  useFrame(() => {});

  useEffect(() => {}, []);

  return (
    <>
      {/* MAIN WORLD */}
      <points ref={meshRef}>
        <planeGeometry args={[1, 1, 10, 10]} />
        {/* <meshBasicMaterial
          color={colorA}
          side={THREE.DoubleSide} //从背面看也正确渲染
          transparent={true}
          opacity={0.5}
        /> */}
        <shaderMaterial
          uniforms={{
            uColor: { value: null },
            uSize: { value: null },
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide} //从背面看也正确渲染
          // transparent={true}
        />
      </points>
    </>
  );
};
