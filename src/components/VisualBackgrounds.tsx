import { useEffect, useRef } from "react";

type WallpaperVariant = "hero" | "wireframe";

const VERTEX_SHADER = [
  "attribute vec2 a_position;",
  "varying vec2 v_uv;",
  "void main() {",
  "  v_uv = a_position * 0.5 + 0.5;",
  "  gl_Position = vec4(a_position, 0.0, 1.0);",
  "}",
].join("\n");

const HERO_FRAGMENT_SHADER = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform vec2 u_resolution;",
  "uniform float u_time;",
  "mat3 rotX(float a) { float c=cos(a), s=sin(a); return mat3(1.,0.,0.,0.,c,s,0.,-s,c); }",
  "mat3 rotY(float a) { float c=cos(a), s=sin(a); return mat3(c,0.,-s,0.,1.,0.,s,0.,c); }",
  "mat3 rotZ(float a) { float c=cos(a), s=sin(a); return mat3(c,s,0.,-s,c,0.,0.,0.,1.); }",
  "float sdTorus(vec3 p, vec2 t) { return length(vec2(length(p.xz)-t.x,p.y))-t.y; }",
  "float scene(vec3 p) {",
  "  float t=u_time;",
  "  vec3 q=p-vec3(0.92,0.02,0.0);",
  "  q=rotY(t*0.16)*rotX(0.52+sin(t*0.22)*0.12)*q;",
  "  float outer=sdTorus(q,vec2(1.28,0.105+0.018*sin(q.x*5.0+t)));",
  "  vec3 r=p-vec3(0.92,0.02,0.0);",
  "  r=rotZ(0.82+sin(t*0.18)*0.1)*rotY(-t*0.19)*r;",
  "  float inner=sdTorus(r,vec2(0.86,0.052));",
  "  return min(outer,inner);",
  "}",
  "float hash21(vec2 p) { p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }",
  "void main() {",
  "  vec2 uv=v_uv*2.0-1.0;",
  "  uv.x*=u_resolution.x/u_resolution.y;",
  "  vec3 ro=vec3(0.0,0.0,5.0);",
  "  vec3 rd=normalize(vec3(uv.x,uv.y,-1.72));",
  "  float travel=0.0;",
  "  float hit=0.0;",
  "  vec3 p=ro;",
  "  for(int i=0;i<82;i++) {",
  "    p=ro+rd*travel;",
  "    float d=scene(p);",
  "    if(d<0.0025) { hit=1.0; break; }",
  "    travel+=max(d*0.78,0.008);",
  "    if(travel>10.0) break;",
  "  }",
  "  vec3 color=vec3(0.003,0.008,0.022);",
  "  float halo=exp(-length(uv-vec2(0.34,0.02))*2.1);",
  "  color+=vec3(0.005,0.035,0.075)*halo;",
  "  vec2 starCell=floor(v_uv*u_resolution/vec2(7.0));",
  "  float star=step(0.9975,hash21(starCell));",
  "  color+=vec3(0.18,0.52,0.9)*star*(0.45+0.55*sin(u_time*1.4+hash21(starCell)*6.28));",
  "  if(hit>0.5) {",
  "    vec2 e=vec2(0.003,0.0);",
  "    vec3 n=normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));",
  "    vec3 lightDir=normalize(vec3(-0.48,0.74,0.62));",
  "    float diffuse=max(dot(n,lightDir),0.0);",
  "    float fresnel=pow(1.0-max(dot(n,-rd),0.0),3.0);",
  "    float specular=pow(max(dot(reflect(rd,n),lightDir),0.0),42.0);",
  "    float bands=0.5+0.5*sin(p.y*5.0+p.x*2.8+u_time*0.55);",
  "    vec3 material=mix(vec3(0.012,0.12,0.34),vec3(0.035,0.55,0.78),bands);",
  "    vec3 lit=material*(0.28+diffuse*1.15);",
  "    lit+=vec3(0.12,0.62,0.94)*(fresnel*1.05+specular*1.35);",
  "    lit+=vec3(0.015,0.16,0.3)*pow(max(dot(n,vec3(0.0,1.0,0.0)),0.0),5.0);",
  "    color=mix(color,lit,0.97);",
  "  }",
  "  float vignette=1.0-smoothstep(0.42,1.55,length(uv));",
  "  color*=0.66+0.34*vignette;",
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
      variant === "hero" ? HERO_FRAGMENT_SHADER : WIREFRAME_FRAGMENT_SHADER,
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

    const tick = (timestamp: number) => {
      animationFrame = 0;
      draw(timestamp);
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
      <AnimatedWallpaper variant="hero" />
      <span className="hero-shader-vignette" />
    </div>
  );
}

export function WireframeBackground() {
  return <AnimatedWallpaper variant="wireframe" className="section-wireframe-wallpaper" />;
}
