uniform sampler2D uTexture;
uniform vec3 uColor;
varying vec2 vUv;

//mesh
void main() {
    vec4 ttt = texture2D(uTexture, vUv);
    gl_FragColor = vec4(uColor, ttt.r);
}

//points
// void main() {
//     float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
//     float strength = max(0.0, (0.1 / (distanceToCenter + 0.01)) - 0.2);
//     gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
// }