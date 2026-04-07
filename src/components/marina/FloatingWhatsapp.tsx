import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/551934622571"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group flex items-center gap-3"
    >
      <div className="bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <span className="text-sm font-medium text-white whitespace-nowrap">Fale com nossos floristas</span>
      </div>
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/20 group-hover:scale-110 group-hover:shadow-[#25D366]/40 transition-all duration-300">
        <MessageCircle className="w-7 h-7 text-white" />
      </div>
    </a>
  );
}
