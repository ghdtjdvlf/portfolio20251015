"use client"

import { useRef, useState, useEffect } from "react"
import Matter from "matter-js"
import "./falling-text.css"

interface FallingTextProps {
  className?: string
  text?: string
  highlightWords?: string[]
  highlightClass?: string
  trigger?: "auto" | "scroll" | "click" | "hover"
  backgroundColor?: string
  wireframes?: boolean
  gravity?: number
  mouseConstraintStiffness?: number
  fontSize?: string
}

const FallingText = ({
  className = "",
  text = "",
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
}: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  const [effectStarted, setEffectStarted] = useState(false)

  useEffect(() => {
    if (!textRef.current) return
    const words = text.split(" ").sort(() => Math.random() - 0.5)
    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw))
        return `<span class="word ${isHighlighted ? highlightClass : ""}">${word}</span>`
      })
      .join(" ")
    textRef.current.innerHTML = newHTML
  }, [text, highlightWords, highlightClass])

  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true)
      return
    }
    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [trigger])

  useEffect(() => {
    if (!effectStarted) return

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter

    const containerRect = containerRef.current!.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width <= 0 || height <= 0) return

    const engine = Engine.create()
    engine.world.gravity.y = gravity

    const render = Render.create({
      element: canvasContainerRef.current!,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    })

    const boundaryOptions: Matter.IBodyDefinition = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    }
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions)
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions)
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions)
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions)

    const wordSpans = textRef.current!.querySelectorAll<HTMLElement>(".word")
    const wordBodies = [...wordSpans].map((elem) => {
      const rect = elem.getBoundingClientRect()
      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        restitution: 0.8,
        frictionAir: 0.01,
        friction: 0.2,
      })

      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05)
      return { elem, body }
    })

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute"
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`
      elem.style.transform = "none"
    })

    const mouse = Mouse.create(containerRef.current!)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    })
    ;(render as any).mouse = mouse

    // Matter.js 휠 리스너 제거 (0.20.x 는 "wheel", 구버전은 "mousewheel" 사용)
    const wheelHandler = (mouse as any).mousewheel
    mouse.element.removeEventListener("wheel", wheelHandler)
    mouse.element.removeEventListener("mousewheel", wheelHandler)
    mouse.element.removeEventListener("DOMMouseScroll", wheelHandler)
    // passive:true 로 재등록 → preventDefault 없이 wheelDelta만 갱신
    const passiveWheelHandler = (event: WheelEvent) => {
      ;(mouse as any).wheelDelta = Math.max(-1, Math.min(1, event.deltaY || -(event as any).detail))
      ;(mouse as any).sourceEvents.mousewheel = event
    }
    mouse.element.addEventListener("wheel", passiveWheelHandler, { passive: true })

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ])

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    let animFrame: number
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position
        elem.style.left = `${x}px`
        elem.style.top = `${y}px`
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })
      Matter.Engine.update(engine)
      animFrame = requestAnimationFrame(updateLoop)
    }
    updateLoop()

    return () => {
      cancelAnimationFrame(animFrame)
      mouse.element.removeEventListener("wheel", passiveWheelHandler)
      Render.stop(render)
      Runner.stop(runner)
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas)
      }
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [effectStarted, gravity, wireframes, backgroundColor, mouseConstraintStiffness])

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`falling-text-container ${className}`}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      style={{ position: "relative", overflow: "hidden", pointerEvents: "auto" }}
    >
      <div
        ref={textRef}
        className="falling-text-target"
        style={{ fontSize, lineHeight: 1.4 }}
      />
      <div ref={canvasContainerRef} className="falling-text-canvas" />
    </div>
  )
}

export default FallingText
