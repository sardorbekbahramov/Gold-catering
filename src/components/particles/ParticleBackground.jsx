// src/components/particles/ParticleBackground.jsx
// Lightweight canvas particle system.
//   Dark mode  → gold dots (#f59e0b) with connecting lines
//   Light mode → dark navy dots (#1a1a2e) with connecting lines
// Uses requestAnimationFrame and auto-resizes on window resize.
// Mouse proximity pushes dots away for subtle interactivity.

import { useEffect, useRef } from 'react'

const PARTICLE_COUNT   = 60    // fewer = better performance on mobile
const CONNECT_DISTANCE = 130   // px – max distance for drawing a line
const SPEED            = 0.4   // base movement speed
const DOT_RADIUS       = 2.2

export default function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ particles: [], mouse: { x: -999, y: -999 }, animId: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // ── Helpers ─────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const rand = (min, max) => Math.random() * (max - min) + min

    const createParticle = () => ({
      x:  rand(0, canvas.width),
      y:  rand(0, canvas.height),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
    })

    // ── Init ─────────────────────────────────────────────────────────────────
    resize()
    stateRef.current.particles = Array.from({ length: PARTICLE_COUNT }, createParticle)

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const { particles, mouse } = stateRef.current
      const dotColor  = isDark ? 'rgba(245,158,11,'  : 'rgba(15,23,42,'    // gold vs navy
      const lineColor = isDark ? 'rgba(251,191,36,'  : 'rgba(30,41,59,'

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = dotColor + '0.7)'
        ctx.fill()

        // Draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q    = particles[j]
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < CONNECT_DISTANCE) {
            const alpha = (1 - dist / CONNECT_DISTANCE) * 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = lineColor + alpha + ')'
            ctx.lineWidth   = 0.8
            ctx.stroke()
          }
        }

        // Mouse repulsion (gentle)
        const mx   = mouse.x - p.x
        const my   = mouse.y - p.y
        const mdst = Math.hypot(mx, my)
        if (mdst < 100) {
          const force = (100 - mdst) / 100
          p.vx -= (mx / mdst) * force * 0.5
          p.vy -= (my / mdst) * force * 0.5
          // Clamp speed
          const speed = Math.hypot(p.vx, p.vy)
          if (speed > SPEED * 3) { p.vx = (p.vx / speed) * SPEED * 3; p.vy = (p.vy / speed) * SPEED * 3 }
        }
      })

      stateRef.current.animId = requestAnimationFrame(draw)
    }

    stateRef.current.animId = requestAnimationFrame(draw)

    // ── Event listeners ───────────────────────────────────────────────────────
    const onResize = () => { resize(); stateRef.current.particles = Array.from({ length: PARTICLE_COUNT }, createParticle) }
    const onMouse  = (e) => { stateRef.current.mouse = { x: e.clientX, y: e.clientY } }
    const onLeave  = ()  => { stateRef.current.mouse = { x: -999, y: -999 } }

    window.addEventListener('resize',      onResize)
    window.addEventListener('mousemove',   onMouse)
    window.addEventListener('mouseleave',  onLeave)

    return () => {
      cancelAnimationFrame(stateRef.current.animId)
      window.removeEventListener('resize',     onResize)
      window.removeEventListener('mousemove',  onMouse)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [isDark]) // re-init when theme changes to switch colors

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
