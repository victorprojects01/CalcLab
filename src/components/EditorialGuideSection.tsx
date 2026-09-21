import React from 'react';
import { BookOpen, Zap, Layers, Cpu, TrendingUp, DollarSign } from 'lucide-react';

export const EditorialGuideSection: React.FC = () => {
  return (
    <section
      id="guia-precificacao"
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 mt-12 text-slate-800"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Guia Completo: Como Calcular o Custo Real na Impressão 3D
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Entenda os 4 pilares indispensáveis para não ter prejuízo no seu negócio de impressão 3D
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {/* Pilar 1 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <h3>1. Custo de Matéria-Prima (Filamento e Perdas)</h3>
          </div>
          <p>
            O custo básico do filamento é obtido dividindo o valor total pago no carretel pelo seu peso líquido útil (geralmente 1.000g). No entanto, um erro comum é contabilizar apenas o peso final da peça impressa.
          </p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            Custo Filamento = Gramas Fatiadas × (Preço Carretel / Peso Líquido)
          </div>
          <p className="text-[11px] text-slate-500">
            <strong>Dica prática:</strong> Sempre copie as gramas indicadas diretamente no fatiador (Cura, PrusaSlicer, Bambu Studio ou OrcaSlicer), pois ele já inclui suportes, saia (skirt) e borda (brim).
          </p>
        </div>

        {/* Pilar 2 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <h3>2. Consumo Real de Energia Elétrica (kWh)</h3>
          </div>
          <p>
            A maioria das pessoas comete o erro de usar a potência nominal da fonte (ex: 350W) para calcular a luz. Na prática, a impressora só atinge pico de potência no aquecimento inicial da mesa e do bico.
          </p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            Consumo (kWh) = (Potência Média em Watts / 1000) × Horas
          </div>
          <p className="text-[11px] text-slate-500">
            Em regime estável de impressão com PLA a 60°C de mesa, uma impressora tipo cartesiana (Ender 3) consome em média <strong>100W a 130W</strong>. Multiplique pelo valor do kWh da sua distribuidora local.
          </p>
        </div>

        {/* Pilar 3 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <h3>3. Depreciação e Desgaste do Equipamento</h3>
          </div>
          <p>
            Toda máquina tem uma vida útil finita. Bicos de latão desgastam, correias afrouxam, rolamentos precisam de graxa e termistores queimam. Se você não incluir a depreciação por hora trabalhada, seu caixa não terá fundos para manutenção.
          </p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            Depreciação/hora = Preço de Compra (R$) / Vida Útil (Horas)
          </div>
          <p className="text-[11px] text-slate-500">
            Consideramos uma média de mercado de <strong>5.000 a 6.000 horas</strong> para impressoras FDM domésticas de entrada e intermediárias.
          </p>
        </div>

        {/* Pilar 4 */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <h3>4. Insumos de Montagem e Acabamento</h3>
          </div>
          <p>
            Se a sua peça utiliza argolas de chaveiro, ímãs de neodímio, inserts roscados de latão M3, parafusos, cola cianoacrilato ou primer spray, esse valor deve ser distribuído proporcionalmente no lote.
          </p>
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono">
            Custo Insumos = (Preço Pacote / Quantidade Pacote) × Qtd por Peça
          </div>
          <p className="text-[11px] text-slate-500">
            Nossa calculadora permite salvar esses acessórios para reaproveitamento em um clique nos próximos orçamentos.
          </p>
        </div>
      </div>

      {/* Box de Precificação Comercial */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-950">
              Como definir o preço de venda da sua peça 3D?
            </h4>
            <p className="text-xs text-blue-800/90 mt-0.5 max-w-xl">
              O valor calculado aqui é o <strong>custo de fabricação</strong>. Para precificar comercialmente, adicione: <em>horas de modelagem/fatiamento</em> + <em>margem para falhas (cerca de 10%)</em> + <em>sua margem de lucro desejada (normalmente de 50% a 200%)</em> + <em>taxas de venda de marketplaces</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
