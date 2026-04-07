import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
  {
    title: "Buquês & Arranjos Premium",
    description: "Para declarações que duram",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80"
  },
  {
    title: "Cestas & Presentes",
    description: "O presente que emociona",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
  },
  {
    title: "Decoração de Eventos",
    description: "Casamentos e eventos inesquecíveis",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80"
  },
  {
    title: "Paisagismo & Garden Center",
    description: "Espaços que respiram com você",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
  }
];

function TiltCard({ pillar, index }: { pillar: typeof pillars[0], index: number, key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [glareOpacity, setGlareOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Softer tilt
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
    
    // Glare effect
    setGlareX((x / rect.width) * 100);
    setGlareY((y / rect.height) * 100);
    setGlareOpacity(0.15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      className="relative h-80 md:h-[400px] rounded-[2rem] overflow-hidden glass-card group cursor-default"
    >
      <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110">
        <img 
          src={pillar.image} 
          alt={pillar.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
      
      {/* Glare effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          opacity: glareOpacity,
          mixBlendMode: 'overlay'
        }}
      />
      
      <div className="absolute inset-0 border border-transparent group-hover:border-[var(--marina-red-glow)] rounded-[2rem] transition-colors duration-700" />
      
      <div className="absolute inset-0 p-10 flex flex-col justify-end">
        <h3 className="font-playfair text-2xl md:text-3xl text-white mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {pillar.title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out font-light">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

export function PillarCards() {
  return (
    <section className="py-32 relative z-10" id="o-que-fazemos">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
            Nossos Pilares
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl text-white mb-4">
            O que fazemos
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Quatro décadas de excelência em cada detalhe
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <TiltCard key={index} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
