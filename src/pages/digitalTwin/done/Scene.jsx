import { Center } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import ImgFloor from "./components/ImgFloor";
import MarkedLightPillar from "./components/useMapMarkedLightPillar";
import { use } from "react";

// 常量抽离
const CENTER_LNG = 110;
const CENTER_LAT = 35;

// 工具函数：对坐标偏移
const transformCoord = ([lng, lat]) => [lng - CENTER_LNG, lat - CENTER_LAT];

// 工具函数：构建 shapes
const buildShapes = (feature) => {
  const shapes = [];
  const coordinates =
    feature.geometry.type === "MultiPolygon"
      ? feature.geometry.coordinates
      : [feature.geometry.coordinates];

  coordinates.forEach((polygon) => {
    polygon.forEach((ring) => {
      const shape = new THREE.Shape();
      ring.forEach((coord, i) => {
        const [x, y] = transformCoord(coord);
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      });
      shapes.push(shape);
    });
  });

  return shapes;
};

let currentSecond = 0;

const MapShape = memo(({ feature, index }) => {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const { color, Linecolor } = useControls({
    color: "#348CB9",
    Linecolor: "#4CE3FF",
  });

  const shapes = useMemo(() => buildShapes(feature), [feature]);

  const extrudeSettings = useMemo(
    () => ({
      depth: hovered ? 1.5 : 0.5,
      // bevelEnabled: false, //在0.175版本后，该设置不能改为否则会出bug导致地图镂空。原因可能是因为“automatic shape cleaning” step for ExtrudeGeometry。这个bug坑了我3小时。
    }),
    [hovered, index]
  );

  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(shapes, extrudeSettings),
    [shapes, extrudeSettings]
  );
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  const handlePointerOver = useCallback(() => {
    setHovered(true);
  }, [feature.properties.name]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <group name={feature.properties.adcode}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={hovered ? "#ff6b6b" : color}
          // color={"#ff6b6b"}
          metalness={0.1}
          roughness={0.5}
          opacity={0.9}
          transparent
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={Linecolor} linewidth={2} />
      </lineSegments>
    </group>
  );
});

// 工具函数：计算区域中心（备用，当 feature.properties.center 不存在时）
const calculateShapeCenter = (coordinates) => {
  let xSum = 0,
    ySum = 0,
    count = 0;
  const coords = Array.isArray(coordinates[0][0][0])
    ? coordinates[0][0]
    : coordinates[0];
  coords.forEach(([lng, lat]) => {
    const [x, y] = transformCoord([lng, lat]);
    xSum += x;
    ySum += y;
    count++;
  });
  return [xSum / count, ySum / count];
};

const ChinaMap = ({ geoData }) => {
  const startAnimation = useCallback(() => {
    if (!geoData.length) return;
    const randomIndex = Math.floor(Math.random() * geoData.length);
    const region = geoData[randomIndex];

    const center1 = calculateShapeCenter(region.geometry.coordinates);
    // 动画逻辑可在此处添加（原代码中未完全实现）
  }, [geoData]);

  useFrame((state) => {
    const nowSecond = Math.floor(state.clock.elapsedTime);
    // console.log(state);
    state.camera.updateProjectionMatrix();
    if (nowSecond !== currentSecond) {
      currentSecond = nowSecond;
      if (!(currentSecond % 4)) {
        // startAnimation(); // 原代码中被注释，可根据需要启用
      }
    }
  });

  return (
    <group name="chinaMapGroup">
      {geoData.map((feature, index) => (
        <group key={feature.properties.adcode || index}>
          <MapShape feature={feature} index={index} />
          <MarkedLightPillar
            lon={feature.properties.center[0] - CENTER_LNG}
            lat={feature.properties.center[1] - CENTER_LAT}
            heightScaleFactor={3}
          />
        </group>
      ))}
    </group>
  );
};

const Scene = () => {
  // const { color, opacity, rotationZ } = useControls({
  //   color: { value: '#ffffff', label: '颜色' },
  //   opacity: { value: 0.95, min: 0, max: 1, step: 0.01, label: '透明度' },
  //   rotationZ: { value: 0.01, min: -0.1, max: 0.1, step: 0.01, label: '自转速度' },
  // })

  const url = "/geodata.json";
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        data.features.pop();
        setGeoData(data.features);
      } catch (error) {
        console.error("Failed to fetch GeoJSON:", error);
      }
    };
    fetchGeoJSON();
  }, [url]);

  const chinaMapRef = useRef(null);

  return (
    <group>
      <Center ref={chinaMapRef}>
        <ChinaMap geoData={geoData} />
        <ImgFloor
          position={[-2, 0, -2]}
          imgSrcPath="/digitaltwin/done/imgFloor3.png"
          opacity={0.3}
        />
      </Center>
    </group>
  );
};
export default Scene;
