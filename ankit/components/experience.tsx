"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ExternalLink, Code, Calendar, MapPin, ChevronDown } from "lucide-react"

interface Experience {
  title: string
  company: string
  period: string
  location: string
  website: string
  status: 'current' | 'past'
  overview: string
  responsibilities: string[]
  skills: string[]
  achievements: string[]
}

interface TabCategory {
  id: string
  label: string
  filter: (exp: Experience) => boolean
}

interface ExpandedCards {
  [key: number]: boolean
}

const experiences: Experience[] = [
  {
    title: "Software Developer",
    company: "Bereej Technologies",
    period: "May 2025 – Present",
    location: "Pune",
    website: "https://cloudshot.io",
    status: "current",
    overview: "Developed a high-traffic telecom infrastructure dashboard for 100,000+ towers across Maharashtra. Focus on real-time data solutions, API optimization, and integrating AI-powered code analysis tools.",
    responsibilities: [
      "Developed and maintained a high-traffic dashboard managing real-time data for over 100,000 active telecom towers across Maharashtra, improving data visibility for government stakeholders.",
      "Optimized backend API performance, achieving a 30% reduction in response time through effective query optimization, lazy loading, and code-splitting techniques.",
      "Integrated a multi-LLM code analysis platform (GPT, Azure OpenAI, CodeLlama) into the frontend, enabling smart repo reviews and automated PRs—reduced manual effort by 60%.",
      "Authored complex SQL queries to efficiently fetch and aggregate large datasets, enhancing data retrieval speed by 25% and supporting timely decision-making."
    ],
    skills: ["React", "Node.js", "SQL", "API Optimization", "Azure OpenAI", "GPT Integration", "Dashboard Development"],
    achievements: ["30% API performance improvement", "60% manual effort reduction", "25% data retrieval speed enhancement"]
  },
  {
    title: "Full Stack Developer Intern",
    company: "Dream Dev Infotech",
    period: "Jun 2024 – Oct 2024",
    location: "Remote",
    website: "https://dreamdevinfotech.com",
    status: "past",
    overview: "Built robust backend systems with comprehensive testing coverage. Specialized in RESTful APIs, cloud-based media management, and security protocols for scalable applications.",
    responsibilities: [
      "Designed RESTful APIs in Node.js, achieving 95% code coverage for efficient communication and data exchange. Adhered to Software Development Life Cycle (SDLC) principles throughout the process.",
      "Designed a high-performance media upload system using Node.js, Multer, and Cloudinary (AWS), reducing upload latency by 30% and enabling seamless storage and retrieval of over 100 media files monthly.",
      "Implemented JWT-based authentication and integrated Zod, achieving 99% accuracy and 30% fewer security issues."
    ],
    skills: ["Node.js", "RESTful APIs", "JWT Authentication", "Cloudinary", "AWS", "Multer", "Zod", "SDLC"],
    achievements: ["95% code coverage", "30% upload latency reduction", "99% authentication accuracy"]
  },
  {
    title: "Software Engineer Intern (Backend)",
    company: "Small Fare Pvt. Ltd.",
    period: "Nov 2023 – Jan 2024", 
    location: "Remote",
    website: "https://eventsfare.com",
    status: "past",
    overview: "First backend engineering role focusing on API optimization and security systems. Implemented QR authentication and enhanced system performance through efficient backend solutions.",
    responsibilities: [
      "Revamped and optimized backend APIs, improving data flow efficiency, authentication, and request handling, leading to a 20% increase in performance and scalability.",
      "Orchestrated the design and deployment of a QR authentication system, embedding advanced security protocols to deter unauthorized access, achieving 95%+ accuracy and ensuring seamless identity verification."
    ],
    skills: ["Backend Development", "API Optimization", "QR Authentication", "Security Protocols", "Performance Optimization"],
    achievements: ["20% performance increase", "95%+ authentication accuracy"]
  }
]

const tabCategories: TabCategory[] = [
  { id: "all", label: "All Experience", filter: () => true },
  { id: "current", label: "Current Role", filter: (exp: Experience) => exp.status === "current" },
  { id: "past", label: "Previous Roles", filter: (exp: Experience) => exp.status === "past" }
]

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("current")
  const [expandedCards, setExpandedCards] = useState<ExpandedCards>({})
  
  const filteredExperiences: Experience[] = experiences.filter(
    tabCategories.find(tab => tab.id === activeTab)?.filter || (() => true)
  )

  const toggleExpanded = (index: number): void => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleTabClick = (tabId: string): void => {
    setActiveTab(tabId)
  }

  const handleVisitSite = (website: string): void => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="experience" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            Building scalable solutions and driving innovation across the stack
          </p>
        </div>

        {/* Tab Navigation - Top */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted/50 rounded-xl p-1 backdrop-blur-sm">
            {tabCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                type="button"
                aria-pressed={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {/* Experience Cards */}
          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0 mt-8">
                  <div className={`w-4 h-4 rounded-full border-4 ${
                    exp.status === 'current' 
                      ? 'bg-green-500 border-green-200 shadow-lg shadow-green-500/25' 
                      : 'bg-background border-border'
                  }`}>
                    {exp.status === 'current' && (
                      <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-20"></div>
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  className="flex-1 group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card p-6 transition-all duration-300 hover:shadow-xl">
                    {/* Content */}
                    <div className="flex items-start gap-3 mb-4">
                      <h3 className="text-xl font-bold group-hover:text-foreground transition-colors flex-1">
                        {exp.title}
                      </h3>
                      {exp.status === "current" && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            Current
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Company and Location */}
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <span className="text-base font-semibold text-foreground">{exp.company}</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{exp.location}</span>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.period}</span>
                    </div>

                    {/* Overview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                        Overview
                      </h4>
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {exp.overview}
                      </p>
                    </div>

                    {/* Expandable Section */}
                    <motion.div
                      initial={false}
                      animate={{ height: expandedCards[index] ? "auto" : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-border">
                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                            Technologies & Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, idx) => (
                              <motion.div
                                key={`${skill}-${idx}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                              >
                                <Badge 
                                  variant="outline" 
                                  className="transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground cursor-default"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Detailed Responsibilities */}
                        <div className="pb-4">
                          <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                            Detailed Responsibilities
                          </h4>
                          <ul className="space-y-3">
                            {exp.responsibilities.map((resp, idx) => (
                              <motion.li
                                key={`${resp.slice(0, 20)}-${idx}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="flex items-start gap-3 text-sm leading-relaxed"
                              >
                                <div className="w-2 h-2 bg-foreground rounded-full mt-2 flex-shrink-0" />
                                <span>{resp}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVisitSite(exp.website)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                        type="button"
                      >
                        <ExternalLink className="w-4 h-4" />
                        My Work 
                      </motion.button>

                      <motion.button
                        onClick={() => toggleExpanded(index)}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="py-2 px-6 bg-transparent border-2 border-dotted border-muted-foreground/40 rounded-lg text-foreground text-sm font-medium transition-all duration-300 hover:border-foreground/60 hover:bg-muted/30 hover:shadow-lg group w-fit"
                        type="button"
                        aria-expanded={expandedCards[index]}
                        aria-label={expandedCards[index] ? "Show less details" : "Show more details"}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>{expandedCards[index] ? "Show Less" : "View Details"}</span>
                          <motion.div
                            animate={{ rotate: expandedCards[index] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Experience