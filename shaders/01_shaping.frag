#version 300 es
precision mediump float;

/**
 * \file
 * \author Donghyeon Jo
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

out vec4 FragColor;

uniform vec2 u_resolution;
uniform float u_time;

float is_inside_circle(vec2 st, vec2 position, float radius)
{
  return (((st.x-position.x-radius)*(st.x-position.x-radius) + (st.y-position.y-radius)*(st.y-position.y-radius))<=radius*radius)?1.0:0.0;
}

void main()
{
  vec2 st = gl_FragCoord.xy/u_resolution;
  
  vec2 pos = 0.25*vec2(cos(u_time), sin(u_time)) + 0.25;

  const vec3 circle1_color = vec3(0.1, 1.0, 0.1);
  vec3 color = is_inside_circle(st, pos, 0.25)*vec3(st.x, 0.0, st.y);

  FragColor = vec4(color,1.0);
}