import React from 'react';
import { motion } from 'framer-motion';

export function Identity() {
  const title = "Não entregamos apenas flores. Traduzimos em beleza aquilo que as palavras não alcançam.";
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.2 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
  };

  return (
    <section className="py-32 relative z-10" id="sobre">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
            >
              Sobre Nós
            </motion.span>
            
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-10"
            >
              {title.split(" ").map((word, index) => (
                <motion.span
                  variants={child}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  key={index}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 max-w-lg">
                A Marina Flores nasceu em 1990 em Santa Bárbara d'Oeste, SP. Desde então, construímos um portfólio rico em eventos inesquecíveis, com uma equipe altamente qualificada e um atendimento que entende a singularidade de cada cliente. Cada arranjo é uma obra de arte viva.
              </p>
              <div className="inline-flex items-center justify-center px-8 py-4 glass-card border-[var(--marina-gold)]/20 text-[var(--marina-gold)] text-xs tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(212,175,135,0.05)]">
                30+ Anos de História
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative h-[600px] lg:h-[700px] glass-card overflow-hidden rounded-[2rem] group"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=1200&q=80" 
              alt="Arranjo floral premium" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
