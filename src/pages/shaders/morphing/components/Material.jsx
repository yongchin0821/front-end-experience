import { useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import holographicVertexShader from "../shader/holographic/vertex.glsl";
import holographicFragmentShader from "../shader/holographic/fragment.glsl";

const Materiala = () => {
  const shaderRef = useRef();

  const { meshColor } = useControls({
    meshColor: "#70c2ff",
  });

  useFrame((_state, delta) => {
    //update material
    // console.log(_state);
    shaderRef.current.uniforms.uTime.value = _state.clock.elapsedTime;
  });

  return (
    <shaderMaterial
      ref={shaderRef}
      vertexShader={holographicVertexShader}
      fragmentShader={holographicFragmentShader}
      uniforms={{
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(meshColor)),
      }}
      transparent
      side={THREE.DoubleSide} //从背面看也正确渲染
      depthWrite={false} //避免车轮现象
      blending={THREE.AdditiveBlending}
    />
  );
};

export default Materiala;
