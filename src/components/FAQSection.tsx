import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'Por que a potência média consumida é muito menor que a potência da fonte?',
    answer:
      'A fonte da impressora (geralmente de 240W a 350W) é dimensionada para suportar o pico de partida, quando a mesa aquecida e o bico extrusor ligam simultaneamente. Após atingirem a temperatura de trabalho configurada (ex: 200°C no bico e 60°C na mesa para PLA), o controle térmico PID desliga e liga a resistência em pulsos muito rápidos apenas para manter a temperatura, reduzindo a potência média efetiva para cerca de 90W a 140W.',
  },
  {
    question: 'Como descubro o valor exato do kWh cobrado na minha conta de luz?',
    answer:
      'Para encontrar a tarifa real completa no Brasil, pegue o valor total em reais da sua fatura de energia elétrica (incluindo taxa de iluminação pública, impostos como ICMS, PIS/COFINS e adicionais de bandeiras tarifárias verde/amarela/vermelha) e divida pelo total de kWh consumidos naquele mês. No Brasil, essa média normalmente varia entre R$ 0,75 e R$ 1,20 por kWh.',
  },
  {
    question: 'Qual é a vida útil estimada de uma impressora 3D FDM?',
    answer:
      'Em média, uma impressora doméstica de uso contínuo (como Ender 3, Neptune, Artillery ou Anycubic) opera com confiabilidade entre 5.000 e 6.000 horas de impressão antes de exigir manutenções maiores ou substituição de componentes estruturais. Impressoras industriais ou semi-profissionais (como Bambu Lab, Prusa MK4) costumam ultrapassar 8.000 a 10.000 horas.',
  },
  {
    question: 'O fatiador já inclui o peso de suportes e preenchimento (infill)?',
    answer:
      'Sim! Softwares de fatiamento modernos (como Cura, Bambu Studio, OrcaSlicer e PrusaSlicer) calculam o filamento total consumido levando em conta as paredes perimétricas, densidade e padrão de preenchimento, suportes normais ou em árvore (tree support), saia (skirt), borda (brim) e balsa (raft). Basta copiar o peso exibido no resumo do fatiador.',
  },
  {
    question: 'Qual margem de lucro devo aplicar sobre o custo calculado?',
    answer:
      'Para serviços de prototipagem rápida e peças exclusivas sob encomenda, a margem bruta de lucro costuma variar entre 100% e 250% sobre o custo direto fabril. Para produtos em série ou atacado (como chaveiros e brindes promocionais), margens de 50% a 100% são comuns devido ao ganho em escala e menor tempo de atendimento por unidade.',
  },
  {
    question: 'Como contabilizar peças que falham durante a impressão?',
    answer:
      'Recomendamos adicionar um fator de risco operacional (markup de perdas) de 5% a 15% ao custo final do trabalho. Em impressoras bem calibradas operando com filamentos secos e de qualidade, a taxa de perda tende a ficar abaixo de 5%.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="perguntas-frequentes"
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mt-6 text-slate-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Perguntas Frequentes sobre Custos em Impressão 3D
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Respostas técnicas diretas para as dúvidas mais comuns de empreendedores e hobbistas
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQS_DATA.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? 'bg-slate-50/80 border-blue-200/80 shadow-2xs' : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 min-h-[48px] focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 mt-1">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
