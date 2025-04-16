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

const lerp = (a, b, t) => {
  return a * (1 - t) + b * t;
};

export const Experience = () => {
  const count = 10000;
  const pos = new Float32Array(count * 3);
  const particlegeo = useRef();
  const geo = useRef();
  const shaderRef = useRef();

  let min_radius = 0.5;
  let max_radius = 1;
  useFrame((_state, delta) => {
    shaderRef.current.uniforms.time.value += delta;
  });
  useEffect(() => {
    geo.current.setAttribute(
      "position",
      particlegeo.current.getAttribute("position")
    );
    // particlegeo.current.setIndex(null);
    geo.current.index = particlegeo.current.index;
    console.log(geo);

    for (let i = 0; i < count; i++) {
      let theta = Math.random() * 2 * Math.PI;

      let r = lerp(min_radius, max_radius, Math.random()); //随机值

      let x = r * Math.sin(theta);
      let y = (Math.random() - 0.5) * 0.1;
      let z = r * Math.cos(theta);

      pos.set([x, y, z], i * 3);
    }

    geo.current.setAttribute(
      "pos",
      new THREE.InstancedBufferAttribute(pos, 3, false)
    );

    return () => {
      if (geo.current || particlegeo.current) {
        geo.current.dispose(); // 防止内存泄漏
        particlegeo.current.dispose(); // 防止内存泄漏
      }
    };
  }, []);

  return (
    <>
      {/* MAIN WORLD */}

      <mesh>
        <instancedBufferGeometry ref={geo} instanceCount={count}>
          <planeGeometry ref={particlegeo} args={[1, 1]}></planeGeometry>
        </instancedBufferGeometry>
        <shaderMaterial
          ref={shaderRef}
          extensions={{
            derivatives: "#extension GL_OES_standard_derivatives : enable",
          }}
          side={THREE.DoubleSide}
          uniforms={{
            uTexture: {
              value: new THREE.TextureLoader().load(particleTexture),
            },
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
          vertexShader={testVertexShader}
          fragmentShader={testFragmentShader}
          transparent={true}
          depthWrite={false}
          // blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
};
