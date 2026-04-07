import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function FinalCTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10">
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          style={{ y, scale: 1.1 }}
          src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=1920&q=80" 
          alt="Rosa Vermelha" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-8"
        >
          Venha nos conhecer.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-xl md:text-2xl text-gray-300 mb-16 font-light leading-relaxed max-w-2xl"
        >
          Há mais de 30 anos cultivando beleza,<br className="hidden md:block" />
          emoção e histórias que não se esquecem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a 
            href="https://marinaflores.com.br/home"
            className="group relative inline-flex items-center justify-center px-12 py-5 text-sm tracking-[0.2em] uppercase text-white overflow-hidden rounded-full border border-[var(--marina-red)] transition-all duration-500 ease-out hover:shadow-[0_0_40px_var(--marina-red-glow)] bg-black/20 backdrop-blur-sm"
          >
            <span className="absolute inset-0 w-full h-full bg-[var(--marina-red)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.25,0.46,0.45,0.94]" />
            <span className="relative flex items-center gap-4">
              Conheça-nos Melhor
              <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-[0.25,0.46,0.45,0.94]">→</span>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
