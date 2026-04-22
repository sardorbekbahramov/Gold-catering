// src/components/particles/ParticleBackground.jsx
//
//  Breakpoint      Width         Particles   Connect dist   Speed
//  Mobile          < 768px       8           70px           0.20
//  Tablet          768–1023px    25          100px          0.30
//  Desktop         >= 1024px     60          130px          0.40

import { useEffect, useRef } from 'react'

// ── Config per breakpoint ─────────────────────────────────────────────────────
function getConfig() {
  // Read FRESH width every time this is called
  const w = window.innerWidth
  if (w < 768) {
    return { count: 12,  connectDist: 70,  speed: 0.20, dotRadius: 1.5, mouseRadius: 0,   lineWidth: 0.5, dotOpacity: 0.50, lineOpacity: 0.30 }
  }
  if (w < 1024) {
    return { count: 35, connectDist: 100, speed: 0.30, dotRadius: 1.8, mouseRadius: 70,  lineWidth: 0.6, dotOpacity: 0.60, lineOpacity: 0.38 }
  }
  return   { count: 78, connectDist: 130, speed: 0.40, dotRadius: 2.2, mouseRadius: 100, lineWidth: 0.8, dotOpacity: 0.70, lineOpacity: 0.50 }
}

export default function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ particles: [], mouse: { x: -9999, y: -9999 }, animId: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Skip animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rand = (a, b) => Math.random() * (b - a) + a

    // ── Build particles using CURRENT config ──────────────────────────────────
    const init = () => {
      // Always read fresh config + fresh screen size
      const cfg = getConfig()
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      stateRef.current.cfg = cfg
      stateRef.current.particles = Array.from({ length: cfg.count }, () => {
        const angle = rand(0, Math.PI * 2)
        const spd   = rand(cfg.speed * 0.4, cfg.speed)
        return {
          x:  rand(0, canvas.width),
          y:  rand(0, canvas.height),
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
        }
      })
    }

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const { particles, mouse, cfg } = stateRef.current
      if (!cfg) return

      const dotBase  = isDark ? 'rgba(245,158,11,' : 'rgba(15,23,42,'
      const lineBase = isDark ? 'rgba(251,191,36,' : 'rgba(30,41,59,'

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move
        p.x += p.vx
        p.y += p.vy

        // Bounce
        if (p.x < 0)             { p.x = 0;             p.vx *= -1 }
        if (p.x > canvas.width)  { p.x = canvas.width;  p.vx *= -1 }
        if (p.y < 0)             { p.y = 0;             p.vy *= -1 }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1 }

        // Mouse repulsion
        if (cfg.mouseRadius > 0) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d  = Math.hypot(dx, dy)
          if (d > 0 && d < cfg.mouseRadius) {
            const f = (cfg.mouseRadius - d) / cfg.mouseRadius
            p.vx -= (dx / d) * f * 0.55
            p.vy -= (dy / d) * f * 0.55
            const s = Math.hypot(p.vx, p.vy)
            if (s > cfg.speed * 3) { p.vx = p.vx / s * cfg.speed * 3; p.vy = p.vy / s * cfg.speed * 3 }
          }
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, cfg.dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = dotBase + cfg.dotOpacity + ')'
        ctx.fill()

        // Draw lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < cfg.connectDist) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = lineBase + ((1 - d / cfg.connectDist) * cfg.lineOpacity) + ')'
            ctx.lineWidth   = cfg.lineWidth
            ctx.stroke()
          }
        }
      }

      stateRef.current.animId = requestAnimationFrame(draw)
    }

    // Start
    init()
    stateRef.current.animId = requestAnimationFrame(draw)

    // ── Resize: debounced 200ms ───────────────────────────────────────────────
    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(stateRef.current.animId)
        init()
        stateRef.current.animId = requestAnimationFrame(draw)
      }, 200)
    }

    const onMouseMove  = (e) => { stateRef.current.mouse = { x: e.clientX, y: e.clientY } }
    const onMouseLeave = ()    => { stateRef.current.mouse = { x: -9999, y: -9999 } }
    const onTouchMove  = (e)   => { if (e.touches[0]) stateRef.current.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
    const onTouchEnd   = ()    => { stateRef.current.mouse = { x: -9999, y: -9999 } }

    window.addEventListener('resize',     onResize,     { passive: true })
    window.addEventListener('mousemove',  onMouseMove,  { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })
    window.addEventListener('touchend',   onTouchEnd)

    return () => {
      cancelAnimationFrame(stateRef.current.animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize',     onResize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
