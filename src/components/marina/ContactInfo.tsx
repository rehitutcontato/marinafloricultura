import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const contacts = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua Florindo Cibim, 331",
    value2: "Jardim São Paulo — Americana, SP"
  },
  {
    icon: Phone,
    label: "Televendas",
    value: "(19) 3462.2571",
    href: "tel:+551934622571"
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@marinaflores.com.br",
    href: "mailto:contato@marinaflores.com.br"
  },
  {
    icon: Clock,
    label: "Horário de Funcionamento",
    value: "Segunda a Sábado: 7h às 18h",
    value2: "Domingo e Feriados: 7h30 às 12h"
  }
];

export function ContactInfo() {
  return (
    <div className="lg:sticky lg:top-32 space-y-12">
      <div>
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-medium tracking-[3px] uppercase text-[#9C1C2B] block mb-4"
        >
          Fale Conosco
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-playfair text-3xl md:text-4xl text-[#F5F0EB] leading-tight mb-6"
        >
          Estamos prontos para transformar seu evento.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[15px] font-light text-[rgba(245,240,235,0.55)] leading-relaxed"
        >
          Entre em contato ou preencha o formulário ao lado. Nossa equipe responde em até 24h.
        </motion.p>
      </div>

      <div className="space-y-8">
        {contacts.map((contact, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0 transition-colors group-hover:border-[#9C1C2B]/50">
              <contact.icon className="w-4 h-4 text-[#9C1C2B]" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-[11px] font-medium tracking-[2px] uppercase text-[rgba(245,240,235,0.35)] block mb-1">
                {contact.label}
              </span>
              {contact.href ? (
                <a href={contact.href} className="text-[14px] text-[#F5F0EB] hover:text-[#9C1C2B] transition-colors">
                  {contact.value}
                </a>
              ) : (
                <p className="text-[14px] text-[#F5F0EB]">{contact.value}</p>
              )}
              {contact.value2 && (
                <p className="text-[13px] text-[rgba(245,240,235,0.55)] mt-0.5">{contact.value2}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="rounded-[16px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.123!2d-47.334!3d-22.739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c89982997d9231%3A0x88f01f09ad6a3908!2sR.%20Florindo%20Cibim%2C%20331%20-%20Jardim%20Sao%20Paulo%2C%20Americana%20-%20SP%2C%2013468-100!5e0!3m2!1spt-BR!2sbr!4v1712410000000!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="200" 
          style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa Marina Flores"
        />
        <a 
          href="https://maps.google.com/?q=Rua+Florindo+Cibim+331+Americana+SP" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 text-[12px] text-[rgba(245,240,235,0.55)] hover:text-[#F5F0EB] transition-colors border-t border-[rgba(255,255,255,0.08)]"
        >
          Ver no Google Maps <ExternalLink className="w-3 h-3" />
        </a>
      </motion.div>

      <motion.a 
        href="https://wa.me/551934622571"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-3 w-full py-4 rounded-full border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 group"
      >
        <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="text-[14px] font-medium">Chamar no WhatsApp</span>
      </motion.a>
    </div>
  );
}
