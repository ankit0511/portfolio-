"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Target, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: React.ComponentType<any>;
  gradient: string;
  detailText: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "LeetCode Excellence",
    description: "Highest rating of 1750 (Top 9%) among 6M+ users",
    metric: "1750 Rating",
    icon: Trophy,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    detailText: "Achieved through consistent daily practice, solving 300+ DSA problems, and participating in weekly contests. This rating places me in the top 9% among 6 million+ competitive programmers worldwide."
  },
  {
    id: 2,
    title: "Contest Achievement",
    description: "Ranked 650 among 20000+ participants in Leetcode Biweekly contest",
    metric: "Top 3.25%",
    icon: Target,
    gradient: "from-blue-400 via-purple-500 to-pink-500",
    detailText: "Demonstrated exceptional problem-solving skills under time pressure. Successfully solved complex algorithmic challenges within the contest timeframe, outperforming 97% of participants."
  },
  {
    id: 3,
    title: "Smart India Hackathon",
    description: "Qualified for the top 5 teams in college level round",
    metric: "Top 5 Teams",
    icon: Rocket,
    gradient: "from-green-400 via-teal-500 to-blue-500",
    detailText: "Led a team to develop an innovative solution addressing real-world problems. Our project impressed judges with its technical implementation, scalability, and potential social impact."
  }
];

const Achievements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="achievements" className="py-20">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="mb-10">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My Achievements
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            A showcase of my competitive programming excellence and innovation journey
          </motion.p>
        </div>

        {/* Achievement Card */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          <motion.div
            key={currentIndex}
            variants={item}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent p-8 relative"
          >
            {/* Card Header */}
            <div className="flex items-start gap-6 mb-6">
              <motion.div
                className="w-16 h-16 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg border-2 border-gray-200 dark:border-gray-800"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                {React.createElement(achievements[currentIndex].icon, { className: "w-8 h-8" })}
              </motion.div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">
                    {achievements[currentIndex].title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {achievements[currentIndex].description}
                </p>
                <motion.div
                  className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-black dark:bg-white text-white dark:text-black border-2 border-gray-200 dark:border-gray-800"
                  whileHover={{ scale: 1.05 }}
                >
                  {achievements[currentIndex].metric}
                </motion.div>
              </div>
            </div>

            {/* Card Content */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Overview</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievements[currentIndex].detailText}
              </p>
            </div>

          
            {/* Navigation Controls - Inside Container */}
            <div className="flex justify-end gap-4 mt-6">
              <motion.button
                onClick={prevSlide}
                className="px-3 py-2 text-black dark:text-white border-2 border-dotted border-black dark:border-white transition-colors duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="px-3 py-2 text-black dark:text-white border-2 border-dotted border-black dark:border-white transition-colors duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};


export default Achievements;
