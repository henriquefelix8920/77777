import { useEffect, useRef } from "react";

type WallpaperVariant = "wireframe" | "fog";

const VERTEX_SHADER = [
  "attribute vec2 a_position;",
  "varying vec2 v_uv;",
  "void main() {",
  "  v_uv = a_position * 0.5 + 0.5;",
  "  gl_Position = vec4(a_position, 0.0, 1.0);",
  "}",
].join("\n");

const FOG_FRAGMENT_SHADER = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform vec2 u_resolution;",
  "uniform float u_time;",
  "float hash21(vec2 p) { p=fract(p*vec2(127.1,311.7)); p+=dot(p,p+34.7); return fract(p.x*p.y); }",
  "float noise(vec2 p) {",
  "  vec2 i=floor(p);",
  "  vec2 f=fract(p);",
  "  f=f*f*(3.0-2.0*f);",
  "  float a=hash21(i);",
  "  float b=hash21(i+vec2(1.0,0.0));",
  "  float c=hash21(i+vec2(0.0,1.0));",
  "  float d=hash21(i+vec2(1.0,1.0));",
  "  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);",
  "}",
  "float fbm(vec2 p) {",
  "  float value=0.0;",
  "  float amplitude=0.56;",
  "  mat2 turn=mat2(1.62,1.18,-1.18,1.62);",
  "  for(int i=0;i<3;i++) {",
  "    value+=noise(p)*amplitude;",
  "    p=turn*p+vec2(17.3,9.2);",
  "    amplitude*=0.48;",
  "  }",
  "  return value;",
  "}",
  "void main() {",
  "  vec2 uv=v_uv*2.0-1.0;",
  "  uv.x*=u_resolution.x/u_resolution.y;",
  "  float t=u_time;",
  "  vec3 color=vec3(0.003,0.004,0.012);",
  "  float horizon=exp(-abs(uv.y+0.16+0.045*sin(uv.x*2.0+t*0.045))*3.4);",
  "  color+=vec3(0.012,0.017,0.035)*horizon;",
  "  float accumulated=0.0;",
  "  vec3 fogLight=vec3(0.105,0.13,0.19);",
  "  for(int i=0;i<13;i++) {",
  "    float depth=0.7+float(i)*0.39;",
  "    vec3 ray=vec3(uv.x*0.58,uv.y*0.5,1.0);",
  "    vec3 p=ray*depth;",
  "    vec2 field=vec2(p.x*0.48+p.y*0.16,p.z*0.24-p.y*0.1);",
  "    vec2 drift=vec2(t*0.012*(0.55+depth*0.035),-t*0.009);",
  "    float broad=fbm(field*1.45+drift);",
  "    float detail=fbm(field*2.6+drift*1.7+vec2(3.7,-1.9));",
  "    float shape=mix(broad,detail,0.28);",
  "    float bank=exp(-pow((p.y-(0.12*sin(p.x*0.32+t*0.055)+0.08*cos(p.z*0.18-t*0.04))),2.0)*0.34);",
  "    float density=smoothstep(0.31,0.76,shape)*bank;",
  "    density*=0.045*(0.68+0.32*sin(depth*0.38+t*0.025));",
  "    float beamAxis=uv.x-0.24*sin(t*0.035)-0.12;",
  "    float beam=exp(-beamAxis*beamAxis*15.0)*exp(-pow(uv.y+0.04,2.0)*1.4);",
  "    vec3 layer=mix(vec3(0.018,0.022,0.038),fogLight,0.34+0.4*beam);",
  "    float contribution=density*(1.0-accumulated);",
  "    color+=layer*contribution;",
  "    color+=vec3(0.075,0.09,0.13)*contribution*beam*0.8;",
  "    accumulated+=contribution;",
  "  }",
  "  float foreground=fbm(uv*2.3+vec2(t*0.009,-t*0.006));",
  "  float softVeil=smoothstep(0.36,0.78,foreground)*exp(-pow(uv.y+0.26,2.0)*1.15);",
  "  color+=vec3(0.018,0.023,0.038)*softVeil*0.36;",
  "  float vignette=1.0-smoothstep(0.48,1.58,length(uv));",
  "  color*=0.63+0.37*vignette;",
  "  gl_FragColor=vec4(color,1.0);",
  "}",
].join("\n");

const WIREFRAME_FRAGMENT_SHADER = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform vec2 u_resolution;",
  "uniform float u_time;",
  "float hash21(vec2 p) { p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }",
  "float waveHeight(vec2 p,float t) {",
  "  return sin(p.x*0.58+t*0.34)*0.31+sin(p.y*0.7-t*0.28)*0.2+sin((p.x+p.y)*0.27+t*0.2)*0.16;",
  "}",
  "void main() {",
  "  vec2 uv=v_uv*2.0-1.0;",
  "  uv.x*=u_resolution.x/u_resolution.y;",
  "  float t=u_time;",
  "  vec3 ro=vec3(sin(t*0.105)*0.24,2.65,4.3);",
  "  vec3 target=vec3(0.0,0.0,-6.2);",
  "  vec3 forward=normalize(target-ro);",
  "  vec3 right=normalize(cross(forward,vec3(0.0,1.0,0.0)));",
  "  vec3 up=cross(right,forward);",
  "  vec3 rd=normalize(forward*1.55+right*uv.x+up*uv.y);",
  "  vec3 color=vec3(0.002,0.007,0.018);",
  "  float skyGlow=exp(-abs(uv.y+0.22)*11.0);",
  "  color+=vec3(0.006,0.045,0.09)*skyGlow;",
  "  vec2 starCell=floor(v_uv*u_resolution/vec2(9.0));",
  "  float star=step(0.998,hash21(starCell));",
  "  color+=vec3(0.12,0.48,0.86)*star;",
  "  if(rd.y < -0.012) {",
  "    float distanceToSurface=(0.0-ro.y)/rd.y;",
  "    vec3 p=ro+rd*distanceToSurface;",
  "    for(int i=0;i<5;i++) {",
  "      float h=waveHeight(p.xz,t);",
  "      distanceToSurface+=(h-p.y)/rd.y;",
  "      p=ro+rd*distanceToSurface;",
  "    }",
  "    if(distanceToSurface>0.0 && distanceToSurface<90.0) {",
  "      vec2 cell=p.xz*0.78;",
  "      vec2 edge=abs(fract(cell)-0.5);",
  "      float nearestLine=min(edge.x,edge.y);",
  "      float grid=1.0-smoothstep(0.012,0.043,nearestLine);",
  "      float node=exp(-dot(edge,edge)*1100.0);",
  "      float depth=max(0.0,ro.z-p.z);",
  "      float fade=1.0-smoothstep(15.0,39.0,depth);",
  "      float pulse=0.72+0.28*sin(p.z*0.58-t*1.15+p.x*0.16);",
  "      float ridge=0.5+0.5*sin(p.x*0.34+p.z*0.22-t*0.3);",
  "      vec3 normal=normalize(vec3(-0.16*cos(p.x*0.58+t*0.34),1.0,-0.14*cos(p.z*0.7-t*0.28)));",
  "      float lighting=0.52+0.48*max(dot(normal,normalize(vec3(-0.35,0.82,0.44))),0.0);",
  "      vec3 gridColor=mix(vec3(0.025,0.2,0.52),vec3(0.055,0.72,0.98),ridge);",
  "      color+=gridColor*grid*fade*pulse*lighting*1.22;",
  "      color+=vec3(0.025,0.42,0.86)*node*fade*(0.5+0.5*sin(t*1.8+p.z))*1.15;",
  "      float scan=exp(-pow(fract((p.z-t*1.2)*0.065)-0.5,2.0)*950.0);",
  "      color+=vec3(0.015,0.15,0.34)*grid*scan*fade;",
  "    }",
  "  }",
  "  float vignette=1.0-smoothstep(0.55,1.7,length(uv));",
  "  color*=0.72+0.28*vignette;",
  "  gl_FragColor=vec4(color,1.0);",
  "}",
].join("\n");

function AnimatedWallpaper({ variant, className = "" }: { variant: WallpaperVariant; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      variant === "fog" ? FOG_FRAGMENT_SHADER : WIREFRAME_FRAGMENT_SHADER,
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
    const timeUniform = gl.getUniformLocation(program, "u_time");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let animationFrame = 0;
    let lastTime = 0;

    const draw = (timestamp: number) => {
      lastTime = timestamp;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      gl.uniform1f(timeUniform, reduceMotion ? 0 : timestamp * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frameInterval = variant === "fog" ? 1000 / 30 : 1000 / 45;
    let lastRenderedFrame = 0;
    const tick = (timestamp: number) => {
      animationFrame = 0;
      if (timestamp - lastRenderedFrame >= frameInterval) {
        draw(timestamp);
        lastRenderedFrame = timestamp;
      }
      if (visible && !reduceMotion) animationFrame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion) {
        draw(0);
      } else if (visible && !animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      const width = Math.max(1, Math.round(rect.width * pixelRatio));
      const height = Math.max(1, Math.round(rect.height * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        draw(reduceMotion ? 0 : lastTime);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      } else {
        start();
      }
    }, { rootMargin: "120px" });
    intersectionObserver.observe(canvas);

    resize();
    start();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={"animated-wallpaper animated-wallpaper--" + variant + " " + className} aria-hidden="true" />;
}

export function HeroShaderBackground() {
  return (
    <div className="hero-shader-background" aria-hidden="true">
      <AnimatedWallpaper variant="wireframe" className="hero-wireframe-wallpaper" />
      <span className="hero-shader-vignette" />
    </div>
  );
}

export function WireframeBackground() {
  return <AnimatedWallpaper variant="fog" className="section-fog-wallpaper" />;
}
