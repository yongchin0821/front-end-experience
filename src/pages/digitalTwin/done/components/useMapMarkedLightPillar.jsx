import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useEffect } from "react";
import gsap from "gsap";

// Component for the marker point
const PointMesh = ({ scaleFactor, pointTextureUrl }) => {
  const texture = useLoader(TextureLoader, pointTextureUrl);
  const scale = 0.15 * scaleFactor;
  return (
    <mesh renderOrder={97} name="createPointMesh" scale={[scale, scale, scale]}>
      <planeGeometry args={[1, 1]} />
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
const LightHalo = ({ scaleFactor, lightHaloTextureUrl }) => {
  const texture = useLoader(TextureLoader, lightHaloTextureUrl);
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
      <planeGeometry args={[1, 1]} />
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
const LightPillar = ({ props }) => {
  const texture = useLoader(TextureLoader, props.lightPillarUrl);
  const height = props.heightScaleFactor || 1;
  const geometry = new THREE.PlaneGeometry(height / 6.219, height);
  geometry.rotateX(Math.PI / 2);
  geometry.translate(0, 0, height / 2);

  return (
    <group position={[props.lon, props.lat, 1]}>
      <PointMesh
        scaleFactor={props.scaleFactor}
        pointTextureUrl={props.pointTextureUrl}
      />
      <LightHalo
        scaleFactor={props.scaleFactor}
        lightHaloTextureUrl={props.lightHaloTextureUrl}
      />
      <mesh renderOrder={99} name="createLightPillar01" geometry={geometry}>
        <meshBasicMaterial
          map={texture}
          color={0x00ffff}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh
        renderOrder={99}
        name="createLightPillar02"
        geometry={geometry}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshBasicMaterial
          map={texture}
          color={0x00ffff}
          side={THREE.DoubleSide}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Main component
export default function MarkedLightPillar({ ...options }) {
  const defaultOptions = {
    pointTextureUrl: "/digitaltwin/done/texture/标注.png",
    lightHaloTextureUrl: "/digitaltwin/done/texture/标注光圈.png",
    lightPillarUrl: "/digitaltwin/done/texture/光柱.png",
    scaleFactor: 5,
  };
  const mergedOptions = { ...defaultOptions, ...options };
  return <LightPillar props={mergedOptions} />;
}
