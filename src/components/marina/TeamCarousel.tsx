import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const team = [
  {
    name: "João Donizete Botassini",
    role: "Gerente do Garden Center",
    quote: "Comecei como motorista, mas já sabia bastante sobre plantas e gostava de trabalhar com o público, então ficava muito no viveiro. Depois de um tempo, o meu trabalho foi reconhecido e hoje ocupo a vaga de gerente de um grande setor da empresa. Estou aqui há sete anos e neste período não tive nada do que reclamar da Marina Flores. Hoje me sinto feliz e realizado e as expectativas continuam sendo as melhores.",
    image: "/joaodonizete.jpg",
    years: 7
  },
  {
    name: "Sabrina Ismarsi Rezende",
    role: "Assistente Administrativa",
    quote: "Entrei para trabalhar no caixa e fui me desenvolvendo, graças à ajuda de muitos funcionários. Por não ter experiência na área, não imaginava que poderia conquistar novos cargos aqui, mas me surpreendi quando fui convidada a assumir a vaga de assistente administrativa, função que desempenho há três anos. Hoje auxilio o departamento financeiro, organizo orçamentos e preencho contratos. Estou feliz por ter sido valorizada pela empresa.",
    image: "/sabrinaimarsi.jpg",
    years: 3
  },
  {
    name: "Ronaldo Aparecido Rodrigues",
    role: "Motorista Sênior",
    quote: "Quando cheguei, a Marina Flores só tinha dois funcionários. Comecei como balconista e vi a empresa crescer, ao longo dos anos. Depois de algum tempo, soube de uma vaga para motorista e me candidatei. Já conhecia bem a cidade e deu certo. A principal razão para a minha permanência há 18 anos é a humildade da diretoria, que sempre nos trata muito bem e nos ajuda. Por sermos valorizados, também nos sentimos dispostos a dar o nosso melhor pela empresa.",
    image: "/ronaldoaparecido.jpg",
    years: 18
  },
  {
    name: "Letícia Kadatz",
    role: "Supervisora de Balcão",
    quote: "Saí e fui novamente contratada, e ainda consegui uma promoção. Gosto muito de trabalhar aqui.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    years: 5
  },
  {
    name: "Gabriela Murayama",
    role: "Arquiteta e Paisagista",
    quote: "Especializada em paisagismo contemporâneo pela França, trazendo novas tendências ao mercado brasileiro.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=800&q=80",
    years: 8
  }
];

export function TeamCarousel() {
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative z-10 overflow-hidden" id="equipe">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center"
        >
          <span className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block">
            Nossa Equipe
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            As mãos que cultivam nossas histórias
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Mais do que funcionários — eles são a família Marina Flores.
          </p>
        </motion.div>
      </div>

      <motion.div 
        ref={carouselRef}
        className="flex overflow-x-auto gap-8 px-6 pb-16 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing" 
        style={{ paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2))' }}
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-w-[320px] md:min-w-[420px] snap-center group relative glass-card overflow-hidden rounded-[2rem]"
          >
            <div className="aspect-[3/4] relative overflow-hidden">
              <motion.img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[var(--marina-red-glow)] opacity-0 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay" />
              
              <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--marina-gold)] bg-[var(--marina-gold)]/10 px-2 py-1 rounded-full border border-[var(--marina-gold)]/20">
                    {member.years} anos de casa
                  </span>
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl text-white mb-2">{member.name}</h3>
                <p className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.15em] mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150 font-light leading-relaxed line-clamp-4">
                  "{member.quote}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
