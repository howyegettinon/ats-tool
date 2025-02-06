'use client'
import { useEffect, useRef } from 'react'

export const Sparkles = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.015
      }

      draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.size})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Animation setup
    let particles = []
    const createParticles = (x, y) => {
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(x, y))
      }
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.update()
        particle.draw()
        if (particle.size <= 0.2) particles.splice(index, 1)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // Mouse interaction
    const mouseMoveHandler = (e) => {
      createParticles(e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', mouseMoveHandler)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', mouseMoveHandler)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
    />
  )
}
