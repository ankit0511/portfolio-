"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    logo: "/codeforge-logo.svg",
    title: "Code Forge",
    description:
      "A full-stack developer networking platform enabling 100+ software developers to publish their projects, showcase their skills, and build professional connections, fostering collaboration and knowledge sharing.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1200&fit=crop&crop=top",
    tags: ["Next.js", "Node.js", "MongoDB", "Docker", "Cloudinary", "OAuth"],
    demoUrl: "https://github.com/ankit0511",
    githubUrl: "",
    features: [
      "Architected cross-platform connection requests and group formation mechanisms",
      "Amplified user engagement by 50% and augmented networking scalability",
      "Containerized with Docker, reducing provisioning latency by 30%",
      "Enables project publishing and skill showcasing for developers",
      "Built-in professional networking and collaboration tools",
    ],
  },
  {
    logo: "/pairpro-logo.svg",
    title: "Pair Pro (Interview IDE)",
    description:
      "A real-time collaborative IDE that eliminates inefficiencies in coding interviews, automates evaluation, and supports 10+ programming languages with real-time collaboration features.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=1200&fit=crop&crop=center",
    tags: ["Node.js", "Express.js", "React.js", "Socket.IO", "Firebase", "CSS"],
    demoUrl: "https://github.com/ankit0511",
    githubUrl: "",
    features: [
      "Boosted interview efficiency by 60% with real-time code collaboration",
      "Supports 10+ programming languages with syntax highlighting",
      "Auto-completion and error detection features",
      "Real-time communication between interviewers and candidates",
      "Automated evaluation and code assessment tools",
    ],
  },
  {
    logo: "/streamtube-logo.svg",
    title: "Stream Tube",
    description:
      "A live streaming application that allows users to stream audio and video from their browser to live platforms like YouTube Live using WebSockets and FFmpeg, fully Dockerized for seamless deployment.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1200&fit=crop&crop=center",
    tags: ["Node.js", "Express.js", "React", "Docker", "FFmpeg", "RTMP Protocol"],
    demoUrl: "https://github.com/ankit0511",
    githubUrl: "",
    features: [
      "Browser-based audio and video streaming to live platforms",
      "WebSocket integration for real-time communication",
      "FFmpeg processing for high-quality video encoding",
      "RTMP protocol implementation for streaming",
      "Fully containerized with Docker for easy deployment",
    ],
  },
  {
    logo: "/dronesim-logo.svg",
    title: "Drone Simulation",
    description:
      "An application that takes latitude and longitude coordinates of drones and displays their real-time location on Google Maps with 100% accuracy, perfect for drone tracking and monitoring.",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=1200&fit=crop&crop=center",
    tags: ["React", "Node.js", "WebSockets", "Azure Maps", "Real-time Tracking"],
    demoUrl: "https://github.com/ankit0511",
    githubUrl: "",
    features: [
      "Real-time drone location tracking with 100% accuracy",
      "Integration with Azure Maps for precise mapping",
      "WebSocket communication for live location updates",
      "Responsive map interface for drone monitoring",
      "Support for multiple drone tracking simultaneously",
    ],
  },
  {
    logo: "/naukri-auto-logo.svg",
    title: "Naukri Automation",
    description:
      "Automates the process of logging into Naukri.com, searching for jobs based on specific criteria, and applying to available positions with intelligent error handling and conditional application logic.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=1200&fit=crop&crop=center",
    tags: ["Node.js", "Express.js", "Puppeteer", "EJS", "Web Automation"],
    demoUrl: "https://github.com/ankit0511",
    githubUrl: "",
    features: [
      "Automated login with credential management",
      "Smart job search based on keywords and location",
      "Conditional job application using Apply or Company Site buttons",
      "Robust error handling for missing elements or failed page loads",
      "Automated navigation through multiple job listings",
    ],
  },
  {
    logo: "/whispersend-logo.svg",
    title: "WhisperSend",
    description:
      "A unique anonymous messaging app that allows users to send and receive random messages with an AI-powered custom message generator for crafting thoughtful, fun, or inspiring communications.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=1200&fit=crop&crop=center",
    tags: ["TypeScript", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "OpenAI API"],
    demoUrl: "https://github.com/ankit0511",
    githubUrl: "",
    features: [
      "Send anonymous messages to random opted-in users",
      "AI-generated personalized and meaningful messages",
      "User-controlled opt-in messaging system",
      "Anonymous and surprise-based communication",
      "NextAuth & OAuth integration for identity management",
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-10">Projects</h2>

        <div className="grid gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-6 border rounded-xl overflow-hidden group"
            >
              <div className="overflow-hidden relative h-[300px] md:h-full border-b md:border-b-0 md:border-r">
                <div className="absolute inset-0 overflow-y-auto scrollbar-hide">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={1200}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm">
                    <Link
                      href={project.demoUrl}
                      className="flex items-center"
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </Link>
                  </Button>
                  {
                    project.githubUrl && (
                      <Button size="sm" variant="outline">
                        <Link
                          href={project.githubUrl}
                          className="flex items-center"
                          target="_blank"
                        >
                          <Github className="mr-2 h-4 w-4" /> Code
                        </Link>
                      </Button>
                    )
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}