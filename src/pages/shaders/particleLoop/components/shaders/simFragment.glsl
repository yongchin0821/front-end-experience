uniform sampler2D uPositions;
varying vec2 vUv;

//mesh
void main() {
    vec4 pos = texture2D(uPositions, vUv);
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    pos.xy += vec2(0.001);
    gl_FragColor = vec4(pos.xy, 1., 1.);
}
