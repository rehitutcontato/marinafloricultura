import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarHeart, Church, Sparkles, Flower2, 
  ChevronRight, ChevronLeft, Send, Check,
  Star, Heart, Sparkle
} from 'lucide-react';

const steps = [
  { title: "Gerais", icon: CalendarHeart },
  { title: "Cerimônia", icon: Church },
  { title: "Salão", icon: Sparkles },
  { title: "Final", icon: Flower2 }
];

export function OrcamentoForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<any>({
    nome: '', email: '', data_evento: '', local_cerimonia: '', local_festa: '', quantidade_convidados: '', nivel_festa: '',
    tipo_cerimonia: '', qtd_arranjos_altar: '', qtd_arranjos_corredor: '', tapete: 'Não', flores_cerimonia: '', obs_cerimonia: '',
    flores_salao: '', hall_moveis_rusticos: 'Não', arranjos_cafe: 'Não', mesa_bem_casados_aluguel: 'Não', arranjo_bem_casados: 'Não', tripe_foto: 'Não',
    mesa_rustica: 'Não', mesa_branca: 'Não', mesa_vidro_bolo: 'Não', mesa_bolo_outros: '',
    qtd_mesas_convidados: '', arranjo_vidro: 'Não', arranjo_cachepots: 'Não', arranjo_porcelana: 'Não', obs_convidados: '',
    arranjo_noivos_diferenciado: 'Não', obs_noivos: '',
    lounge_rustico: 'Não', lounge_sofa: 'Não', lounge_puffs: 'Não', obs_lounge: '',
    qtd_palmeiras: '', arranjo_buffet: 'Não', bouquet_noiva: 'Não', tipo_bouquet: '', qtd_corsages: '',
    complementos: [], obs_finais: ''
  });

  const updateField = (id: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.nome || !formData.email || !formData.data_evento) {
        alert("Por favor, preencha os campos obrigatórios.");
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let message = `Olá, Marina Flores! 🌹 Gostaria de solicitar um orçamento para decoração de evento.\n\n`;
    
    message += `*DADOS GERAIS*\n`;
    message += `Nome: ${formData.nome}\n`;
    message += `E-mail: ${formData.email}\n`;
    message += `Data: ${formData.data_evento}\n`;
    if (formData.local_cerimonia) message += `Local Cerimônia: ${formData.local_cerimonia}\n`;
    if (formData.local_festa) message += `Local Festa: ${formData.local_festa}\n`;
    if (formData.quantidade_convidados) message += `Convidados: ${formData.quantidade_convidados}\n`;
    if (formData.nivel_festa) message += `Nível: ${formData.nivel_festa}\n\n`;

    message += `*CERIMÔNIA*\n`;
    if (formData.tipo_cerimonia) message += `Tipo: ${formData.tipo_cerimonia}\n`;
    if (formData.qtd_arranjos_altar) message += `Arranjos Altar: ${formData.qtd_arranjos_altar}\n`;
    if (formData.qtd_arranjos_corredor) message += `Arranjos Corredor: ${formData.qtd_arranjos_corredor}\n`;
    message += `Tapete: ${formData.tapete}\n`;
    if (formData.flores_cerimonia) message += `Flores: ${formData.flores_cerimonia}\n`;
    if (formData.obs_cerimonia) message += `Obs: ${formData.obs_cerimonia}\n\n`;

    message += `*SALÃO*\n`;
    if (formData.flores_salao) message += `Flores: ${formData.flores_salao}\n`;
    message += `Móveis Rústicos: ${formData.hall_moveis_rusticos}\n`;
    message += `Arranjos Café: ${formData.arranjos_cafe}\n`;
    message += `Mesa Bem-casados: ${formData.mesa_bem_casados_aluguel}\n`;
    message += `Arranjo Bem-casados: ${formData.arranjo_bem_casados}\n`;
    if (formData.qtd_mesas_convidados) message += `Mesas Convidados: ${formData.qtd_mesas_convidados}\n`;
    if (formData.obs_convidados) message += `Obs Convidados: ${formData.obs_convidados}\n\n`;

    message += `*COMPLEMENTOS*\n`;
    if (formData.qtd_palmeiras) message += `Palmeiras: ${formData.qtd_palmeiras}\n`;
    message += `Bouquet: ${formData.bouquet_noiva}${formData.tipo_bouquet ? ` (${formData.tipo_bouquet})` : ''}\n`;
    if (formData.qtd_corsages) message += `Corsagens: ${formData.qtd_corsages}\n`;
    if (formData.complementos.length > 0) message += `Complementos: ${formData.complementos.join(', ')}\n`;
    if (formData.obs_finais) message += `Obs Finais: ${formData.obs_finais}`;

    const whatsappUrl = `https://wa.me/551934622571?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const renderInput = (id: string, label: string, type: string = 'text', placeholder?: string, required: boolean = false) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[13px] font-normal text-[rgba(245,240,235,0.70)] block">
        {label} {required && <span className="text-[#9C1C2B]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={formData[id]}
        onChange={(e) => updateField(id, e.target.value)}
        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] rounded-[12px] px-4 py-3 text-[#F5F0EB] text-[14px] placeholder-[rgba(245,240,235,0.30)] focus:border-[#9C1C2B] focus:outline-none focus:ring-4 focus:ring-[#9C1C2B]/15 transition-all"
      />
    </div>
  );

  const renderToggle = (id: string, label: string) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-[13px] text-[rgba(245,240,235,0.70)]">{label}</span>
      <div className="flex gap-2">
        {['Sim', 'Não'].map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => updateField(id, opt)}
            className={`px-5 py-2 rounded-lg text-[13px] transition-all duration-200 ${
              formData[id] === opt 
                ? 'bg-[#9C1C2B] text-white' 
                : 'bg-transparent border border-[rgba(255,255,255,0.10)] text-[rgba(245,240,235,0.50)] hover:border-white/20'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSubsection = (title: string) => (
    <h4 className="font-playfair text-[16px] text-[#D4AF87] border-bottom border-[rgba(212,175,135,0.20)] pb-2 mt-8 mb-4">
      {title}
    </h4>
  );

  return (
    <div className="glass-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-[#9C1C2B]/20 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-[#9C1C2B]" />
            </div>
            <h3 className="font-playfair text-3xl text-[#F5F0EB] mb-4">Orçamento enviado!</h3>
            <p className="text-[15px] text-[rgba(245,240,235,0.55)] max-w-xs">
              Aguarde nosso contato pelo WhatsApp. Nossa equipe entrará em contato em breve.
            </p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-8 text-[13px] text-[#9C1C2B] hover:underline"
            >
              Enviar outro orçamento
            </button>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {/* Progress Bar */}
            <div className="relative flex justify-between items-center max-w-md mx-auto mb-12">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[rgba(255,255,255,0.15)]" />
              <motion.div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#9C1C2B]"
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
              {steps.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      i <= currentStep ? 'bg-[#9C1C2B] border-[#9C1C2B]' : 'bg-[#0a0a0a] border-[rgba(255,255,255,0.15)]'
                    }`}
                  >
                    {i < currentStep ? <Check className="w-5 h-5 text-white" /> : <step.icon className={`w-5 h-5 ${i === currentStep ? 'text-white' : 'text-[rgba(255,255,255,0.3)]'}`} />}
                  </div>
                  <span className={`text-[10px] font-medium tracking-wider uppercase ${i <= currentStep ? 'text-[#9C1C2B]' : 'text-[rgba(255,255,255,0.3)]'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {currentStep === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="font-playfair text-2xl text-[#F5F0EB] mb-2">Dados Gerais do Evento</h3>
                        <p className="text-[14px] text-[rgba(245,240,235,0.50)] mb-6">Comece nos contando o básico sobre o seu grande dia.</p>
                      </div>
                      {renderInput('nome', 'Nome completo', 'text', 'Seu nome', true)}
                      {renderInput('email', 'E-mail', 'email', 'seu@email.com', true)}
                      {renderInput('data_evento', 'Data do Evento', 'date', '', true)}
                      {renderInput('quantidade_convidados', 'Quantidade de Convidados', 'number', 'Ex: 150')}
                      {renderInput('local_cerimonia', 'Local da Cerimônia', 'text', 'Nome e endereço')}
                      {renderInput('local_festa', 'Local da Festa / Recepção', 'text', 'Nome e endereço')}
                      
                      <div className="md:col-span-2 space-y-4">
                        <label className="text-[13px] font-normal text-[rgba(245,240,235,0.70)] block">
                          Como você definiria sua festa?
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: 'Simples', icon: Star },
                            { label: 'Médio', icon: Heart },
                            { label: 'Sofisticado', icon: Sparkle }
                          ].map(opt => (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => updateField('nivel_festa', opt.label)}
                              className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all ${
                                formData.nivel_festa === opt.label 
                                  ? 'bg-[#9C1C2B]/10 border-[#9C1C2B]' 
                                  : 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] hover:border-white/20'
                              }`}
                            >
                              <opt.icon className={`w-5 h-5 ${formData.nivel_festa === opt.label ? 'text-[#9C1C2B]' : 'text-[rgba(245,240,235,0.3)]'}`} />
                              <span className="text-[12px] text-[#F5F0EB]">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-playfair text-2xl text-[#F5F0EB] mb-2">Cerimônia</h3>
                        <p className="text-[14px] text-[rgba(245,240,235,0.50)] mb-6">Detalhes sobre o local onde o "sim" será dito.</p>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-[13px] text-[rgba(245,240,235,0.70)]">Tipo de cerimônia</span>
                        <div className="flex gap-2">
                          {['Religiosa', 'Efeito Civil'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => updateField('tipo_cerimonia', opt)}
                              className={`px-5 py-2 rounded-lg text-[13px] transition-all ${
                                formData.tipo_cerimonia === opt 
                                  ? 'bg-[#9C1C2B] text-white' 
                                  : 'bg-transparent border border-[rgba(255,255,255,0.10)] text-[rgba(245,240,235,0.50)]'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderInput('qtd_arranjos_altar', 'Arranjos para o altar', 'number', 'Ex: 4')}
                        {renderInput('qtd_arranjos_corredor', 'Arranjos para o corredor', 'number', 'Ex: 10')}
                      </div>
                      {renderToggle('tapete', 'Tapete para corredor')}
                      {renderInput('flores_cerimonia', 'Tipos de Flores e Tonalidades', 'text', 'Ex: Rosas vermelhas, lírios brancos...')}
                      <div className="space-y-2">
                        <label className="text-[13px] font-normal text-[rgba(245,240,235,0.70)] block">Observações</label>
                        <textarea
                          value={formData.obs_cerimonia}
                          onChange={(e) => updateField('obs_cerimonia', e.target.value)}
                          className="w-full h-24 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] rounded-[12px] px-4 py-3 text-[#F5F0EB] text-[14px] focus:border-[#9C1C2B] focus:outline-none transition-all resize-none"
                          placeholder="Algum detalhe especial?"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                      <div>
                        <h3 className="font-playfair text-2xl text-[#F5F0EB] mb-2">Salão de Festas</h3>
                        <p className="text-[14px] text-[rgba(245,240,235,0.50)] mb-6">A ambientação da sua recepção.</p>
                      </div>
                      
                      {renderSubsection("Decoração Geral")}
                      {renderInput('flores_salao', 'Tipos de Flores e Tonalidades', 'text', 'Ex: Peônias rosa, eucalipto...')}
                      {renderToggle('hall_moveis_rusticos', 'Hall de entrada — Móveis rústicos')}
                      {renderToggle('arranjos_cafe', 'Arranjos para mesa de café')}
                      {renderToggle('mesa_bem_casados_aluguel', 'Alugar mesa para Bem-casados')}
                      {renderToggle('arranjo_bem_casados', 'Arranjo para mesa de Bem-casados')}
                      {renderToggle('tripe_foto', 'Alugar tripé para foto dos noivos')}

                      {renderSubsection("Mesa do Bolo")}
                      {renderToggle('mesa_rustica', 'Mesa de madeira rústica')}
                      {renderToggle('mesa_branca', 'Mesa de madeira branca (Provençal)')}
                      {renderToggle('mesa_vidro_bolo', 'Mesa de vidro')}
                      {renderInput('mesa_bolo_outros', 'Outros (descreva)', 'text', 'Descreva se necessário')}

                      {renderSubsection("Mesa dos Convidados")}
                      {renderInput('qtd_mesas_convidados', 'Quantidade de mesas', 'number', 'Ex: 15')}
                      {renderToggle('arranjo_vidro', 'Arranjos em vidro')}
                      {renderToggle('arranjo_cachepots', 'Arranjos em cachepots rústicos')}
                      {renderToggle('arranjo_porcelana', 'Arranjos em porcelana branca')}

                      {renderSubsection("Mesa dos Noivos")}
                      {renderToggle('arranjo_noivos_diferenciado', 'Deseja arranjo diferenciado?')}
                      
                      {renderSubsection("Lounge")}
                      {renderToggle('lounge_rustico', 'Bancos rústicos')}
                      {renderToggle('lounge_sofa', 'Jogo de sofá')}
                      {renderToggle('lounge_puffs', 'Conjunto com puffs')}
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-playfair text-2xl text-[#F5F0EB] mb-2">Complementos & Bouquet</h3>
                        <p className="text-[14px] text-[rgba(245,240,235,0.50)] mb-6">Os toques finais que fazem a diferença.</p>
                      </div>
                      {renderInput('qtd_palmeiras', 'Vasos de palmeiras para o salão', 'number', 'Ex: 6')}
                      {renderToggle('arranjo_buffet', 'Arranjo para mesa de Buffet')}
                      {renderToggle('bouquet_noiva', 'Bouquet para a noiva')}
                      {formData.bouquet_noiva === 'Sim' && renderInput('tipo_bouquet', 'Tipo de bouquet — Flores e estilo', 'text', 'Ex: Cascata com rosas colombianas')}
                      {renderInput('qtd_corsages', 'Quantidade de corsagens (lapelas)', 'number', 'Ex: 5')}
                      
                      <div className="space-y-3">
                        <label className="text-[13px] font-normal text-[rgba(245,240,235,0.70)] block">Complementos para incluir</label>
                        <div className="flex flex-wrap gap-2">
                          {['Velas', 'Castiçais', 'Peças Provençal'].map(opt => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                const current = formData.complementos;
                                if (current.includes(opt)) {
                                  updateField('complementos', current.filter((c: string) => c !== opt));
                                } else {
                                  updateField('complementos', [...current, opt]);
                                }
                              }}
                              className={`px-4 py-2 rounded-full text-[13px] transition-all ${
                                formData.complementos.includes(opt)
                                  ? 'bg-[#9C1C2B] text-white'
                                  : 'bg-transparent border border-[rgba(255,255,255,0.10)] text-[rgba(245,240,235,0.50)] hover:border-white/20'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[13px] font-normal text-[rgba(245,240,235,0.70)] block">Observações finais</label>
                        <textarea
                          value={formData.obs_finais}
                          onChange={(e) => updateField('obs_finais', e.target.value)}
                          className="w-full h-24 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] rounded-[12px] px-4 py-3 text-[#F5F0EB] text-[14px] focus:border-[#9C1C2B] focus:outline-none transition-all resize-none"
                          placeholder="Qualquer detalhe adicional..."
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-[14px] transition-all ${
                    currentStep === 0 
                      ? 'opacity-0 pointer-events-none' 
                      : 'text-[rgba(245,240,235,0.50)] hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    type="submit"
                    className="flex items-center gap-3 bg-[#9C1C2B] text-white px-8 py-4 rounded-full text-[14px] font-medium hover:bg-[#C4253A] transition-all hover:shadow-[0_12px_40px_rgba(156,28,43,0.35)] active:scale-95"
                  >
                    <Send className="w-4 h-4" /> Enviar Orçamento
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-3 bg-[#9C1C2B] text-white px-8 py-4 rounded-full text-[14px] font-medium hover:bg-[#C4253A] transition-all active:scale-95"
                  >
                    Próximo <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
