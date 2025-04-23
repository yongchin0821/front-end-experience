import { OrbitControls, useGLTF, shaderMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import particlesVertexShader from "../shader/particles/vertex.glsl";
import particlesFragmentShader from "../shader/particles/fragment.glsl";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import { useControls, button } from "leva";
import gsap from "gsap";

// 1. 定义带 uniforms 的材质类
const MyParticleMaterial = shaderMaterial(
  {
    uColorA: new THREE.Color("#ff7300"),
    uColorB: new THREE.Color("#0091ff"),
    uProgress: 0,
    uSize: 0.3,
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  particlesVertexShader,
  particlesFragmentShader
);

// 2. 注册到 R3F
extend({ MyParticleMaterial });

let particles = null;

/**
 * Particles
 */
particles = {};
particles.index = 0;

// Material
particles.colorA = "#ff7300";
particles.colorB = "#0091ff";

// 全局预配置 Draco（只需执行一次）
useGLTF.preload("/models.glb", (loader) => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);
});

export const Experience = () => {
  particles.morph = (i) => {
    //Update attributes
    geo.current.attributes.position = particles.positions[particles.index];
    geo.current.attributes.aPositionTarget = particles.positions[i];
    gsap.fromTo(
      debug_opt,
      {
        Progress: 0,
      },
      { Progress: 1, duration: 3, ease: "linear" }
    );
    particles.index = i;
  };

  const debug_opt = useControls({
    colorA: "#ff7300",
    colorB: "#0091ff",
    Progress: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.0001,
    },
    circle: button(() => {
      particles.morph(0);
    }),
    susan: button(() => {
      particles.morph(1);
    }),
    sphere: button(() => {
      particles.morph(2);
    }),
    text: button(() => {
      particles.morph(3);
    }),
  });

  const geo = useRef();
  const shaderRef = useRef();

  const gltf = useGLTF("/models.glb"); // 直接使用预配置的加载器

  useFrame((_state, delta) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uColorA.value.set(debug_opt.colorA);
    shaderRef.current.uniforms.uColorB.value.set(debug_opt.colorB);
    shaderRef.current.uniforms.uProgress.value = debug_opt.Progress;
  });

  useEffect(() => {
    // Positions
    const positions = gltf.scene.children.map(
      (child) => child.geometry.attributes.position
    );

    particles.maxCount = 0;
    for (const position of positions) {
      if (position.count > particles.maxCount) {
        particles.maxCount = position.count;
      }
    }

    particles.positions = [];
    for (const position of positions) {
      const originalArray = position.array;
      const newArray = new Float32Array(particles.maxCount * 3); //有maxCount个顶点，每个顶点都需要xyz，所以乘以3

      for (let i = 0; i < particles.maxCount; i++) {
        const i3 = i * 3;
        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0];
          newArray[i3 + 1] = originalArray[i3 + 1];
          newArray[i3 + 2] = originalArray[i3 + 2];
        } else {
          const randomIndex = Math.floor(position.count * Math.random()) * 3;
          newArray[i3 + 0] = originalArray[randomIndex + 0];
          newArray[i3 + 1] = originalArray[randomIndex + 1];
          newArray[i3 + 2] = originalArray[randomIndex + 2];
        }
      }
      particles.positions.push(new THREE.Float32BufferAttribute(newArray, 3));
    }

    // Geometry
    const sizesArray = new Float32Array(particles.maxCount);
    for (let index = 0; index < particles.maxCount; index++) {
      sizesArray[index] = Math.random();
    }

    geo.current.setAttribute("position", particles.positions[particles.index]);
    geo.current.setAttribute("aPositionTarget", particles.positions[3]);
    //   geo.current.setIndex(null); //取消索引，让点不是这么亮，正常中间会渲染6个点
    geo.current.setAttribute(
      "aSizes",
      new THREE.BufferAttribute(sizesArray, 1)
    );
  }, []);

  return (
    <>
      <OrbitControls enableDamping={true} />
      <points frustumCulled={false}>
        <bufferGeometry ref={geo}></bufferGeometry>
        <myParticleMaterial
          uProgress={debug_opt.Progress}
          ref={shaderRef}
          transparent
          side={THREE.DoubleSide} //从背面看也正确渲染
          depthWrite={false} //关闭深度，解决深度缓冲遮挡问题
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};
