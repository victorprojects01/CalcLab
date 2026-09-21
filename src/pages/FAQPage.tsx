import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ArrowLeft,
  Search,
  Zap,
  Layers,
  Cpu,
  DollarSign,
  Calculator,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { AdSenseUnit } from '../components/AdSenseUnit';

interface FAQPageProps {
  onNavigateToCalculator: () => void;
}

interface FAQItem {
  id: string;
  category: 'energia' | 'filamento' | 'maquina' | 'precificacao';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQS_DETAILED: FAQItem[] = [
  {
    id: 'potencia-media',
    category: 'energia',
    question: 'Por que a potência média consumida é muito menor que a potência da fonte?',
    answer:
      'A fonte da impressora (geralmente de 240W a 350W) é dimensionada pela engenharia para suportar o pico de partida, quando a mesa aquecida e o bico extrusor ligam simultaneamente em potência máxima. Após atingirem a temperatura de trabalho configurada (ex: 200°C no bico e 60°C na mesa para PLA), o controle térmico PID desliga e liga a resistência em pulsos muito rápidos apenas para manter a temperatura estável, reduzindo a potência média efetiva para cerca de 90W a 140W.',
    highlight: 'Uma impressora com fonte de 350W consome em média apenas 100W a 120W imprimindo PLA.',
  },
  {
    id: 'tarifa-kwh',
    category: 'energia',
    question: 'Como descubro o valor exato do kWh cobrado na minha conta de luz?',
    answer:
      'Para encontrar a tarifa real completa no Brasil, pegue o valor total em reais da sua fatura de energia elétrica (incluindo taxa de iluminação pública municipal, impostos como ICMS, PIS/COFINS e adicionais de bandeiras tarifárias verde/amarela/vermelha) e divida pelo total de kWh consumidos naquele mês. No Brasil, essa média normalmente varia entre R$ 0,75 e R$ 1,25 por kWh.',
    highlight: 'Fórmula simples: Valor Total da Conta (R$) ÷ Consumo Faturado (kWh).',
  },
  {
    id: 'vida-util',
    category: 'maquina',
    question: 'Qual é a vida útil estimada de uma impressora 3D FDM?',
    answer:
      'Em média, uma impressora doméstica de uso contínuo (como Ender 3, Neptune, Artillery ou Anycubic) opera com confiabilidade entre 5.000 e 6.000 horas de impressão antes de exigir manutenções maiores ou substituição de componentes estruturais. Impressoras industriais ou semi-profissionais CoreXY fechadas (como Bambu Lab, Voron ou Prusa MK4) costumam ultrapassar 8.000 a 10.000 horas.',
    highlight: 'Divida o valor da impressora por 5.000 ou 6.000 horas para achar a depreciação por hora.',
  },
  {
    id: 'suporte-slicer',
    category: 'filamento',
    question: 'O fatiador já inclui o peso de suportes, saias e preenchimento (infill)?',
    answer:
      'Sim! Softwares de fatiamento modernos (como Cura, Bambu Studio, OrcaSlicer e PrusaSlicer) calculam o filamento total consumido levando em conta todas as paredes perimétricas, densidade e padrão de preenchimento, suportes normais ou em árvore (tree support), saia (skirt), borda (brim), balsa (raft) e até torres de purga multicoloridas. Você deve sempre copiar o peso exibido no resumo do fatiador, e não pesar a peça limpa.',
    highlight: 'Copie sempre o peso do fatiador, pois ele contabiliza todo o plástico que sai do bico.',
  },
  {
    id: 'margem-lucro',
    category: 'precificacao',
    question: 'Qual margem de lucro devo aplicar sobre o custo fabril calculado?',
    answer:
      'Para serviços de prototipagem rápida e peças exclusivas sob encomenda, a margem bruta de lucro costuma variar entre 100% e 250% sobre o custo direto fabril. Para produtos em série ou atacado (como chaveiros e brindes corporativos), margens de 50% a 100% são comuns devido ao ganho em escala e menor tempo de atendimento por unidade.',
    highlight: 'Prototipagem e exclusividades: 100% a 250%. Peças seriadas e atacado: 50% a 100%.',
  },
  {
    id: 'taxa-perdas',
    category: 'precificacao',
    question: 'Como contabilizar peças que falham durante a impressão?',
    answer:
      'Recomendamos adicionar um fator de risco operacional (markup de perdas) de 5% a 15% ao custo final do trabalho. Em impressoras bem calibradas operando com filamentos secos e de qualidade, a taxa de perda tende a ficar abaixo de 5%. Se o trabalho for longo (mais de 20 horas), adicione 10% a 15% devido ao risco maior de interrupções.',
    highlight: 'Adicione de 5% a 15% de margem de risco para absorver eventuais falhas.',
  },
  {
    id: 'filamento-carretel',
    category: 'filamento',
    question: 'Como calcular quando o carretel vem com peso diferente de 1 kg?',
    answer:
      'Alguns fabricantes vendem carretéis de 500g, 750g ou até 2,5kg. Nossa calculadora permite ajustar o peso líquido exato do carretel. A regra matemática é sempre dividir o preço pago pelo peso útil em gramas para obter o preço por grama. Por exemplo: um carretel de 500g comprado por R$ 60,00 custa R$ 0,12 por grama.',
    highlight: 'Preço por grama = Preço do Carretel (R$) ÷ Peso Líquido (g).',
  },
  {
    id: 'acessorios-rateio',
    category: 'precificacao',
    question: 'Como fazer o rateio de parafusos, ímãs e argolas de chaveiro?',
    answer:
      'Se você compra um pacote com 100 argolas de chaveiro por R$ 25,00, cada argola custa R$ 0,25. Se a peça utiliza 1 argola, o custo é de R$ 0,25. A nossa calculadora possui um bloco dedicado de Acessórios & Acabamento que automatiza essa divisão e guarda os itens no seu navegador para você reutilizar nos próximos orçamentos.',
    highlight: 'Guarde seus acessórios comuns na calculadora para puxar o custo em um clique.',
  },
];

type CategoryFilter = 'todas' | 'energia' | 'filamento' | 'maquina' | 'precificacao';

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigateToCalculator }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todas');
  const [openFaqId, setOpenFaqId] = useState<string | null>('potencia-media');

  const filteredFaqs = useMemo(() => {
    return FAQS_DETAILED.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'todas' || faq.category === selectedCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 text-slate-800">
      {/* Barra de Navegação Superior / Voltar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onNavigateToCalculator}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3.5 py-2 rounded-xl transition-all cursor-pointer min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Calculadora</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Central de Dúvidas Técnicas</span>
        </div>
      </div>

      {/* Bloco de Anúncio Superior (AdSense) */}
      <div className="mb-8">
        <AdSenseUnit
          slotId={import.meta.env.VITE_ADSENSE_SLOT_TOP || 'adsense-faq-topo'}
          format="horizontal"
          label="Publicidade • Google AdSense"
        />
      </div>

      {/* Cabeçalho da Página */}
      <header className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Perguntas Frequentes (FAQ)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Perguntas Frequentes sobre Custos e Precificação 3D
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          Respostas técnicas detalhadas e fundamentadas sobre energia elétrica, fatiadores, depreciação mecânica e margem comercial.
        </p>
      </header>

      {/* Barra de Pesquisa e Filtros por Categoria */}
      <div className="space-y-4 mb-8">
        {/* Campo de Busca */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar dúvida (ex: conta de luz, fatiador, margem, depreciação)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-2xs"
          />
        </div>

        {/* Abas de Categoria */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('todas')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[38px] ${
              selectedCategory === 'todas'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            Todas ({FAQS_DETAILED.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('energia')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[38px] ${
              selectedCategory === 'energia'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Energia & Luz</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('filamento')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[38px] ${
              selectedCategory === 'filamento'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Filamentos</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('maquina')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[38px] ${
              selectedCategory === 'maquina'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Impressora</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('precificacao')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[38px] ${
              selectedCategory === 'precificacao'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Precificação & Lucro</span>
          </button>
        </div>
      </div>

      {/* Lista de Acordeões com as Dúvidas */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">Nenhuma pergunta encontrada</p>
            <p className="text-xs mt-1">Tente pesquisar com outros termos ou limpe o campo de busca.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50/80 border-blue-300 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 min-h-[52px] focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
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
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/70 mt-1 space-y-3">
                    <p className="pt-2">{faq.answer}</p>
                    {faq.highlight && (
                      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 font-medium flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bloco de Anúncio Intermediário */}
      <div className="my-10">
        <AdSenseUnit
          slotId={import.meta.env.VITE_ADSENSE_SLOT_INLINE || 'adsense-faq-meio'}
          format="auto"
          label="Publicidade"
        />
      </div>

      {/* Box de Contato se a dúvida não estiver aqui */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/60 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            Ainda tem alguma dúvida técnica sobre seu projeto?
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Volte para a calculadora interativa para simular o custo de filamento e energia agora mesmo.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToCalculator}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all cursor-pointer min-h-[44px] touch-manipulation shrink-0"
        >
          <Calculator className="w-4 h-4" />
          <span>Abrir Calculadora</span>
        </button>
      </div>

      {/* Bloco de Anúncio Rodapé */}
      <div className="mt-10">
        <AdSenseUnit
          slotId={import.meta.env.VITE_ADSENSE_SLOT_FOOTER || 'adsense-faq-rodape'}
          format="auto"
          label="Publicidade"
        />
      </div>
    </div>
  );
};
