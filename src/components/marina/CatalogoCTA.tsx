import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Gift, Leaf, ArrowRight } from 'lucide-react';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.1,
    },
  }),
};

function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initPetals();
    };

    class Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spin: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height - canvas!.height;
        this.size = Math.random() * 5 + 3; // 3px to 8px
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.1 + 0.08; // 0.08 to 0.18
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; // sinusoidal swing
        this.angle += this.spin;

        if (this.y > canvas!.height + 20) {
          this.y = -20;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        
        ctx.fillStyle = `rgba(156, 28, 43, ${this.opacity})`;
        ctx.beginPath();
        // Bezier curve for petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, this.size, this.size * 2, this.size / 2, 0, this.size * 2);
        ctx.bezierCurveTo(-this.size * 2, this.size / 2, -this.size, this.size, 0, 0);
        ctx.fill();
        
        ctx.restore();
      }
    }

    const initPetals = () => {
      petals = [];
      for (let i = 0; i < 22; i++) {
        petals.push(new Petal());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
    />
  );
}

export function CatalogoCTA() {
  const cards = [
    {
      icon: Flower2,
      title: "Buquês & Arranjos",
      description: "Rosas colombianas, flores tropicais e composições exclusivas"
    },
    {
      icon: Gift,
      title: "Cestas & Presentes",
      description: "Combinações únicas de flores, doces e muito afeto"
    },
    {
      icon: Leaf,
      title: "Plantas & Garden",
      description: "Mudas, vasos e soluções de paisagismo contemporâneo"
    }
  ];

  return (
    <section className="relative bg-[#0a0a0a] py-24 px-6 overflow-hidden flex flex-col items-center z-10">
      <PetalCanvas />
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
        
        {/* Header */}
        <div className="flex flex-col items-center max-w-3xl">
          <motion.span 
            custom={0}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-6 block"
          >
            Catálogo Online
          </motion.span>
          
          <motion.h2 
            custom={1}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-playfair text-[clamp(32px,5vw,52px)] font-normal text-[#F5F0EB] leading-[1.2] mb-6"
          >
            Cada flor tem <em className="italic text-[#9C1C2B]">uma história para contar.</em> Qual será a sua?
          </motion.h2>
          
          <motion.p 
            custom={2}
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[15px] font-light text-[rgba(245,240,235,0.50)] max-w-2xl leading-relaxed"
          >
            Buquês, arranjos, cestas e muito mais — escolhidos com cuidado, entregues com emoção. Explore nossa coleção completa.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                custom={3 + index}
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex flex-col items-center text-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] rounded-[16px] p-8 transition-all duration-300 ease-out hover:border-[rgba(156,28,43,0.5)] hover:bg-[rgba(156,28,43,0.06)] hover:-translate-y-[3px]"
              >
                <Icon className="w-7 h-7 text-[#9C1C2B] mb-5" strokeWidth={1.2} />
                <h3 className="font-playfair text-[15px] font-normal text-[#F5F0EB] mb-3">
                  {card.title}
                </h3>
                <p className="text-[12px] font-light text-[rgba(245,240,235,0.40)] leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <motion.div 
          custom={6}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent via-[#9C1C2B]/60 to-transparent"
        />

        {/* CTA */}
        <motion.div 
          custom={7}
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <a 
            href="https://app.cardapioweb.com/marina_flores"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#9C1C2B] text-[#F5F0EB] rounded-full py-4 px-9 transition-all duration-300 ease-out hover:bg-[#C4253A] hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgba(156,28,43,0.45)] active:scale-[0.98]"
          >
            <span className="font-medium text-[14px]">Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </a>
          
          <span className="text-[12px] font-light text-[rgba(245,240,235,0.25)]">
            Pedidos pelo WhatsApp · Entrega em Santa Bárbara d'Oeste e região
          </span>
        </motion.div>

      </div>
    </section>
  );
}
