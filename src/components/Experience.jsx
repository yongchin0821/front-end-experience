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
import testFragmentShader from "./fragment.glsl";
import testVertexShader from "./vertex.glsl";
import particleTexture from "./particle3.jpg";

import { Galaxy } from "./Galaxy";
import { ConstantColorFactor } from "three";
import threeCustomShaderMaterial from "three-custom-shader-material";
import { scenes } from "../pages/SlideShow/components/Experience";

const galaxies = [
  {
    id: 0,
    min_radius: 0.3,
    max_radius: 1.5,
    color: "#f7b373",
    size: 1,
  },
  {
    id: 1,
    min_radius: 0.3,
    max_radius: 1.5,
    color: "#88b3ce",
    size: 0.5,
  },
];

export const Experience = () => {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const point = new THREE.Vector3();

  const raycasterEvent = () => {
    let mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );

    scene.add(mesh)

    window.addEventListener("pointermove", (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera(pointer, camera);

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects([mesh]);

      if (intersects[0]) {
        console.log(intersects[0].point);
      }
    });
  };

  useFrame((_state, delta) => {});

  useEffect(() => {}, []);

  return (
    <>
      {/* MAIN WORLD */}
      {galaxies.map((item, index) => (
        <Galaxy key={item.id} {...item} />
      ))}
    </>
  );
};
