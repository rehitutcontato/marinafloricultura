import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, MessageCircle, Flower2, 
  Sparkles, TreePine, Check, ChevronLeft, ChevronRight, 
  Send, Star, Heart, Building2, CalendarHeart, Church
} from 'lucide-react';

const WHATSAPP_NUMBER = "551934622571";

const categories = [
  {
    id: "contato_simples",
    icon: MessageCircle,
    title: "Contato Simples",
    description: "Dúvidas, informações ou uma mensagem geral",
    color_accent: "rgba(212,175,135,0.6)"
  },
  {
    id: "buque_arranjo",
    icon: Flower2,
    title: "Buquê & Arranjo",
    description: "Buquês, arranjos avulsos, presentes e cestas",
    color_accent: "rgba(156,28,43,0.6)"
  },
  {
    id: "decoracao_evento",
    icon: Sparkles,
    title: "Decoração de Evento",
    description: "Casamentos, 15 anos, eventos corporativos",
    color_accent: "rgba(156,28,43,0.6)"
  },
  {
    id: "paisagismo",
    icon: TreePine,
    title: "Paisagismo & Garden",
    description: "Jardins residenciais, comerciais e projetos técnicos",
    color_accent: "rgba(13,31,15,0.8)"
  }
];

const formsConfig: Record<string, any> = {
  contato_simples: {
    title: "Fale com a gente",
    subtitle: "Sua mensagem vai direto para o WhatsApp da nossa equipe.",
    fields: [
      { id: "nome", label: "Seu nome", type: "text", placeholder: "Como prefere ser chamado?", required: true },
      { id: "telefone", label: "WhatsApp / Telefone", type: "tel", placeholder: "(19) 99999-9999", required: false },
      { id: "mensagem", label: "Mensagem", type: "textarea", placeholder: "Escreva sua dúvida ou mensagem aqui...", required: true, rows: 4 }
    ]
  },
  buque_arranjo: {
    title: "Orçamento de Buquê ou Arranjo",
    subtitle: "Nos conte o que você tem em mente e entraremos em contato.",
    fields: [
      { id: "nome", label: "Seu nome", type: "text", placeholder: "Nome completo", required: true },
      { id: "telefone", label: "WhatsApp", type: "tel", placeholder: "(19) 99999-9999", required: true },
      {
        id: "tipo_produto",
        label: "O que você procura?",
        type: "radio_pills",
        options: ["Buquê de noiva", "Buquê presente", "Arranjo de mesa", "Cesta de flores", "Flores avulsas", "Outro"],
        required: true
      },
      { id: "ocasiao", label: "Ocasião", type: "text", placeholder: "Ex: Aniversário, casamento, declaração...", required: false },
      { id: "data_entrega", label: "Data desejada para entrega/retirada", type: "date", required: false },
      { id: "flores_preferidas", label: "Flores e cores preferidas", type: "text", placeholder: "Ex: Rosas vermelhas, girassóis amarelos...", required: false },
      {
        id: "faixa_valor",
        label: "Faixa de investimento",
        type: "radio_pills",
        options: ["Até R$ 100", "R$ 100–250", "R$ 250–500", "Acima de R$ 500", "Prefiro não informar"],
        required: false
      },
      { id: "obs", label: "Observações adicionais", type: "textarea", placeholder: "Algum detalhe especial?", required: false, rows: 3 }
    ]
  },
  decoracao_evento: {
    title: "Orçamento de Decoração",
    subtitle: "Preencha o que souber. Quanto mais detalhes, melhor nossa proposta.",
    multistep: true,
    steps: [
      {
        step: 1,
        label: "Evento",
        icon: CalendarHeart,
        fields: [
          { id: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome", required: true },
          { id: "telefone", label: "WhatsApp", type: "tel", placeholder: "(19) 99999-9999", required: true },
          {
            id: "tipo_evento",
            label: "Tipo de evento",
            type: "radio_pills",
            options: ["Casamento", "15 Anos", "Corporativo", "Aniversário", "Outro"],
            required: true
          },
          { id: "data_evento", label: "Data do Evento", type: "date", required: true },
          { id: "local_cerimonia", label: "Local da Cerimônia", type: "text", placeholder: "Nome e cidade", required: false },
          { id: "local_festa", label: "Local da Festa / Recepção", type: "text", placeholder: "Nome e cidade", required: false },
          { id: "qtd_convidados", label: "Quantidade de Convidados", type: "number", placeholder: "Ex: 150", required: false },
          {
            id: "nivel_festa",
            label: "Como você definiria sua festa?",
            type: "radio_cards_3",
            options: [
              { value: "Simples", icon: Star, desc: "Elegante e objetivo" },
              { value: "Médio", icon: Heart, desc: "Equilibrado e bonito" },
              { value: "Sofisticado", icon: Sparkles, desc: "Premium e marcante" }
            ]
          }
        ]
      },
      {
        step: 2,
        label: "Cerimônia",
        icon: Church,
        optional_note: "Pule se não houver cerimônia separada",
        fields: [
          {
            id: "tipo_cerimonia",
            label: "Tipo de cerimônia",
            type: "radio_pills",
            options: ["Religiosa", "Civil", "Mista", "Não terá cerimônia"],
            default: "Não terá cerimônia"
          },
          { id: "qtd_altar", label: "Arranjos para o altar", type: "number", placeholder: "Quantidade", conditional_hide: "tipo_cerimonia === 'Não terá cerimônia'" },
          { id: "qtd_corredor", label: "Arranjos para o corredor", type: "number", placeholder: "Quantidade", conditional_hide: "tipo_cerimonia === 'Não terá cerimônia'" },
          { id: "tapete", label: "Tapete para o corredor", type: "toggle_sim_nao", conditional_hide: "tipo_cerimonia === 'Não terá cerimônia'" },
          { id: "flores_cerimonia", label: "Flores e tonalidades desejadas", type: "text", placeholder: "Ex: Rosas brancas, hortênsias...", conditional_hide: "tipo_cerimonia === 'Não terá cerimônia'" }
        ]
      },
      {
        step: 3,
        label: "Salão",
        icon: Building2,
        fields: [
          { id: "flores_salao", label: "Flores e tonalidades do salão", type: "text", placeholder: "Ex: Rosa claro, verde sage..." },
          { id: "qtd_mesas", label: "Quantidade de mesas de convidados", type: "number", placeholder: "Ex: 15" },
          {
            id: "itens_salao",
            label: "Selecione o que deseja incluir",
            type: "checkbox_pills",
            options: [
              "Arranjos mesa convidados", "Arranjo mesa dos noivos", "Mesa do bolo decorada",
              "Arranjo mesa de Buffet", "Hall de entrada decorado", "Arranjos mesa de café",
              "Mesa de bem-casados", "Tripé para foto dos noivos", "Lounge decorado",
              "Vasos de palmeiras", "Velas / Castiçais", "Peças Provençal"
            ]
          },
          {
            id: "moveis_aluguel",
            label: "Aluguel de mobiliário",
            type: "checkbox_pills",
            options: [
              "Bancos rústicos", "Jogo de sofá", "Conjunto com puffs",
              "Mesa rústica", "Mesa branca Provençal", "Mesa de vidro"
            ]
          },
          { id: "obs_salao", label: "Observações do salão", type: "textarea", placeholder: "Detalhes de altura, cores, referências...", rows: 3 }
        ]
      },
      {
        step: 4,
        label: "Flores & Finais",
        icon: Flower2,
        fields: [
          { id: "bouquet_noiva", label: "Bouquet para a noiva", type: "toggle_sim_nao" },
          { id: "tipo_bouquet", label: "Tipo e estilo do bouquet", type: "text", placeholder: "Ex: Cascata com rosas colombianas vermelhas", conditional_show: "bouquet_noiva === 'Sim'" },
          { id: "qtd_corsages", label: "Corsagens (lapela — noivo e padrinhos)", type: "number", placeholder: "Quantidade total" },
          { id: "obs_finais", label: "Observações finais", type: "textarea", placeholder: "Qualquer detalhe que queira nos contar...", rows: 3 }
        ]
      }
    ]
  },
  paisagismo: {
    title: "Orçamento de Paisagismo",
    subtitle: "Projetos residenciais, comerciais e consultoria técnica com a arquiteta Gabriela Murayama.",
    fields: [
      { id: "nome", label: "Seu nome", type: "text", placeholder: "Nome completo", required: true },
      { id: "telefone", label: "WhatsApp", type: "tel", placeholder: "(19) 99999-9999", required: true },
      {
        id: "tipo_espaco",
        label: "Tipo de espaço",
        type: "radio_pills",
        options: ["Residencial", "Comercial", "Condomínio", "Escritório", "Outro"],
        required: true
      },
      { id: "cidade", label: "Cidade", type: "text", placeholder: "Ex: Americana, Santa Bárbara d'Oeste...", required: false },
      {
        id: "servico_desejado",
        label: "Serviço desejado",
        type: "checkbox_pills",
        options: ["Projeto de jardim novo", "Reforma de jardim existente", "Consultoria técnica", "Manutenção periódica", "Plantas e mudas", "Vasos e decoração externa"]
      },
      { id: "area_estimada", label: "Área estimada (m²)", type: "text", placeholder: "Ex: 50m², não sei ainda...", required: false },
      { id: "descricao", label: "Descreva o projeto ou dúvida", type: "textarea", placeholder: "Conte um pouco sobre o espaço e o que você imagina...", required: false, rows: 4 }
    ]
  }
};

export function OrcamentoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setCurrentStep(0);
    setFormData({});
    setErrors({});
    setIsSuccess(false);
    
    // Set defaults
    const config = formsConfig[id];
    if (config) {
      const initialData: any = {};
      const fields = config.multistep ? config.steps.flatMap((s: any) => s.fields) : config.fields;
      fields.forEach((f: any) => {
        if (f.default) initialData[f.id] = f.default;
        if (f.type === 'checkbox_pills') initialData[f.id] = [];
      });
      setFormData(initialData);
    }
  };

  const handleBack = () => {
    if (selectedCategory && formsConfig[selectedCategory].multistep && currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      setSelectedCategory(null);
      setFormData({});
      setErrors({});
      setIsSuccess(false);
    }
  };

  const updateField = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateFields = (fields: any[]) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      // Check conditional visibility
      if (field.conditional_show) {
        const [depField, depValue] = field.conditional_show.split(' === ').map((s: string) => s.replace(/'/g, ''));
        if (formData[depField] !== depValue) return;
      }
      if (field.conditional_hide) {
        const [depField, depValue] = field.conditional_hide.split(' === ').map((s: string) => s.replace(/'/g, ''));
        if (formData[depField] === depValue) return;
      }

      if (field.required) {
        const val = formData[field.id];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.id] = "Campo obrigatório";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    const config = formsConfig[selectedCategory!];
    const currentFields = config.steps[currentStep].fields;
    
    if (validateFields(currentFields)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const buildWhatsAppMessage = () => {
    let message = "";
    const data = formData;

    if (selectedCategory === 'contato_simples') {
      message = `Olá, Marina Flores! 🌹\n\nMeu nome é ${data.nome || ''}`;
      if (data.telefone) message += ` e meu contato é ${data.telefone}`;
      message += `.\n\n${data.mensagem || ''}\n\nAguardo retorno, obrigado(a)!`;
    } 
    else if (selectedCategory === 'buque_arranjo') {
      message = `Olá, Marina Flores! 🌹 Gostaria de um orçamento.\n\n*Produto:* ${data.tipo_produto || ''}\n*Nome:* ${data.nome || ''}\n*WhatsApp:* ${data.telefone || ''}\n`;
      if (data.ocasiao) message += `*Ocasião:* ${data.ocasiao}\n`;
      if (data.data_entrega) message += `*Data desejada:* ${data.data_entrega}\n`;
      if (data.flores_preferidas) message += `*Flores/cores:* ${data.flores_preferidas}\n`;
      if (data.faixa_valor) message += `*Investimento:* ${data.faixa_valor}\n`;
      if (data.obs) message += `*Obs:* ${data.obs}`;
    }
    else if (selectedCategory === 'decoracao_evento') {
      message = `Olá, Marina Flores! 💐 Gostaria de um orçamento para decoração de evento.\n\n*EVENTO*\nNome: ${data.nome || ''}\nWhatsApp: ${data.telefone || ''}\nTipo: ${data.tipo_evento || ''}\nData: ${data.data_evento || ''}\n`;
      if (data.local_cerimonia) message += `Cerimônia: ${data.local_cerimonia}\n`;
      if (data.local_festa) message += `Festa: ${data.local_festa}\n`;
      if (data.qtd_convidados) message += `Convidados: ${data.qtd_convidados}\n`;
      if (data.nivel_festa) message += `Nível: ${data.nivel_festa}\n`;

      if (data.tipo_cerimonia !== 'Não terá cerimônia') {
        message += `\n*CERIMÔNIA*\nTipo: ${data.tipo_cerimonia || ''}\n`;
        if (data.qtd_altar) message += `Arranjos altar: ${data.qtd_altar}\n`;
        if (data.qtd_corredor) message += `Arranjos corredor: ${data.qtd_corredor}\n`;
        if (data.tapete && data.tapete !== 'Não') message += `Tapete: ${data.tapete}\n`;
        if (data.flores_cerimonia) message += `Flores: ${data.flores_cerimonia}\n`;
      }

      message += `\n*SALÃO*\n`;
      if (data.flores_salao) message += `Flores: ${data.flores_salao}\n`;
      if (data.qtd_mesas) message += `Mesas: ${data.qtd_mesas}\n`;
      if (data.itens_salao?.length > 0) message += `Itens: ${data.itens_salao.join(', ')}\n`;
      if (data.moveis_aluguel?.length > 0) message += `Mobiliário: ${data.moveis_aluguel.join(', ')}\n`;
      if (data.obs_salao) message += `Obs: ${data.obs_salao}\n`;

      message += `\n*FLORES*\n`;
      if (data.bouquet_noiva && data.bouquet_noiva !== 'Não') {
        message += `Bouquet noiva: Sim`;
        if (data.tipo_bouquet) message += ` — ${data.tipo_bouquet}`;
        message += `\n`;
      }
      if (data.qtd_corsages) message += `Corsagens: ${data.qtd_corsages}\n`;
      if (data.obs_finais) message += `Obs finais: ${data.obs_finais}`;
    }
    else if (selectedCategory === 'paisagismo') {
      message = `Olá, Marina Flores! 🌿 Gostaria de um orçamento de paisagismo.\n\n*Nome:* ${data.nome || ''}\n*WhatsApp:* ${data.telefone || ''}\n*Tipo de espaço:* ${data.tipo_espaco || ''}\n`;
      if (data.cidade) message += `*Cidade:* ${data.cidade}\n`;
      if (data.servico_desejado?.length > 0) message += `*Serviços:* ${data.servico_desejado.join(', ')}\n`;
      if (data.area_estimada) message += `*Área estimada:* ${data.area_estimada}\n`;
      if (data.descricao) message += `\n*Descrição:*\n${data.descricao}`;
    }

    // Clean up empty lines
    message = message.replace(/\n{3,}/g, '\n\n').trim();
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = formsConfig[selectedCategory!];
    const fieldsToValidate = config.multistep ? config.steps[currentStep].fields : config.fields;
    
    if (validateFields(fieldsToValidate)) {
      buildWhatsAppMessage();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedCategory(null);
        setFormData({});
        setErrors({});
      }, 5000);
    }
  };

  const renderField = (field: any) => {
    // Check visibility
    if (field.conditional_show) {
      const [depField, depValue] = field.conditional_show.split(' === ').map((s: string) => s.replace(/'/g, ''));
      if (formData[depField] !== depValue) return null;
    }
    if (field.conditional_hide) {
      const [depField, depValue] = field.conditional_hide.split(' === ').map((s: string) => s.replace(/'/g, ''));
      if (formData[depField] === depValue) return null;
    }

    const hasError = !!errors[field.id];
    const baseInputClass = `bg-white/[0.05] border ${hasError ? 'border-red-500' : 'border-white/[0.10]'} focus:border-[#9C1C2B] focus:ring-2 focus:ring-[#9C1C2B]/20 rounded-xl px-4 py-3 text-[#F5F0EB] placeholder:text-white/[0.28] outline-none transition-all w-full text-[14px] font-inter`;

    return (
      <motion.div 
        key={field.id} 
        className="space-y-2"
        animate={hasError ? { x: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <label className="text-[13px] font-normal text-[rgba(245,240,235,0.70)] font-inter block">
          {field.label} {field.required && <span className="text-[#9C1C2B]">*</span>}
        </label>

        {field.type === 'text' || field.type === 'tel' || field.type === 'email' || field.type === 'number' || field.type === 'date' ? (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            className={`${baseInputClass} ${field.type === 'date' ? '[color-scheme:dark]' : ''}`}
          />
        ) : field.type === 'textarea' ? (
          <textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            rows={field.rows || 3}
            className={`${baseInputClass} resize-y`}
          />
        ) : field.type === 'radio_pills' ? (
          <div className="flex flex-wrap gap-2">
            {field.options.map((opt: string) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateField(field.id, opt)}
                className={`px-4 py-2 rounded-full border text-[13px] cursor-pointer transition-all ${
                  formData[field.id] === opt
                    ? 'border-[#9C1C2B] bg-[#9C1C2B]/[0.12] text-[#F5F0EB]'
                    : `border-white/[0.10] text-white/[0.50] hover:border-white/[0.30] ${hasError ? 'border-red-500/50' : ''}`
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : field.type === 'checkbox_pills' ? (
          <div className="flex flex-wrap gap-2">
            {field.options.map((opt: string) => {
              const isSelected = (formData[field.id] || []).includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    const current = formData[field.id] || [];
                    if (isSelected) {
                      updateField(field.id, current.filter((c: string) => c !== opt));
                    } else {
                      updateField(field.id, [...current, opt]);
                    }
                  }}
                  className={`px-4 py-2 rounded-full border text-[13px] cursor-pointer transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'border-[#9C1C2B] bg-[#9C1C2B]/[0.12] text-[#F5F0EB]'
                      : 'border-white/[0.10] text-white/[0.50] hover:border-white/[0.30]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  {opt}
                </button>
              );
            })}
          </div>
        ) : field.type === 'toggle_sim_nao' ? (
          <div className="flex gap-2">
            {['Sim', 'Não'].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => updateField(field.id, opt)}
                className={`px-5 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                  formData[field.id] === opt 
                    ? 'bg-[#9C1C2B] text-[#F5F0EB] border border-[#9C1C2B]' 
                    : 'bg-transparent border border-white/[0.10] text-white/[0.50] hover:border-white/[0.30]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : field.type === 'radio_cards_3' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {field.options.map((opt: any) => {
              const Icon = opt.icon;
              const isSelected = formData[field.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateField(field.id, opt.value)}
                  className={`flex flex-col items-center text-center gap-3 p-4 rounded-xl border transition-all ${
                    isSelected 
                      ? 'border-[#9C1C2B] bg-[#9C1C2B]/[0.08]' 
                      : `bg-white/[0.02] border-white/[0.08] hover:border-white/[0.20] ${hasError ? 'border-red-500/50' : ''}`
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-[#9C1C2B]' : 'text-white/[0.3]'}`} />
                  <div>
                    <div className="text-[13px] text-[#F5F0EB] font-medium mb-1">{opt.value}</div>
                    <div className="text-[11px] text-white/[0.4]">{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
        
        {hasError && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[12px] mt-1">
            {errors[field.id]}
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <section id="orcamento" className="relative py-24 px-6 bg-[#0a0a0a] overflow-hidden z-10 min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--marina-gold)] text-xs uppercase tracking-[0.3em] font-medium mb-4 block"
          >
            Orçamento & Contato
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-[clamp(32px,4vw,48px)] font-normal text-[#F5F0EB] mb-4"
          >
            Como podemos te ajudar?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[15px] font-light text-[rgba(245,240,235,0.55)] max-w-2xl mx-auto font-inter"
          >
            Selecione o tipo de serviço e preencha apenas o que for relevante para você. Em seguida, enviamos tudo direto pelo WhatsApp.
          </motion.p>
        </div>

        {/* Contact Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-x-8 gap-y-4 justify-center mb-16 border-b border-white/[0.05] pb-8"
        >
          {[
            { icon: MapPin, text: "Rua Florindo Cibim, 331 — Americana SP" },
            { icon: Phone, text: "(19) 3462.2571", href: "tel:+551934622571" },
            { icon: Mail, text: "contato@marinaflores.com.br", href: "mailto:contato@marinaflores.com.br" },
            { icon: Clock, text: "Seg–Sáb 7h–18h · Dom e Fer 7h30–12h" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="w-[14px] h-[14px] text-[#9C1C2B]" />
              {item.href ? (
                <a href={item.href} className="text-[13px] text-[rgba(245,240,235,0.55)] hover:text-[#F5F0EB] transition-colors font-inter">
                  {item.text}
                </a>
              ) : (
                <span className="text-[13px] text-[rgba(245,240,235,0.55)] font-inter">{item.text}</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Dynamic Content */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="categories"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
              >
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="glass-card cursor-pointer border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[#9C1C2B]/50 hover:bg-[#9C1C2B]/[0.05] hover:-translate-y-1 relative overflow-hidden group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center transition-colors group-hover:bg-[#9C1C2B]/20">
                      <cat.icon className="w-5 h-5 text-[rgba(245,240,235,0.60)] group-hover:text-[#9C1C2B] transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-[17px] font-normal text-[#F5F0EB] mb-1">{cat.title}</h3>
                      <p className="text-[12px] font-light text-[rgba(245,240,235,0.50)] font-inter leading-relaxed">{cat.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="max-w-2xl mx-auto w-full"
              >
                <div className="mb-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[13px] text-[rgba(245,240,235,0.50)] hover:text-[#F5F0EB] transition-colors font-inter mb-6"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar para categorias
                  </button>
                  <h3 className="font-playfair text-3xl text-[#F5F0EB] mb-2">{formsConfig[selectedCategory].title}</h3>
                  <p className="text-[14px] text-[rgba(245,240,235,0.55)] font-inter">{formsConfig[selectedCategory].subtitle}</p>
                </div>

                {formsConfig[selectedCategory].multistep && (
                  <div className="relative flex justify-between items-center mb-12">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white/[0.10]" />
                    <motion.div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#9C1C2B]/50"
                      animate={{ width: `${(currentStep / (formsConfig[selectedCategory].steps.length - 1)) * 100}%` }}
                    />
                    {formsConfig[selectedCategory].steps.map((step: any, i: number) => (
                      <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                            i === currentStep ? 'bg-[#9C1C2B] border-[#9C1C2B]' : 
                            i < currentStep ? 'bg-[#0a0a0a] border-[#9C1C2B]' : 
                            'bg-[#0a0a0a] border-white/[0.15]'
                          }`}
                        >
                          {i < currentStep ? (
                            <Check className="w-4 h-4 text-[#9C1C2B]" />
                          ) : (
                            <span className={`text-[12px] font-inter ${i === currentStep ? 'text-white' : 'text-white/[0.3]'}`}>{i + 1}</span>
                          )}
                        </div>
                        <span className={`text-[10px] font-medium tracking-widest uppercase font-inter ${i <= currentStep ? 'text-[#9C1C2B]' : 'text-white/[0.3]'}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#9C1C2B]/20 flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-[#9C1C2B]" />
                    </div>
                    <h3 className="font-playfair text-2xl text-[#F5F0EB]">Redirecionando para o WhatsApp...</h3>
                    <p className="text-[15px] text-[rgba(245,240,235,0.55)] font-inter max-w-sm">
                      Sua mensagem foi gerada com sucesso. Se a janela não abriu automaticamente, verifique o bloqueador de pop-ups.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {formsConfig[selectedCategory].multistep ? (
                          formsConfig[selectedCategory].steps[currentStep].fields.map((field: any, i: number) => (
                            <motion.div key={field.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                              {renderField(field)}
                            </motion.div>
                          ))
                        ) : (
                          formsConfig[selectedCategory].fields.map((field: any, i: number) => (
                            <motion.div key={field.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                              {renderField(field)}
                            </motion.div>
                          ))
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="pt-8 mt-8 border-t border-white/[0.08]">
                      {formsConfig[selectedCategory].multistep && currentStep < formsConfig[selectedCategory].steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="w-full rounded-full py-4 bg-[#9C1C2B] text-[#F5F0EB] font-medium text-[15px] hover:bg-[#C4253A] hover:shadow-[0_8px_32px_rgba(156,28,43,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 font-inter group"
                        >
                          Próximo <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full rounded-full py-4 bg-[#9C1C2B] text-[#F5F0EB] font-medium text-[15px] hover:bg-[#C4253A] hover:shadow-[0_8px_32px_rgba(156,28,43,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 font-inter group"
                        >
                          Enviar pelo WhatsApp <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
