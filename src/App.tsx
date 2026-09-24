import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, Pause, Play, Smartphone, RotateCcw, Download, Copy, Check, Gamepad2, Users, Flame, Shield, Zap, Sparkles } from 'lucide-react';

/* =========================================================
   PROCEDURAL AUDIO SYNTHESIZER (Web Audio API)
   ========================================================= */
class SoundFX {
  ctx: AudioContext | null = null;
  muted: boolean = false;

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.muted = !this.muted;
    return !this.muted;
  }

  playShoot() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.12);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  playLaser() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.18);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  playBounce() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(260, t + 0.08);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  playBumperBonk() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    [620, 920].forEach(f => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      osc.frequency.exponentialRampToValueAtTime(f * 0.35, t + 0.18);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    });
  }

  playExplosion() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.exponentialRampToValueAtTime(50, t + 0.38);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.38);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(t);
    noise.stop(t + 0.4);
  }

  playPowerup() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    });
  }

  playBoost() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(480, t + 0.25);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.25);
  }

  playWarning() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(650, t);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.1);
  }
}

const audio = new SoundFX();

// --- Game Engine Constants ---
const ARENA_WIDTH = 70;
const ARENA_DEPTH = 50;
const WALL_THICKNESS = 2;
const TANK_RADIUS = 2.2;
const BULLET_RADIUS = 0.55;
const BULLET_SPEED = 42;
const MAX_BOUNCES = 2;
const MAX_HP = 100;
const WINNING_SCORE = 3;

interface PowerupDef {
  name: string;
  color: number;
  duration: number;
}

const POWERUP_TYPES: Record<string, PowerupDef> = {
  TRIPLE: { name: 'Triple Spread Shot', color: 0xffcc00, duration: 9 },
  LASER: { name: 'Rapid Laser Beam', color: 0xff0055, duration: 8 },
  SHIELD: { name: 'Shield & Heal', color: 0x00f0ff, duration: 10 },
  BOOST: { name: 'Turbo Nitro Ram', color: 0xff6600, duration: 8 }
};

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // React state for HUD
  const [p1Hp, setP1Hp] = useState(100);
  const [p1Shield, setP1Shield] = useState(0);
  const [p2Hp, setP2Hp] = useState(100);
  const [p2Shield, setP2Shield] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [roundNum, setRoundNum] = useState(1);
  const [activeMode, setActiveMode] = useState<'single_easy' | 'single_normal' | 'single_hard' | '2p_same' | '2p_split'>('single_easy');
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [touchVisible, setTouchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [victoryOpen, setVictoryOpen] = useState(false);
  const [victoryWinner, setVictoryWinner] = useState('');
  const [bannerText, setBannerText] = useState<{ title: string; desc: string; visible: boolean }>({ title: '', desc: '', visible: false });
  const [powerupToast, setPowerupToast] = useState<{ text: string; visible: boolean }>({ text: '', visible: false });
  const [copied, setCopied] = useState(false);

  // Reference hooks for loop access
  const gameRef = useRef<{
    mode: 'single_easy' | 'single_normal' | 'single_hard' | '2p_same' | '2p_split';
    roundActive: boolean;
    isPaused: boolean;
    score1: number;
    score2: number;
    roundNum: number;
    resetGame: () => void;
    selectMode: (m: 'single_easy' | 'single_normal' | 'single_hard' | '2p_same' | '2p_split') => void;
    keys: Record<string, boolean>;
    touchP1: { x: number; y: number; fire: boolean };
    touchP2: { x: number; y: number; fire: boolean };
    shootP1: () => void;
    shootP2: () => void;
  }>({
    mode: 'single_easy',
    roundActive: false,
    isPaused: false,
    score1: 0,
    score2: 0,
    roundNum: 1,
    resetGame: () => {},
    selectMode: () => {},
    keys: {},
    touchP1: { x: 0, y: 0, fire: false },
    touchP2: { x: 0, y: 0, fire: false },
    shootP1: () => {},
    shootP2: () => {},
  });

  // Check touch capability on mount
  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setTouchVisible(true);
    }
  }, []);

  // Sync pause state
  useEffect(() => {
    gameRef.current.isPaused = isPaused;
  }, [isPaused]);

  // Main Three.js Setup & Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050813);
    scene.fog = new THREE.FogExp2(0x050813, 0.012);

    // Cameras
    const cameraMain = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.5, 300);
    cameraMain.position.set(0, 58, 42);
    cameraMain.lookAt(0, 0, 0);

    const cameraP1 = new THREE.PerspectiveCamera(55, (window.innerWidth * 0.5) / window.innerHeight, 0.5, 300);
    const cameraP2 = new THREE.PerspectiveCamera(55, (window.innerWidth * 0.5) / window.innerHeight, 0.5, 300);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x384560, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(30, 60, 25);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 140;
    dirLight.shadow.camera.left = -45;
    dirLight.shadow.camera.right = 45;
    dirLight.shadow.camera.top = 35;
    dirLight.shadow.camera.bottom = -35;
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0xff2a5f, 0.4);
    scene.add(hemiLight);

    // Procedural Grid Texture for Arena Floor
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#080d1e';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#152238';
    ctx.lineWidth = 3;
    const step = 64;
    for (let x = 0; x <= 512; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y <= 512; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
    ctx.fillStyle = '#00f0ff';
    for (let x = step; x < 512; x += step * 2) {
      for (let y = step; y < 512; y += step * 2) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const floorTex = new THREE.CanvasTexture(c);
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(ARENA_WIDTH / 12, ARENA_DEPTH / 12);

    const floorGeo = new THREE.PlaneGeometry(ARENA_WIDTH, ARENA_DEPTH);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.35,
      metalness: 0.65
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Arena Perimeter Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x111928, metalness: 0.8, roughness: 0.2 });

    function createWall(x: number, z: number, width: number, depth: number, neonColor: number) {
      const group = new THREE.Group();
      const h = 4;
      const geo = new THREE.BoxGeometry(width, h, depth);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.y = h / 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      const trimGeo = new THREE.BoxGeometry(width, 0.4, depth);
      const trimMat = new THREE.MeshBasicMaterial({ color: neonColor });
      const trimMesh = new THREE.Mesh(trimGeo, trimMat);
      trimMesh.position.y = h + 0.2;
      group.add(trimMesh);

      group.position.set(x, 0, z);
      scene.add(group);
    }

    createWall(0, -ARENA_DEPTH / 2 - WALL_THICKNESS / 2, ARENA_WIDTH + WALL_THICKNESS * 2, WALL_THICKNESS, 0x00f0ff);
    createWall(0, ARENA_DEPTH / 2 + WALL_THICKNESS / 2, ARENA_WIDTH + WALL_THICKNESS * 2, WALL_THICKNESS, 0xff2a5f);
    createWall(-ARENA_WIDTH / 2 - WALL_THICKNESS / 2, 0, WALL_THICKNESS, ARENA_DEPTH, 0x00f0ff);
    createWall(ARENA_WIDTH / 2 + WALL_THICKNESS / 2, 0, WALL_THICKNESS, ARENA_DEPTH, 0xff2a5f);

    // Corner Light Beacons
    const cornerOffsets = [
      [-ARENA_WIDTH / 2, -ARENA_DEPTH / 2],
      [ARENA_WIDTH / 2, -ARENA_DEPTH / 2],
      [-ARENA_WIDTH / 2, ARENA_DEPTH / 2],
      [ARENA_WIDTH / 2, ARENA_DEPTH / 2]
    ];
    cornerOffsets.forEach(([cx, cz]) => {
      const pGeo = new THREE.CylinderGeometry(1.2, 1.4, 8, 16);
      const pMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.1 });
      const p = new THREE.Mesh(pGeo, pMat);
      p.position.set(cx, 4, cz);
      scene.add(p);
      const beaconGeo = new THREE.SphereGeometry(0.9, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({ color: cx < 0 ? 0x00f0ff : 0xff2a5f });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(cx, 8.5, cz);
      scene.add(beacon);
    });

    // Particle system
    interface Particle {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      life: number;
      decay: number;
    }
    const particles: Particle[] = [];
    const particleGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);

    function spawnSparks(x: number, y: number, z: number, hexColor: number, count = 12, speed = 12) {
      for (let i = 0; i < count; i++) {
        const mat = new THREE.MeshBasicMaterial({ color: hexColor });
        const mesh = new THREE.Mesh(particleGeo, mat);
        mesh.position.set(x, y, z);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 0.5;
        const spd = (0.3 + Math.random() * 0.7) * speed;
        const vel = new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi) * spd,
          Math.cos(phi) * spd,
          Math.sin(theta) * Math.sin(phi) * spd
        );
        scene.add(mesh);
        particles.push({ mesh, vel, life: 1.0, decay: 1.5 + Math.random() * 2 });
      }
    }

    function updateParticles(dt: number) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt * p.decay;
        if (p.life <= 0) {
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          (p.mesh.material as THREE.Material).dispose();
          particles.splice(i, 1);
        } else {
          p.vel.y -= 25 * dt;
          p.mesh.position.addScaledVector(p.vel, dt);
          p.mesh.scale.setScalar(p.life);
        }
      }
    }

    // Pinball Bumpers
    class BumperObj {
      x: number;
      z: number;
      radius: number;
      squash: number = 1.0;
      group: THREE.Group;
      ringMat: THREE.MeshBasicMaterial;

      constructor(x: number, z: number, radius = 3.2) {
        this.x = x;
        this.z = z;
        this.radius = radius;
        this.group = new THREE.Group();
        this.group.position.set(x, 0, z);

        const baseGeo = new THREE.CylinderGeometry(radius, radius * 1.15, 2.5, 32);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.y = 1.25;
        baseMesh.castShadow = true;
        this.group.add(baseMesh);

        const ringGeo = new THREE.TorusGeometry(radius * 0.95, 0.45, 16, 32);
        this.ringMat = new THREE.MeshBasicMaterial({ color: 0xff00aa });
        const ringMesh = new THREE.Mesh(ringGeo, this.ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = 2.0;
        this.group.add(ringMesh);

        const domeGeo = new THREE.SphereGeometry(radius * 0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const domeMat = new THREE.MeshStandardMaterial({ color: 0xff00aa, emissive: 0x550033, roughness: 0.1, metalness: 0.5 });
        const domeMesh = new THREE.Mesh(domeGeo, domeMat);
        domeMesh.position.y = 2.0;
        this.group.add(domeMesh);

        scene.add(this.group);
      }

      triggerBounce() {
        this.squash = 1.45;
        this.ringMat.color.setHex(0xffffff);
        audio.playBumperBonk();
        spawnSparks(this.x, 2, this.z, 0xff00aa, 14);
      }

      update(dt: number) {
        if (this.squash > 1.0) {
          this.squash = THREE.MathUtils.lerp(this.squash, 1.0, dt * 10);
          this.group.scale.set(this.squash, 1 / Math.sqrt(this.squash), this.squash);
        } else {
          this.ringMat.color.setHex(0xff00aa);
        }
      }
    }

    const bumpers = [
      new BumperObj(-14, 0, 3.4),
      new BumperObj(14, 0, 3.4),
      new BumperObj(0, -12, 2.8),
      new BumperObj(0, 12, 2.8)
    ];

    // Speed Pads
    class SpeedPadObj {
      x: number;
      z: number;
      dir: THREE.Vector2;
      size = 6;
      group: THREE.Group;
      arrows: THREE.Mesh[] = [];

      constructor(x: number, z: number, angle: number) {
        this.x = x;
        this.z = z;
        this.dir = new THREE.Vector2(Math.sin(angle), Math.cos(angle));
        this.group = new THREE.Group();
        this.group.position.set(x, 0.05, z);
        this.group.rotation.y = angle;

        const padGeo = new THREE.PlaneGeometry(this.size, this.size);
        const padMat = new THREE.MeshStandardMaterial({ color: 0x022c22, roughness: 0.5 });
        const padMesh = new THREE.Mesh(padGeo, padMat);
        padMesh.rotation.x = -Math.PI / 2;
        padMesh.receiveShadow = true;
        this.group.add(padMesh);

        for (let i = -1; i <= 1; i++) {
          const arrowGeo = new THREE.ConeGeometry(1.2, 1.8, 3);
          const arrowMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
          const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
          arrowMesh.rotation.x = Math.PI / 2;
          arrowMesh.position.set(0, 0.08, i * 1.6);
          this.group.add(arrowMesh);
          this.arrows.push(arrowMesh);
        }
        scene.add(this.group);
      }

      update(time: number) {
        this.arrows.forEach((arrow, i) => {
          const pulse = (Math.sin(time * 6 + i * 1.5) + 1) * 0.5;
          arrow.scale.set(0.8 + pulse * 0.3, 0.8 + pulse * 0.3, 0.8 + pulse * 0.3);
        });
      }

      checkTank(tank: TankObj) {
        const dx = tank.pos.x - this.x;
        const dz = tank.pos.y - this.z;
        if (Math.abs(dx) < this.size * 0.5 && Math.abs(dz) < this.size * 0.5) {
          tank.vel.x += this.dir.x * 32;
          tank.vel.y += this.dir.y * 32;
          audio.playBoost();
          spawnSparks(tank.pos.x, 1, tank.pos.y, 0x00ff88, 8);
        }
      }
    }

    const speedPads = [
      new SpeedPadObj(-22, -15, Math.PI / 4),
      new SpeedPadObj(22, 15, -3 * Math.PI / 4),
      new SpeedPadObj(-22, 15, 3 * Math.PI / 4),
      new SpeedPadObj(22, -15, -Math.PI / 4)
    ];

    // Trapdoors
    class TrapdoorObj {
      x: number;
      z: number;
      width: number;
      depth: number;
      state: 'closed' | 'warning' | 'open' = 'closed';
      timer = 0;
      cycleTime = 12;
      group: THREE.Group;
      frameMat: THREE.MeshBasicMaterial;
      panelLeft: THREE.Mesh;
      panelRight: THREE.Mesh;

      constructor(x: number, z: number, width = 8, depth = 8) {
        this.x = x;
        this.z = z;
        this.width = width;
        this.depth = depth;

        this.group = new THREE.Group();
        this.group.position.set(x, 0, z);

        const frameGeo = new THREE.BoxGeometry(width + 0.8, 0.1, depth + 0.8);
        this.frameMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
        const frameMesh = new THREE.Mesh(frameGeo, this.frameMat);
        frameMesh.position.y = 0.05;
        this.group.add(frameMesh);

        const pitGeo = new THREE.PlaneGeometry(width, depth);
        const pitMat = new THREE.MeshBasicMaterial({ color: 0xff3300 });
        const pitMesh = new THREE.Mesh(pitGeo, pitMat);
        pitMesh.rotation.x = -Math.PI / 2;
        pitMesh.position.y = -3.5;
        this.group.add(pitMesh);

        const panelGeo = new THREE.BoxGeometry(width / 2, 0.4, depth);
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
        this.panelLeft = new THREE.Mesh(panelGeo, panelMat);
        this.panelLeft.position.set(-width / 4, 0, 0);
        this.panelRight = new THREE.Mesh(panelGeo, panelMat);
        this.panelRight.position.set(width / 4, 0, 0);
        this.group.add(this.panelLeft);
        this.group.add(this.panelRight);

        scene.add(this.group);
      }

      update(dt: number, time: number) {
        this.timer = (this.timer + dt) % this.cycleTime;
        if (this.timer < 6) {
          this.state = 'closed';
          this.frameMat.color.setHex(0x334155);
          this.panelLeft.position.x = THREE.MathUtils.lerp(this.panelLeft.position.x, -this.width / 4, dt * 5);
          this.panelRight.position.x = THREE.MathUtils.lerp(this.panelRight.position.x, this.width / 4, dt * 5);
        } else if (this.timer < 8.5) {
          this.state = 'warning';
          const blink = Math.sin(time * 12) > 0;
          this.frameMat.color.setHex(blink ? 0xff6600 : 0x221100);
          if (Math.sin(time * 12) > 0.95) audio.playWarning();
        } else {
          this.state = 'open';
          this.frameMat.color.setHex(0xff0000);
          this.panelLeft.position.x = THREE.MathUtils.lerp(this.panelLeft.position.x, -this.width * 0.75, dt * 8);
          this.panelRight.position.x = THREE.MathUtils.lerp(this.panelRight.position.x, this.width * 0.75, dt * 8);
        }
      }

      checkTank(tank: TankObj, dt: number) {
        if (this.state !== 'open') return;
        const dx = tank.pos.x - this.x;
        const dz = tank.pos.y - this.z;
        if (Math.abs(dx) < this.width * 0.45 && Math.abs(dz) < this.depth * 0.45) {
          tank.takeDamage(25 * dt);
          tank.vel.multiplyScalar(0.7);
          tank.angle += dt * 6;
          spawnSparks(tank.pos.x, 0.5, tank.pos.y, 0xff0000, 2);
        }
      }
    }

    const trapdoors = [
      new TrapdoorObj(-16, 14, 8, 8),
      new TrapdoorObj(16, -14, 8, 8)
    ];

    // Tank Model
    class TankObj {
      id: number;
      name: string;
      colorHex: number;
      secondaryHex: number;
      isAI: boolean;
      hp = MAX_HP;
      shield = 0;
      pos = new THREE.Vector2(0, 0);
      vel = new THREE.Vector2(0, 0);
      angle = 0;
      recoil = 0;
      activePowerup: string | null = null;
      powerupTimer = 0;
      shootCooldown = 0;
      baseCooldown = 0.45;

      group: THREE.Group;
      barrelMesh: THREE.Mesh;
      shieldMesh: THREE.Mesh;

      hudCanvas: HTMLCanvasElement;
      hudCtx: CanvasRenderingContext2D;
      hudTexture: THREE.CanvasTexture;
      hudSprite: THREE.Sprite;

      constructor(id: number, name: string, colorHex: number, secondaryHex: number, isAI = false) {
        this.id = id;
        this.name = name;
        this.colorHex = colorHex;
        this.secondaryHex = secondaryHex;
        this.isAI = isAI;

        this.group = new THREE.Group();

        // Hull
        const hullGeo = new THREE.BoxGeometry(3.2, 1.2, 4.0);
        const hullMat = new THREE.MeshStandardMaterial({ color: colorHex, metalness: 0.8, roughness: 0.25 });
        const hullMesh = new THREE.Mesh(hullGeo, hullMat);
        hullMesh.position.y = 1.0;
        hullMesh.castShadow = true;
        hullMesh.receiveShadow = true;
        this.group.add(hullMesh);

        // Bumper Rim
        const bumperGeo = new THREE.BoxGeometry(3.6, 0.4, 4.4);
        const bumperMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9, metalness: 0.1 });
        const bumperMesh = new THREE.Mesh(bumperGeo, bumperMat);
        bumperMesh.position.y = 0.7;
        this.group.add(bumperMesh);

        const trimGeo = new THREE.BoxGeometry(3.7, 0.15, 4.5);
        const trimMat = new THREE.MeshBasicMaterial({ color: secondaryHex });
        const trimMesh = new THREE.Mesh(trimGeo, trimMat);
        trimMesh.position.y = 0.7;
        this.group.add(trimMesh);

        // Treads
        const treadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
        const treadGeo = new THREE.BoxGeometry(0.7, 0.9, 4.4);
        const leftTread = new THREE.Mesh(treadGeo, treadMat);
        leftTread.position.set(-1.85, 0.55, 0);
        leftTread.castShadow = true;
        this.group.add(leftTread);

        const rightTread = new THREE.Mesh(treadGeo, treadMat);
        rightTread.position.set(1.85, 0.55, 0);
        rightTread.castShadow = true;
        this.group.add(rightTread);

        // Turret
        const turretGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.9, 16);
        const turretMat = new THREE.MeshStandardMaterial({ color: secondaryHex, metalness: 0.7, roughness: 0.2 });
        const turretMesh = new THREE.Mesh(turretGeo, turretMat);
        turretMesh.position.y = 1.9;
        turretMesh.castShadow = true;
        this.group.add(turretMesh);

        // Cannon
        const barrelGeo = new THREE.CylinderGeometry(0.24, 0.28, 2.6, 12);
        const barrelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.1 });
        this.barrelMesh = new THREE.Mesh(barrelGeo, barrelMat);
        this.barrelMesh.rotation.x = Math.PI / 2;
        this.barrelMesh.position.set(0, 1.9, 1.6);
        this.barrelMesh.castShadow = true;
        this.group.add(this.barrelMesh);

        // Shield dome
        const shieldGeo = new THREE.SphereGeometry(TANK_RADIUS * 1.35, 24, 24);
        const shieldMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35, wireframe: true });
        this.shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
        this.shieldMesh.position.y = 1.5;
        this.shieldMesh.visible = false;
        this.group.add(this.shieldMesh);

        // Sprite HUD
        this.hudCanvas = document.createElement('canvas');
        this.hudCanvas.width = 256;
        this.hudCanvas.height = 64;
        this.hudCtx = this.hudCanvas.getContext('2d')!;
        this.hudTexture = new THREE.CanvasTexture(this.hudCanvas);
        const spriteMat = new THREE.SpriteMaterial({ map: this.hudTexture, depthTest: false });
        this.hudSprite = new THREE.Sprite(spriteMat);
        this.hudSprite.position.set(0, 4.2, 0);
        this.hudSprite.scale.set(7, 1.75, 1);
        this.group.add(this.hudSprite);

        scene.add(this.group);
        this.updateHUDCanvas();
      }

      updateHUDCanvas() {
        const ctx = this.hudCtx;
        ctx.clearRect(0, 0, 256, 64);

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = '#ffffff33';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(10, 10, 236, 44, 10);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 16px sans-serif';
        ctx.fillStyle = this.id === 1 ? '#00f0ff' : '#ff2a5f';
        ctx.fillText(this.name, 22, 36);

        ctx.fillStyle = '#050813';
        ctx.fillRect(110, 22, 120, 18);

        const hpPercent = Math.max(0, this.hp / MAX_HP);
        ctx.fillStyle = hpPercent > 0.5 ? '#10b981' : hpPercent > 0.25 ? '#f59e0b' : '#ef4444';
        ctx.fillRect(112, 24, 116 * hpPercent, 14);

        if (this.shield > 0) {
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          ctx.strokeRect(110, 22, 120, 18);
        }
        this.hudTexture.needsUpdate = true;
      }

      reset(x: number, z: number, angle: number) {
        this.hp = MAX_HP;
        this.shield = 0;
        this.pos.set(x, z);
        this.vel.set(0, 0);
        this.angle = angle;
        this.activePowerup = null;
        this.powerupTimer = 0;
        this.shootCooldown = 0;
        this.shieldMesh.visible = false;
        this.group.position.set(x, 0, z);
        this.group.rotation.y = angle;
        this.updateHUDCanvas();
      }

      applyPowerup(typeKey: string) {
        const p = POWERUP_TYPES[typeKey];
        if (!p) return;
        this.activePowerup = typeKey;
        this.powerupTimer = p.duration;

        if (typeKey === 'SHIELD') {
          this.shield = 50;
          this.hp = Math.min(MAX_HP, this.hp + 35);
          this.shieldMesh.visible = true;
        }

        audio.playPowerup();
        spawnSparks(this.pos.x, 2, this.pos.y, p.color, 24);
        setPowerupToast({ text: `${this.name} GOT ${p.name}!`, visible: true });
        setTimeout(() => setPowerupToast(prev => ({ ...prev, visible: false })), 2500);
        this.updateHUDCanvas();
      }

      takeDamage(amount: number) {
        if (this.shield > 0) {
          const absorbed = Math.min(this.shield, amount);
          this.shield -= absorbed;
          amount -= absorbed;
          if (this.shield <= 0) this.shieldMesh.visible = false;
        }
        if (amount > 0) {
          this.hp = Math.max(0, this.hp - amount);
          spawnSparks(this.pos.x, 1.5, this.pos.y, 0xff2200, 10);
        }
        this.updateHUDCanvas();

        if (this.id === 1) {
          setP1Hp(this.hp);
          setP1Shield(this.shield);
        } else {
          setP2Hp(this.hp);
          setP2Shield(this.shield);
        }

        if (this.hp <= 0) {
          handleTankDestroyed(this);
        }
      }

      update(dt: number) {
        if (this.powerupTimer > 0) {
          this.powerupTimer -= dt;
          if (this.powerupTimer <= 0) {
            this.activePowerup = null;
            if (this.shield <= 0) this.shieldMesh.visible = false;
          }
        }

        if (this.shieldMesh.visible) {
          this.shieldMesh.rotation.y += dt * 2;
          this.shieldMesh.rotation.x += dt * 1.5;
        }

        if (this.recoil > 0) {
          this.recoil = THREE.MathUtils.lerp(this.recoil, 0, dt * 15);
          this.barrelMesh.position.z = 1.6 - this.recoil * 0.6;
        }

        if (this.shootCooldown > 0) {
          this.shootCooldown -= dt;
        }

        const friction = this.activePowerup === 'BOOST' ? 0.98 : 0.93;
        this.vel.multiplyScalar(friction);
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        const minX = -ARENA_WIDTH / 2 + TANK_RADIUS;
        const maxX = ARENA_WIDTH / 2 - TANK_RADIUS;
        const minZ = -ARENA_DEPTH / 2 + TANK_RADIUS;
        const maxZ = ARENA_DEPTH / 2 - TANK_RADIUS;

        if (this.pos.x < minX) {
          this.pos.x = minX;
          this.vel.x = Math.abs(this.vel.x) * 0.8;
          audio.playBounce();
        } else if (this.pos.x > maxX) {
          this.pos.x = maxX;
          this.vel.x = -Math.abs(this.vel.x) * 0.8;
          audio.playBounce();
        }

        if (this.pos.y < minZ) {
          this.pos.y = minZ;
          this.vel.y = Math.abs(this.vel.y) * 0.8;
          audio.playBounce();
        } else if (this.pos.y > maxZ) {
          this.pos.y = maxZ;
          this.vel.y = -Math.abs(this.vel.y) * 0.8;
          audio.playBounce();
        }

        this.group.position.set(this.pos.x, 0, this.pos.y);
        this.group.rotation.y = this.angle;
      }

      shoot() {
        const cooldown = this.activePowerup === 'LASER' ? 0.16 : this.baseCooldown;
        if (this.shootCooldown > 0) return;
        this.shootCooldown = cooldown;
        this.recoil = 1.0;

        const barrelDir = new THREE.Vector2(Math.sin(this.angle), Math.cos(this.angle));
        const tipX = this.pos.x + barrelDir.x * (TANK_RADIUS + 0.8);
        const tipZ = this.pos.y + barrelDir.y * (TANK_RADIUS + 0.8);

        if (this.activePowerup === 'TRIPLE') {
          audio.playShoot();
          [-0.26, 0, 0.26].forEach(offset => {
            const spreadAngle = this.angle + offset;
            const dir = new THREE.Vector2(Math.sin(spreadAngle), Math.cos(spreadAngle));
            bullets.push(new ShellObj(this.id, tipX, tipZ, dir, 0xffcc00));
          });
        } else if (this.activePowerup === 'LASER') {
          audio.playLaser();
          bullets.push(new ShellObj(this.id, tipX, tipZ, barrelDir, 0xff0055, true));
        } else {
          audio.playShoot();
          bullets.push(new ShellObj(this.id, tipX, tipZ, barrelDir, this.secondaryHex));
        }

        spawnSparks(tipX, 1.9, tipZ, this.secondaryHex, 6, 8);
      }
    }

    // Shell
    class ShellObj {
      ownerId: number;
      pos: THREE.Vector2;
      vel: THREE.Vector2;
      isLaser: boolean;
      bounces = 0;
      maxBounces: number;
      alive = true;
      colorHex: number;
      mesh: THREE.Mesh;
      light: THREE.PointLight;

      constructor(ownerId: number, x: number, z: number, dir: THREE.Vector2, colorHex: number, isLaser = false) {
        this.ownerId = ownerId;
        this.pos = new THREE.Vector2(x, z);
        this.isLaser = isLaser;
        const speed = isLaser ? BULLET_SPEED * 1.5 : BULLET_SPEED;
        this.vel = new THREE.Vector2(dir.x * speed, dir.y * speed);
        this.maxBounces = isLaser ? 1 : MAX_BOUNCES;
        this.colorHex = colorHex;

        const geo = new THREE.SphereGeometry(isLaser ? BULLET_RADIUS * 0.8 : BULLET_RADIUS, 12, 12);
        const mat = new THREE.MeshBasicMaterial({ color: colorHex });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.position.set(x, 1.9, z);
        scene.add(this.mesh);

        this.light = new THREE.PointLight(colorHex, 1.5, 6);
        this.light.position.set(x, 1.9, z);
        scene.add(this.light);
      }

      update(dt: number) {
        if (!this.alive) return;
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;

        this.mesh.position.set(this.pos.x, 1.9, this.pos.y);
        this.light.position.copy(this.mesh.position);

        const minX = -ARENA_WIDTH / 2;
        const maxX = ARENA_WIDTH / 2;
        const minZ = -ARENA_DEPTH / 2;
        const maxZ = ARENA_DEPTH / 2;

        let bounced = false;
        if (this.pos.x <= minX) {
          this.pos.x = minX;
          this.vel.x = -this.vel.x;
          bounced = true;
        } else if (this.pos.x >= maxX) {
          this.pos.x = maxX;
          this.vel.x = -this.vel.x;
          bounced = true;
        }

        if (this.pos.y <= minZ) {
          this.pos.y = minZ;
          this.vel.y = -this.vel.y;
          bounced = true;
        } else if (this.pos.y >= maxZ) {
          this.pos.y = maxZ;
          this.vel.y = -this.vel.y;
          bounced = true;
        }

        bumpers.forEach(bumper => {
          const dx = this.pos.x - bumper.x;
          const dz = this.pos.y - bumper.z;
          const distSq = dx * dx + dz * dz;
          if (distSq < (bumper.radius + BULLET_RADIUS) ** 2) {
            const dist = Math.sqrt(distSq);
            const nx = dx / (dist || 1);
            const ny = dz / (dist || 1);
            const dot = this.vel.x * nx + this.vel.y * ny;
            this.vel.x -= 2 * dot * nx;
            this.vel.y -= 2 * dot * ny;
            this.pos.x = bumper.x + nx * (bumper.radius + BULLET_RADIUS + 0.1);
            this.pos.y = bumper.z + ny * (bumper.radius + BULLET_RADIUS + 0.1);
            bumper.triggerBounce();
            bounced = true;
          }
        });

        if (bounced) {
          this.bounces++;
          audio.playBounce();
          spawnSparks(this.pos.x, 1.9, this.pos.y, this.colorHex, 6, 6);
          if (this.bounces > this.maxBounces) {
            this.explode();
          }
        }
      }

      explode() {
        this.alive = false;
        audio.playExplosion();
        spawnSparks(this.pos.x, 1.9, this.pos.y, this.colorHex, 18, 14);
        this.destroy();
      }

      destroy() {
        scene.remove(this.mesh);
        scene.remove(this.light);
        this.mesh.geometry.dispose();
        (this.mesh.material as THREE.Material).dispose();
      }
    }

    // Powerup Crate
    class PowerupObj {
      typeKey: string;
      type: PowerupDef;
      x: number;
      z: number;
      alive = true;
      group: THREE.Group;
      boxMesh: THREE.Mesh;
      coreMesh: THREE.Mesh;

      constructor(typeKey: string, x: number, z: number) {
        this.typeKey = typeKey;
        this.type = POWERUP_TYPES[typeKey];
        this.x = x;
        this.z = z;

        this.group = new THREE.Group();
        this.group.position.set(x, 1.8, z);

        const boxGeo = new THREE.BoxGeometry(2.0, 2.0, 2.0);
        const boxMat = new THREE.MeshStandardMaterial({
          color: this.type.color,
          roughness: 0.2,
          metalness: 0.8,
          transparent: true,
          opacity: 0.85
        });
        this.boxMesh = new THREE.Mesh(boxGeo, boxMat);
        this.boxMesh.castShadow = true;
        this.group.add(this.boxMesh);

        const coreGeo = new THREE.OctahedronGeometry(0.8);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
        this.group.add(this.coreMesh);

        const light = new THREE.PointLight(this.type.color, 1.8, 8);
        this.group.add(light);

        scene.add(this.group);
      }

      update(dt: number, time: number) {
        this.group.position.y = 1.8 + Math.sin(time * 3) * 0.4;
        this.group.rotation.y += dt * 2.0;
        this.coreMesh.rotation.x += dt * 3.0;
      }

      destroy() {
        this.alive = false;
        scene.remove(this.group);
        this.boxMesh.geometry.dispose();
        (this.boxMesh.material as THREE.Material).dispose();
      }
    }

    const player1 = new TankObj(1, 'P1 Blue', 0x00f0ff, 0x0088ff);
    const player2 = new TankObj(2, 'P2 Red', 0xff2a5f, 0x991b1b, true);
    let bullets: ShellObj[] = [];
    let powerups: PowerupObj[] = [];
    let powerupSpawnTimer = 4.0;

    gameRef.current.shootP1 = () => player1.shoot();
    gameRef.current.shootP2 = () => player2.shoot();

    function resolveTankTankCollision(t1: TankObj, t2: TankObj) {
      const dx = t2.pos.x - t1.pos.x;
      const dz = t2.pos.y - t1.pos.y;
      const distSq = dx * dx + dz * dz;
      const minDist = TANK_RADIUS * 2.1;

      if (distSq < minDist * minDist) {
        const dist = Math.sqrt(distSq) || 1;
        const nx = dx / dist;
        const nz = dz / dist;

        const overlap = minDist - dist;
        t1.pos.x -= nx * overlap * 0.5;
        t1.pos.y -= nz * overlap * 0.5;
        t2.pos.x += nx * overlap * 0.5;
        t2.pos.y += nz * overlap * 0.5;

        const rvx = t2.vel.x - t1.vel.x;
        const rvz = t2.vel.y - t1.vel.y;
        const velAlongNormal = rvx * nx + rvz * nz;

        if (velAlongNormal < 0) {
          const restitution = 1.45;
          const impulseMag = -(1 + restitution) * velAlongNormal * 0.5;
          const impulseX = impulseMag * nx;
          const impulseZ = impulseMag * nz;

          t1.vel.x -= impulseX;
          t1.vel.y -= impulseZ;
          t2.vel.x += impulseX;
          t2.vel.y += impulseZ;

          audio.playBumperBonk();
          spawnSparks((t1.pos.x + t2.pos.x) * 0.5, 1.5, (t1.pos.y + t2.pos.y) * 0.5, 0xffd700, 16, 15);

          if (t1.activePowerup === 'BOOST') t2.takeDamage(25);
          if (t2.activePowerup === 'BOOST') t1.takeDamage(25);
        }
      }
    }

    function resolveTankBumperCollision(tank: TankObj) {
      bumpers.forEach(bumper => {
        const dx = tank.pos.x - bumper.x;
        const dz = tank.pos.y - bumper.z;
        const distSq = dx * dx + dz * dz;
        const minDist = bumper.radius + TANK_RADIUS;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq) || 1;
          const nx = dx / dist;
          const nz = dz / dist;

          tank.pos.x = bumper.x + nx * (minDist + 0.1);
          tank.pos.y = bumper.z + nz * (minDist + 0.1);
          tank.vel.x = nx * 38;
          tank.vel.y = nz * 38;

          bumper.triggerBounce();
        }
      });
    }

    function updateAI(tank: TankObj, target: TankObj, dt: number) {
      if (!tank.isAI || tank.hp <= 0) return;

      const difficulty = gameRef.current.mode;
      const dx = target.pos.x - tank.pos.x;
      const dz = target.pos.y - tank.pos.y;
      const distToTarget = Math.hypot(dx, dz);

      let targetAngle = Math.atan2(dx, dz);
      if (difficulty === 'single_hard') {
        const leadFactor = 0.35;
        const predictedX = target.pos.x + target.vel.x * leadFactor;
        const predictedZ = target.pos.y + target.vel.y * leadFactor;
        targetAngle = Math.atan2(predictedX - tank.pos.x, predictedZ - tank.pos.y);
      }

      const angleDiff = THREE.MathUtils.euclideanModulo(targetAngle - tank.angle + Math.PI, Math.PI * 2) - Math.PI;
      const turnSpeed = difficulty === 'single_hard' ? 4.8 : difficulty === 'single_normal' ? 3.5 : 2.2;
      tank.angle += Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), turnSpeed * dt);

      const speed = difficulty === 'single_hard' ? 24 : difficulty === 'single_normal' ? 18 : 14;
      const boostMult = tank.activePowerup === 'BOOST' ? 1.8 : 1.0;

      if (distToTarget > 20) {
        tank.vel.x += Math.sin(tank.angle) * speed * boostMult * dt * 4;
        tank.vel.y += Math.cos(tank.angle) * speed * boostMult * dt * 4;
      } else if (distToTarget < 10) {
        tank.vel.x -= Math.sin(tank.angle) * speed * 0.7 * dt * 4;
        tank.vel.y -= Math.cos(tank.angle) * speed * 0.7 * dt * 4;
      } else {
        tank.vel.x += Math.cos(tank.angle) * speed * 0.5 * dt * 4;
        tank.vel.y -= Math.sin(tank.angle) * speed * 0.5 * dt * 4;
      }

      if (Math.abs(angleDiff) < 0.35 && distToTarget < 45) {
        const shootChance = difficulty === 'single_hard' ? 0.95 : difficulty === 'single_normal' ? 0.7 : 0.45;
        if (Math.random() < shootChance) {
          tank.shoot();
        }
      }
    }

    function startRound() {
      gameRef.current.roundActive = true;
      bullets.forEach(b => b.destroy());
      bullets = [];
      powerups.forEach(p => p.destroy());
      powerups = [];

      player1.reset(-ARENA_WIDTH * 0.35, 0, Math.PI / 2);
      player2.reset(ARENA_WIDTH * 0.35, 0, -Math.PI / 2);

      setP1Hp(100);
      setP1Shield(0);
      setP2Hp(100);
      setP2Shield(0);

      setBannerText({ title: `ROUND ${gameRef.current.roundNum}`, desc: 'FIGHT!', visible: true });
      setTimeout(() => setBannerText(prev => ({ ...prev, visible: false })), 2000);
    }

    function handleTankDestroyed(tank: TankObj) {
      if (!gameRef.current.roundActive) return;
      gameRef.current.roundActive = false;

      audio.playExplosion();
      spawnSparks(tank.pos.x, 2, tank.pos.y, tank.secondaryHex, 40, 24);

      if (tank.id === 1) {
        gameRef.current.score2++;
        setScore2(gameRef.current.score2);
        setBannerText({ title: 'PLAYER 2 WINS ROUND!', desc: 'PREPARING NEXT ROUND', visible: true });
      } else {
        gameRef.current.score1++;
        setScore1(gameRef.current.score1);
        setBannerText({ title: 'PLAYER 1 WINS ROUND!', desc: 'PREPARING NEXT ROUND', visible: true });
      }

      setTimeout(() => {
        setBannerText(prev => ({ ...prev, visible: false }));
        if (gameRef.current.score1 >= WINNING_SCORE || gameRef.current.score2 >= WINNING_SCORE) {
          setVictoryWinner(gameRef.current.score1 > gameRef.current.score2 ? 'PLAYER 1' : (gameRef.current.mode.startsWith('single') ? 'AI CPU' : 'PLAYER 2'));
          setVictoryOpen(true);
        } else {
          gameRef.current.roundNum++;
          setRoundNum(gameRef.current.roundNum);
          startRound();
        }
      }, 2500);
    }

    gameRef.current.resetGame = () => {
      gameRef.current.score1 = 0;
      gameRef.current.score2 = 0;
      gameRef.current.roundNum = 1;
      setScore1(0);
      setScore2(0);
      setRoundNum(1);
      setVictoryOpen(false);
      setMenuOpen(false);
      startRound();
    };

    gameRef.current.selectMode = (mode) => {
      gameRef.current.mode = mode;
      setActiveMode(mode);
      const isAI = mode.startsWith('single');
      player2.isAI = isAI;
      player2.name = isAI ? 'CPU AI' : 'P2 RED';
      gameRef.current.resetGame();
    };

    // Keyboard handlers
    const onKeyDown = (e: KeyboardEvent) => {
      gameRef.current.keys[e.code] = true;
      if (e.code === 'KeyP') setIsPaused(p => !p);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      gameRef.current.keys[e.code] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      cameraMain.aspect = w / h;
      cameraMain.updateProjectionMatrix();

      cameraP1.aspect = (w * 0.5) / h;
      cameraP1.updateProjectionMatrix();
      cameraP2.aspect = (w * 0.5) / h;
      cameraP2.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (gameRef.current.isPaused) return;

      const timeSec = time * 0.001;

      bumpers.forEach(b => b.update(dt));
      speedPads.forEach(sp => {
        sp.update(timeSec);
        sp.checkTank(player1);
        sp.checkTank(player2);
      });
      trapdoors.forEach(td => {
        td.update(dt, timeSec);
        td.checkTank(player1, dt);
        td.checkTank(player2, dt);
      });

      updateParticles(dt);

      if (gameRef.current.roundActive) {
        const keys = gameRef.current.keys;
        const touch1 = gameRef.current.touchP1;
        const touch2 = gameRef.current.touchP2;

        let move1 = 0, turn1 = 0;
        if (keys['KeyW']) move1 += 1;
        if (keys['KeyS']) move1 -= 1;
        if (keys['KeyA']) turn1 -= 1;
        if (keys['KeyD']) turn1 += 1;

        if (touch1.y !== 0) move1 -= touch1.y;
        if (touch1.x !== 0) turn1 += touch1.x;

        const speedP1 = player1.activePowerup === 'BOOST' ? 44 : 26;
        player1.angle += turn1 * 3.6 * dt;
        if (move1 !== 0) {
          player1.vel.x += Math.sin(player1.angle) * move1 * speedP1 * dt * 4;
          player1.vel.y += Math.cos(player1.angle) * move1 * speedP1 * dt * 4;
        }
        if (keys['Space']) player1.shoot();

        if (!player2.isAI) {
          let move2 = 0, turn2 = 0;
          if (keys['ArrowUp']) move2 += 1;
          if (keys['ArrowDown']) move2 -= 1;
          if (keys['ArrowLeft']) turn2 -= 1;
          if (keys['ArrowRight']) turn2 += 1;

          if (touch2.y !== 0) move2 += touch2.y;
          if (touch2.x !== 0) turn2 -= touch2.x;

          const speedP2 = player2.activePowerup === 'BOOST' ? 44 : 26;
          player2.angle += turn2 * 3.6 * dt;
          if (move2 !== 0) {
            player2.vel.x += Math.sin(player2.angle) * move2 * speedP2 * dt * 4;
            player2.vel.y += Math.cos(player2.angle) * move2 * speedP2 * dt * 4;
          }
          if (keys['Enter'] || keys['Numpad0']) player2.shoot();
        } else {
          updateAI(player2, player1, dt);
        }

        player1.update(dt);
        player2.update(dt);

        resolveTankTankCollision(player1, player2);
        resolveTankBumperCollision(player1);
        resolveTankBumperCollision(player2);

        for (let i = bullets.length - 1; i >= 0; i--) {
          const b = bullets[i];
          b.update(dt);
          if (!b.alive) {
            bullets.splice(i, 1);
            continue;
          }
          [player1, player2].forEach(tank => {
            if (b.ownerId !== tank.id || b.bounces > 0) {
              const dx = b.pos.x - tank.pos.x;
              const dz = b.pos.y - tank.pos.y;
              if (Math.hypot(dx, dz) < TANK_RADIUS + BULLET_RADIUS) {
                b.explode();
                tank.takeDamage(b.isLaser ? 30 : 20);
              }
            }
          });
        }

        powerupSpawnTimer -= dt;
        if (powerupSpawnTimer <= 0 && powerups.length < 3) {
          powerupSpawnTimer = 8 + Math.random() * 5;
          const types = Object.keys(POWERUP_TYPES);
          const typeKey = types[Math.floor(Math.random() * types.length)];
          const rx = (Math.random() - 0.5) * (ARENA_WIDTH - 16);
          const rz = (Math.random() - 0.5) * (ARENA_DEPTH - 14);
          powerups.push(new PowerupObj(typeKey, rx, rz));
        }

        for (let i = powerups.length - 1; i >= 0; i--) {
          const crate = powerups[i];
          crate.update(dt, timeSec);
          [player1, player2].forEach(tank => {
            if (Math.hypot(tank.pos.x - crate.x, tank.pos.y - crate.z) < TANK_RADIUS + 1.2) {
              tank.applyPowerup(crate.typeKey);
              crate.destroy();
              powerups.splice(i, 1);
            }
          });
        }
      }

      // Camera rendering
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (gameRef.current.mode === '2p_split') {
        renderer.setScissorTest(true);

        renderer.setViewport(0, 0, width / 2, height);
        renderer.setScissor(0, 0, width / 2, height);
        cameraP1.position.set(
          player1.pos.x - Math.sin(player1.angle) * 18,
          24,
          player1.pos.y - Math.cos(player1.angle) * 18
        );
        cameraP1.lookAt(player1.pos.x, 1.5, player1.pos.y);
        renderer.render(scene, cameraP1);

        renderer.setViewport(width / 2, 0, width / 2, height);
        renderer.setScissor(width / 2, 0, width / 2, height);
        cameraP2.position.set(
          player2.pos.x - Math.sin(player2.angle) * 18,
          24,
          player2.pos.y - Math.cos(player2.angle) * 18
        );
        cameraP2.lookAt(player2.pos.x, 1.5, player2.pos.y);
        renderer.render(scene, cameraP2);

        renderer.setScissorTest(false);
      } else {
        renderer.setViewport(0, 0, width, height);

        if (gameRef.current.mode.startsWith('single')) {
          const targetCamX = player1.pos.x * 0.4;
          const targetCamZ = player1.pos.y * 0.4 + 42;
          cameraMain.position.x = THREE.MathUtils.lerp(cameraMain.position.x, targetCamX, dt * 3);
          cameraMain.position.z = THREE.MathUtils.lerp(cameraMain.position.z, targetCamZ, dt * 3);
          cameraMain.position.y = 56;
          cameraMain.lookAt(player1.pos.x * 0.2, 0, player1.pos.y * 0.2);
        } else {
          const midX = (player1.pos.x + player2.pos.x) * 0.5;
          const midZ = (player1.pos.y + player2.pos.y) * 0.5;
          const dist = Math.hypot(player1.pos.x - player2.pos.x, player1.pos.y - player2.pos.y);
          const camHeight = Math.max(50, 42 + dist * 0.55);

          cameraMain.position.x = THREE.MathUtils.lerp(cameraMain.position.x, midX * 0.3, dt * 3);
          cameraMain.position.z = THREE.MathUtils.lerp(cameraMain.position.z, midZ * 0.3 + camHeight * 0.7, dt * 3);
          cameraMain.position.y = THREE.MathUtils.lerp(cameraMain.position.y, camHeight, dt * 3);
          cameraMain.lookAt(midX * 0.3, 0, midZ * 0.3);
        }

        renderer.render(scene, cameraMain);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  // Standalone HTML Download & Copy actions
  const handleDownloadStandalone = async () => {
    try {
      const res = await fetch('/bumper-tanks.html');
      const htmlText = await res.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bumper-tanks-3d.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open('/bumper-tanks.html', '_blank');
    }
  };

  const handleCopyStandalone = async () => {
    try {
      const res = await fetch('/bumper-tanks.html');
      const htmlText = await res.text();
      await navigator.clipboard.writeText(htmlText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050813] font-sans select-none text-white">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full touch-none" />

      {/* Split Screen Center Divider */}
      {activeMode === '2p_split' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#00f0ff] to-[#ff2a5f] shadow-[0_0_12px_#00f0ff] pointer-events-none z-10" />
      )}

      {/* Top HUD Header */}
      <header className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#050813]/90 to-transparent pointer-events-none z-20">
        {/* P1 Card */}
        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/10 border-l-4 border-l-[#00f0ff] px-3.5 py-1.5 rounded-xl backdrop-blur-md pointer-events-auto">
          <div>
            <div className="text-xs font-black tracking-wider text-[#00f0ff] uppercase">P1 BLUE</div>
            <div className="relative w-28 sm:w-36 h-2.5 bg-black/60 rounded-md overflow-hidden border border-white/15">
              <div
                className="h-full bg-[#00f0ff] transition-all duration-150"
                style={{ width: `${Math.max(0, p1Hp)}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-[#00f0ff]/80 shadow-[0_0_8px_#00f0ff] transition-all duration-150"
                style={{ width: `${Math.max(0, p1Shield * 2)}%` }}
              />
            </div>
          </div>
          <div className="text-lg font-black text-amber-400 min-w-5 text-center">{score1}</div>
        </div>

        {/* Center Round Badge */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">ROUND {roundNum}</div>
          <div className="flex items-center gap-2 text-xl font-black bg-black/70 border border-white/10 px-4 py-0.5 rounded-lg">
            <span className="text-[#00f0ff]">{score1}</span>
            <span className="text-slate-500">:</span>
            <span className="text-[#ff2a5f]">{score2}</span>
          </div>
        </div>

        {/* P2 / CPU Card */}
        <div className="flex items-center gap-3 bg-slate-900/80 border border-white/10 border-r-4 border-r-[#ff2a5f] px-3.5 py-1.5 rounded-xl backdrop-blur-md pointer-events-auto">
          <div className="text-lg font-black text-amber-400 min-w-5 text-center">{score2}</div>
          <div className="text-right">
            <div className="text-xs font-black tracking-wider text-[#ff2a5f] uppercase">
              {activeMode.startsWith('single') ? 'P2 (CPU)' : 'P2 RED'}
            </div>
            <div className="relative w-28 sm:w-36 h-2.5 bg-black/60 rounded-md overflow-hidden border border-white/15">
              <div
                className="h-full bg-[#ff2a5f] transition-all duration-150"
                style={{ width: `${Math.max(0, p2Hp)}%` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-[#00f0ff]/80 shadow-[0_0_8px_#00f0ff] transition-all duration-150"
                style={{ width: `${Math.max(0, p2Shield * 2)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Utility Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              const unmuted = audio.toggle();
              setIsMuted(!unmuted);
            }}
            className="w-9 h-9 rounded-lg bg-slate-800/80 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00f0ff] transition"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setTouchVisible(v => !v)}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition ${
              touchVisible ? 'bg-cyan-500/20 text-[#00f0ff] border-[#00f0ff]' : 'bg-slate-800/80 text-slate-300 border-white/15 hover:text-white'
            }`}
            title="Toggle Touch Controls"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPaused(p => !p)}
            className="w-9 h-9 rounded-lg bg-slate-800/80 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00f0ff] transition"
            title="Pause / Resume"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownloadStandalone}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 border border-white/15 text-slate-200 hover:border-emerald-400 hover:text-emerald-400 transition"
            title="Save complete standalone HTML"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.HTML</span>
          </button>
          <button
            onClick={handleCopyStandalone}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 border border-white/15 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition"
            title="Copy complete standalone HTML"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </header>

      {/* Floating Arena Banner */}
      {bannerText.visible && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 border-2 border-[#00f0ff] shadow-[0_0_35px_rgba(0,240,255,0.5)] px-8 py-4 rounded-2xl text-center pointer-events-none z-40 animate-in fade-in zoom-in duration-200">
          <div className="text-3xl font-black tracking-widest text-white uppercase">{bannerText.title}</div>
          <div className="text-xs font-semibold text-slate-300 mt-1 uppercase tracking-wider">{bannerText.desc}</div>
        </div>
      )}

      {/* Power-up Toast */}
      {powerupToast.visible && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] px-5 py-2 rounded-full text-xs font-extrabold text-amber-300 uppercase tracking-widest pointer-events-none z-40 animate-bounce">
          {powerupToast.text}
        </div>
      )}

      {/* Mobile Touch Controls Overlay */}
      {touchVisible && (
        <div className="absolute inset-0 pointer-events-none z-30">
          {/* Player 1 Controls (Bottom) */}
          <div
            className="absolute bottom-6 left-6 w-32 h-32 rounded-full bg-cyan-500/10 border-2 border-dashed border-cyan-500/40 flex items-center justify-center pointer-events-auto touch-none"
            onTouchStart={e => {
              e.preventDefault();
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dx = (touch.clientX - cx) / (rect.width / 2);
              const dy = (touch.clientY - cy) / (rect.height / 2);
              gameRef.current.touchP1.x = Math.max(-1, Math.min(1, dx));
              gameRef.current.touchP1.y = Math.max(-1, Math.min(1, dy));
            }}
            onTouchMove={e => {
              e.preventDefault();
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dx = (touch.clientX - cx) / (rect.width / 2);
              const dy = (touch.clientY - cy) / (rect.height / 2);
              gameRef.current.touchP1.x = Math.max(-1, Math.min(1, dx));
              gameRef.current.touchP1.y = Math.max(-1, Math.min(1, dy));
            }}
            onTouchEnd={() => {
              gameRef.current.touchP1.x = 0;
              gameRef.current.touchP1.y = 0;
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-400 shadow-[0_0_12px_#00f0ff]" />
          </div>

          <button
            onTouchStart={e => {
              e.preventDefault();
              gameRef.current.shootP1();
            }}
            className="absolute bottom-6 right-8 w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 border-2 border-white/40 shadow-[0_0_20px_rgba(244,63,94,0.7)] text-sm font-black tracking-wider text-white flex items-center justify-center pointer-events-auto active:scale-90 transition transform"
          >
            FIRE
          </button>

          {/* Player 2 Dual-End Controls (Top Inverted for 2P Tabletop Play) */}
          {(activeMode === '2p_same' || activeMode === '2p_split') && (
            <div className="absolute top-0 inset-x-0 h-1/2 rotate-180 pointer-events-none">
              <div
                className="absolute bottom-6 left-6 w-28 h-28 rounded-full bg-rose-500/10 border-2 border-dashed border-rose-500/40 flex items-center justify-center pointer-events-auto touch-none"
                onTouchStart={e => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  const dx = (touch.clientX - cx) / (rect.width / 2);
                  const dy = (touch.clientY - cy) / (rect.height / 2);
                  gameRef.current.touchP2.x = Math.max(-1, Math.min(1, dx));
                  gameRef.current.touchP2.y = Math.max(-1, Math.min(1, dy));
                }}
                onTouchMove={e => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const rect = e.currentTarget.getBoundingClientRect();
                  const cx = rect.left + rect.width / 2;
                  const cy = rect.top + rect.height / 2;
                  const dx = (touch.clientX - cx) / (rect.width / 2);
                  const dy = (touch.clientY - cy) / (rect.height / 2);
                  gameRef.current.touchP2.x = Math.max(-1, Math.min(1, dx));
                  gameRef.current.touchP2.y = Math.max(-1, Math.min(1, dy));
                }}
                onTouchEnd={() => {
                  gameRef.current.touchP2.x = 0;
                  gameRef.current.touchP2.y = 0;
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-rose-400 shadow-[0_0_12px_#ff2a5f]" />
              </div>

              <button
                onTouchStart={e => {
                  e.preventDefault();
                  gameRef.current.shootP2();
                }}
                className="absolute bottom-6 right-8 w-18 h-18 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 border-2 border-white/40 shadow-[0_0_20px_rgba(16,185,129,0.7)] text-xs font-black tracking-wider text-slate-950 flex items-center justify-center pointer-events-auto active:scale-90 transition transform"
              >
                FIRE
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Start Menu Modal */}
      {menuOpen && (
        <div className="absolute inset-0 bg-[#030712]/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] rounded-3xl w-full max-w-lg p-6 sm:p-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-black tracking-wide bg-gradient-to-r from-[#00f0ff] via-purple-400 to-[#ff2a5f] bg-clip-text text-transparent uppercase mb-2">
              Bumper Tanks 3D
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Fast-Paced Arcade Arena Combat with Bouncing Shells & Power-Ups
            </p>

            <div className="flex flex-col gap-2.5 mb-6 text-left">
              <button
                onClick={() => gameRef.current.selectMode('single_easy')}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-bold text-sm shadow-[0_4px_16px_rgba(0,240,255,0.3)] hover:brightness-110 transition"
              >
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" /> Single Player vs AI (Easy)
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => gameRef.current.selectMode('single_normal')}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/80 border border-white/10 hover:border-cyan-400 text-white font-semibold text-sm transition"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Single Player vs AI (Normal)
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => gameRef.current.selectMode('single_hard')}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/80 border border-white/10 hover:border-rose-400 text-white font-semibold text-sm transition"
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-500" /> Single Player vs AI (Unreal)
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => gameRef.current.selectMode('2p_same')}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/80 border border-white/10 hover:border-purple-400 text-white font-semibold text-sm transition"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" /> Local 2-Player (Same-Screen)
                </span>
                <span>→</span>
              </button>

              <button
                onClick={() => gameRef.current.selectMode('2p_split')}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/80 border border-white/10 hover:border-indigo-400 text-white font-semibold text-sm transition"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Local 2-Player (Split-Screen)
                </span>
                <span>→</span>
              </button>
            </div>

            {/* Controls Guide */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-black/40 rounded-xl text-left text-xs border border-white/5">
              <div>
                <div className="text-[#00f0ff] font-bold mb-1">P1 Controls:</div>
                <div className="text-slate-300">WASD: Drive & Steer</div>
                <div className="text-slate-300">Space: Fire Cannon</div>
              </div>
              <div>
                <div className="text-[#ff2a5f] font-bold mb-1">P2 Controls:</div>
                <div className="text-slate-300">Arrows: Drive & Steer</div>
                <div className="text-slate-300">Enter: Fire Cannon</div>
              </div>
            </div>

            {/* Standalone HTML Info */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span>Ready for offline play in any browser</span>
              <button
                onClick={handleDownloadStandalone}
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3 h-3" /> Download .html
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Modal */}
      {victoryOpen && (
        <div className="absolute inset-0 bg-[#030712]/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.2)] rounded-3xl w-full max-w-md p-6 text-center">
            <h2 className="text-3xl font-black text-amber-400 uppercase mb-1">
              MATCH VICTORY!
            </h2>
            <p className="text-sm font-bold text-white mb-6">
              {victoryWinner} WINS THE TOURNAMENT!
            </p>

            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-xs font-bold text-[#00f0ff]">PLAYER 1</div>
                <div className="text-4xl font-black text-[#00f0ff]">{score1}</div>
              </div>
              <div className="text-2xl font-black text-slate-500">-</div>
              <div className="text-center">
                <div className="text-xs font-bold text-[#ff2a5f]">
                  {activeMode.startsWith('single') ? 'AI CPU' : 'PLAYER 2'}
                </div>
                <div className="text-4xl font-black text-[#ff2a5f]">{score2}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => gameRef.current.resetGame()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-400 text-slate-950 font-bold text-sm shadow-[0_4px_16px_rgba(0,240,255,0.4)] hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
              <button
                onClick={() => {
                  setVictoryOpen(false);
                  setMenuOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-700 transition"
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
