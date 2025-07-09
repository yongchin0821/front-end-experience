import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

export const Experience = () => {
  // const camera = useThree((state) => state.camera);
  // const scene = useThree((state) => state.scene);
  // const { camera, raycaster } = useThree();

  const colorA = "ffffff"; // Define your color here
  const meshRef = useRef();
  const dummyRef = useRef();

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pointPos = new THREE.Vector3(0.5, 1.0, 0);

  const { camera } = useThree();

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // console.log(event.clientX);
    raycaster.setFromCamera(pointer, camera);

    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        // meshRef2.current.position.copy(intersects[0].point);
        dummyRef.current.position.copy(intersects[0].point);
        // pointPos.copy(intersects[0].point);
      }
    }
  };

  useFrame(() => {});

  useEffect(() => {
    // window.addEventListener("mousemove", onPointerMove);
  }, []);

  return (
    <>
      {/* MAIN WORLD */}
      <mesh ref={meshRef} onPointerMove={onPointerMove}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color={0x000000} side={THREE.DoubleSide} />
        {/* <shaderMaterial
          uniforms={{
            uColor: { value: null },
            uSize: { value: null },
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide} //从背面看也正确渲染
          transparent={true}
        /> */}
      </mesh>
      <mesh ref={dummyRef}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshBasicMaterial
          color={0xffffff}
          // side={THREE.DoubleSide} //从背面看也正确渲染
        />
      </mesh>
    </>
  );
};
