import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Component for the marker point
const PointMesh = ({ scaleFactor }) => {
  const texture = useLoader(TextureLoader, "./assets/texture/标注.png");
  const scale = 0.15 * scaleFactor;
  return (
    <mesh renderOrder={97} name="createPointMesh" scale={[scale, scale, scale]}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color={0x00ffff}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

// Component for the light halo with GSAP animation
const LightHalo = ({ scaleFactor }) => {
  const texture = useLoader(TextureLoader, "./assets/texture/标注光圈.png");
  const meshRef = useRef();
  const scale = 0.3 * scaleFactor;

  useEffect(() => {
    const mesh = meshRef.current;
    const delay = Math.random() * 2000;

    gsap
      .timeline({ repeat: -1, delay: delay / 1000 })
      .to(mesh.scale, {
        x: scale * 1.5,
        y: scale * 1.5,
        z: scale * 1.5,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        mesh.material,
        {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(mesh.scale, {
        x: scale * 2,
        y: scale * 2,
        z: scale * 2,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        mesh.material,
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
  }, [scale]);

  return (
    <mesh
      ref={meshRef}
      renderOrder={98}
      name="createLightHalo"
      scale={[scale, scale, scale]}
    >
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        color={0x00ffff}
        side={THREE.DoubleSide}
        opacity={0}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

// Component for the light pillar group
const LightPillar = ({ lon, lat, heightScaleFactor = 1, scaleFactor }) => {
  const texture = useLoader(TextureLoader, "./assets/texture/光柱.png");
  const height = heightScaleFactor;
  const geometry = new THREE.PlaneBufferGeometry(height / 6.219, height);
  geometry.rotateX(Math.PI / 2);
  geometry.translate(0, 0, height / 2);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    color: 0x00ffff,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  return (
    <group position={[lon, lat, 0]}>
      <PointMesh scaleFactor={scaleFactor} />
      <LightHalo scaleFactor={scaleFactor} />
      <mesh renderOrder={99} name="createLightPillar01" geometry={geometry}>
        <primitive object={material} />
      </mesh>
      <mesh
        renderOrder={99}
        name="createLightPillar02"
        geometry={geometry}
        rotation={[0, 0, Math.PI / 2]}
      >
        <primitive object={material} />
      </mesh>
    </group>
  );
};

// Main component
export default function MarkedLightPillar({ options }) {
  const defaultOptions = {
    pointTextureUrl: "./assets/texture/标注.png",
    lightHaloTextureUrl: "./assets/texture/标注光圈.png",
    lightPillarUrl: "./assets/texture/光柱.png",
    scaleFactor: 1,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <LightPillar
      lon={options.lon}
      lat={options.lat}
      heightScaleFactor={options.heightScaleFactor || 1}
      scaleFactor={mergedOptions.scaleFactor}
    />
  );
}
