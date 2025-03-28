#version 300 es
precision mediump float;

/**
 * \file 02_gradiant.frag
 * \author Donghyeon Jo
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */
 
out vec4 FragColor;

uniform vec2 u_resolution;
uniform float u_time;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.03, pct, st.y) -
          smoothstep( pct, pct+0.03, st.y);
}

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.000,4.000,2.639),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    vec3 color = hsb2rgb(vec3(u_time / 10.+ st.x, 1.0, 1.0));
    
    vec3 color1 = mix(color,vec3(1.0,0.0,0.0),plot(st, color.r));
    vec3 color2 = mix(color,vec3(0.0,1.0,0.0),plot(st, color.g));
    vec3 color3 = mix(color,vec3(0.0,0.0,1.0),plot(st, color.b));

    color = (color1 + color2 + color3) / 3.;

    FragColor = vec4(color,1.0);
}