import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import testFragmentShader from "../shaders/fragment.glsl";
import testVertexShader from "../shaders/vertex.glsl";
import particleTexture from "./particle3.jpg";

const lerp = (a, b, t) => {
  return a * (1 - t) + b * t;
};

export const Galaxy = ({ min_radius = 0.5, max_radius = 1, ...props }) => {
  const count = props.count;
  const pos = new Float32Array(count * 3);
  const particlegeo = useRef();
  const geo = useRef();
  const shaderRef = useRef();

  const genpos = (geo, particlegeo) => {
    geo.current.setAttribute(
      "position",
      particlegeo.current.getAttribute("position")
    );
    geo.current.index = particlegeo.current.index;

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

    // 解决视角问题导致星河消失，目前有两种方式
    // 一是手动更新包围球
    // 手动更新包围球，让剔除用到正确的半径
    geo.current.computeBoundingSphere();

    //二是可以在mesh出禁用掉视锥剔除（frustum culling）
    //frustumCulled={false}
  };

  useFrame((_state, delta) => {
    //   console.log(props);
    // _state.gl.render(_state.scene, _state.camera);
    shaderRef.current.uniforms.time.value += delta;
    shaderRef.current.uniforms.uMouse.value = props.point;
    // _state.camera.updateProjectionMatrix();
  });

  useEffect(() => {
    genpos(geo, particlegeo);
  }, []);

  return (
    <>
      <mesh>
        <instancedBufferGeometry ref={geo} instanceCount={count}>
          <planeGeometry ref={particlegeo} args={[1, 1, 1, 1]}></planeGeometry>
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
            uColor: { value: new THREE.Color(props.color) },
            uSize: { value: props.size },
            uMouse: { value: new THREE.Vector3() },
            uAmp: { value: props.amp }, //扭曲幅度
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
          }}
          vertexShader={testVertexShader}
          fragmentShader={testFragmentShader}
          transparent={true}
          // depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </>
  );
};
