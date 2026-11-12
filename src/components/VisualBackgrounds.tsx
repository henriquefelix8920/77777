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
  "precision mediump float;",
  "varying vec2 v_uv;",
  "uniform vec2 u_resolution;",
  "uniform float u_time;",
  "float smokeField(vec3 p, float t) {",
  "  float bendX=sin(p.y*1.72+p.z*1.18+t*0.38)*0.46+sin(p.z*2.0-t*0.22)*0.18;",
  "  float bendY=cos(p.x*1.46-p.z*1.08-t*0.31)*0.4+sin(p.z*1.7+t*0.19)*0.13;",
  "  vec2 q=p.xy+vec2(bendX,bendY);",
  "  float billow=sin(q.x*2.38+p.z*1.32+sin(q.y*2.12+t*0.46)*1.12)",
  "    *cos(q.y*2.04-p.z*0.86+sin(q.x*1.62-t*0.34)*0.82);",
  "  float wisps=sin(q.x*4.15-q.y*2.72+p.z*2.24+t*0.28)*0.17;",
  "  return billow+wisps;",
  "}",
  "void main() {",
  "  vec2 uv=v_uv*2.0-1.0;",
  "  uv.x*=u_resolution.x/u_resolution.y;",
  "  float t=u_time*0.72;",
  "  vec3 origin=vec3(0.0,0.0,3.35);",
  "  vec3 ray=normalize(vec3(uv.x*0.72,uv.y*0.66,-1.0));",
  "  vec3 color=vec3(0.0025,0.0035,0.008);",
  "  float transmittance=1.0;",
  "  for(int i=0;i<10;i++) {",
  "    float depth=0.28+float(i)*0.49;",
  "    vec3 p=origin+ray*depth;",
  "    float centerline=0.12*sin(p.x*0.62+t*0.28)+0.13*cos(p.z*0.58-t*0.2);",
  "    float envelope=exp(-pow((p.y-centerline)*0.82,2.0)*0.62);",
  "    float field=smokeField(p,t);",
  "    float density=smoothstep(-0.22,0.48,field)*envelope;",
  "    float trailingMist=smoothstep(0.05,0.72,field+0.14*sin(p.x*1.2+p.z*0.7+t*0.3));",
  "    density=clamp(density*0.78+trailingMist*envelope*0.16,0.0,1.0);",
  "    float beam=exp(-pow((p.x+0.34+0.08*sin(t*0.22)-p.y*0.32)*2.0,2.0));",
  "    float depthTint=0.72+0.28*(1.0-float(i)/10.0);",
  "    float alpha=density*0.115*transmittance;",
  "    vec3 fogColor=mix(vec3(0.045,0.055,0.073),vec3(0.15,0.17,0.20),beam*0.62);",
  "    color+=fogColor*alpha*depthTint;",
  "    color+=vec3(0.055,0.072,0.095)*alpha*beam*0.8;",
  "    transmittance*=1.0-density*0.075;",
  "  }",
  "  float frontCurl=smokeField(vec3(uv.x*1.35,uv.y*1.18,0.35),t*1.12);",
  "  float frontVeil=smoothstep(0.28,0.78,frontCurl)*exp(-pow(uv.y+0.24,2.0)*1.1);",
  "  color+=vec3(0.034,0.043,0.058)*frontVeil*0.34;",
  "  float vignette=1.0-smoothstep(0.55,1.62,length(uv));",
  "  color*=0.72+0.28*vignette;",
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
      alpha: variant === "fog",
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
      gl.uniform1f(timeUniform, reduceMotion && variant !== "fog" ? 0 : timestamp * (reduceMotion ? 0.00042 : 0.001));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const frameInterval = variant === "fog" ? (reduceMotion ? 1000 / 12 : 1000 / 20) : 1000 / 45;
    let lastRenderedFrame = 0;
    const tick = (timestamp: number) => {
      animationFrame = 0;
      if (timestamp - lastRenderedFrame >= frameInterval) {
        draw(timestamp);
        lastRenderedFrame = timestamp;
      }
      if (visible && (!reduceMotion || variant === "fog")) animationFrame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduceMotion && variant !== "fog") {
        draw(0);
      } else if (visible && !animationFrame) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const devicePixelRatio = window.devicePixelRatio || 1;
      const pixelRatio = variant === "fog"
        ? Math.min(devicePixelRatio * 0.42, 0.66)
        : Math.min(devicePixelRatio, 1.35);
      const width = Math.max(1, Math.round(rect.width * pixelRatio));
      const height = Math.max(1, Math.round(rect.height * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        draw(reduceMotion && variant !== "fog" ? 0 : lastTime);
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
  return (
    <div className="section-depth-wallpaper" aria-hidden="true">
      <div className="section-depth-floor" />
      <div className="section-depth-halo section-depth-halo--left" />
      <div className="section-depth-halo section-depth-halo--right" />
      <div className="section-depth-orbit section-depth-orbit--back" />
      <div className="section-depth-orbit section-depth-orbit--middle" />
      <div className="section-depth-orbit section-depth-orbit--front" />
      <div className="section-depth-ribbon section-depth-ribbon--blue" />
      <div className="section-depth-ribbon section-depth-ribbon--silver" />
      <div className="section-depth-ribbon section-depth-ribbon--amber" />
    </div>
  );
}
