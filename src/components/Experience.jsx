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
import { useEffect, useRef, useMemo } from "react";
import testFragmentShader from "./fragment.glsl";
import testVertexShader from "./vertex.glsl";

const lerp = (a, b, t) => {
  return a * (1 - t) + b * t;
};

export const Experience = () => {
  const count = 10000;
  const pos = new Float32Array(count * 3);
  const particlegeo = useRef();
  const geo = useRef();

  let min_radius = 0.5;
  let max_radius = 1;
  useFrame(() => {
    // geo.current.attributes.position.needsUpdate = true
  });

  useEffect(() => {
    geo.current.setAttribute(
      "position",
      particlegeo.current.getAttribute("position")
    );

    // geo.current.index = particlegeo.current.index;
    console.log(geo);

    for (let i = 0; i < count; i++) {
      let theta = Math.random() * 2 * Math.PI;

      let r = lerp(min_radius, max_radius, Math.random()); //随机值

      let x = r * Math.sin(theta);
      let y = (Math.random() - 0.5) * 0.05;
      let z = r * Math.cos(theta);

      pos.set([x, y, z], i * 3);
    }

    geo.current.setAttribute(
      "pos",
      new THREE.BufferAttribute(pos, 3, false)
    );

    return () => {
      if (geo.current || particlegeo.current) {
        geo.current.dispose(); // 防止内存泄漏
        particlegeo.current.dispose(); // 防止内存泄漏
      }
    };
  }, []);

  // const positions = useMemo(() => {
  //   const pos = new Float32Array(count * 3);
  //   for (let i = 0; i < count; i++) {
  //     let theta = Math.random() * 2 * Math.PI;
  //     let r = lerp(min_radius, max_radius, Math.random());
  //     let x = r * Math.sin(theta);
  //     let y = (Math.random() - 0.5) * 0.05;
  //     let z = r * Math.cos(theta);
  //     pos[i * 3] = x;
  //     pos[i * 3 + 1] = y;
  //     pos[i * 3 + 2] = z;
  //   }
  //   return pos;
  // }, [count]);

  return (
    <>
      {/* MAIN WORLD */}

      <points>
        <instancedBufferGeometry instanceCount={count} ref={geo}>
          <planeGeometry ref={particlegeo} attach="geometry" args={[1, 1]} />
          {/* <instancedBufferAttribute
            attach="attributes-pos"
            array={positions}
            count={count}
            itemSize={3}
          /> */}
        </instancedBufferGeometry>
        {/* <bufferGeometry ref={geo}>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry> */}
        <shaderMaterial
          extensions={{
            derivatives: "#extension GL_OES_standard_derivatives : enable",
          }}
          side={THREE.DoubleSide}
          uniforms={{
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
          vertexShader={testVertexShader}
          fragmentShader={testFragmentShader}
          transparent
          depthWrite={false}
        />
      </points>
    </>
  );
};
