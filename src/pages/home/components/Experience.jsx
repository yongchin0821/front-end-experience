import {
  CameraControls,
  Dodecahedron,
  Environment,
  Grid,
  MeshDistortMaterial,
  RenderTexture,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Galaxy } from "./Galaxy";

const color = {
  blue: "#0063f7",
  green: "#88b3ce",
  purple: "#fc00ff",
};

const galaxies = [
  {
    id: 0,
    count: 5000,
    min_radius: 1.35,
    max_radius: 1.55,
    color: color.green,
    size: 1,
    amp: 3,
  },
  {
    id: 1,
    count: 5000,
    min_radius: 1.4,
    max_radius: 1.5,
    color: color.blue,
    size: 1,
    amp: 1,
  },

  {
    id: 2,
    count: 5000,
    min_radius: 1.0,
    max_radius: 1.3,
    color: color.green,
    size: 1,
    amp: 3,
  },
  {
    id: 3,
    count: 5000,
    min_radius: 1.0,
    max_radius: 1.3,
    color: color.blue,
    size: 1,
    amp: 1,
  },
  {
    id: 4,
    count: 5000,
    min_radius: 1.25,
    max_radius: 1.3,
    color: color.blue,
    size: 1,
    amp: 1,
  },

  {
    id: 5,
    count: 2000,
    min_radius: 0.8,
    max_radius: 0.85,
    color: color.purple,
    size: 0.5,
    amp: 1,
  },
  {
    id: 6,
    count: 5000,
    min_radius: 0.6,
    max_radius: 0.85,
    color: color.green,
    size: 0.5,
    amp: 3,
  },
  {
    id: 7,
    count: 5000,
    min_radius: 0.6,
    max_radius: 0.85,
    color: color.blue,
    size: 1,
    amp: 1,
  },

  {
    id: 8,
    count: 5000,
    min_radius: 0.56,
    max_radius: 0.57,
    color: color.blue,
    size: 0.5,
    amp: 3,
  },
  {
    id: 9,
    count: 5000,
    min_radius: 0.3,
    max_radius: 0.5,
    color: color.green,
    size: 0.5,
    amp: 3,
  },
  {
    id: 10,
    count: 5000,
    min_radius: 0.3,
    max_radius: 0.5,
    color: color.blue,
    size: 1,
    amp: 1,
  },

  {
    id: 19,
    count: 20000,
    min_radius: 0.1,
    max_radius: 1.55,
    color: color.green,
    size: 0.8,
    amp: 3,
  },
  {
    id: 20,
    count: 20000,
    min_radius: 0.1,
    max_radius: 1.55,
    color: color.blue,
    size: 0.8,
    amp: 1,
  },
];

export const Experience = () => {
  const { colorA } = useControls({
    colorA: "#0f40f5",
  });

  // const camera = useThree((state) => state.camera);
  // const scene = useThree((state) => state.scene);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const point = new THREE.Vector3(0.5, 1.0, 0);

  // const raycasterEvent = () => {
  //   let mesh = new THREE.Mesh(
  //     new THREE.PlaneGeometry(10, 10, 10, 10).rotateX(-Math.PI / 2),
  //     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  //   );

  //   let smesh = new THREE.Mesh(
  //     new THREE.SphereGeometry(0.1, 10, 10),
  //     new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
  //   );

  //   // scene.add(test);

  //   window.addEventListener("pointermove", (event) => {
  //     pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //     // update the picking ray with the camera and pointer position
  //     raycaster.setFromCamera(pointer, camera);

  //     // calculate objects intersecting the picking ray
  //     const intersects = raycaster.intersectObjects([mesh]);

  //     if (intersects[0]) {
  //       smesh.position.copy(intersects[0].point);
  //       point.copy(intersects[0].point);
  //     }
  //   });
  // };

  const meshRef = useRef();
  const meshRef2 = useRef();
  // const { camera, raycaster } = useThree();

  const onPointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, event.camera);

    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current);
      if (intersects.length > 0) {
        // console.log(intersects[0].point);
        // meshRef2.current.position.copy(intersects[0].point);
        point.copy(intersects[0].point);
      }
    }
  };

  useFrame((state) => {});

  useEffect(() => {
    // raycasterEvent();
  }, []);

  return (
    <>
      {/* MAIN WORLD */}

      <Sparkles
        scale={6}
        speed={0.1}
        size={2}
        count={200}
        opacity={0.3}
      ></Sparkles>

      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <group scale={2.5} rotation={[1, 0, 0.3]} position={[1.5, 1.5, 0]}>
        <mesh
          visible={false}
          ref={meshRef}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerMove={onPointerMove}
        >
          <planeGeometry args={[3, 3, 10, 10]} />
          <meshBasicMaterial color={0xff0000} wireframe />
        </mesh>
        <mesh
          visible={false}
          ref={meshRef2}
          rotation={[-Math.PI / 2, 0, 0]}
          // onPointerMove={onPointerMove}
        >
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshBasicMaterial color={0xff0000} wireframe />
        </mesh>

        {galaxies.map((item, index) => (
          <Galaxy key={item.id} {...item} point={point} />
        ))}
      </group>
    </>
  );
};
