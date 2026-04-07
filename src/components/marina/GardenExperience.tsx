import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ArrowRight, Play, Pause, X, Flower2, Gift, Leaf, ChevronLeft } from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  category: 'buque' | 'cesta' | 'garden';
  title: string;
  description?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'garden1',
    type: 'image',
    src: '/garden1.jpg',
    category: 'garden',
    title: 'Nosso Garden Center',
    description: 'Um espaço vivo onde a natureza se expressa em cada canto'
  },
  {
    id: 'buque1',
    type: 'image',
    src: '/buque1.jpg',
    category: 'buque',
    title: 'Buquê Romântico',
    description: 'Rosas colombianas e astromélias em harmonia perfeita'
  },
  {
    id: 'cestamadeira',
    type: 'image',
    src: '/cestamadeira.jpg',
    category: 'cesta',
    title: 'Cesta Rústica',
    description: 'Charme natural em madeira trabalhada'
  },
  {
    id: 'buque2',
    type: 'image',
    src: '/buque2.jpg',
    category: 'buque',
    title: 'Arranjo Tropical',
    description: 'Cores vibrantes que aquecem qualquer ambiente'
  },
  {
    id: 'cestapalha',
    type: 'image',
    src: '/cestapalha.jpg',
    category: 'cesta',
    title: 'Cesta de Palha',
    description: 'Tradição e delicadeza em cada trama'
  },
  {
    id: 'garden4',
    type: 'image',
    src: '/garden4.jpg',
    category: 'garden',
    title: 'Viveiro de Plantas',
    description: 'Babosas, brotos e ramos frescos diariamente'
  },
  {
    id: 'cestavime',
    type: 'image',
    src: '/cestavime.jpg',
    category: 'cesta',
    title: 'Cesta de Vime',
    description: 'Elegância clássica para presentes especiais'
  }
];

const videos = [
  { id: 'garden2', src: '/garden2.mp4', title: 'Tour pelo Garden' },
  { id: 'garden3', src: '/garden3.mp4', title: 'Nosso Espaço' }
];

function VideoCard({ video }: { video: typeof videos[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer glass-card"
    >
      <video
        ref={videoRef}
        src={video.src}
        loop
        muted
        playsInline
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 hover:bg-white/30 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </motion.div>
      </button>
      
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-white font-medium text-lg">{video.title}</p>
      </div>
    </motion.div>
  );
}

function GalleryCard({ item, index, onClick }: { item: GalleryItem; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-2xl glass-card"
    >
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="absolute top-4 left-4 z-10">
          <span className={`
            px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium backdrop-blur-sm
            ${item.category === 'buque' ? 'bg-[#9C1C2B]/90 text-white' : ''}
            ${item.category === 'cesta' ? 'bg-[#D4AF87]/90 text-[#1a1a1a]' : ''}
            ${item.category === 'garden' ? 'bg-[#1a3d1f]/90 text-white' : ''}
          `}>
            {item.category === 'buque' && <Flower2 className="w-3 h-3 inline mr-1" />}
            {item.category === 'cesta' && <Gift className="w-3 h-3 inline mr-1" />}
            {item.category === 'garden' && <Leaf className="w-3 h-3 inline mr-1" />}
            {item.category}
          </span>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-white rotate-[-45deg]" />
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="font-playfair text-xl md:text-2xl text-white mb-1">{item.title}</h3>
          {item.description && (
            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function GardenExperience() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setTimeout(() => setSelectedItem(null), 300);
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden z-10" id="visite">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/garden1.jpg"
            alt="Marina Flores Garden Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-6 block"
          >
            Visite Nosso Espaço
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6 max-w-5xl"
          >
            Um Jardim de Emoções
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light"
          >
            Babosas, brotos, ramos e flores que contam histórias.
            <br className="hidden md:block" />
            Venha sentir a fragrância da nossa tradição.
          </motion.p>
        </div>
      </div>

      {/* Video Gallery */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
              Experiência Visual
            </span>
            <h3 className="font-playfair text-3xl md:text-4xl text-white mb-4">
              Conheça Nosso Universo
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Vídeos exclusivos do nosso Garden Center, onde cada planta é cuidada com amor
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <VideoCard video={video} />
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-20 px-6 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
              Nossas Criações
            </span>
            <h3 className="font-playfair text-3xl md:text-4xl text-white mb-4">
              Buquês & Cestas Especiais
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto">
              Cada arranjo é uma obra de arte única, criada para emocionar
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <GalleryCard 
                item={item} 
                index={index}
                onClick={() => openModal(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Location & Map Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card rounded-3xl p-8 md:p-12 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#9C1C2B]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#9C1C2B]" />
                </div>
                <span className="text-[var(--marina-gold)] text-xs uppercase tracking-wider font-medium">
                  Localização
                </span>
              </div>
              
              <h3 className="font-playfair text-3xl md:text-4xl text-white mb-6">
                Venha nos Visitar
              </h3>
              
              <div className="space-y-4 mb-8 flex-grow">
                <p className="text-gray-300 flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-[var(--marina-gold)] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white block mb-1">Endereço</strong>
                    Rua Florindo Cibim, 331<br />
                    Jardim São Paulo — Americana, SP
                  </span>
                </p>
                
                <p className="text-gray-300 flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-[var(--marina-gold)] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white block mb-1">Horários</strong>
                    Segunda a Sábado: 7h às 18h<br />
                    Domingos: 7h30 às 12h
                  </span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a
                  href="https://www.google.com/maps/dir//Rua+Florindo+Cibim,+331+-+Jardim+Sao+Paulo,+Americana+-+SP,+13466-410/@-22.7374,-47.3337,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#9C1C2B] hover:bg-[#C4253A] text-white font-medium transition-all hover:shadow-[0_8px_32px_rgba(156,28,43,0.4)]"
                >
                  <Navigation className="w-4 h-4" />
                  Como Chegar
                </a>
                
                <a
                  href="https://wa.me/551934622571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white/40 text-white font-medium transition-all hover:bg-white/5"
                >
                  Agendar Visita
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden glass-card h-[500px] lg:h-auto"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.3380419474267!2d-47.3337!3d-22.7374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c89b0b0b0b0b0b%3A0x0!2sRua+Florindo+Cibim%2C+331+-+Jardim+S%C3%A3o+Paulo%2C+Americana+-+SP%2C+13466-410!5e0!3m2!1spt-BR!2sbr!4v1609459200000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) invert(90%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Marina Flores"
                className="absolute inset-0"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Marina Flores" className="w-10 h-10 object-contain" />
                  <div>
                    <p className="text-white font-medium">Marina Flores</p>
                    <p className="text-gray-400 text-sm">4.8 ★★★★★ (127 avaliações)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-t from-black via-[#0a0a0a] to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-4xl md:text-5xl text-white mb-6">
              Esperamos por você
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Há mais de 30 anos cultivando não apenas flores, mas relacionamentos. 
              Venha fazer parte dessa história.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.google.com/maps/place/Rua+Florindo+Cibim,+331+-+Jardim+Sao+Paulo,+Americana+-+SP,+13466-410/@-22.7374,-47.3337,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#9C1C2B] hover:bg-[#C4253A] text-white font-medium transition-all hover:shadow-[0_8px_32px_rgba(156,28,43,0.4)] hover:-translate-y-1"
              >
                <MapPin className="w-5 h-5" />
                Ver no Google Maps
              </a>
              
              <a
                href="tel:+551934622571"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/40 text-white font-medium transition-all hover:bg-white/5"
              >
                Ligar Agora
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* INLINE MODAL - Simples e funcional */}
      {isModalOpen && selectedItem && (
        <SimpleModal item={selectedItem} onClose={closeModal} />
      )}
    </section>
  );
}

// Componente de Modal simples separado
function SimpleModal({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
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
        {/* Botão Voltar - Topo simples */}
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

        {/* Área clicável para fechar (esquerda e direita da imagem) */}
        <div className="fixed inset-0 flex">
          {/* Lado esquerdo - clique fecha */}
          <div className="hidden md:flex w-[15%] h-full items-center justify-center cursor-pointer hover:bg-white/5 transition-colors" onClick={onClose}>
            <ChevronLeft className="w-8 h-8 text-white/40" />
          </div>
          
          {/* Centro - Imagem */}
          <div 
            className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-8"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              src={item.src}
              alt={item.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
              draggable={false}
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-center"
            >
              <h3 className="font-playfair text-2xl text-white mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-400">{item.description}</p>
              )}
              {/* Hint para mobile */}
              <p className="md:hidden text-white/40 text-xs mt-4 flex items-center justify-center gap-1">
                <ChevronLeft className="w-4 h-4 rotate-[-90deg]" />
                Arraste para baixo para voltar
              </p>
            </motion.div>
          </div>
          
          {/* Lado direito - clique fecha */}
          <div className="hidden md:flex w-[15%] h-full items-center justify-center cursor-pointer hover:bg-white/5 transition-colors" onClick={onClose}>
            <ChevronLeft className="w-8 h-8 text-white/40 rotate-180" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
