import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Window-wide pointer so the scene reacts even when the cursor is over the hero copy.
const pointer = { x: 0, y: 0 }

const damp = THREE.MathUtils.damp

const SHAPES = [
  { type: 'torus', pos: [-2.7, 1.5, -0.6], color: '#ff8a94', scale: 0.36, speed: 0.9 },
  { type: 'octa', pos: [2.6, 1.7, -1.2], color: '#2f6bff', scale: 0.44, speed: 0.7 },
  { type: 'box', pos: [2.35, -1.55, 0.2], color: '#8b7cf6', scale: 0.4, speed: 1.1 },
  { type: 'tetra', pos: [-2.35, -1.7, 0.4], color: '#5b8cff', scale: 0.46, speed: 0.8 },
  { type: 'knot', pos: [0.4, 2.55, -1.8], color: '#b6a9ff', scale: 0.26, speed: 0.6 },
  { type: 'ico', pos: [-0.6, -2.5, -1.2], color: '#ffb3ba', scale: 0.3, speed: 1 },
]

const LABELS = [
  { text: 'Java', pos: [-1.95, 0.55, 1.1], accent: '#2f6bff', size: 1.15 },
  { text: 'SQL', pos: [2.05, 0.35, 0.9], accent: '#8b7cf6', size: 0.85 },
  { text: '</>', pos: [1.3, -2.15, 0.9], accent: '#ff7a85', size: 0.75 },
  { text: 'HTML', pos: [-1.25, 2.05, 0.4], accent: '#ff7a85', size: 0.8 },
  { text: 'CSS', pos: [1.55, 2.2, 0.1], accent: '#2f6bff', size: 0.75 },
  { text: 'JavaScript', pos: [-1.5, -1.35, 1.4], accent: '#8b7cf6', size: 1.05 },
  { text: '{ }', pos: [3.1, -0.45, -0.6], accent: '#8b7cf6', size: 0.6 },
]

function geometryFor(type) {
  switch (type) {
    case 'torus':
      return <torusGeometry args={[1, 0.38, 24, 64]} />
    case 'octa':
      return <octahedronGeometry args={[1, 0]} />
    case 'box':
      return <boxGeometry args={[1.2, 1.2, 1.2]} />
    case 'tetra':
      return <tetrahedronGeometry args={[1, 0]} />
    case 'knot':
      return <torusKnotGeometry args={[1, 0.3, 96, 16]} />
    default:
      return <icosahedronGeometry args={[1, 0]} />
  }
}

function Floater({ type, pos, color, scale, speed, reduced, index }) {
  const ref = useRef()
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const m = reduced ? 0.15 : 1
    ref.current.position.y = pos[1] + Math.sin(t * speed + index) * 0.18 * m
    ref.current.rotation.x += delta * 0.25 * speed * m
    ref.current.rotation.y += delta * 0.35 * speed * m
  })
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      {geometryFor(type)}
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} flatShading={type !== 'torus' && type !== 'knot'} />
    </mesh>
  )
}

function Core({ quality, reduced }) {
  const inner = useRef()
  const wire = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const detail = quality === 'low' ? 3 : 5

  useFrame((state, delta) => {
    const m = reduced ? 0.2 : 1
    const t = state.clock.elapsedTime
    inner.current.rotation.y += delta * 0.18 * m
    wire.current.rotation.y -= delta * 0.12 * m
    wire.current.rotation.x += delta * 0.06 * m
    ringA.current.rotation.z += delta * 0.22 * m
    ringB.current.rotation.z -= delta * 0.16 * m
    inner.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.015 * m)
  })

  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, detail]} />
        <meshPhysicalMaterial
          color="#d3ccff"
          roughness={0.18}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.15}
          sheen={1}
          sheenColor="#9db6ff"
        />
      </mesh>
      <mesh ref={wire} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#6f7dff" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.05, 0.01, 12, 160]} />
        <meshBasicMaterial color="#8b7cf6" transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0]}>
        <torusGeometry args={[2.45, 0.008, 12, 160]} />
        <meshBasicMaterial color="#2f6bff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.8)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(c)
}

function Particles({ count, reduced }) {
  const ref = useRef()
  const texture = useMemo(makeDotTexture, [])
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = ['#8b7cf6', '#2f6bff', '#ff7a85', '#b6a9ff'].map((c) => new THREE.Color(c))
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6
      const col = palette[i % palette.length]
      colors.set([col.r, col.g, col.b], i * 3)
    }
    return { positions, colors }
  }, [count])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * (reduced ? 0.005 : 0.03)
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={texture}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function makeLabelTexture(text, accent) {
  const dpr = 2
  const ctx0 = document.createElement('canvas').getContext('2d')
  const font = `600 ${44 * dpr}px "Space Grotesk", system-ui, sans-serif`
  ctx0.font = font
  const textW = ctx0.measureText(text).width
  const padX = 34 * dpr
  const w = Math.ceil(textW + padX * 2 + 26 * dpr)
  const h = 92 * dpr
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  const r = h / 2
  ctx.beginPath()
  ctx.roundRect(4, 4, w - 8, h - 8, r - 4)
  ctx.fillStyle = 'rgba(255,255,255,0.88)'
  ctx.fill()
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(14,21,48,0.08)'
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(padX, h / 2, 9 * dpr, 0, Math.PI * 2)
  ctx.fillStyle = accent
  ctx.fill()
  ctx.font = font
  ctx.fillStyle = '#0e1530'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, padX + 22 * dpr, h / 2 + 2)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return { tex, aspect: w / h }
}

function Label({ text, pos, accent, size, reduced, index }) {
  const ref = useRef()
  const [data, setData] = useState(null)

  useEffect(() => {
    let cancelled = false
    let made
    const build = () => {
      if (cancelled) return
      made = makeLabelTexture(text, accent)
      setData(made)
    }
    document.fonts?.ready ? document.fonts.ready.then(build) : build()
    return () => {
      cancelled = true
      made?.tex.dispose()
    }
  }, [text, accent])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = pos[1] + Math.sin(t * 0.8 + index * 1.7) * (reduced ? 0.02 : 0.12)
  })

  if (!data) return null
  const h = 0.36 * size
  return (
    <sprite ref={ref} position={pos} scale={[h * data.aspect, h, 1]}>
      <spriteMaterial map={data.tex} transparent depthWrite={false} />
    </sprite>
  )
}

function Rig({ children, reduced }) {
  const group = useRef()
  useFrame((state, delta) => {
    const k = reduced ? 0.3 : 1
    const g = group.current
    g.rotation.y = damp(g.rotation.y, pointer.x * 0.4 * k, 2.5, delta)
    g.rotation.x = damp(g.rotation.x, -pointer.y * 0.22 * k, 2.5, delta)
    const cam = state.camera
    cam.position.x = damp(cam.position.x, pointer.x * 0.6 * k, 2, delta)
    cam.position.y = damp(cam.position.y, pointer.y * 0.4 * k, 2, delta)
    cam.lookAt(0, 0, 0)
  })
  return <group ref={group}>{children}</group>
}

export default function HeroScene({ quality = 'high', reduced = false, active = true }) {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const particleCount = quality === 'low' ? 140 : quality === 'medium' ? 260 : 420
  const shapes = quality === 'low' ? SHAPES.slice(0, 4) : SHAPES
  const labels = quality === 'low' ? LABELS.slice(0, 4) : LABELS
  const scale = quality === 'low' ? 0.82 : 1

  return (
    <Canvas
      className="hero-scene"
      dpr={[1, quality === 'high' ? 1.75 : 1.25]}
      camera={{ position: [0, 0, 7.4], fov: 45 }}
      gl={{ antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <hemisphereLight args={['#ffffff', '#c9c0ff', 1.1]} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 3]} intensity={1.4} color="#ff8a94" decay={0} />
      <pointLight position={[4, 2, 2]} intensity={1} color="#5b8cff" decay={0} />
      <Rig reduced={reduced}>
        <group scale={scale}>
          <Core quality={quality} reduced={reduced} />
          {shapes.map((s, i) => (
            <Floater key={i} index={i} reduced={reduced} {...s} />
          ))}
          {labels.map((l, i) => (
            <Label key={l.text} index={i} reduced={reduced} {...l} />
          ))}
          <Particles count={particleCount} reduced={reduced} />
        </group>
      </Rig>
    </Canvas>
  )
}
