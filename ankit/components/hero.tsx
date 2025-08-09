"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Download, Mail, MapPin } from "lucide-react"
import { FaNode, FaJs, FaDatabase } from "react-icons/fa"
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill, RiTwitterXLine } from "react-icons/ri"
import { SiMongodb, SiPostgresql, SiMui } from "react-icons/si"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const RotatingText = () => {
  const texts = [
    "Problem Solving",
    "Databases", 
    "Node.js",
    "JavaScript",
    "React.js",
    "Next.js"
  ]
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    if (isTyping) {
      // Typing effect
      if (displayedText.length < texts[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayedText(texts[currentIndex].slice(0, displayedText.length + 1))
        }, 100) // Typing speed
      } else {
        // Wait before erasing
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1000)
      }
    } else {
      // Erasing effect
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 50) // Erasing speed
      } else {
        // Move to next text
        setCurrentIndex((prev) => (prev + 1) % texts.length)
        setIsTyping(true)
      }
    }
    
    return () => clearTimeout(timeout)
  }, [displayedText, isTyping, currentIndex, texts])
  
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="flex items-center gap-2">
        
        <motion.div
          className="relative"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(0, 0, 0, 0.1)",
              "0 0 0 4px rgba(0, 0, 0, 0)",
              "0 0 0 0 rgba(0, 0, 0, 0)"
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-foreground/5 border border-foreground/20 rounded-full px-3 py-1.5 backdrop-blur-sm min-w-[120px]">
            <span className="text-sm font-semibold text-foreground inline-flex items-center">
              {"Skilled In "+ displayedText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-0.5 text-foreground"
              >
                |
              </motion.span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const FlipCard = ({ frontIcon, backIcon, frontColor, backColor, delay = 0, marginClass, hasFloating = false, floatingDirection = "up" }:any) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [flipDelay, setFlipDelay] = useState(3 + Math.random() * 7) // Random delay between 3-10 seconds

  useEffect(() => {
    const flipInterval = setInterval(() => {
      setIsFlipped(prev => !prev)
      setFlipDelay(3 + Math.random() * 7) 
    }, flipDelay * 1000)

    return () => clearInterval(flipInterval)
  }, [flipDelay])

  const floatingAnimation = hasFloating 
    ? (floatingDirection === "down" ? [0, 10, 0] : [0, -10, 0])
    : 0

  return (
    <motion.div
      className={`bg-muted rounded-lg p-2 sm:p-4 flex items-center justify-center h-full w-full ${marginClass}`}
      animate={{ 
        rotateY: isFlipped ? 180 : 0,
        y: floatingAnimation
      }}
      transition={{ 
        rotateY: { duration: 0.6, ease: "easeInOut" },
        y: hasFloating ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}
      }}
      style={{ perspective: 1000 }}
    >
      {!isFlipped ? (
        <motion.div
          className="text-4xl flex items-center justify-center"
          style={{ color: frontColor }}
          key="front"
        >
          {frontIcon}
        </motion.div>
      ) : (
        <motion.div
          className="text-4xl flex items-center justify-center"
          style={{ color: backColor, transform: 'rotateY(180deg)' }}
          key="back"
        >
          {backIcon}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  
  // Dynamic color for Next.js icon based on theme
  const nextjsColor = theme === 'dark' ? '#ffffff' : '#000000'

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="py-6 md:py-10 relative overflow-hidden">
      {/* Cursor Light Pointer */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 30%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />
      
      {/* Left Light Beam */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-0 w-96 h-0.5 transform -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.1)',
          }}
          animate={{
            scaleX: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Right Light Beam */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-0.5 transform -translate-y-1/2"
          style={{
            background: 'linear-gradient(270deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.1)',
          }}
          animate={{
            scaleX: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.02) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.02) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-10 items-center max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 md:col-span-2"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Ankit Patle </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">Software Engineer</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <a href="mailto:haquedot@gmail.com">jobs.ankit05@gmail.com</a>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Pune, India</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base">
           Passionate software developer with strong problem-solving skills, specializing in building high-performance web applications using modern technologies like React, Next.js, and Node.js. Committed to creating intuitive, scalable, and user-focused digital experiences
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href="https://drive.google.com/file/d/1qyPyHffNKb81hxg6R1v26KsXAmQZMBtA/view?usp=sharing"
              target="_blank"
              download
            >
              <Button size="sm" className="text-xs sm:text-sm">
                <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Resume
              </Button>
            </Link>
            <Link
              href="https://github.com/ankit0511"
              target="_blank"
            >
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link
              href="mailto:haquedot@gmail.com"
              target="_blank"
            >
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link
              href="https://x.com/ankit05"
              target="_blank"
            >
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <RiTwitterXLine className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/ankit-patle01/"
              target="_blank"
            >
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center h-48 md:h-auto"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1.02, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating Text Component */}
            <div className="absolute -top-8 left-0 right-0">
              <RotatingText />
            </div>

            {/* Grid with floating tech stacks */}
            <div className="absolute inset-0 grid grid-cols-2 gap-2 sm:gap-4 p-2 sm:p-4">
              {/* Top Left - React/JS */}
              <FlipCard 
                frontIcon={<RiReactjsFill />} 
                backIcon={<FaJs />} 
                frontColor="#087ea4" 
                backColor="#f0db4f"
                marginClass="mt-3 ml-2 mr-1 mb-2"
              />

              {/* Top Right - Next.js/Node.js */}
              <FlipCard 
                frontIcon={<RiNextjsFill />} 
                backIcon={<FaNode />} 
                frontColor={nextjsColor} 
                backColor="#68a063"
                delay={1}
                marginClass="mt-1 ml-3 mr-2 mb-4"
                hasFloating={true}
              />

              {/* Bottom Left - MongoDB/PostgreSQL */}
              <FlipCard 
                frontIcon={<SiMongodb />} 
                backIcon={<SiPostgresql />} 
                frontColor="#47A248" 
                backColor="#336791"
                delay={2}
                marginClass="mt-4 ml-1 mr-3 mb-1"
                hasFloating={true}
                floatingDirection="down"
              />

              {/* Bottom Right - Tailwind/MUI */}
              <FlipCard 
                frontIcon={<RiTailwindCssFill />} 
                backIcon={<SiMui />} 
                frontColor="#38BDF8" 
                backColor="#007FFF"
                delay={3}
                marginClass="mt-4 ml-2 mr-1 mb-3"
              />
            </div>   
          </div>
        </motion.div>
      </div>
    </section>
  )
}