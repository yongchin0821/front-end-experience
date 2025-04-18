uniform float time;
uniform float uSize;
uniform vec3 uMouse;
uniform float uAmp;
attribute vec3 pos;
varying vec2 vUv;

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
vec3 getOffset(vec3 p) {
    float twist_scale = cnoise(pos) * 0.5 + 0.5;
    vec3 temppos = rotation3dY(time * (0.5 + 0.5 * twist_scale) + length(pos.xz)) * p;
    vec3 offset = fbm_vec3(temppos, 0.5, 0.);
    return offset * 0.2 * uAmp;//uAmp最后补了一个扭曲幅度
}

void main() {
    vUv = position.xy + vec2(0.5);
    float particle_size = cnoise(pos * 5.) * 0.5 + 0.5;

    vec3 world_pos = rotation3dY(time * 0.5 * (0.1 + 0.5 * particle_size)) * pos;

    vec3 offset0 = getOffset(world_pos);
    vec3 offset = fbm_vec3(world_pos + offset0, 0., 0.);

    vec3 particle_position = (modelMatrix * vec4(world_pos + offset, 1.)).xyz;

    /*鼠标球算法*/
    // 计算每一颗粒子到鼠标的距离，这里用xz，可以得到一个向量长度
    float distanceToMouse = length(uMouse.xz - particle_position.xz);
    // vec_lenth clamp钳函数，保证数值在0~1
    // distanceToMouse-0.3 减的越多，代表越小的回落 (fall back)
    // pow()平方，后面6.看起来像是影响的吸附范围半径
    float vec_lenth = pow(1. - clamp(distanceToMouse - 0.3, 0., 1.), 4.);

    // 减出来是个向量，粒子朝鼠标的方向，也就是粒子应该移动的方向
    vec3 direction = particle_position - uMouse;

    //normalize后面的数字可以调整半径
    particle_position = mix(particle_position, uMouse + normalize(direction) * 0.1, vec_lenth);

    vec4 viewPosition = viewMatrix * vec4(particle_position, 1.);

    viewPosition.xyz += position * uSize * (0.01 + 0.1 * particle_size);

    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}