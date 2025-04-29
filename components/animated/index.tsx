import { useRef, useEffect, useState } from "react"
import { useSpring, animated, SpringConfig } from "@react-spring/web"

interface AnimatedContentProps {
  children: React.ReactNode
  distance?: number
  direction?: "vertical" | "horizontal"
  reverse?: boolean
  config?: SpringConfig
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number | number[]
  delay?: number
  className?: string
  style?: React.CSSProperties
}

const AnimatedContent = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  config = { tension: 50, friction: 25 },
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className,
  style,
}: AnimatedContentProps) => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setTimeout(() => {
          if (entry.isIntersecting !== inView) {
            setInView(entry.isIntersecting)
          }
        }, delay)
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, delay, inView])

  const axis = direction === "vertical" ? "Y" : "X"
  const transformValue = inView
    ? `translate${axis}(0px) scale(1)`
    : `translate${axis}(${reverse ? -distance : distance}px) scale(${scale})`

  const springProps = useSpring({
    transform: transformValue,
    opacity: animateOpacity ? (inView ? 1 : initialOpacity) : 1,
    config,
  })

  return (
    <animated.div
      ref={ref}
      style={{ ...springProps, ...style }}
      className={className}
    >
      {children}
    </animated.div>
  )
}

export default AnimatedContent