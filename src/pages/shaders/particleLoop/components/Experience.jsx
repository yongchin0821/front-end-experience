import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertexParticles.glsl";
import simFragment from "./shaders/simFragment.glsl";
import simVertex from "./shaders/simVertex.glsl";

const size = 256;

export function Experience() {
  const { gl, scene, camera } = useThree();
  const time = useRef(0);

  // ### FBO 设置
  let fbo = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });
  let fbo1 = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  });

  // ### FBO 场景和相机
  const fboScene = new THREE.Scene();
  const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  fboCamera.position.set(0, 0, 0.5);
  fboCamera.lookAt(0, 0, 0);

  const fboGeometry = new THREE.PlaneGeometry(2, 2);

  // ### 数据纹理初始化
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i + j * size) * 4;
      const theta = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.5;
      data[index + 0] = r * Math.cos(theta);
      data[index + 1] = r * Math.sin(theta);
      data[index + 2] = 1;
      data[index + 3] = 1;
    }
  }

  const fboTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  fboTexture.magFilter = THREE.NearestFilter;
  fboTexture.minFilter = THREE.NearestFilter;
  fboTexture.needsUpdate = true;

  // ### Info 纹理
  const infoArray = new Float32Array(size * size * 4);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i + j * size) * 4;
      infoArray[index + 0] = 0.5 + Math.random();
      infoArray[index + 1] = 0.5 + Math.random();
      infoArray[index + 2] = 1;
      infoArray[index + 3] = 1;
    }
  }

  const infoTexture = new THREE.DataTexture(
    infoArray,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  infoTexture.magFilter = THREE.NearestFilter;
  infoTexture.minFilter = THREE.NearestFilter;
  infoTexture.needsUpdate = true;

  // ### FBO 材质
  const fboMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uPositions: { value: fboTexture },
      uInfo: { value: infoTexture },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
    },
    vertexShader: simVertex,
    fragmentShader: simFragment,
  });

  const fboMesh = new THREE.Mesh(fboGeometry, fboMaterial);

  useEffect(() => {
    fboScene.add(fboMesh);
  }, [fboMesh]);

  // ### 粒子几何体
  const count = size * size;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const uv = new Float32Array(count * 2);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i + j * size;
      positions[index * 3 + 0] = Math.random();
      positions[index * 3 + 1] = Math.random();
      positions[index * 3 + 2] = 0;
      uv[index * 2 + 0] = i / size;
      uv[index * 2 + 1] = j / size;
    }
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

  // ### 粒子材质
  const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uPositions: { value: fboTexture },
      resolution: { value: new THREE.Vector4() },
    },
    side: THREE.DoubleSide,
  });

  const points = new THREE.Points(geometry, material);

  useEffect(() => {
    scene.add(points);
  }, [points, scene]);

  // ### 光线投射
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const dummy = useRef(
    new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    )
  );

  useEffect(() => {
    scene.add(dummy.current);
    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(pointer.current, camera);
      const intersects = raycaster.current.intersectObject(dummy.current);
      if (intersects.length > 0) {
        const { x, y } = intersects[0].point;
        fboMaterial.uniforms.uMouse.value.set(x, y);
      }
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [camera, scene]);

  // ### 动画循环
  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();
    time.current += 0.01;

    // 更新 uniforms
    material.uniforms.uTime.value = elapsedTime;
    fboMaterial.uniforms.uTime.value = elapsedTime;

    // 更新 FBO 纹理
    fboMaterial.uniforms.uPositions.value = fbo1.texture;
    material.uniforms.uPositions.value = fbo.texture;

    // 渲染 FBO
    gl.setRenderTarget(fbo);
    gl.render(fboScene, fboCamera);

    // 渲染主场景
    gl.setRenderTarget(null);
    gl.render(scene, camera);

    // 交换 FBO
    [fbo, fbo1] = [fbo1, fbo];
  });

  return null;
}
