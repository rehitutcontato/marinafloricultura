import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarHeart, Users, MapPin, Award } from 'lucide-react';

// ─── Rosa 3D SVG ───────────────────────────────────────────────
function Rose3D() {
  const roseRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rot = useRef({ x: -10, y: 0 });
  const targetRot = useRef({ x: -10, y: 0 });
  const bloom = useRef(1);
  const targetBloom = useRef(1);
  const raf = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onMove = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      
      // Calculate rotation based on cursor position relative to the rose
      // The further away, the more it tilts towards the cursor
      targetRot.current.y = (dx / window.innerWidth) * 140; // Max ~70 deg
      targetRot.current.x = -(dy / window.innerHeight) * 140; // Max ~70 deg
      
      // Limit rotation
      targetRot.current.y = Math.max(-75, Math.min(75, targetRot.current.y));
      targetRot.current.x = Math.max(-75, Math.min(75, targetRot.current.x));
      
      // Bloom effect based on proximity
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 400;
      if (dist < maxDist) {
        targetBloom.current = 1 + (1 - dist / maxDist) * 0.25;
      } else {
        targetBloom.current = 1;
      }
    };

    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Reset when mouse leaves window
    const handleMouseLeave = () => {
      targetRot.current = { x: -10, y: 0 };
      targetBloom.current = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);

    const animate = () => {
      // Lerp current rotation to target rotation for smooth movement
      rot.current.x += (targetRot.current.x - rot.current.x) * 0.06;
      rot.current.y += (targetRot.current.y - rot.current.y) * 0.06;
      bloom.current += (targetBloom.current - bloom.current) * 0.08;
      
      // Add a subtle continuous floating motion on top of the tracking
      const time = performance.now() * 0.001;
      const floatX = Math.sin(time * 1.5) * 3;
      const floatY = Math.cos(time * 1.2) * 3;
      
      if (roseRef.current) {
        roseRef.current.style.transform =
          `rotateX(${rot.current.x + floatX}deg) rotateY(${rot.current.y + floatY}deg) scale(1.1)`;
        roseRef.current.style.setProperty('--bloom', bloom.current.toString());
        
        const shineX = 50 + (rot.current.y + floatY) * 0.5;
        const shineY = 50 + (rot.current.x + floatX) * 0.5;
        roseRef.current.style.setProperty('--shine-x', `${shineX}%`);
        roseRef.current.style.setProperty('--shine-y', `${shineY}%`);
      }
      
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div 
      ref={stageRef} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-70 pointer-events-none z-0"
      style={{ perspective: '2000px' }}
    >
      {/* Enhanced Glow Effect Background */}
      <div className="absolute inset-0 rounded-full bg-[#9C1C2B]/50 blur-[100px] transition-all duration-700 pointer-events-none scale-[2] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute inset-0 rounded-full bg-[#6B0F1A]/60 blur-[150px] transition-all duration-700 pointer-events-none scale-[2.5]" />
      <div className="absolute inset-0 rounded-full bg-[#3D0912]/40 blur-[200px] transition-all duration-700 pointer-events-none scale-[3]" />
      
      <svg ref={roseRef} viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_60px_rgba(156,28,43,0.4)]"
        style={{ 
          transformStyle: 'preserve-3d', 
          '--bloom': '1',
          '--shine-x': '50%',
          '--shine-y': '50%'
        } as any}>
        <defs>
        <radialGradient id="petalGrad" cx="var(--shine-x)" cy="var(--shine-y)" r="70%">
            <stop offset="0%" stopColor="#B91C32" />
            <stop offset="40%" stopColor="#7A1320" />
            <stop offset="100%" stopColor="#3D0A10" />
          </radialGradient>
          <radialGradient id="innerGrad" cx="var(--shine-x)" cy="var(--shine-y)" r="60%">
            <stop offset="0%" stopColor="#D6283E" />
            <stop offset="50%" stopColor="#9C1C2B" />
            <stop offset="100%" stopColor="#4A0F18" />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9C1C2B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9C1C2B" stopOpacity="0" />
          </radialGradient>
          <filter id="petalShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#9C1C2B" floodOpacity="0.5"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="glowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <style>
          {`
            .petal-group { transition: transform 0.1s ease-out; }
          `}
        </style>
        <g transform="translate(130, 130)">
          {/* Base leaves (Back) */}
          <g className="petal-group" style={{ transform: 'translateZ(-60px) scale(calc(var(--bloom) * 0.9))' }}>
            <path d="M0,0 C-50,50 -70,100 -20,120 C30,140 50,70 0,0" fill="#0A170C" opacity="0.9" transform="rotate(45)" />
            <path d="M0,0 C-50,50 -70,100 -20,120 C30,140 50,70 0,0" fill="#0A170C" opacity="0.9" transform="rotate(165)" />
            <path d="M0,0 C-50,50 -70,100 -20,120 C30,140 50,70 0,0" fill="#0A170C" opacity="0.9" transform="rotate(285)" />
          </g>
          
          {/* Outer Petals (Layer 1) */}
          <g className="petal-group" filter="url(#petalShadow)" style={{ transform: 'translateZ(-30px) scale(var(--bloom))' }}>
            <path d="M0,0 C-75,-55 -95,-115 -35,-135 C35,-155 75,-75 0,0" fill="url(#petalGrad)" transform="rotate(0)" filter="url(#glowFilter)" />
            <path d="M0,0 C-75,-55 -95,-115 -35,-135 C35,-155 75,-75 0,0" fill="url(#petalGrad)" transform="rotate(72)" filter="url(#glowFilter)" />
            <path d="M0,0 C-75,-55 -95,-115 -35,-135 C35,-155 75,-75 0,0" fill="url(#petalGrad)" transform="rotate(144)" filter="url(#glowFilter)" />
            <path d="M0,0 C-75,-55 -95,-115 -35,-135 C35,-155 75,-75 0,0" fill="url(#petalGrad)" transform="rotate(216)" filter="url(#glowFilter)" />
            <path d="M0,0 C-75,-55 -95,-115 -35,-135 C35,-155 75,-75 0,0" fill="url(#petalGrad)" transform="rotate(288)" filter="url(#glowFilter)" />
          </g>

          {/* Mid-Outer Petals (Layer 2) */}
          <g className="petal-group" filter="url(#petalShadow)" style={{ transform: 'translateZ(0px) scale(var(--bloom))' }}>
            <path d="M0,0 C-65,-45 -85,-95 -35,-115 C25,-135 65,-65 0,0" fill="url(#petalGrad)" transform="rotate(36)" />
            <path d="M0,0 C-65,-45 -85,-95 -35,-115 C25,-135 65,-65 0,0" fill="url(#petalGrad)" transform="rotate(108)" />
            <path d="M0,0 C-65,-45 -85,-95 -35,-115 C25,-135 65,-65 0,0" fill="url(#petalGrad)" transform="rotate(180)" />
            <path d="M0,0 C-65,-45 -85,-95 -35,-115 C25,-135 65,-65 0,0" fill="url(#petalGrad)" transform="rotate(252)" />
            <path d="M0,0 C-65,-45 -85,-95 -35,-115 C25,-135 65,-65 0,0" fill="url(#petalGrad)" transform="rotate(324)" />
          </g>

          {/* Middle Petals (Layer 3) */}
          <g className="petal-group" filter="url(#petalShadow)" style={{ transform: 'translateZ(40px) scale(var(--bloom))' }}>
            <path d="M0,0 C-50,-40 -70,-80 -30,-95 C30,-110 50,-50 0,0" fill="url(#innerGrad)" transform="rotate(15)" />
            <path d="M0,0 C-50,-40 -70,-80 -30,-95 C30,-110 50,-50 0,0" fill="url(#innerGrad)" transform="rotate(87)" />
            <path d="M0,0 C-50,-40 -70,-80 -30,-95 C30,-110 50,-50 0,0" fill="url(#innerGrad)" transform="rotate(159)" />
            <path d="M0,0 C-50,-40 -70,-80 -30,-95 C30,-110 50,-50 0,0" fill="url(#innerGrad)" transform="rotate(231)" />
            <path d="M0,0 C-50,-40 -70,-80 -30,-95 C30,-110 50,-50 0,0" fill="url(#innerGrad)" transform="rotate(303)" />
          </g>

          {/* Inner Petals (Layer 4) */}
          <g className="petal-group" filter="url(#petalShadow)" style={{ transform: 'translateZ(80px) scale(var(--bloom))' }}>
            <path d="M0,0 C-35,-30 -50,-60 -20,-70 C20,-80 35,-35 0,0" fill="url(#innerGrad)" transform="rotate(50)" />
            <path d="M0,0 C-35,-30 -50,-60 -20,-70 C20,-80 35,-35 0,0" fill="url(#innerGrad)" transform="rotate(170)" />
            <path d="M0,0 C-35,-30 -50,-60 -20,-70 C20,-80 35,-35 0,0" fill="url(#innerGrad)" transform="rotate(290)" />
          </g>

          {/* Core Petals (Layer 5) */}
          <g className="petal-group" filter="url(#petalShadow)" style={{ transform: 'translateZ(120px) scale(var(--bloom))' }}>
            <path d="M0,0 C-20,-20 -30,-40 -10,-50 C20,-60 20,-25 0,0" fill="#F56577" transform="rotate(0)" />
            <path d="M0,0 C-20,-20 -30,-40 -10,-50 C20,-60 20,-25 0,0" fill="#F04A5F" transform="rotate(120)" />
            <path d="M0,0 C-20,-20 -30,-40 -10,-50 C20,-60 20,-25 0,0" fill="#F56577" transform="rotate(240)" />
          </g>

          {/* Center (Layer 6) */}
          <g className="petal-group" style={{ transform: 'translateZ(140px) scale(var(--bloom))' }}>
            <circle cx="0" cy="0" r="14" fill="#3A0810" />
            <path d="M-5,-5 Q0,-10 5,-5 Q10,0 5,5 Q0,10 -5,5 Q-10,0 -5,-5" fill="#1A0307" />
            <circle cx="0" cy="0" r="4" fill="#5A0D18" opacity="0.6" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// ─── Counter ───────────────────────────────────────────────────
function Counter({ target, suffix, textValue }: { target: number; suffix: string; textValue?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView || target === 0 || textValue) return;
    const dur = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, textValue]);

  return <div ref={ref}>{textValue ? textValue : `${val}${suffix}`}</div>;
}

// ─── Metrics Card ──────────────────────────────────────────────
function MetricCard({ icon, target, suffix, label, textValue }: {
  icon: React.ReactNode; target: number; suffix: string; label: string; textValue?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const cx = r.width / 2, cy = r.height / 2;
    cardRef.current!.style.transform =
      `translateY(-6px) scale(1.02) perspective(600px) rotateX(${(y - cy) / cy * 10}deg) rotateY(${(cx - x) / cx * -10}deg)`;
  };
  const onLeave = () => { cardRef.current!.style.transform = ''; };

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
      className="relative bg-white/[0.035] border border-white/[0.07] rounded-[20px] p-8
                 flex flex-col items-center gap-3 cursor-pointer overflow-hidden
                 transition-[border-color,box-shadow,transform] duration-300 ease-out
                 hover:border-[#9C1C2B]/50 hover:shadow-[0_20px_60px_rgba(156,28,43,0.18)] group z-10 w-full h-full justify-center">
      <div className="w-7 h-7 opacity-25 group-hover:opacity-70 transition-opacity text-white group-hover:text-[#9C1C2B]">{icon}</div>
      <div className="font-playfair text-[clamp(28px,3vw,44px)] font-bold text-[#F5F0EB] group-hover:text-[#C4253A] transition-colors leading-none text-center">
        <Counter target={target} suffix={suffix} textValue={textValue} />
      </div>
      <div className="text-[10px] font-semibold tracking-[3px] text-[#F5F0EB]/38 uppercase text-center">{label}</div>
      <div className="absolute bottom-0 left-0 h-[2px] bg-[#9C1C2B] w-0 group-hover:w-full transition-all duration-500 rounded-b-[20px]" />
    </div>
  );
}

// ─── Particles Canvas ──────────────────────────────────────────
function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || 600;

    const particles: any[] = [];
    const numParticles = 35; // Less particles, but bigger and more detailed

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1,
        vy: Math.random() * 1.5 + 0.5, // Falling down
        size: Math.random() * 6 + 4, // Bigger petals
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.03,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005,
        flip: Math.random() * Math.PI * 2,
        vFlip: Math.random() * 0.03 + 0.01,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // Movement
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.swayOffset) * 0.8; // Swaying motion
        
        // Update angles
        p.swayOffset += p.swaySpeed;
        p.angle += p.vAngle;
        p.flip += p.vFlip;

        // Screen wrap
        if (p.y > height + 50) {
          p.y = -50;
          p.x = Math.random() * width;
        }
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;

        // Mouse interaction (gentle breeze)
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 200;

        if (dist < minDist) {
          const force = (minDist - dist) / minDist;
          p.x -= (dx / dist) * force * 2;
          p.y -= (dy / dist) * force * 2;
          p.angle += force * 0.05; // Spin a bit when pushed
        }

        // Draw realistic petal
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(Math.sin(p.flip), 1); // 3D flip illusion

        // Gradient for depth - darker, more intense colors
        const grad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        grad.addColorStop(0, 'rgba(156, 28, 43, 0.85)'); // Deep red
        grad.addColorStop(0.5, 'rgba(90, 13, 24, 0.5)');  // Darker red
        grad.addColorStop(1, 'rgba(60, 10, 18, 0.3)');    // Very dark

        ctx.fillStyle = grad;
        ctx.shadowColor = 'rgba(156, 28, 43, 0.6)';
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 1.5, -p.size, p.size * 1.5, p.size * 1.5, 0, p.size * 2);
        ctx.bezierCurveTo(-p.size * 1.5, p.size * 1.5, -p.size * 1.5, -p.size, 0, -p.size);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}

const stats = [
  { label: "Anos de mercado", value: 30, suffix: "+", icon: <Award /> },
  { label: "Eventos realizados", value: 5000, suffix: "+", icon: <CalendarHeart /> },
  { label: "Especialistas na equipe", value: 5, suffix: "+", icon: <Users /> },
  { label: "Cidades atendidas", value: 0, suffix: "", textValue: "Região de Campinas", icon: <MapPin /> }
];

export function Stats() {
  return (
    <section className="py-32 relative bg-[#0a0a0a] flex flex-col items-center justify-center min-h-screen">
      {/* Background Container with hidden overflow to keep particles/rose contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <ParticlesCanvas />
        
        {/* Background Rose */}
        <Rose3D />

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/40 backdrop-blur-[8px]" />
      </div>

      {/* Light bleeding to the next section */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[100%] max-w-5xl h-[250px] bg-[#9C1C2B]/30 blur-[120px] rounded-[100%] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#9C1C2B]/10 to-transparent pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <span className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
              Nossa Trajetória
            </span>
            <h2 className="font-playfair text-[clamp(32px,4vw,48px)] font-normal text-[#F5F0EB] mb-4">
              Números que florescem
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="h-48"
            >
              <MetricCard 
                icon={stat.icon} 
                target={stat.value} 
                suffix={stat.suffix} 
                label={stat.label} 
                textValue={stat.textValue}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
