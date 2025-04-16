我打算使用cnoise对粒子的分布进行处理，但是我使用cnoise后，粒子的位置仍然是均匀分布的，如何解决
# object

1. 阅读我提供的核心代码
2. 分析出问题的原因，给出解决办法

# codes

```vertex.glsl
// uniform float time;

// varying vec2 vUv;
// attribute vec3 pos;

// float PI = 3.141592653589793238;

#include ./noise.glsl

void main() {
    // vUv = position.xy + vec2(0.5, 0.5);
    // vec3 finalpos = pos + position*0.1;

    float particle_size = cnoise(position * 5.) * 0.5 + 0.5;

    vec3 modelPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    
    vec4 viewPosition = viewMatrix * vec4(modelPosition,1.);

    viewPosition.xyz += position * (0.01 + 0.1 * particle_size);
   
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = 5.0; // 调整粒子大小
    // gl_PointSize*= (1.0/-viewPosition.z);
}
```

```fragment.glsl
uniform float time;
uniform float progress;
uniform sampler2D texture;
uniform float resolution;

// varying vec2 vUv;

// float PI = 3.141592653589793238;
// void main() {
//     float distanceToCenter = distance(vUv, vec2(0.5, 0.5)); //计算点到中心的距离，中心是(0.5,0.5)
//     float strenth = max(0.0, (0.1 / (distanceToCenter + 0.01)) - 0.2);  //计算出来距离区间在(0,0.5)之间，整理用个0.05/x -0.1 的数学函数，x越小值越大，这样中心就最亮了

//     gl_FragColor = vec4(1.0, 1.0, 1.0, strenth);
// }

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
    float strength = max(0.0, (0.1 / (distanceToCenter + 0.01)) - 0.2);
    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
}
```
