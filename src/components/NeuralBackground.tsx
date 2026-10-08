import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number }

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let nodes: Node[] = []
    let width = 0
    let height = 0

    const density = () => Math.min(70, Math.max(26, Math.round((width * height) / 24000)))

    const seed = () => {
      nodes = Array.from({ length: density() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const linkDistance = 150

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > linkDistance) continue
          const alpha = (1 - dist / linkDistance) * 0.28
          ctx.strokeStyle = `rgba(180, 83, 9, ${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = 'rgba(120, 113, 108, 0.55)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }
      draw()
      raf = window.requestAnimationFrame(step)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    if (!reduceMotion) raf = window.requestAnimationFrame(step)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 size-full opacity-75" />
      <div className="grid-surface absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245, 158, 11, 0.16),transparent_55%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void to-transparent" />
    </div>
  )
}
