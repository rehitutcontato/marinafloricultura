import React, { useEffect, useRef } from 'react';

export function FlowerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      angle: number;
      spin: number;
      opacity: number;
      type: 'petal' | 'dust';

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.type = Math.random() > 0.7 ? 'petal' : 'dust';
        
        if (this.type === 'petal') {
          this.size = Math.random() * 4 + 2;
          this.speedX = (Math.random() - 0.5) * 0.3;
          this.speedY = Math.random() * 0.4 + 0.1; // Petals drift down slowly
          this.opacity = Math.random() * 0.3 + 0.1;
        } else {
          this.size = Math.random() * 1.5 + 0.5;
          this.speedX = (Math.random() - 0.5) * 0.2;
          this.speedY = (Math.random() - 0.5) * 0.2; // Dust floats randomly
          this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.spin;

        // Wrap around screen
        if (this.x > canvas!.width + 50) this.x = -50;
        else if (this.x < -50) this.x = canvas!.width + 50;
        
        if (this.y > canvas!.height + 50) this.y = -50;
        else if (this.y < -50) this.y = canvas!.height + 50;

        // Gentle mouse repel
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        
        if (this.type === 'petal') {
          // Elegant abstract petal shape
          ctx.fillStyle = `rgba(156, 28, 43, ${this.opacity})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 1.8, 0, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Glowing dust mote
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 2);
          gradient.addColorStop(0, `rgba(212, 175, 135, ${this.opacity})`);
          gradient.addColorStop(1, 'rgba(212, 175, 135, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 2, 0, 2 * Math.PI);
          ctx.fill();
        }
        
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    });

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
      className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen"
    />
  );
}
