import React from 'react';
import {
  BookOpen,
  Zap,
  Layers,
  Cpu,
  TrendingUp,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  ShieldCheck,
  Clock,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';

interface GuidePageProps {
  onNavigateToCalculator: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigateToCalculator }) => {
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
          <Clock className="w-3.5 h-3.5" />
          <span>Tempo de leitura: ~6 min</span>
        </div>
      </div>

      {/* Cabeçalho da Página */}
      <header className="mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100/80 text-blue-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Manual de Gestão & Engenharia de Custos</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Guia Completo: Como Calcular o Custo Real de Impressão 3D e Precificar com Lucro
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          Descubra os 5 pilares matemáticos indispensáveis da manufatura aditiva FDM. Aprenda a mensurar consumo elétrico real, perda de filamento no fatiador, depreciação de máquina e formação de margem para nunca mais ter prejuízo invisível.
        </p>
      </header>

      {/* Artigo Principal Estruturado */}
      <article className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">
        {/* Seção 1: O Prejuízo Invisível */}
        <section className="space-y-4 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
          <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base sm:text-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <h2>1. A Ilusão do "Custo de Filamento" e a Armadilha da Regra dos 3x</h2>
          </div>
          <p>
            Muitos makers e iniciantes no mercado de impressão 3D cometem o erro grave de calcular o preço de suas peças usando a chamada <em>"regra de padaria"</em>: pesar a peça pronta na balança e multiplicar o valor do plástico por 3 ou 4.
          </p>
          <p>
            Essa abordagem ignora quatro custos operacionais vitais: a energia elétrica gasta em impressões longas, o desgaste mecânico irreversível da impressora, o tempo de operador para fatiamento/nivelamento e os insumos de acabamento. O resultado frequente é o <strong>prejuízo invisível</strong>: o maker acredita estar lucrando, mas na primeira manutenção de placa, troca de bico ou reposição de motor de passo, o fluxo de caixa entra no vermelho.
          </p>
        </section>

        {/* Seção 2: Pilar 1 - Filamento */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <h2>Pilar 1: Matéria-Prima — Filamento, Suportes e Purgas</h2>
          </div>
          <p>
            O custo básico do filamento é o cálculo direto da fração consumida do carretel. No entanto, um carretel de 1kg (1.000g) que custou R$ 100,00 possui um custo unitário de R$ 0,10 por grama.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            Custo Filamento (R$) = Gramas Fatiadas (g) × [ Preço do Carretel (R$) / Peso Líquido (g) ]
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <p className="font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Por que confiar apenas no Fatiador (Slicer)?
            </p>
            <p className="text-slate-600">
              Nunca use apenas o peso da peça limpa após remover suportes. Softwares como Cura, Bambu Studio, PrusaSlicer e OrcaSlicer já calculam com precisão milimétrica:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1 pl-2">
              <li>Paredes perimétricas e preenchimento interno (infill);</li>
              <li>Estruturas de suporte (suportes normais ou suportes em árvore);</li>
              <li>Elementos de adesão à mesa: saia (skirt), borda (brim) e balsa (raft);</li>
              <li>Torres de purga (purge towers) utilizadas em impressões multicoloridas.</li>
            </ul>
          </div>
        </section>

        {/* Seção 3: Pilar 2 - Energia Elétrica */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <h2>Pilar 2: Consumo Elétrico Real (kWh) vs. Potência da Fonte</h2>
          </div>
          <p>
            Um mito muito comum é supor que uma impressora com fonte de 350W consome 350 Watts o tempo todo. Isso é falso. A fonte é dimensionada para fornecer energia suficiente apenas durante o pico de aquecimento simultâneo do bico e da mesa aquecida.
          </p>
          <p>
            Assim que a mesa atinge 60°C e o bico atinge 200°C, o algoritmo térmico PID (Proportional-Integral-Derivative) passa a pulsar a energia em frações de segundo para manter a temperatura estável.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Material Típico</th>
                  <th className="p-3">Temperatura da Mesa</th>
                  <th className="p-3">Potência Média Real</th>
                  <th className="p-3">Consumo em 10 Horas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">PLA</td>
                  <td className="p-3">55°C – 60°C</td>
                  <td className="p-3">100W – 130W</td>
                  <td className="p-3">1,0 a 1,3 kWh (~R$ 1,00)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">PETG</td>
                  <td className="p-3">70°C – 80°C</td>
                  <td className="p-3">140W – 180W</td>
                  <td className="p-3">1,4 a 1,8 kWh (~R$ 1,50)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">ABS / ASA</td>
                  <td className="p-3">95°C – 110°C</td>
                  <td className="p-3">220W – 300W</td>
                  <td className="p-3">2,2 a 3,0 kWh (~R$ 2,50)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            Custo Energia (R$) = [ (Potência Média em Watts / 1000) × Horas de Impressão ] × Tarifa do kWh (R$)
          </div>
        </section>

        {/* Seção 4: Pilar 3 - Depreciação e Manutenção */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <h2>Pilar 3: Depreciação Mecânica e Fundo de Manutenção</h2>
          </div>
          <p>
            A impressora 3D é uma máquina com partes móveis sob atrito contínuo e estresse térmico. Bicos sofrem abrasão pelo plástico, tubos de teflon (PTFE) degradam com o calor, correias dentadas perdem tensão, rolamentos necessitam de lubrificação e superfícies PEI desgastam.
          </p>
          <p>
            O cálculo contábil de depreciação linear divide o custo de reposição do equipamento pelo total de horas produtivas estimadas em sua vida útil:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm">
            Depreciação por Hora (R$/h) = Valor de Compra da Impressora (R$) / Vida Útil Estimada (Horas)
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            <strong>Exemplo:</strong> Uma impressora de R$ 2.500,00 com vida útil estimada de 5.000 horas de impressão tem um custo de depreciação de <strong>R$ 0,50 por hora</strong>. Em uma impressão de 8 horas, devem ser provisionados R$ 4,00 exclusivamente para reserva de manutenção ou futura troca de máquina.
          </p>
        </section>

        {/* Seção 5: Pilar 4 - Insumos e Acabamento */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-blue-700 font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2>Pilar 4: Insumos de Montagem, Pós-Processamento e Acessórios</h2>
          </div>
          <p>
            Muitas peças não saem da impressora prontas para o consumidor final. Você frequentemente utilizará:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">Ferragens & Fixadores:</span>
              <p className="text-slate-600 mt-1">Argolas de chaveiro, correntes, ímãs de neodímio, parafusos allen M3/M4 e inserts metálicos de latão termo-inseridos.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900">Químicos & Acabamento:</span>
              <p className="text-slate-600 mt-1">Supercola cianoacrilato, primer de preenchimento, lixas abrasivas, spray de verniz protetor e embalagens individuais.</p>
            </div>
          </div>
        </section>

        {/* Seção 6: Formação do Preço de Venda */}
        <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/70 border border-blue-200">
          <div className="flex items-center gap-2.5 text-blue-950 font-bold text-lg sm:text-xl">
            <DollarSign className="w-5 h-5 text-blue-600 shrink-0" />
            <h2>Pilar 5: Do Custo de Fabricação ao Preço de Venda Comercial</h2>
          </div>
          <p className="text-blue-900/90">
            A <strong>Calculadora de Impressão 3D</strong> entrega a você o <em>Custo Fabril Total</em> (filamento + luz + máquina + insumos). Para precificar para um cliente final com sustentabilidade financeira, estruture seu preço final considerando:
          </p>
          <div className="space-y-2 text-xs sm:text-sm text-slate-800">
            <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-2xs">
              <strong>1. Margem de Perda / Risco (5% a 15%):</strong> Para cobrir eventuais falhas, quedas de luz ou carretel enrolado.
            </div>
            <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-2xs">
              <strong>2. Mão de Obra de Engenharia / CAD:</strong> Cobrança de valor por hora dedicada à modelagem, fatiamento ou acabamento manual.
            </div>
            <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-2xs">
              <strong>3. Margem Líquida de Lucro:</strong> 100% a 250% para peças exclusivas ou protótipos de alta demanda; 50% a 100% para atacado e peças seriadas.
            </div>
            <div className="p-3 rounded-xl bg-white border border-blue-200 shadow-2xs">
              <strong>4. Taxas de Marketplaces:</strong> Caso anuncie no Mercado Livre, Shopee, Elo7 ou utilize maquininha de cartão (taxas entre 12% e 20%).
            </div>
          </div>
        </section>

        {/* Chamada para Ação: Usar a Calculadora */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Pronto para colocar em prática?</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Utilize nossa calculadora interativa gratuita para obter o custo exato em segundos.
            </p>
          </div>
          <button
            type="button"
            onClick={onNavigateToCalculator}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all cursor-pointer min-h-[44px] touch-manipulation"
          >
            <Calculator className="w-4 h-4" />
            <span>Abrir Calculadora de Custos</span>
          </button>
        </div>
      </article>
    </div>
  );
};
