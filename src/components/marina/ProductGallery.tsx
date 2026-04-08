import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sparkles, ChevronLeft } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  image: string;
  price: string;
  tag: string;
  color: string;
}

const products: Product[] = [
  {
    id: "orquidea-azul",
    name: "Orquídea Azul Premium",
    scientificName: "Dendrobium Blue",
    description: "Exótica e sofisticada, a Orquídea Azul é símbolo de elegância e mistério. Cultivada com cuidado especial em nosso viveiro, traz um toque de exclusividade para qualquer ambiente.",
    image: "/orquideazul.jpg",
    price: "R$ 189,00",
    tag: "Exclusividade",
    color: "#1E3A5F"
  },
  {
    id: "rosa-colombiana",
    name: "Rosa Colombiana Vermelha",
    scientificName: "Rosa × damascena",
    description: "Considerada uma das rosas mais belas do mundo, a colombiana possui pétalas densas e um vermelho intenso que simboliza paixão e amor eterno. Perfeita para momentos inesquecíveis.",
    image: "/rosacolombiana.jpg",
    price: "R$ 25,00",
    tag: "Mais Vendida",
    color: "#9C1C2B"
  }
];

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ rotate: 0, scale: 1.02, y: -8 }}
      onClick={onClick}
      className="cursor-pointer group relative"
    >
      {/* Polaroid Frame */}
      <div className="bg-[#F5F0EB] p-4 pb-20 rounded-sm shadow-2xl transform transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        {/* Photo Area */}
        <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Tag */}
          <div 
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium text-white"
            style={{ backgroundColor: product.color }}
          >
            {product.tag}
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        
        {/* Caption Area */}
        <div className="absolute bottom-0 left-0 w-full p-4 text-center">
          <p className="font-playfair text-[#1a1a1a] text-lg italic mb-1">{product.name}</p>
          <p className="font-inter text-[#9C1C2B] text-sm font-medium">{product.price}</p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[var(--marina-gold)]/80"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.2 + 0.3 }}
      />
    </motion.div>
  );
}

// Modal Aprimorado com UX igual ao GardenExperience
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Tecla ESC fecha
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Swipe handlers para mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -minSwipeDistance;
    if (isSwipeDown) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Botão Voltar - Topo */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium tracking-wide">Voltar</span>
        </button>

        {/* Layout com áreas clicáveis nas laterais */}
        <div className="fixed inset-0 flex">
          {/* Lado esquerdo - clique fecha (desktop) */}
          <div className="hidden md:flex w-[10%] h-full items-center justify-center cursor-pointer hover:bg-white/5 transition-colors" onClick={onClose}>
            <ChevronLeft className="w-8 h-8 text-white/40" />
          </div>
          
          {/* Centro - Conteúdo */}
          <div 
            className="flex-1 flex items-center justify-center px-4 pt-16 pb-8"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-4xl w-full bg-[#0A0A0A] rounded-3xl overflow-hidden border border-white/10"
            >
              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="relative aspect-square md:aspect-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{ background: `linear-gradient(135deg, ${product.color}40 0%, transparent 70%)` }}
                  />
                </div>
                
                {/* Content Side */}
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-medium text-white w-fit mb-4"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.tag === "Exclusividade" ? <Sparkles className="w-3 h-3" /> : <Flower2 className="w-3 h-3" />}
                    {product.tag}
                  </div>
                  
                  <h2 className="font-playfair text-3xl md:text-4xl text-white mb-2">{product.name}</h2>
                  <p className="font-inter text-[var(--marina-gold)] text-sm italic mb-6">{product.scientificName}</p>
                  
                  <p className="font-inter text-gray-300 text-base leading-relaxed mb-8">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="font-inter text-gray-500 text-sm mb-1">A partir de</p>
                      <p className="font-playfair text-3xl text-white">{product.price}</p>
                    </div>
                    
                    <a
                      href="#orcamento"
                      onClick={onClose}
                      className="px-6 py-3 rounded-full bg-[#9C1C2B] hover:bg-[#C4253A] text-white font-medium text-sm transition-all hover:shadow-[0_8px_32px_rgba(156,28,43,0.4)] hover:-translate-y-0.5"
                    >
                      Solicitar Orçamento
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Hint para mobile */}
              <p className="md:hidden absolute bottom-2 left-0 right-0 text-center text-white/40 text-xs">
                <ChevronLeft className="w-4 h-4 inline rotate-[-90deg] mr-1" />
                Arraste para baixo para voltar
              </p>
            </motion.div>
          </div>
          
          {/* Lado direito - clique fecha (desktop) */}
          <div className="hidden md:flex w-[10%] h-full items-center justify-center cursor-pointer hover:bg-white/5 transition-colors" onClick={onClose}>
            <ChevronLeft className="w-8 h-8 text-white/40 rotate-180" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProductGallery() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section className="py-32 relative z-10 overflow-hidden" id="nossas-flores">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--marina-gold) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
              Nosso Jardim
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Flores que Encantam
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              Cada flor conta uma história única. Selecionamos com cuidado as mais belas 
              espécimes para tornar seus momentos inesquecíveis.
            </p>
          </motion.div>
          
          {/* Products Grid - Offset Layout */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
            {products.map((product, index) => (
              <div key={product.id} className={index % 2 === 1 ? 'md:mt-20' : ''}>
                <ProductCard 
                  product={product} 
                  index={index}
                  onClick={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-20"
          >
            <p className="text-gray-500 text-sm mb-4">
              Estas são apenas algumas de nossas flores disponíveis
            </p>
            <a
              href="#orcamento"
              className="inline-flex items-center gap-2 text-[var(--marina-gold)] hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              <Flower2 className="w-4 h-4" />
              Explore nosso catálogo completo
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
}
