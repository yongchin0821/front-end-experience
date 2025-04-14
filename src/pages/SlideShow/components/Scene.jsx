import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Scene(props) {
  // const { nodes, materials } = useGLTF("./models/cybertruck_scene.glb");
  return (
    <mesh position-y={-1.5}>
      <meshBasicMaterial color={"white"} />
      <boxGeometry />
    </mesh>
  );
}

// useGLTF.preload("/cybertruck_scene.glb");
