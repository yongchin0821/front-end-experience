import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function ImgFloor({
  position = [0, 0, 0],
  size = [10, 10],
  imgSrcPath,
  color = "#ffffff",
  opacity = 0.95,
  rotationZ = 0.01,
  textureRepeat = [1, 1],
}) {
  const meshRef = useRef();
  const texture = useTexture(imgSrcPath);

  // Configure texture settings
  texture.encoding = THREE.sRGBEncoding;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(textureRepeat[0], textureRepeat[1]);

  // Rotate each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationZ * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={5}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        color={color}
        map={texture}
        side={THREE.DoubleSide}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthTest
        depthWrite={false}
      />
    </mesh>
  );
}
