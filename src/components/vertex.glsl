uniform float time;

// varying vec2 vUv;
// attribute vec3 pos;

// float PI = 3.141592653589793238;

#include ./noise.glsl

//points
// void main() {
//     // vUv = position.xy + vec2(0.5, 0.5);
//     // vec3 finalpos = pos + position*0.1;

//     float particle_size = cnoise(position * 5.) * 0.5 + 0.5;

//     vec3 modelPosition = (modelMatrix * vec4(position, 1.0)).xyz;

//     vec4 viewPosition = viewMatrix * vec4(modelPosition, 1.);

//     viewPosition.xyz += position * (0.01 + 0.1 * particle_size);

//     vec4 projectionPosition = projectionMatrix * viewPosition;

//     gl_Position = projectionPosition;
//     gl_PointSize = 5.0; // 调整粒子大小
//     // gl_PointSize*= (1.0/-viewPosition.z);
// }

//mesh
attribute vec3 pos;
varying vec2 vUv;

void main() {
    vUv = position.xy + vec2(0.5);
    vec3 finalpos = pos + position * 0.1;

    float particle_size = cnoise(pos * 5.) * 0.5 + 0.5;

    vec3 world_pos = rotation3dY(time * 0.5 * (0.1 + 0.5 * particle_size)) * pos;

    vec3 offset = fbm_vec3(world_pos, 0., 0.);

    vec3 particle_position = (modelMatrix * vec4(world_pos + offset, 1.)).xyz;

    vec4 viewPosition = viewMatrix * vec4(particle_position, 1.);

    viewPosition.xyz += position * (0.01 + 0.1 * particle_size);

    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}