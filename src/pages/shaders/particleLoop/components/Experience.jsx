// src/components/Experience.jsx
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";

// 着色器直接按原路径引入（vite 会把 .glsl 作为字符串）
import simVertex from "./shaders/simVertex.glsl";
import simFragment from "./shaders/simFragment.glsl";
import vertParticles from "./shaders/vertexParticles.glsl";
import fragParticles from "./shaders/fragment.glsl";

const SIZE = 256; // 粒子分辨率 => SIZE² 颗粒

export function Experience() {
  const { gl, camera } = useThree();

  /* ---------- 1. 预生成初始 DataTexture & infoTexture ---------- */
  const initPositionTex = useMemo(() => {
    const data = new Float32Array(SIZE * SIZE * 4);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const idx = (i + j * SIZE) * 4;
        const theta = Math.random() * Math.PI * 2;
        const r = 0.5 + Math.random() * 0.5;
        data[idx] = r * Math.cos(theta);
        data[idx + 1] = r * Math.sin(theta);
        data[idx + 2] = 1;
        data[idx + 3] = 1;
      }
    }
    const tex = new THREE.DataTexture(
      data,
      SIZE,
      SIZE,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    tex.needsUpdate = true;
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    return tex;
  }, []);

  const infoTex = useMemo(() => {
    const data = new Float32Array(SIZE * SIZE * 4);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const idx = (i + j * SIZE) * 4;
        data[idx] = 0.5 + Math.random();
        data[idx + 1] = 0.5 + Math.random();
        data[idx + 2] = 1;
        data[idx + 3] = 1;
      }
    }
    const tex = new THREE.DataTexture(
      data,
      SIZE,
      SIZE,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    tex.needsUpdate = true;
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    return tex;
  }, []);

  /* ---------- 2. 创建模拟场景（FBO 用） ---------- */
  const simScene = useMemo(() => new THREE.Scene(), []);
  const simCam = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1),
    []
  );

  const simMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: simVertex,
        fragmentShader: simFragment,
        uniforms: {
          uPositions: { value: initPositionTex },
          uInfo: { value: infoTex },
          uMouse: { value: new THREE.Vector2() },
          uTime: { value: 0 },
        },
      }),
    [initPositionTex, infoTex]
  );

  useMemo(() => {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMat);
    simScene.add(plane);
  }, [simMat, simScene]);

  /* ---------- 3. 创建 Ping‑Pong FBO ---------- */
  const fboA = useFBO(SIZE, SIZE, {
    type: THREE.FloatType,
    format: THREE.RGBAFormat,
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
  });
  const fboB = useFBO(SIZE, SIZE, {
    type: THREE.FloatType,
    format: THREE.RGBAFormat,
    magFilter: THREE.NearestFilter,
    minFilter: THREE.NearestFilter,
  });
  const swap = useRef(false); // true ⇒ 写 A 读 B；false ⇒ 写 B 读 A

  // 先渲染一次，把初始位置写进两个 FBO
  useMemo(() => {
    gl.setRenderTarget(fboA);
    gl.render(simScene, simCam);
    gl.setRenderTarget(fboB);
    gl.render(simScene, simCam);
    gl.setRenderTarget(null);
  }, [gl, simScene, simCam, fboA, fboB]);

  /* ---------- 4. 构造粒子 Geometry ---------- */
  const particleGeo = useMemo(() => {
    const count = SIZE * SIZE;
    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        const idx = i + j * SIZE;
        positions[idx * 3] = Math.random();
        positions[idx * 3 + 1] = Math.random();
        positions[idx * 3 + 2] = 0;
        uvs[idx * 2] = i / SIZE;
        uvs[idx * 2 + 1] = j / SIZE;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return geo;
  }, []);

  const particleMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertParticles,
        fragmentShader: fragParticles,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uPositions: { value: initPositionTex }, // 会在每帧里更新
          resolution: { value: new THREE.Vector4() },
        },
      }),
    [initPositionTex]
  );

  /* ---------- 5. 处理鼠标射线，更新 uMouse ---------- */
  useEffect(() => {
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0); // z=0 平面
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hit = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, hit);
      simMat.uniforms.uMouse.value.copy(hit);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [camera, simMat]);

  /* ---------- 6. 动画循环：先跑 FBO 再渲染粒子 ---------- */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    simMat.uniforms.uTime.value = t;
    particleMat.uniforms.uTime.value = t;

    // 写入当前 FBO，读出上一次的
    const writeFBO = swap.current ? fboA : fboB;
    const readFBO = swap.current ? fboB : fboA;

    simMat.uniforms.uPositions.value = readFBO.texture;
    particleMat.uniforms.uPositions.value = writeFBO.texture;

    gl.setRenderTarget(writeFBO);
    gl.render(simScene, simCam);
    gl.setRenderTarget(null);

    swap.current = !swap.current; // 交换
  });

  /* ---------- 7. 输出粒子 Points ---------- */
  return <points geometry={particleGeo} material={particleMat} />;
}
