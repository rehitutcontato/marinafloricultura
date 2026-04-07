import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  bgImageSrc?: string;
  title: string;
  date: string;
  scrollToExpand: string;
  textBlend?: boolean;
}

export function ScrollExpandMedia({
  mediaType,
  mediaSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
}: ScrollExpandMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, filter: blur }}
          className="absolute inset-0 w-full h-full"
        >
          {mediaType === "video" ? (
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60"
              poster={bgImageSrc}
            />
          ) : (
            <img
              src={mediaSrc}
              alt="Hero background"
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-marina-gold uppercase tracking-widest text-sm mb-4"
          >
            {date}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`font-playfair text-5xl md:text-7xl lg:text-8xl text-white max-w-4xl leading-tight ${
              textBlend ? "mix-blend-overlay" : ""
            }`}
          >
            {title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-xl md:text-2xl text-gray-300 font-medium max-w-2xl"
          >
            Emoções que florescem.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-4 text-gray-400 max-w-xl"
          >
            Desde 1990, transformando momentos em memórias eternas.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">
            {scrollToExpand}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-marina-red to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
