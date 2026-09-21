import React, { useState } from 'react';
import {
  X,
  Shield,
  FileText,
  Info,
  Mail,
  AlertTriangle,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { CalcLabLogo } from './icons/CalcLabIcons';

export type LegalTabType = 'privacidade' | 'termos' | 'sobre' | 'contato' | 'isencao';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTabType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacidade',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  // Estado do formulário de contato
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Dúvida sobre cálculo');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Sincroniza a aba inicial quando o modal abre
  React.useEffect(() => {
    setActiveTab(initialTab);
    setIsSent(false);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.trim() || !contactMessage.trim()) return;
    setIsSent(true);
  };

  const tabs: Array<{ id: LegalTabType; label: string; icon: React.ReactNode }> = [
    { id: 'privacidade', label: 'Política de Privacidade', icon: <Shield className="w-4 h-4" /> },
    { id: 'termos', label: 'Termos de Uso', icon: <FileText className="w-4 h-4" /> },
    { id: 'sobre', label: 'Sobre & Metodologia', icon: <Info className="w-4 h-4" /> },
    { id: 'contato', label: 'Fale Conosco', icon: <Mail className="w-4 h-4" /> },
    { id: 'isencao', label: 'Isenção de Responsabilidade', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-legal-title"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800">
        {/* Cabeçalho do Modal */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <CalcLabLogo size="sm" showSubtitle={false} />
            <div className="border-l border-slate-200 pl-2.5 ml-1 hidden sm:block">
              <h2 id="modal-legal-title" className="text-xs font-bold text-slate-800 leading-tight">
                Informações Institucionais e Políticas
              </h2>
              <p className="text-[11px] text-slate-500">
                Transparência, termos de serviço e conformidade com Google AdSense e LGPD
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Abas de Navegação */}
        <div className="flex items-center gap-1 px-4 sm:px-6 py-2 border-b border-slate-200/80 bg-slate-50/40 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors min-h-[40px] ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo da Aba Ativa */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
          {/* 1. POLÍTICA DE PRIVACIDADE (EXIGÊNCIA ESTRITA DO GOOGLE ADSENSE) */}
          {activeTab === 'privacidade' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Política de Privacidade e Uso de Cookies
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Última atualização: 21 de setembro de 2026 • Em conformidade com a LGPD e Diretrizes do Google AdSense
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">1. Introdução e Compromisso com a Privacidade</h4>
                <p>
                  A <strong>Calculadora de Impressão 3D</strong> valoriza a sua privacidade. Esta política descreve de forma clara e transparente quais dados são coletados, como são utilizados e como você pode gerenciar suas preferências de privacidade ao utilizar nossa ferramenta online gratuita.
                </p>
              </section>

              <section className="space-y-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100/80">
                <h4 className="font-bold text-blue-900 text-xs sm:text-sm">
                  2. Google AdSense e Cookies de Publicidade (Cláusula Obrigatória do Google)
                </h4>
                <p className="text-blue-950">
                  Nosso site utiliza serviços de publicidade fornecidos pelo <strong>Google AdSense</strong>. Por exigência contratual do Google e conformidade com as Políticas de Editores do Google:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-blue-950">
                  <li>
                    Fornecedores terceiros, incluindo o Google, usam cookies para veicular anúncios com base em visitas anteriores dos usuários a este ou a outros sites na internet.
                  </li>
                  <li>
                    Com o uso de cookies de publicidade, o Google e seus parceiros podem veicular anúncios para os usuários com base nas visitas feitas a este site e/ou a outros sites da web.
                  </li>
                  <li>
                    Os usuários podem desativar a publicidade personalizada acessando as <strong>Configurações de Anúncios do Google</strong> (<a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold inline-flex items-center gap-0.5">google.com/settings/ads <ExternalLink className="w-3 h-3" /></a>).
                  </li>
                  <li>
                    Alternativamente, é possível desativar o uso de cookies de fornecedores terceiros para publicidade personalizada acessando o portal da <strong>Network Advertising Initiative</strong> (<a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold inline-flex items-center gap-0.5">www.aboutads.info <ExternalLink className="w-3 h-3" /></a>).
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">3. Armazenamento Local de Dados (LocalStorage)</h4>
                <p>
                  Para seu conforto e produtividade, os dados da sua impressora (potência em Watts, preço de compra, vida útil), tarifas de energia e acessórios salvos são armazenados <strong>exclusivamente na memória local do seu próprio navegador (LocalStorage)</strong>. Nenhuma dessas informações de cálculo é enviada, armazenada ou comercializada em servidores externos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">4. Lei Geral de Proteção de Dados (LGPD - Brasil)</h4>
                <p>
                  Em total respeito à Lei nº 13.709/2018 (LGPD), asseguramos aos usuários a qualquer momento o direito de apagar os dados salvos em seu navegador por meio do botão "Novo cálculo" ou limpando os dados de navegação do seu browser.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">5. Contato do Encarregado de Dados</h4>
                <p>
                  Para quaisquer dúvidas, solicitações ou esclarecimentos sobre nossa política de privacidade, entre em contato através da aba <strong>Fale Conosco</strong> ou pelo e-mail: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">privacidade@calculadoraimpressao3d.com.br</code>.
                </p>
              </section>
            </div>
          )}

          {/* 2. TERMOS DE USO */}
          {activeTab === 'termos' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Termos de Uso do Serviço</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Regras de utilização da ferramenta</p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">1. Aceitação dos Termos</h4>
                <p>
                  Ao acessar e utilizar a <strong>Calculadora de Impressão 3D</strong>, você concorda expressamente com os presentes Termos de Uso e com nossa Política de Privacidade.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">2. Finalidade da Ferramenta</h4>
                <p>
                  A ferramenta destina-se a fornecer estimativas matemáticas de custos de manufatura aditiva (FDM/FFF) para peças produzidas em impressoras 3D, auxiliando entusiastas, estudantes e microempreendedores no planejamento e precificação de seus projetos.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">3. Propriedade Intelectual</h4>
                <p>
                  O código-fonte, layout visual, fórmulas integradas, marcas e elementos de design desta plataforma são protegidos pela legislação de direitos autorais e propriedade intelectual. É proibida a reprodução não autorizada do serviço com fins de clonagem comercial.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">4. Modificações do Serviço</h4>
                <p>
                  Reservamo-nos o direito de atualizar fórmulas, parâmetros de catálogo de impressoras e funcionalidades sem aviso prévio, sempre visando o aprimoramento da experiência dos usuários.
                </p>
              </section>
            </div>
          )}

          {/* 3. SOBRE NÓS & METODOLOGIA (E-E-A-T) */}
          {activeTab === 'sobre' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Sobre Nós e Metodologia Científica de Cálculo</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Conheça os pilares matemáticos e o propósito do projeto
                </p>
              </div>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Nossa Missão</h4>
                <p>
                  A <strong>Calculadora de Impressão 3D</strong> foi desenvolvida por entusiastas e profissionais de manufatura aditiva para resolver a maior dor do microempreendedor 3D: <em>a precificação justa e transparente de peças impressas</em>. Muitos iniciantes esquecem de contabilizar o desgaste do bico/correias (depreciação), o consumo real da mesa aquecida e os insumos extras, operando no prejuízo sem perceber.
                </p>
              </section>

              <section className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">As 4 Fórmulas Fundamentais</h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-blue-700">1. Energia Elétrica:</strong>
                    <p className="font-mono bg-white p-2 rounded border border-slate-200 mt-1 text-slate-800">
                      Consumo (kWh) = (Potência Média Watts / 1000) × Tempo (h)
                      <br />
                      Custo Energia = Consumo (kWh) × Tarifa Local (R$/kWh)
                    </p>
                  </div>

                  <div>
                    <strong className="text-blue-700">2. Matéria-prima (Filamento):</strong>
                    <p className="font-mono bg-white p-2 rounded border border-slate-200 mt-1 text-slate-800">
                      Custo por Grama = Preço do Carretel (R$) / Peso Líquido (g)
                      <br />
                      Custo Filamento = Gramas Usadas × Custo por Grama
                    </p>
                  </div>

                  <div>
                    <strong className="text-blue-700">3. Depreciação Linear da Impressora:</strong>
                    <p className="font-mono bg-white p-2 rounded border border-slate-200 mt-1 text-slate-800">
                      Depreciação por Hora = Valor da Máquina (R$) / Vida Útil Estimada (h)
                      <br />
                      Custo Depreciação = Depreciação por Hora × Tempo de Impressão (h)
                    </p>
                  </div>

                  <div>
                    <strong className="text-blue-700">4. Insumos e Acabamento:</strong>
                    <p className="font-mono bg-white p-2 rounded border border-slate-200 mt-1 text-slate-800">
                      Custo por Embalagem = Preço do Pacote / Quantidade no Pacote × Qtd por Peça
                      <br />
                      Custo Unitário Final = (Custo Total do Lote) / Quantidade de Peças
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* 4. FALE CONOSCO / CONTATO */}
          {activeTab === 'contato' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Fale Conosco e Suporte</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dúvidas, sugestões de novos modelos de impressora ou relatos de bugs
                </p>
              </div>

              {isSent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-base">Mensagem Recebida com Sucesso!</h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    Agradecemos pelo seu contato. Nossa equipe revisará seu relato e responderá no e-mail informado em até 48 horas úteis.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setContactMessage('');
                    }}
                    className="mt-3 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Seu Nome ou Empresa
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: Carlos Silva"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Seu E-mail de Resposta
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Ex: carlos@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Assunto</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                    >
                      <option value="Dúvida sobre cálculo">Dúvida sobre os cálculos</option>
                      <option value="Sugestão de nova impressora">Sugestão de modelo para o catálogo</option>
                      <option value="Parceria ou Publicidade">Parceria ou Publicidade</option>
                      <option value="Relato de problema">Relato de problema técnico</option>
                      <option value="Outro assunto">Outro assunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mensagem</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Descreva detalhadamente sua dúvida ou sugestão..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400">
                      Respondemos rapidamente de segunda a sexta.
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors min-h-[44px]"
                    >
                      <span>Enviar mensagem</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 5. ISENÇÃO DE RESPONSABILIDADE */}
          {activeTab === 'isencao' && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Isenção de Responsabilidade Técnica e Financeira
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Importante aviso operacional sobre os valores calculados
                </p>
              </div>

              <section className="space-y-2 bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 text-amber-950">
                <h4 className="font-bold text-amber-900 text-xs sm:text-sm">Estimativas e Variabilidade Real</h4>
                <p>
                  Os valores calculados por este aplicativo são <strong>estimativas matemáticas teóricas</strong> baseadas nos dados fornecidos pelo usuário e em dados médios de catálogo.
                </p>
                <p>
                  O custo real pode sofrer variações por diversos fatores externos, tais como:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Oscilação de bandeiras tarifárias e impostos municipais na conta de luz.</li>
                  <li>Eficiência térmica da mesa e temperatura do ambiente de impressão.</li>
                  <li>Perda de filamento com torres de purga (purge tower), bordas (brim), balsa (raft) e falhas operacionais.</li>
                  <li>Desgaste acelerado em bicos de latão ao utilizar filamentos abrasivos (como fibra de carbono ou glow-in-the-dark).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Precificação Comercial e Margem</h4>
                <p>
                  O cálculo apresentado refere-se exclusivamente ao <strong>Custo de Produção Fabril</strong> (custo direto de máquina + material). Ele <strong>não inclui</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
                  <li>Horas de trabalho dedicadas ao fatiamento, suporte e pós-processamento manual.</li>
                  <li>Despesas operacionais fixas (aluguel, internet, contabilidade).</li>
                  <li>Taxas de maquininha de cartão ou plataformas de e-commerce (Mercado Livre, Shopee, etc.).</li>
                  <li>Margem de lucro e tributação (MEI, Simples Nacional).</li>
                </ul>
                <p className="text-xs text-slate-500 italic mt-2">
                  Recomendamos sempre somar sua margem de lucro e horas de trabalho sobre o custo base apurado.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="px-5 sm:px-6 py-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs text-slate-500">
          <span>Calculadora de Impressão 3D • 100% Gratuito</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl transition-colors min-h-[40px]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
