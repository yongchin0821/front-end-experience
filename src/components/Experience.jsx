import {
  CameraControls,
  Dodecahedron,
  Environment,
  Grid,
  MeshDistortMaterial,
  RenderTexture,
  Points,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Galaxy } from "./Galaxy";

// const galaxies = [
//   {
//     id: 0,
//     min_radius: 0.3,
//     max_radius: 1.5,
//     color: "#9d00ff",
//     size: 1,
//     amp: 1,
//   },
//   {
//     id: 1,
//     min_radius: 0.3,
//     max_radius: 1.5,
//     color: "#88b3ce",
//     size: 0.5,
//     amp: 3,
//   },
// ];

export const Experience = () => {
  const { colorA } = useControls({
    colorA: "#0f40f5",
  });

  const galaxies = [
    {
      id: 0,
      count: 10000,
      min_radius: 0.2,
      max_radius: 1.0,
      color: "#88b3ce",
      size: 0.5,
      amp: 3,
    },
    {
      id: 1,
      count: 10000,
      min_radius: 0.3,
      max_radius: 1.5,
      color: "#0063f7",
      size: 1,
      amp: 1,
    },
    {
      id: 2,
      count: 10000,
      min_radius: 1.0,
      max_radius: 1.6,
      color: "#5900ff",
      size: 0.5,
      amp: 3,
    },
  ];

  const camera = useThree((state) => state.camera);
  // const scene = useThree((state) => state.scene);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const point = new THREE.Vector3();

  const raycasterEvent = () => {
    let mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 10, 10).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    let smesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 10.1),
      new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
    );

    // scene.add(test);

    window.addEventListener("pointermove", (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, camera);

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects([mesh]);

      if (intersects[0]) {
        smesh.position.copy(intersects[0].point);
        point.copy(intersects[0].point);
      }
    });
  };

  useFrame((state) => {
  });

  useEffect(() => {
    raycasterEvent();
  }, []);

  return (
    <>
      {/* MAIN WORLD */}
      {galaxies.map((item, index) => (
        <Galaxy key={item.id} {...item} point={point} />
      ))}
    </>
  );
};
