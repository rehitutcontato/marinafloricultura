import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 px-6 pb-6 pt-12" id="contato">
      <div className="max-w-7xl mx-auto glass-card p-12 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="max-w-sm">
          <h2 className="font-playfair text-3xl text-white mb-4">Marina Flores</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Um pedacinho da natureza, reinventado para o seu mundo moderno.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com/marinafloricultura" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/marinafloricultura/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Visite-nos</h4>
            <p className="text-gray-400 text-sm mb-2">Rua Florindo Cibim, 331</p>
            <p className="text-gray-400 text-sm">Jardim São Paulo — Americana, SP</p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Contato</h4>
            <p className="text-gray-400 text-sm mb-2">(19) 3462-2571</p>
            <a href="mailto:contato@marinaflores.com.br" className="text-[var(--marina-gold)] text-sm hover:underline block mb-2">
              contato@marinaflores.com.br
            </a>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-xs">Horários</h4>
            <p className="text-gray-400 text-sm mb-2">Seg - Sáb: 7h às 18h</p>
            <p className="text-gray-400 text-sm">Dom e Feriados: 7h30 às 12h</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
