uniform float time;
uniform float progress;
uniform sampler2D uTexture;
uniform float resolution;
uniform vec3 uColor;
varying vec2 vUv;

// float PI = 3.141592653589793238;

//mesh
void main() {
    // vec2 uv = gl_PointCoord;
    vec4 ttt = texture2D(uTexture, vUv);
    // float distanceToCenter = distance(vUv, vec2(0.5)); //计算点到中心的距离，中心是(0.5,0.5)
    // float alpha = 0.05 / distanceToCenter - 0.1;  //计算出来距离区间在(0,0.5)之间，整理用个0.05/x -0.1 的数学函数，x越小值越大，这样中心就最亮了
    gl_FragColor = vec4(uColor, ttt.r);
}

//points
// void main() {
//     float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
//     float strength = max(0.0, (0.1 / (distanceToCenter + 0.01)) - 0.2);
//     gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
// }