// src/components/particles/ParticleBackground.jsx
//
// Responsive canvas particle system — breakpoint-aware config.
//
//  Breakpoint      Width         Particles   Connect dist   Speed   Dot radius
//  ─────────────   ───────────   ─────────   ────────────   ─────   ──────────
//  Mobile          < 768px       12          80px           0.25    1.6
//  Tablet          768–1023px    28          105px          0.32    1.9
//  Desktop         ≥ 1024px      60          130px          0.40    2.2
//
// Features:
//  • Re-reads breakpoint on every window resize → particles instantly adjust
//  • Mouse repulsion disabled on mobile (touch devices don't hover)
//  • Dark mode  → gold dots  |  Light mode → dark navy dots
//  • requestAnimationFrame loop with proper cleanup on unmount / theme change
//  • Uses useReducedMotion preference to pause animation if user requests it

import { useEffect, useRef } from 'react'

// ── Responsive config table ───────────────────────────────────────────────────
// Returns the right config object based on current window.innerWidth.
function getConfig(width) {
  if (width < 768) {
    // Mobile — minimal, clean, fast
    return {
      count:       12,
      connectDist: 80,
      speed:       0.25,
      dotRadius:   1.6,
      mouseRadius: 0,      // no mouse repulsion on touch screens
      lineWidth:   0.6,
      dotOpacity:  0.55,
      lineOpacity: 0.35,
    }
  }
  if (width < 1024) {
    // Tablet — moderate
    return {
      count:       28,
      connectDist: 105,
      speed:       0.32,
      dotRadius:   1.9,
      mouseRadius: 80,
      lineWidth:   0.7,
      dotOpacity:  0.65,
      lineOpacity: 0.42,
    }
  }
  // Desktop — full density
  return {
    count:       60,
    connectDist: 130,
    speed:       0.40,
    dotRadius:   2.2,
    mouseRadius: 100,
    lineWidth:   0.8,
    dotOpacity:  0.70,
    lineOpacity: 0.50,
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null)
  // All mutable animation state lives here so closures always see latest values
  const stateRef = useRef({
    particles: [],
    mouse:     { x: -9999, y: -9999 },
    animId:    null,
    cfg:       getConfig(window.innerWidth),
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Respect prefers-reduced-motion accessibility setting
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Canvas sizing ─────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    // ── Particle factory ──────────────────────────────────────────────────────
    const rand = (min, max) => Math.random() * (max - min) + min

    const makeParticle = () => {
      const { speed } = stateRef.current.cfg
      // Random angle gives more uniform spread than separate vx/vy
      const angle = rand(0, Math.PI * 2)
      const spd   = rand(speed * 0.4, speed)
      return {
        x:  rand(0, canvas.width),
        y:  rand(0, canvas.height),
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
      }
    }

    // ── Init particles ────────────────────────────────────────────────────────
    const initParticles = () => {
      const { count } = stateRef.current.cfg
      stateRef.current.particles = Array.from({ length: count }, makeParticle)
    }

    resize()
    initParticles()

    // ── Draw loop ─────────────────────────────────────────────────────────────
    const draw = () => {
      const { particles, mouse, cfg } = stateRef.current
      const {
        connectDist, speed, dotRadius,
        mouseRadius, lineWidth, dotOpacity, lineOpacity,
      } = cfg

      // Theme-aware colors
      const dotBase  = isDark ? `rgba(245,158,11,`  : `rgba(15,23,42,`
      const lineBase = isDark ? `rgba(251,191,36,`  : `rgba(30,41,59,`

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // ── Move ──────────────────────────────────────────────────────────────
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0)              { p.x = 0;              p.vx *= -1 }
        if (p.x > canvas.width)   { p.x = canvas.width;   p.vx *= -1 }
        if (p.y < 0)              { p.y = 0;              p.vy *= -1 }
        if (p.y > canvas.height)  { p.y = canvas.height;  p.vy *= -1 }

        // ── Mouse repulsion ───────────────────────────────────────────────────
        if (mouseRadius > 0) {
          const dx   = mouse.x - p.x
          const dy   = mouse.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius
            p.vx -= (dx / dist) * force * 0.55
            p.vy -= (dy / dist) * force * 0.55
            // Clamp to max speed × 3
            const curSpd = Math.hypot(p.vx, p.vy)
            const maxSpd = speed * 3
            if (curSpd > maxSpd) {
              p.vx = (p.vx / curSpd) * maxSpd
              p.vy = (p.vy / curSpd) * maxSpd
            }
          }
        }

        // ── Draw dot ──────────────────────────────────────────────────────────
        ctx.beginPath()
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        ctx.fillStyle = dotBase + dotOpacity + ')'
        ctx.fill()

        // ── Draw connecting lines to subsequent particles ──────────────────────
        for (let j = i + 1; j < particles.length; j++) {
          const q    = particles[j]
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < connectDist) {
            // Alpha fades to 0 at max distance
            const alpha = (1 - dist / connectDist) * lineOpacity
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = lineBase + alpha + ')'
            ctx.lineWidth   = lineWidth
            ctx.stroke()
          }
        }
      }

      stateRef.current.animId = requestAnimationFrame(draw)
    }

    // Only start loop if user hasn't requested reduced motion
    if (!prefersReduced) {
      stateRef.current.animId = requestAnimationFrame(draw)
    }

    // ── Resize handler ────────────────────────────────────────────────────────
    // Uses a 150ms debounce so rapid resizes (e.g. mobile address-bar hide)
    // don't thrash particle recreation.
    let resizeTimer = null
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // 1. Read new breakpoint config
        stateRef.current.cfg = getConfig(window.innerWidth)
        // 2. Resize canvas
        resize()
        // 3. Recreate particles for new count (inherits new cfg via stateRef)
        initParticles()
      }, 150)
    }

    // ── Mouse / touch handlers ────────────────────────────────────────────────
    const onMouseMove = (e) => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      stateRef.current.mouse = { x: -9999, y: -9999 }
    }
    // Touch: map first touch point to mouse position for repulsion on tablets
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        stateRef.current.mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }
    const onTouchEnd = () => {
      stateRef.current.mouse = { x: -9999, y: -9999 }
    }

    window.addEventListener('resize',     onResize,     { passive: true })
    window.addEventListener('mousemove',  onMouseMove,  { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('touchmove',  onTouchMove,  { passive: true })
    window.addEventListener('touchend',   onTouchEnd)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(stateRef.current.animId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize',     onResize)
      window.removeEventListener('mousemove',  onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }

  // Re-run the entire effect when dark/light mode changes (colors differ)
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
