import { Canvas, useThree, useFrame, createPortal } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect, useMemo, useState } from "react";

// shader 引入
import vertex from "./shaders/vertex.glsl";
import fragmentFBO from "./shaders/fbo.glsl";

export const Experience = () => {
  const { gl, camera, size, scene } = useThree();

  const myScene = useMemo(() => new THREE.Scene(), []);
  /**
   * raycaster
   */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const setupEvents = () => {
    const raycastPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ color: 0xfefefe, side: THREE.DoubleSide })
    );

    const dummy = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 30, 30),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    myScene.add(dummy);

    window.addEventListener("mousemove", (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(raycastPlane);
      if (intersects.length > 0) {
        dummy.position.copy(intersects[0].point);
      }
    });
  };

  const getRenderTarget = () => {
    const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height);
    return renderTarget;
  };

  const sourceTarget = getRenderTarget();
  const targetA = getRenderTarget();
  const targetB = getRenderTarget();

  // 离屏初始化白底 + Box 场景
  const whiteTarget = getRenderTarget();
  const whiteScene = useMemo(() => {
    const scene = new THREE.Scene();
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    scene.add(bg);
    scene.add(box);
    return scene;
  }, []);

  const fboMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        tTime: { value: 0 },
        tDiffuse: { value: null },
        tPrev: { value: whiteTarget.texture },
        resolution: { value: new THREE.Vector4(size.width, size.height, 1, 1) },
      },
      vertexShader: vertex,
      fragmentShader: fragmentFBO,
    });
  }, [whiteTarget, size]);

  const fboScene = useMemo(() => {
    const scene = new THREE.Scene();
    const fboQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fboMaterial);
    scene.add(fboQuad);
    return scene;
  }, [fboMaterial]);

  const fboCam = useMemo(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
    []
  );

  // r3f无法使用正交相机，只能重新计算视口高度和宽度(注意)
  const aspect = size.width / size.height;
  const vFov = (camera.fov * Math.PI) / 180;
  const planeHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
  const planeWidth = planeHeight * aspect;

  const finalRef = useRef();
  const finalScene = useMemo(() => new THREE.Scene(), []);
  const fgeo = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const fmat = new THREE.MeshBasicMaterial({ map: targetA.texture });
  const finalQuad = new THREE.Mesh(fgeo, fmat);
  finalScene.add(finalQuad);

  const ping = useRef(targetA);
  const pong = useRef(targetB);
  const time = useRef(0);

  useEffect(() => {
    setupEvents();
    gl.setRenderTarget(whiteTarget);
    gl.render(whiteScene, camera);
  }, []);

  gl.setRenderTarget(whiteTarget);
  gl.render(whiteScene, camera);
  useFrame(() => {
    time.current += 0.01;

    gl.setRenderTarget(sourceTarget);
    gl.render(myScene, camera);

    gl.setRenderTarget(ping.current);
    gl.render(fboScene, fboCam);

    fboMaterial.uniforms.tDiffuse.value = sourceTarget.texture;
    fboMaterial.uniforms.tPrev.value = ping.current.texture;
    fboMaterial.uniforms.tTime.value = time.current;

    // Step 3: 显示最终输出
    if (finalRef.current) {
      finalRef.current.material.map = pong.current.texture;
    }

    gl.setRenderTarget(null);
    gl.render(scene, fboCam);

    // Step 4: swap ping-pong
    const temp = ping.current;
    ping.current = pong.current;
    pong.current = temp;
  });

  return (
    <>
      {/* 最终展示平面 */}
      <mesh ref={finalRef} geometry={fgeo} position={[0, 0, 0]}>
        <meshBasicMaterial map={ping.current.texture} toneMapped={false} />
      </mesh>
    </>
  );
};
