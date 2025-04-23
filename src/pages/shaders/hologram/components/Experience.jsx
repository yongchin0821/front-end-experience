import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Car from "./Car.jsx";
import Coin from "./Coin.jsx";
import Material from "./Material";

export const Experience = () => {
  const coinRef = useRef();
  const sphereRef = useRef();
  const carRef = useRef();
  useFrame((_state, delta) => {
    //update material
    const elapsedTime = _state.clock.elapsedTime;
    // Rotate objects
    if (carRef) {
      carRef.current.rotation.x = -elapsedTime * 0.1;
      carRef.current.rotation.y = elapsedTime * 0.2;
    }
    sphereRef.current.rotation.x = -elapsedTime * 0.1;
    sphereRef.current.rotation.y = elapsedTime * 0.2;
    if (coinRef) {
      coinRef.current.rotation.x = -elapsedTime * 0.1;
      coinRef.current.rotation.y = elapsedTime * 0.2;
    }

  });
  return (
    <>
      <OrbitControls />
      <Coin ref={coinRef} position-x={3} scale={1.5} />
      <mesh ref={sphereRef} position-x={-3}>
        <sphereGeometry></sphereGeometry>
        <Material />
      </mesh>
      <Car ref={carRef} />
    </>
  );
};
