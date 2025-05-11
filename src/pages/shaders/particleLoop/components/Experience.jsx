// components/Experience.jsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import testVertexShader from "./shaders/vertexParticles.glsl";
import testFragmentShader from "./shaders/fragment.glsl";
import simVertex from "./shaders/simVertex.glsl";
import simFragment from "./shaders/simFragment.glsl";

export function Experience() {
  const { gl, size, camera } = useThree();
  // 分辨率
  const WIDTH = size.width;
  const HEIGHT = size.height;
  const TEX_SIZE = 128; // FBO texture 大小

  // 两个 FBO 交替用作 ping-pong
  const fboA = useFBO(TEX_SIZE, TEX_SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type: THREE.FloatType,
    format: THREE.RGBAFormat,
  });
  const fboB = useFBO(TEX_SIZE, TEX_SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    type: THREE.FloatType,
    format: THREE.RGBAFormat,
  });
  const ping = useRef(fboA);
  const pong = useRef(fboB);

  // Orthographic 相机 & 全屏 quad
  const simCam = useRef(new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1));
  const simScene = useRef(new THREE.Scene());
  const simGeo = useRef(new THREE.PlaneGeometry(2, 2));
  const simMat = useRef(
    new THREE.ShaderMaterial({
      uniforms: {
        uPositions: { value: null },
        uTime: { value: 0 },
      },
      vertexShader: simVertex,
      fragmentShader: simFragment,
    })
  );
  const simMesh = useRef(new THREE.Mesh(simGeo.current, simMat.current));

  // 粒子点云
  const pointsGeo = useRef(new THREE.BufferGeometry());
  const pointsMat = useRef(
    new THREE.ShaderMaterial({
      vertexShader: testVertexShader,
      fragmentShader: testFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uPositions: { value: null },
        resolution: { value: new THREE.Vector4(WIDTH, HEIGHT, 1, 1) },
      },
    })
  );
  const points = useRef(new THREE.Points(pointsGeo.current, pointsMat.current));

  // 初始化
  useEffect(() => {
    // 1. 构造初始随机位置数据纹理
    const data = new Float32Array(TEX_SIZE * TEX_SIZE * 4);
    for (let i = 0; i < TEX_SIZE; i++) {
      for (let j = 0; j < TEX_SIZE; j++) {
        const idx = (i + j * TEX_SIZE) * 4;
        const theta = Math.random() * Math.PI * 2;
        const r = 0.5 + Math.random() * 0.5;
        data[idx + 0] = Math.cos(theta) * r;
        data[idx + 1] = Math.sin(theta) * r;
        data[idx + 2] = 1;
        data[idx + 3] = 1;
      }
    }
    const dataTex = new THREE.DataTexture(
      data,
      TEX_SIZE,
      TEX_SIZE,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTex.needsUpdate = true;
    dataTex.magFilter = THREE.NearestFilter;
    dataTex.minFilter = THREE.NearestFilter;

    // 把初始状态渲染两次填满 ping & pong
    simMat.current.uniforms.uPositions.value = dataTex;
    gl.setRenderTarget(ping.current);
    gl.render(simScene.current.add(simMesh.current), simCam.current);
    gl.setRenderTarget(pong.current);
    gl.render(simScene.current, simCam.current);
    gl.setRenderTarget(null);

    // 构建粒子 Geometry + UV
    const count = TEX_SIZE * TEX_SIZE;
    const posArr = new Float32Array(count * 3);
    const uvArr = new Float32Array(count * 2);
    let ptr = 0;
    for (let i = 0; i < TEX_SIZE; i++) {
      for (let j = 0; j < TEX_SIZE; j++) {
        posArr[ptr * 3 + 0] = Math.random();
        posArr[ptr * 3 + 1] = Math.random();
        posArr[ptr * 3 + 2] = 0;
        uvArr[ptr * 2 + 0] = i / TEX_SIZE;
        uvArr[ptr * 2 + 1] = j / TEX_SIZE;
        ptr++;
      }
    }
    pointsGeo.current.setAttribute(
      "position",
      new THREE.BufferAttribute(posArr, 3)
    );
    pointsGeo.current.setAttribute("uv", new THREE.BufferAttribute(uvArr, 2));
    pointsMat.current.uniforms.uPositions.value = dataTex; // 临时，首次渲染
  }, [gl]);

  // 每帧更新
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // 1. 模拟步进
    simMat.current.uniforms.uTime.value = t;
    simMat.current.uniforms.uPositions.value = pong.current.texture;
    gl.setRenderTarget(ping.current);
    gl.render(simScene.current, simCam.current);

    // 2. 渲染粒子到屏幕
    pointsMat.current.uniforms.uTime.value = t;
    pointsMat.current.uniforms.uPositions.value = ping.current.texture;
    gl.setRenderTarget(null);
    gl.render(points.current, camera);

    // 3. swap ping/pong
    [ping.current, pong.current] = [pong.current, ping.current];
  }, 1); // 优先级 1 保证在 Drei 的自动渲染之前

  return (
    <>
      {/* 我们自己手动 gl.render，R3F 默认 Scene 里无需挂载任何 Mesh */}
      {/* 但为了让 orbitControls 与 Camera 正常工作，需返回一个空组 */}
      {/* <group /> */}
    </>
  );
}
