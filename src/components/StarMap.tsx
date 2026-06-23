"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// --- Generate glow sprite texture (128x128 radial gradient) ---
function makeGlowSprite(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// --- Seeded random ---
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Poet data ---
interface PoetInfo {
  id: string;
  name: string;
  dynasty: string;
}

const POETS: PoetInfo[] = [
  { id: "libai", name: "李白", dynasty: "唐" },
  { id: "dufu", name: "杜甫", dynasty: "唐" },
  { id: "wangwei", name: "王维", dynasty: "唐" },
  { id: "baijuyi", name: "白居易", dynasty: "唐" },
  { id: "sushi", name: "苏轼", dynasty: "宋" },
  { id: "liqingzhao", name: "李清照", dynasty: "宋" },
  { id: "xinqiji", name: "辛弃疾", dynasty: "宋" },
  { id: "taoyuanming", name: "陶渊明", dynasty: "魏晋" },
  { id: "lishangyin", name: "李商隐", dynasty: "唐" },
  { id: "dumu", name: "杜牧", dynasty: "唐" },
  { id: "liuyong", name: "柳永", dynasty: "宋" },
  { id: "wangchangling", name: "王昌龄", dynasty: "唐" },
  { id: "mengfurong", name: "孟浩然", dynasty: "唐" },
  { id: "cenchan", name: "岑参", dynasty: "唐" },
  { id: "gaoshi", name: "高适", dynasty: "唐" },
  { id: "hanshan", name: "寒山", dynasty: "唐" },
  { id: "zhangji", name: "张继", dynasty: "唐" },
  { id: "liuzyuxi", name: "刘禹锡", dynasty: "唐" },
  { id: "wenjiyun", name: "温庭筠", dynasty: "唐" },
  { id: "lijie", name: "李贺", dynasty: "唐" },
];

// Dynasty colors (matching the dynasty legend)
const DYNASTY_COLORS: Record<string, THREE.Color> = {
  "唐": new THREE.Color("rgb(255, 210, 122)"),
  "宋": new THREE.Color("rgb(110, 231, 168)"),
  "魏晋": new THREE.Color("rgb(73, 192, 110)"),
  "default": new THREE.Color("rgb(183, 148, 246)"),
};

// --- Particle generation ---
const BG_PARTICLE_COUNT = 120000;
const PARTICLES_PER_CLUSTER = 150;
const CLUSTER_COUNT = 20;

interface ClusterData {
  cx: number;
  cy: number;
  cz: number;
  omega: number; // rotation speed
  color: THREE.Color;
  poetIdx: number;
}

// Encoded pick color from index
function pickColor(idx: number): [number, number, number] {
  const t = idx + 1;
  return [
    (t & 255) / 255,
    ((t >> 8) & 255) / 255,
    ((t >> 16) & 255) / 255,
  ];
}

function generateAllParticles(rand: () => number) {
  const clusters: ClusterData[] = [];
  const bgPositions: number[] = [];
  const bgColors: number[] = [];
  const bgScales: number[] = [];

  // Background particle cloud (void particles)
  for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = 30 + rand() * 350;
    bgPositions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
    const brightness = 0.15 + rand() * 0.4;
    const isGold = rand() < 0.08;
    bgColors.push(
      isGold ? 0.9 : brightness,
      isGold ? 0.7 : brightness * 0.9,
      isGold ? 0.4 : brightness * 0.8
    );
    bgScales.push(0.3 + rand() * 1.2);
  }

  // Generate poet clusters
  const clusterPositions: number[] = [];
  const clusterColors: number[] = [];
  const clusterScales: number[] = [];
  const clusterCenters: number[] = []; // aCenter (3 per particle)
  const clusterOmegas: number[] = []; // aOmega (1 per particle)
  const clusterPickColors: number[] = []; // aPickColor (3 per particle)

  for (let ci = 0; ci < CLUSTER_COUNT; ci++) {
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    const r = 18 + rand() * 60;
    const cx = r * Math.sin(phi) * Math.cos(theta);
    const cy = r * Math.cos(phi);
    const cz = r * Math.sin(phi) * Math.sin(theta);
    const poet = POETS[ci % POETS.length];
    const baseColor = DYNASTY_COLORS[poet.dynasty] || DYNASTY_COLORS["default"];
    const omega = 0.1 + rand() * 0.4;
    const clusterSize = 0.6 + rand() * 1.0;

    clusters.push({
      cx,
      cy,
      cz,
      omega,
      color: baseColor.clone(),
      poetIdx: ci % POETS.length,
    });

    // Generate particles for this cluster
    for (let pi = 0; pi < PARTICLES_PER_CLUSTER; pi++) {
      const spread = 4 + clusterSize * 4;
      const ox = (rand() - 0.5) * spread;
      const oy = (rand() - 0.5) * spread;
      const oz = (rand() - 0.5) * spread;

      clusterPositions.push(ox, oy, oz);
      clusterCenters.push(cx, cy, cz);
      clusterOmegas.push(omega);

      // Color variation within cluster
      const c = baseColor.clone();
      c.r += (rand() - 0.5) * 0.15;
      c.g += (rand() - 0.5) * 0.15;
      c.b += (rand() - 0.5) * 0.15;
      clusterColors.push(c.r, c.g, c.b);

      // Scale variation
      const scale = (0.8 + rand() * 1.6) * (ci < 5 ? 2.0 : 1.0);
      clusterScales.push(scale);

      // Pick color (same for all particles in a cluster for click detection)
      const [pr, pg, pb] = pickColor(ci);
      clusterPickColors.push(pr, pg, pb);
    }
  }

  return {
    clusters,
    bgPositions: new Float32Array(bgPositions),
    bgColors: new Float32Array(bgColors),
    bgScales: new Float32Array(bgScales),
    clusterPositions: new Float32Array(clusterPositions),
    clusterColors: new Float32Array(clusterColors),
    clusterScales: new Float32Array(clusterScales),
    clusterCenters: new Float32Array(clusterCenters),
    clusterOmegas: new Float32Array(clusterOmegas),
    clusterPickColors: new Float32Array(clusterPickColors),
  };
}

// --- Shader for background glow particles ---
const BG_VERTEX_SHADER = `
  uniform float uSize;
  attribute vec3 aColor;
  attribute float aScale;
  varying vec3 vColor;
  void main() {
    vec4 vp = viewMatrix * modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * vp;
    gl_PointSize = clamp(uSize * aScale * (900.0 / -vp.z), 0.3, 40.0);
    vColor = aColor;
  }
`;

const BG_FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  void main() {
    vec4 tex = texture2D(uTexture, gl_PointCoord);
    float a = tex.a;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

// --- Shader for poet cluster particles (with self-rotation) ---
const CLUSTER_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uSize;
  attribute vec3 aColor;
  attribute float aScale;
  attribute vec3 aCenter;
  attribute float aOmega;
  varying vec3 vColor;
  void main() {
    // Self-rotate around cluster center
    vec3 off0 = position - aCenter;
    float ang = uTime * aOmega;
    float c = cos(ang), s = sin(ang);
    vec3 wp = aCenter + vec3(
      off0.x * c - off0.z * s,
      off0.y,
      off0.x * s + off0.z * c
    );
    vec4 vp = viewMatrix * modelMatrix * vec4(wp, 1.0);
    gl_Position = projectionMatrix * vp;
    gl_PointSize = clamp(uSize * aScale * (900.0 / -vp.z), 0.5, 64.0);
    vColor = aColor;
  }
`;

const CLUSTER_FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  varying vec3 vColor;
  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float d = length(center);
    float a = exp(-d * d * 4.5);
    if (a < 0.004) discard;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

// --- Inner 3D Scene ---
interface StarMapInnerProps {
  onVoidClick: () => void;
  onStarClick: (poetId: string) => void;
  onSpeedChange: (speed: number) => void;
  speed: number;
  quality: "high" | "low";
}

function StarMapInner({
  onVoidClick,
  onStarClick,
  onSpeedChange,
  speed,
  quality,
}: StarMapInnerProps) {
  const controlsRef = useRef<any>(null);
  const keysRef = useRef(new Set<string>());
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const bgPointsRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  // Generate all particle data once
  const rand = useMemo(() => mulberry32(42), []);
  const data = useMemo(() => generateAllParticles(rand), [rand]);

  // Create glow sprite texture once
  const spriteTexture = useMemo(() => makeGlowSprite(), []);

  // Background material
  const bgMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uSize: { value: 3.0 }, uTexture: { value: spriteTexture } },
        vertexShader: BG_VERTEX_SHADER,
        fragmentShader: BG_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [spriteTexture]
  );

  // Background geometry
  const bgGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.bgPositions, 3));
    geo.setAttribute("aColor", new THREE.BufferAttribute(data.bgColors, 3));
    geo.setAttribute("aScale", new THREE.BufferAttribute(data.bgScales, 1));
    return geo;
  }, [data]);

  // Cluster material
  const clusterMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 4.0 },
          uTexture: { value: spriteTexture },
        },
        vertexShader: CLUSTER_VERTEX_SHADER,
        fragmentShader: CLUSTER_FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [spriteTexture]
  );

  // Cluster geometry
  const clusterGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(data.clusterPositions, 3)
    );
    geo.setAttribute(
      "aColor",
      new THREE.BufferAttribute(data.clusterColors, 3)
    );
    geo.setAttribute(
      "aScale",
      new THREE.BufferAttribute(data.clusterScales, 1)
    );
    geo.setAttribute(
      "aCenter",
      new THREE.BufferAttribute(data.clusterCenters, 3)
    );
    geo.setAttribute(
      "aOmega",
      new THREE.BufferAttribute(data.clusterOmegas, 1)
    );
    return geo;
  }, [data]);

  // Update time uniform each frame
  useFrame((_, delta) => {
    timeRef.current += delta;
    if (clusterMaterial) {
      clusterMaterial.uniforms.uTime.value = timeRef.current;
    }

    // Keyboard movement
    const step = 0.3 * speedRef.current;
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(
      camera.quaternion
    );
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

    if (keysRef.current.has("KeyW") || keysRef.current.has("w"))
      camera.position.add(forward.clone().multiplyScalar(step));
    if (keysRef.current.has("KeyS") || keysRef.current.has("s"))
      camera.position.add(forward.clone().multiplyScalar(-step));
    if (keysRef.current.has("KeyA") || keysRef.current.has("a"))
      camera.position.add(right.clone().multiplyScalar(-step));
    if (keysRef.current.has("KeyD") || keysRef.current.has("d"))
      camera.position.add(right.clone().multiplyScalar(step));
  });

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.code);
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Click handler using raycaster against cluster centers
  const handlePointerDown = useCallback(
    (e: any) => {
      const rect = e.target?.getBoundingClientRect?.();
      if (rect) {
        mouse.current.x =
          ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y =
          -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
      raycaster.current.setFromCamera(mouse.current, camera);

      // Check against cluster centers
      for (let i = 0; i < data.clusters.length; i++) {
        const c = data.clusters[i];
        const pos = new THREE.Vector3(c.cx, c.cy, c.cz);
        const dist = raycaster.current.ray.distanceToPoint(pos);
        // Clickable radius based on cluster brightness
        const clickRadius = 5 + i * 0.5;
        if (dist < clickRadius) {
          onStarClick(POETS[c.poetIdx].id);
          return;
        }
      }
      onVoidClick();
    },
    [data.clusters, camera, onVoidClick, onStarClick]
  );

  // Wheel handler for speed
  const handleWheel = useCallback(
    (e: any) => {
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newSpeed = Math.max(0.1, Math.min(10, speedRef.current + delta));
      onSpeedChange(newSpeed);
    },
    [onSpeedChange]
  );

  return (
    <group ref={groupRef} onPointerDown={handlePointerDown} onWheel={handleWheel}>
      {/* Background glow particles */}
      <primitive object={new THREE.Points(bgGeometry, bgMaterial)} />

      {/* Poet cluster particles (self-rotating) */}
      <primitive object={new THREE.Points(clusterGeometry, clusterMaterial)} />

      {quality === "high" && (
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
        </EffectComposer>
      )}

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.08}
        rotateSpeed={0.5}
      />
    </group>
  );
}

// --- Public component ---
export interface StarMapProps {
  onVoidClick: () => void;
  onStarClick: (poetId: string) => void;
  onSpeedChange: (speed: number) => void;
  speed: number;
  quality?: "high" | "low";
}

export function StarMap({
  onVoidClick,
  onStarClick,
  onSpeedChange,
  speed,
  quality = "high",
}: StarMapProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 100], fov: 60, near: 0.1, far: 800 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#04050a"));
        }}
        gl={{ antialias: false }}
      >
        <StarMapInner
          onVoidClick={onVoidClick}
          onStarClick={onStarClick}
          onSpeedChange={onSpeedChange}
          speed={speed}
          quality={quality}
        />
      </Canvas>
    </div>
  );
}
