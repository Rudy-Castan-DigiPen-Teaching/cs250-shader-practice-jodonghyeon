#version 300 es
precision mediump float;

/**
 * \file 02_gradiant.frag
 * \author Donghyeon Jo
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */
 
#define TWO_PI 6.28318530718

out vec4 FragColor;

uniform vec2 u_resolution;
uniform float u_time;

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(.5,.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*9.*sin(u_time);

    // Map the angle (-PI to PI) to the Hue (from 0 to 1)
    // and the Saturation to the radius
    vec3 color = hsb2rgb(vec3((.5*sin(u_time)*angle/TWO_PI)+.2*sin(u_time)*u_time,radius,sin(u_time)+.9));

    FragColor = vec4(color,1.0);
}