import React, { useEffect, useRef } from 'react';

export const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader: Standard full-screen quad
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader: ported from ref/r3f-monopo-london background
    const fragmentShaderSource = `
      #ifdef GL_ES
      precision mediump float;
      #endif

      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      
      // --- Classic Perlin 2D Noise (cnoise21 from ref project) ---
      vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);} 
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);} 

      float cnoise21(vec2 P){
        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
        Pi = mod(Pi, 289.0);
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0;
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
        g00 *= norm.x;
        g01 *= norm.y;
        g10 *= norm.z;
        g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
      }

      float random(vec2 p) {
        vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
        return fract(cos(dot(p, k1)) * 12345.6789);
      }

      const vec3 black = vec3(0.0);
      const vec3 color1 = vec3(0.89, 0.34, 0.11);
      const vec3 color2 = vec3(0.56, 0.64, 0.64);
      const vec3 color3 = vec3(0.16, 0.26, 0.47);

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 m = u_mouse / u_resolution.xy;

        vec2 seed = uv * 1.5 * (m + 0.3 * (length(m) + 0.5));
        float n = cnoise21(seed) + length(m) * 0.9;

        float ml = pow(length(m), 2.5) * 0.15;
        float n1 = smoothstep(0.0, 0.2, n);
        vec3 color = mix(black, color1, n1);

        float n2 = smoothstep(0.1 + ml, 0.3 + ml, n);
        color = mix(color, color2, n2);

        float n3 = smoothstep(0.2 + ml, 0.4 + ml, n);
        color = mix(color, color3, n3);

        float n4 = smoothstep(0.3 + ml, 0.5 + ml, n);
        color = mix(color, black, n4);

        vec2 uvrandom = uv;
        uvrandom.y *= random(vec2(uvrandom.y, 0.4));
        color += random(uvrandom) * 0.05;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0]),
      gl.STATIC_DRAW
    );

    const positionAttributeLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    if (typeof window !== 'undefined') {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        targetMouseX = mouseX;
        targetMouseY = mouseY;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = canvas.height - e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let startTime = performance.now();
    const render = () => {
      const currentTime = (performance.now() - startTime) / 1000;
      
      // Momentum: 0.05 is heavy and smooth
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};
