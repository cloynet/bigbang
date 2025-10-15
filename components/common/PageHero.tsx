"use client";
import React from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  centered?: boolean;
  height?: "small" | "medium" | "large";
}

export default function PageHero({
  title,
  subtitle,
  centered = true,
  height = "medium",
}: PageHeroProps) {
  const heightClasses = {
    small: "min-h-[35vh]",
    medium: "min-h-[50vh]",
    large: "min-h-[65vh]",
  };

  return (
    <section
      className={`relative ${heightClasses[height]} flex items-center overflow-hidden hero-wave`}
      style={{
        marginTop: "70px",
        backgroundImage: `
          radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          repeating-linear-gradient(45deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "20px 20px, 40px 40px",
      }}
    >
      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`${
            centered ? "text-center mx-auto" : "text-left"
          } max-w-3xl`}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className='text-4xl md:text-5xl lg:text-8xl font-great font-bold tracking-tight text-[var(--color-text-dark)]'
          >
            {title}
          </motion.h1>

          {/* Alt çizgi efekti gradient */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: centered ? "100px" : "80px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`h-[3px] rounded-full mt-5 ${
              centered ? "mx-auto" : "ml-0"
            } bg-gradient-to-r from-[var(--color-primary-start)] to-[var(--color-primary-end)]`}
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed ${
                centered ? "mx-auto" : ""
              } max-w-2xl`}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
