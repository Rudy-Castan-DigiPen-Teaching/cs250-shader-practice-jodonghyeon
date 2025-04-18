#version 300 es

precision mediump float;

/**
 * \file 04_circle.frag
 * \author Donghyeon Jo
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

 out vec4 FragColor;

 uniform vec2 u_resolution;
 uniform vec2 u_mouse;
 uniform float u_time;

// Convert pixel coords to normalized coords
 vec2 to_coord(vec2 pixel_point)
 {
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y)
    {
        // wide not tall
        // height is going to between 0-1
        // width is going to be expanded, larger than 0-1
        point.x *= u_resolution.x / u_resolution.y;
        // now to recenter the range
        point.x += (u_resolution.y - u_resolution.x) / (u_resolution.x);
    }
    else
    {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
 }

 float sCircle(vec2 point, vec2 center, float radius)
 {
    float d = distance(point, center);
    return d - radius;
 }

 // return 0 not in circle, 1 in circle
 float circle(vec2 point, vec2 center, float radius)
 {
    float sd = sCircle(point, center, radius);
    // return 1.0 - step(0., sd);
    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
 }

  // return the result color of drawing circle line
  vec3 circleLine(vec2 point, vec2 center, float radius, float thickness, vec3 color, vec3 background)
  {
    float t1 = circle(point, center  , radius  + thickness / 2.);
    float t2 = circle(point, center  , radius - thickness / 2.);
    vec3 c = mix(background, color, t1);
    return c = mix(c, background, t2);
  }


 void main(void)
 {
    vec2 position = to_coord(gl_FragCoord.xy);
  
    vec3 background = vec3(to_coord(gl_FragCoord.xy), 0.);

    vec2 p1 = vec2(cos(u_time), sin(u_time))*0.25+vec2(0.5);

    float t = circle(position, p1, 0.125);
    vec3 color = mix(background, vec3(1.), t);

    vec2 p2 = vec2(to_coord(u_mouse));

    color = circleLine(position, p2, 0.125, 0.000, vec3(0.), color);
    
    FragColor = vec4(color, 1.0);
 }