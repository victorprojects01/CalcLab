import { SupportedLanguage } from './LanguageContext';

export interface FAQItem {
  q: string;
  a: string;
}

export interface Translations {
  // Metadados & Topo
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  siteTitle: string;
  siteDescription: string;
  navCalculator: string;
  navGuide: string;
  navFaq: string;
  navFAQ: string;
  navSettings: string;
  tutorialBtn: string;
  langSelectLabel: string;
  currencyNotice: string;

  // SEO Header na Calculadora
  heroH1: string;
  heroDesc: string;
  heroTitle: string;
  heroSubtitle: string;

  // Banner Tutorial
  tutorialBannerTitle: string;
  tutorialBannerDesc: string;
  tutorialActiveTitle: string;
  tutorialActiveDesc: string;
  tutorialExitBtn: string;
  tutorialStartBtn: string;
  tutorialInlineBtn: string;

  // Bloco 1: Sua Impressão
  block1Badge: string;
  block1Title: string;
  block1Subtitle: string;
  slicerTipTitle: string;
  slicerTipDesc: string;
  projectNameLabel: string;
  projectNamePlaceholder: string;
  printTimeLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  usedFilamentLabel: string;
  usedFilamentDesc: string;
  filamentWasteLabel: string;
  filamentTotalLabel: string;
  pieceCountLabel: string;
  pieceCountDesc: string;
  pieceCountSuffix: string;

  // Bloco 2: Impressora e Filamento
  block2Badge: string;
  block2Title: string;
  block2Subtitle: string;
  block2ShowBtn: string;
  block2HideBtn: string;
  selectPrinterLabel: string;
  selectPrinterCustom: string;
  customBrandLabel: string;
  customBrandPlaceholder: string;
  customModelLabel: string;
  customModelPlaceholder: string;
  avgPowerLabel: string;
  avgPowerDesc: string;
  avgPowerCatalogVerified: string;
  avgPowerCustomWarn: string;
  benchSourceLabel: string;
  benchTestedAt: string;
  viewPowerTableBtn: string;
  energyTariffLabel: string;
  energyTariffDesc: string;
  printerPriceLabel: string;
  printerPriceDesc: string;
  lifespanLabel: string;
  lifespanDesc: string;
  filamentTypeLabel: string;
  spoolPriceLabel: string;
  spoolPriceDesc: string;
  spoolWeightLabel: string;
  spoolWeightDesc: string;

  // Bloco 3: Acessórios e Acabamento
  block3Badge: string;
  block3Title: string;
  block3Subtitle: string;
  block3EmptyText: string;
  addAccessoryBtn: string;
  savedTemplatesBtn: string;
  saveAsTemplateBtn: string;
  templateSavedSuccess: string;
  deleteTemplateBtn: string;
  accNamePlaceholder: string;
  accModePackage: string;
  accModeDirect: string;
  accPackagePriceLabel: string;
  accPackageQtyLabel: string;
  accQtyPerPieceLabel: string;
  accDirectCostLabel: string;
  accUnitUn: string;
  accUnitG: string;
  accUnitMl: string;
  accCalculatedPerPiece: string;

  // Bloco 4: Precificação e Venda
  block4Badge: string;
  block4Title: string;
  block4Subtitle: string;
  profitMarginLabel: string;
  profitMarginDesc: string;
  profitMarginSuffix: string;
  marginAtacado: string;
  marginCompetitivo: string;
  marginPadrao: string;
  marginRecomendado: string;
  marginPremium: string;
  shippingCostLabel: string;
  shippingCostDesc: string;
  shippingModeTotal: string;
  shippingModeUnit: string;
  shippingFree: string;

  // Card de Resultados
  resultPendingTitle: string;
  resultPendingDesc: string;
  resultStepTime: string;
  resultStepFilament: string;
  resultStepPieces: string;
  resultCostPerPieceLabel: string;
  resultUnitCostLabel: string;
  resultBatchCostTotalLabel: string;
  resultSalePriceLabel: string;
  resultEstimatedProfitLabel: string;
  resultBreakdownTitle: string;
  resultFilamentItem: string;
  resultEnergyItem: string;
  resultDepreciationItem: string;
  resultAccessoriesItem: string;
  resultBatchTotalSuffix: string;
  resultAccessoriesIncluded: string;
  resultNoticePricingActive: string;
  resultNoticePricingInactive: string;
  copySummaryBtn: string;
  copiedSummarySuccess: string;
  newCalculationBtn: string;
  viewResultMobileBtn: string;

  // Guia Editorial e Perguntas
  backToCalc: string;
  guideBadge: string;
  guideTitle: string;
  guideSubtitle: string;
  guideReadingTime: string;
  guideSec1Title: string;
  guideSec1P1: string;
  guideSec1P2: string;
  guidePillar1Title: string;
  guidePillar1Desc: string;
  guidePillar1Formula: string;
  guidePillar2Title: string;
  guidePillar2Desc: string;
  guidePillar2Formula: string;
  guidePillar3Title: string;
  guidePillar3Desc: string;
  guidePillar3Formula: string;
  guidePillar4Title: string;
  guidePillar4Desc: string;
  guidePillar4Formula: string;
  openCalculatorBtn: string;

  faqBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  faqSearchPlaceholder: string;
  faqList: FAQItem[];

  // Pilares e Metodologia SEO (na Home)
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillar1Badge: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Badge: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Badge: string;
  pillar3Title: string;
  pillar3Desc: string;
  pillar4Badge: string;
  pillar4Title: string;
  pillar4Desc: string;
  deepenKnowledgeTitle: string;
  deepenKnowledgeDesc: string;

  seoMethodTitle: string;
  seoMethodDesc: string;
  seoStep1Tag: string;
  seoStep1Title: string;
  seoStep1Desc: string;
  seoStep2Tag: string;
  seoStep2Title: string;
  seoStep2Desc: string;
  seoStep3Tag: string;
  seoStep3Title: string;
  seoStep3Desc: string;
  seoStep4Tag: string;
  seoStep4Title: string;
  seoStep4Desc: string;
  seoCtaQuestion: string;
  seoCtaSub: string;
  seoReadGuideBtn: string;
  seoViewFaqBtn: string;

  // Footer & Legal
  footerMission: string;
  footerLocalData: string;
  footerNoSignup: string;
  footerPagesTitle: string;
  footerPoliciesTitle: string;
  footerPrivacy: string;
  footerTerms: string;
  footerAbout: string;
  footerDisclaimer: string;
  footerContactTitle: string;
  footerContact: string;
  footerCookiePreferences: string;
  footerRightsReserved: string;
  footerComplianceNotice: string;

  footerAboutText: string;
  footerFreeTag: string;
  privacyPolicy: string;
  termsOfUse: string;
  aboutMethodology: string;
  contactUs: string;
  disclaimer: string;
  allRightsReserved: string;
  openSourceNotice: string;
  cookieConsentTitle: string;
  cookieConsentDesc: string;
  cookieAcceptBtn: string;
  cookieDeclineBtn: string;
  cookiePolicyBtn: string;

  // Cookie Consent banner
  cookieTitle: string;
  cookieDesc: string;
  cookieAcceptAll: string;
  cookieEssentialOnly: string;
  cookieReadPrivacy: string;

  // Resumo copiado (texto de compartilhamento)
  summaryTitle: string;
  summaryPieces: string;
  summaryTotalTime: string;
  summaryMaterial: string;
  summaryCostPerPiece: string;
  summaryBatchCost: string;
  summaryBreakdownTitle: string;
  summaryFilament: string;
  summaryEnergy: string;
  summaryDepreciation: string;
  summaryAccessories: string;
  summaryNoAccessories: string;
  summaryPricingSection: string;
  summaryCostProd: string;
  summaryShipping: string;
  summaryProfit: string;
  summaryFinalSale: string;
  summaryNote: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  pt: {
    appTitle: 'CalcLab',
    appSubtitle: 'Calculadora de Impressão 3D',
    tagline: 'Quanto custa sua impressão 3D?',
    siteTitle: 'Calculadora de Impressão 3D | Custo, Energia e Preço de Venda - CalcLab',
    siteDescription: 'Calculadora de impressão 3D online e grátis. Calcule quanto custa imprimir sua peça com filamento por grama, consumo de energia em kWh, depreciação de máquina e lucro justo.',
    navCalculator: 'Calculadora',
    navGuide: 'Guia de Custos',
    navFaq: 'Perguntas (FAQ)',
    navFAQ: 'Perguntas (FAQ)',
    navSettings: 'Ajustes',
    tutorialBtn: 'Tutorial Prático',
    langSelectLabel: 'Idioma / Região',
    currencyNotice: 'Moeda: BRL (R$)',

    heroH1: 'Calculadora de Impressão 3D: Custo Real, Energia e Preço de Venda',
    heroDesc: 'Descubra com precisão quanto custa sua impressão 3D FDM. Calcule o valor exato do filamento por grama, consumo elétrico em kWh, taxa de depreciação da impressora, acabamentos e defina seu lucro sem prejuízos.',
    heroTitle: 'Calculadora de Impressão 3D: Custo Real, Energia e Preço de Venda',
    heroSubtitle: 'Descubra com precisão quanto custa sua impressão 3D FDM. Calcule filamento por grama, kWh elétrico, depreciação por hora e fixe seu lucro com segurança.',

    tutorialBannerTitle: 'Tutorial demonstrativo ativado',
    tutorialBannerDesc: 'Exemplo prático carregado: Lote de 5 chaveiros com matéria-prima, consumo de energia, argolas de acabamento, margem de 100% e frete calculados.',
    tutorialActiveTitle: 'Tutorial demonstrativo ativado',
    tutorialActiveDesc: 'Exemplo prático carregado: Lote de 5 chaveiros com matéria-prima, consumo de energia, argolas de acabamento, margem de 100% e frete calculados.',
    tutorialExitBtn: 'Sair do exemplo e limpar',
    tutorialStartBtn: 'Tutorial rápido (exemplo prático)',
    tutorialInlineBtn: 'Ver como funciona no tutorial prático',

    block1Badge: 'Bloco Principal de Preenchimento',
    block1Title: 'Sua impressão',
    block1Subtitle: 'Preencha o tempo e o filamento indicados pelo seu fatiador para calcular o custo exato',
    slicerTipTitle: 'Copie o tempo e o consumo de filamento exibidos no seu fatiador (Cura, Bambu Studio, PrusaSlicer, Orca).',
    slicerTipDesc: 'Tempo e gramas correspondem à impressão inteira na mesa (incluindo suportes e purga). A quantidade abaixo serve para dividir o custo total igualmente entre as peças idênticas do mesmo lote.',
    projectNameLabel: 'Nome do projeto ou peça (opcional)',
    projectNamePlaceholder: 'Ex: Suporte de fone articulado, Vaso decorativo, Lote de 10 chaveiros',
    printTimeLabel: 'Tempo de impressão total do lote',
    hoursLabel: 'Horas',
    minutesLabel: 'Minutos',
    usedFilamentLabel: 'Filamento gasto informado no fatiador',
    usedFilamentDesc: 'Gramas totais da mesa (inclui suportes, saia e torre de purga). Acrescentamos 5% de desperdício automaticamente.',
    filamentWasteLabel: 'Desperdício (5%)',
    filamentTotalLabel: 'Peso total com desperdício',
    pieceCountLabel: 'Quantidade de peças impressas na mesa',
    pieceCountDesc: 'Quantas unidades idênticas saem prontas ao final dessa impressão',
    pieceCountSuffix: 'unidade(s) na mesa',

    block2Badge: 'Configurações de Custo & Máquina',
    block2Title: 'Impressora e filamento',
    block2Subtitle: 'Consumo elétrico verificado por bancada, depreciação por hora e valor do carretel',
    block2ShowBtn: 'Ver e alterar custos da máquina',
    block2HideBtn: 'Recolher custos da máquina',
    selectPrinterLabel: 'Selecione a sua impressora 3D',
    selectPrinterCustom: 'Outra / Personalizada (inserir consumo)',
    customBrandLabel: 'Marca da impressora',
    customBrandPlaceholder: 'Ex: Anycubic, Creality, Two Trees',
    customModelLabel: 'Modelo',
    customModelPlaceholder: 'Ex: Kobra 2 Neo, Mega S',
    avgPowerLabel: 'Potência média de operação estável',
    avgPowerDesc: 'Consumo médio em cruzeiro com controle PID (não é a fonte máxima nem o pico inicial)',
    avgPowerCatalogVerified: 'Consumo verificado em bancada para este modelo em PLA.',
    avgPowerCustomWarn: 'Informe a potência média real (geralmente entre 85W e 180W em FDM aberta).',
    benchSourceLabel: 'Fonte da medição',
    benchTestedAt: 'Testado em',
    viewPowerTableBtn: 'Ver tabela comparativa de consumo',
    energyTariffLabel: 'Tarifa de energia elétrica (por kWh)',
    energyTariffDesc: 'Divida o valor total da sua conta de luz pelos kWh consumidos no mês',
    printerPriceLabel: 'Preço de compra da impressora',
    printerPriceDesc: 'Valor pago pelo equipamento para cálculo da taxa horária de depreciação',
    lifespanLabel: 'Vida útil estimada da impressora',
    lifespanDesc: 'Em horas de impressão contínua (padrão FDM: 5.000 a 6.000 horas)',
    filamentTypeLabel: 'Tipo de filamento',
    spoolPriceLabel: 'Preço do carretel de filamento',
    spoolPriceDesc: 'Quanto você pagou no carretel fechado com frete incluso',
    spoolWeightLabel: 'Peso líquido do carretel',
    spoolWeightDesc: 'Peso real do filamento (excluindo o carretel plástico)',

    block3Badge: 'Itens Adicionais Opcionais',
    block3Title: 'Acessórios & Acabamento',
    block3Subtitle: 'Parafusos, ímãs, embalagens, lixas, tintas, argolas de chaveiro e insumos',
    block3EmptyText: 'Nenhum acessório ou acabamento adicionado para esta impressão.',
    addAccessoryBtn: 'Adicionar acessório ou insumo',
    savedTemplatesBtn: 'Modelos salvos',
    saveAsTemplateBtn: 'Salvar modelo',
    templateSavedSuccess: 'Salvo!',
    deleteTemplateBtn: 'Excluir modelo',
    accNamePlaceholder: 'Nome do item (ex: Argola de chaveiro, Ímã de neodímio)',
    accModePackage: 'Comprei em pacote/lote',
    accModeDirect: 'Custo direto por unidade',
    accPackagePriceLabel: 'Preço do pacote',
    accPackageQtyLabel: 'Qtd no pacote',
    accQtyPerPieceLabel: 'Qtd por peça',
    accDirectCostLabel: 'Custo por peça',
    accUnitUn: 'unidades',
    accUnitG: 'gramas',
    accUnitMl: 'ml',
    accCalculatedPerPiece: 'Custo por peça:',

    block4Badge: 'Etapa Comercial Opcional',
    block4Title: 'Precificação e Venda',
    block4Subtitle: 'Margem de lucro recomendada, frete e cálculo do preço final de venda para o cliente',
    profitMarginLabel: 'Margem de lucro desejada sobre o custo',
    profitMarginDesc: 'Percentual de lucro a ser adicionado sobre os custos de produção da peça',
    profitMarginSuffix: '% de lucro',
    marginAtacado: 'Atacado / Lotes',
    marginCompetitivo: 'Competitivo',
    marginPadrao: 'Padrão Maker (2x)',
    marginRecomendado: 'Recomendado',
    marginPremium: 'Premium / Exclusivo',
    shippingCostLabel: 'Valor do frete ou envio',
    shippingCostDesc: 'Custo de postagem ou entrega (correios, transportadora ou motoboy)',
    shippingModeTotal: 'Valor total do frete (dividir entre as peças)',
    shippingModeUnit: 'Valor de frete individual (por cada peça)',
    shippingFree: 'Grátis / Balcão',

    resultPendingTitle: 'Aguardando preenchimento',
    resultPendingDesc: 'Para calcular o custo fabril exato e o preço sugerido, informe no Bloco 1 acima:',
    resultStepTime: 'Tempo de impressão (horas e minutos)',
    resultStepFilament: 'Filamento utilizado (em gramas)',
    resultStepPieces: 'Quantidade de peças impressas',
    resultCostPerPieceLabel: 'Custo estimado por peça',
    resultUnitCostLabel: 'Custo por peça',
    resultBatchCostTotalLabel: 'Custo total do lote',
    resultSalePriceLabel: 'Preço de venda sugerido por peça',
    resultEstimatedProfitLabel: 'Lucro estimado por peça',
    resultBreakdownTitle: 'Detalhamento dos custos por peça',
    resultFilamentItem: 'Filamento gasto',
    resultEnergyItem: 'Energia elétrica',
    resultDepreciationItem: 'Depreciação de máquina',
    resultAccessoriesItem: 'Acessórios & Acabamento',
    resultBatchTotalSuffix: 'Lote total',
    resultAccessoriesIncluded: 'Itens incluídos por peça:',
    resultNoticePricingActive: 'Preço de venda calculado com margem de lucro e frete.',
    resultNoticePricingInactive: 'O custo acima não inclui margem de lucro nem frete. Configure o Bloco 4 para gerar o preço de venda.',
    copySummaryBtn: 'Copiar resumo',
    copiedSummarySuccess: 'Resumo copiado!',
    newCalculationBtn: 'Novo cálculo',
    viewResultMobileBtn: 'Ver Resultado',

    backToCalc: 'Voltar à Calculadora',
    guideBadge: 'Artigo Técnico Completo',
    guideTitle: 'Guia Definitivo: Como Calcular o Custo Real de uma Impressão 3D',
    guideSubtitle: 'Entenda os quatro pilares essenciais da precificação em manufatura aditiva FDM e aprenda a calcular cada centavo de filamento, energia, depreciação e acabamentos.',
    guideReadingTime: 'Leitura de 6 min',
    guideSec1Title: 'O Prejuízo Invisível na Impressão 3D',
    guideSec1P1: 'Muitos entusiastas e empreendedores iniciantes cometem o erro de cobrar por uma peça impressa calculando apenas o filamento (muitas vezes multiplicando por 2 ou 3) ou usando uma "taxa fixa por hora".',
    guideSec1P2: 'Esse método ignora custos ocultos cruciais: a energia consumida pela mesa aquecida, a depreciação e manutenção da máquina, o filamento desperdiçado em suportes/purgas e o tempo investido em acabamento.',
    guidePillar1Title: 'Pilar 1: Matéria-Prima (Filamento por Grama)',
    guidePillar1Desc: 'O custo do filamento deve ser calculado com base no peso real fatiado no software (incluindo suportes, saias e torres de purga) e no valor pago pelo carretel com frete incluso.',
    guidePillar1Formula: 'Custo Filamento = (Gramas Fatiadas × 1,05 ÷ Peso Líquido do Carretel em g) × Preço Total do Carretel',
    guidePillar2Title: 'Pilar 2: Consumo Real de Energia Elétrica (kWh)',
    guidePillar2Desc: 'Uma impressora 3D não consome a potência máxima da fonte durante todo o trabalho. O aquecimento inicial gera um pico, mas em regime estável o controle PID reduz o consumo médio.',
    guidePillar2Formula: 'Custo Energia = (Potência Média em Watts ÷ 1000) × Horas de Impressão × Tarifa do kWh',
    guidePillar3Title: 'Pilar 3: Depreciação e Fundo de Reserva do Equipamento',
    guidePillar3Desc: 'Toda impressora 3D sofre desgaste mecânico em correias, bicos, rolamentos, ventiladores e extrusoras. Cada hora de funcionamento deve reservar fundos para substituição.',
    guidePillar3Formula: 'Taxa Depreciação/Hora = Valor de Compra ÷ Vida Útil Estimada (ex: 5.000h)',
    guidePillar4Title: 'Pilar 4: Insumos, Acessórios e Acabamento',
    guidePillar4Desc: 'Peças funcionais ou comerciais frequentemente utilizam parafusos, porcas, ímãs de neodímio, argolas de chaveiro, lixas, primer, tintas e embalagens de envio.',
    guidePillar4Formula: 'Custo Acessório por Peça = Preço do Pacote ÷ Quantidade no Pacote × Quantidade por Peça',
    openCalculatorBtn: 'Calcular agora na ferramenta',

    faqBadge: 'Central de Ajuda e Dúvidas',
    faqTitle: 'Perguntas Frequentes sobre Custos na Impressão 3D',
    faqSubtitle: 'Respostas detalhadas sobre consumo elétrico, pesagem no fatiador, margem de lucro e precificação no mercado FDM.',
    faqSearchPlaceholder: 'Buscar dúvida (ex: energia, filamento, margem, slicer)...',
    faqList: [
      {
        q: 'Como calcular o custo exato de uma impressão 3D?',
        a: 'O custo total de impressão é a soma de quatro elementos: (1) Custo do filamento gasto (gramas fatiadas × preço por grama), (2) Consumo de energia elétrica (potência média em kW × horas × tarifa de luz), (3) Depreciação da máquina (preço da impressora ÷ vida útil em horas) e (4) Acessórios ou acabamentos adicionais.',
      },
      {
        q: 'Por que a potência média consumida é menor do que a indicada na fonte?',
        a: 'A fonte é dimensionada para suportar o pico máximo inicial quando bico e mesa aquecem simultaneamente. Após atingir a temperatura programada, o sistema de controle térmico PID desliga e liga as resistências em pulsos rápidos, gastando muito menos energia para apenas manter a temperatura.',
      },
      {
        q: 'Como encontro o valor do kWh da minha conta de luz?',
        a: 'Pegue o valor total em reais a pagar da sua fatura de energia e divida pelo número total de kWh consumidos no mesmo mês. Dessa forma, você inclui todos os impostos (ICMS, PIS, COFINS), iluminação pública e bandeiras tarifárias.',
      },
      {
        q: 'O que é a depreciação e por que devo incluir na conta?',
        a: 'A depreciação reserva um valor proporcional a cada hora de uso para repor peças desgastadas (bicos de latão, tubos bowden, correias, mesas de PEI) e amortizar o custo do equipamento para que você possa comprar uma máquina nova quando a atual atingir o fim da vida útil.',
      },
      {
        q: 'O fatiador (Cura, Bambu Studio, Prusa) já inclui o peso dos suportes?',
        a: 'Sim! Os softwares fatiadores calculam rigorosamente todo o plástico que passará pelo bico extrusor: paredes perimetrais, infill interno, suportes normais ou em árvore, saia (skirt), borda (brim) e torres de purga multicolor. Sempre utilize a pesagem informada no fatiador.',
      },
      {
        q: 'Qual margem de lucro devo praticar ao vender impressões 3D?',
        a: 'Para serviços sob encomenda e prototipagem com arquivo pronto do cliente, margens entre 100% e 200% sobre o custo fabril são comuns. Para lotes grandes ou atacado de brindes e chaveiros, margens entre 50% e 100% são usuais.',
      },
    ],

    pillarsTitle: 'Como funciona o cálculo exato do custo de impressão?',
    pillarsSubtitle: 'Nossa calculadora divide o processo fabril nos 4 pilares reconhecidos pela engenharia de custos em manufatura aditiva:',
    pillar1Badge: 'Pilar 1',
    pillar1Title: 'Filamento Gasto',
    pillar1Desc: 'Calcula o custo por grama da matéria-prima considerando preço pago no carretel, frete e gramas fatiadas.',
    pillar2Badge: 'Pilar 2',
    pillar2Title: 'Energia Elétrica',
    pillar2Desc: 'Mede o consumo em kWh com base na potência média real em cruzeiro com controle PID (e não pico de fonte).',
    pillar3Badge: 'Pilar 3',
    pillar3Title: 'Depreciação de Máquina',
    pillar3Desc: 'Rateia o valor de compra da impressora pelas horas úteis para cobrir revisões, bicos e renovação de maquinário.',
    pillar4Badge: 'Pilar 4',
    pillar4Title: 'Acabamentos e Lucro',
    pillar4Desc: 'Adiciona insumos extras (parafusos, ímãs, embalagens), frete e aplica a margem comercial para venda.',
    deepenKnowledgeTitle: 'Quer aprender detalhadamente a precificar peças 3D?',
    deepenKnowledgeDesc: 'Confira nosso guia técnico aprofundado ou veja as respostas para as dúvidas mais comuns da comunidade maker.',

    seoMethodTitle: 'Como é calculado o custo de uma impressão 3D?',
    seoMethodDesc: 'Para não ter prejuízo invisível, o valor de qualquer trabalho em impressora 3D (PLA, ABS, PETG, TPU) deve cobrir rigorosamente 4 componentes de custo fabril mais o lucro pretendido:',
    seoStep1Tag: 'Matéria-Prima',
    seoStep1Title: 'Filamento Gasto',
    seoStep1Desc: 'Calculado dividindo o preço do carretel pelo peso líquido (g) e multiplicando pelas gramas indicadas no fatiador (incluindo suportes, saia e purgas).',
    seoStep2Tag: 'Consumo em kWh',
    seoStep2Title: 'Energia Elétrica',
    seoStep2Desc: 'Multiplica a potência média real da impressora (de 90W a 150W com PID) pelo tempo de impressão e pela tarifa por kWh da sua conta de luz.',
    seoStep3Tag: 'Desgaste da Máquina',
    seoStep3Title: 'Depreciação',
    seoStep3Desc: 'Rateia o investimento da impressora pelas horas de vida útil estimada (5.000h a 6.000h), garantindo caixa para manutenções e novas máquinas.',
    seoStep4Tag: 'Margem & Frete',
    seoStep4Title: 'Preço de Venda',
    seoStep4Desc: 'Aplica a margem de lucro (50% a 200%) sobre a base de custo somada ao frete, assegurando remuneração justa para seu trabalho e sua empresa maker.',
    seoCtaQuestion: 'Quer aprofundar seu conhecimento sobre formação de preço na impressão 3D?',
    seoCtaSub: 'Acesse nosso guia técnico completo e nossa seção com as perguntas mais comuns de makers iniciantes e avançados.',
    seoReadGuideBtn: 'Ler Guia Completo',
    seoViewFaqBtn: 'Ver Dúvidas (FAQ)',

    footerMission: 'Calculadora profissional e gratuita de custos para impressão 3D FDM. Criada para makers, oficinas e entusiastas.',
    footerLocalData: 'Seus dados salvos apenas no seu navegador',
    footerNoSignup: '100% Grátis & Sem Cadastro',
    footerPagesTitle: 'Páginas',
    footerPoliciesTitle: 'Institucional',
    footerPrivacy: 'Política de Privacidade',
    footerTerms: 'Termos de Uso',
    footerAbout: 'Sobre & Metodologia',
    footerDisclaimer: 'Isenção de Responsabilidade',
    footerContactTitle: 'Contato',
    footerContact: 'Fale Conosco',
    footerCookiePreferences: 'Preferências de Cookies',
    footerRightsReserved: 'Todos os direitos reservados.',
    footerComplianceNotice: 'Desenvolvido em conformidade com as diretrizes do Google AdSense, Analytics e LGPD/GDPR.',

    footerAboutText: 'CalcLab é uma ferramenta profissional de engenharia de custos para manufatura aditiva FDM.',
    footerFreeTag: '100% Gratuito & Sem Cadastro',
    privacyPolicy: 'Política de Privacidade',
    termsOfUse: 'Termos de Uso',
    aboutMethodology: 'Sobre & Metodologia',
    contactUs: 'Fale Conosco',
    disclaimer: 'Isenção de Responsabilidade',
    allRightsReserved: 'Todos os direitos reservados.',
    openSourceNotice: 'Desenvolvido para a comunidade maker e profissionais de impressão 3D.',
    cookieConsentTitle: 'Privacidade & Cookies',
    cookieConsentDesc: 'Utilizamos cookies e tecnologias semelhantes para medição analítica de audiência (Google Analytics 4) e exibição de anúncios relevantes.',
    cookieAcceptBtn: 'Aceitar todos',
    cookieDeclineBtn: 'Apenas essenciais',
    cookiePolicyBtn: 'Ver política',

    cookieTitle: 'Privacidade e Cookies',
    cookieDesc: 'Utilizamos cookies analíticos e de publicidade (Google Analytics 4 e AdSense) para entender como o site é utilizado e manter o serviço gratuito.',
    cookieAcceptAll: 'Aceitar todos',
    cookieEssentialOnly: 'Apenas essenciais',
    cookieReadPrivacy: 'Ler nossa Política de Privacidade',

    summaryTitle: '📊 Resumo de Custos',
    summaryPieces: 'Peças no lote',
    summaryTotalTime: 'Tempo total',
    summaryMaterial: 'Material',
    summaryCostPerPiece: 'CUSTO DE FABRICAÇÃO POR PEÇA',
    summaryBatchCost: 'CUSTO TOTAL DO LOTE',
    summaryBreakdownTitle: 'Detalhamento por peça',
    summaryFilament: 'Filamento',
    summaryEnergy: 'Energia elétrica',
    summaryDepreciation: 'Depreciação do equipamento',
    summaryAccessories: 'Acessórios e acabamento',
    summaryNoAccessories: 'Nenhum acessório adicional',
    summaryPricingSection: '🏷️ PRECIFICAÇÃO E VENDA COMERCIAL',
    summaryCostProd: 'Custo de produção',
    summaryShipping: 'Frete',
    summaryProfit: 'Lucro estimado',
    summaryFinalSale: '⭐ PREÇO FINAL DE VENDA',
    summaryNote: '⚠️ Observação: Estimativa baseada nos dados informados.',
  },

  en: {
    appTitle: 'CalcLab',
    appSubtitle: '3D Print Cost Calculator',
    tagline: 'How much does your 3D print cost?',
    siteTitle: '3D Print Cost Calculator | Filament, Power & Selling Price - CalcLab',
    siteDescription: 'Free online 3D print cost calculator. Accurately calculate filament per gram, kWh electricity consumption, machine wear depreciation, and profit margins.',
    navCalculator: 'Calculator',
    navGuide: 'Cost Guide',
    navFaq: 'FAQ',
    navFAQ: 'FAQ',
    navSettings: 'Settings',
    tutorialBtn: 'Quick Tutorial',
    langSelectLabel: 'Language / Region',
    currencyNotice: 'Currency: USD ($)',

    heroH1: '3D Print Cost Calculator: Real Costs, Electricity & Sale Price',
    heroDesc: 'Accurately calculate how much your FDM 3D prints cost. Estimate filament per gram, kWh electricity consumption, printer depreciation rate, hardware accessories, and set your profit margin.',
    heroTitle: '3D Print Cost Calculator: Real Costs, Electricity & Sale Price',
    heroSubtitle: 'Accurately calculate how much your FDM 3D prints cost. Estimate filament per gram, kWh electricity consumption, machine wear depreciation, and set your profit margin.',

    tutorialBannerTitle: 'Interactive tutorial active',
    tutorialBannerDesc: 'Sample loaded: Batch of 5 articulated keychains with filament cost, electricity usage, keychain rings, 100% profit margin, and shipping.',
    tutorialActiveTitle: 'Interactive tutorial active',
    tutorialActiveDesc: 'Sample loaded: Batch of 5 articulated keychains with filament cost, electricity usage, keychain rings, 100% profit margin, and shipping.',
    tutorialExitBtn: 'Exit sample & reset',
    tutorialStartBtn: 'Quick Tutorial (Interactive Sample)',
    tutorialInlineBtn: 'See how it works in the interactive tutorial',

    block1Badge: 'Primary Input Section',
    block1Title: 'Your print',
    block1Subtitle: 'Enter print duration and filament weight from your slicer to calculate exact production cost',
    slicerTipTitle: 'Copy print time and filament consumption from your slicer (Cura, Bambu Studio, PrusaSlicer, Orca).',
    slicerTipDesc: 'Time and filament represent the whole build plate (including supports and purge tower). Piece count divides total print cost equally across all identical units.',
    projectNameLabel: 'Project or part name (optional)',
    projectNamePlaceholder: 'E.g.: Articulated headphone stand, Decorative vase, 10 keychains batch',
    printTimeLabel: 'Total batch print time',
    hoursLabel: 'Hours',
    minutesLabel: 'Minutes',
    usedFilamentLabel: 'Filament used from slicer',
    usedFilamentDesc: 'Total grams on build plate (includes supports, brim, skirt and purge). We automatically add 5% waste.',
    filamentWasteLabel: 'Waste (5%)',
    filamentTotalLabel: 'Total weight including waste',
    pieceCountLabel: 'Quantity of pieces printed on the plate',
    pieceCountDesc: 'How many identical units finish in this print run',
    pieceCountSuffix: 'unit(s) on plate',

    block2Badge: 'Machine & Material Rates',
    block2Title: 'Printer and filament',
    block2Subtitle: 'Bench-tested electrical consumption, hourly depreciation and spool price',
    block2ShowBtn: 'View and adjust machine costs',
    block2HideBtn: 'Collapse machine costs',
    selectPrinterLabel: 'Select your 3D printer',
    selectPrinterCustom: 'Other / Custom (enter average watts)',
    customBrandLabel: 'Printer brand',
    customBrandPlaceholder: 'E.g.: Anycubic, Creality, Two Trees',
    customModelLabel: 'Model',
    customModelPlaceholder: 'E.g.: Kobra 2 Neo, Mega S',
    avgPowerLabel: 'Average steady operating power',
    avgPowerDesc: 'Steady-state cruising consumption with PID control (not peak power supply wattage)',
    avgPowerCatalogVerified: 'Bench-tested consumption for this model printing PLA.',
    avgPowerCustomWarn: 'Enter average real power (usually between 85W and 180W on open FDM printers).',
    benchSourceLabel: 'Measurement source',
    benchTestedAt: 'Tested on',
    viewPowerTableBtn: 'View power consumption comparison table',
    energyTariffLabel: 'Electricity rate (per kWh)',
    energyTariffDesc: 'Divide total electric utility bill amount by total kWh consumed in the month',
    printerPriceLabel: 'Printer purchase price',
    printerPriceDesc: 'Initial equipment investment used to compute machine depreciation per hour',
    lifespanLabel: 'Estimated printer lifespan',
    lifespanDesc: 'In active printing hours (FDM industry standard: 5,000 to 6,000 hours)',
    filamentTypeLabel: 'Filament type',
    spoolPriceLabel: 'Filament spool price',
    spoolPriceDesc: 'What you paid for the whole spool including shipping and taxes',
    spoolWeightLabel: 'Net spool weight',
    spoolWeightDesc: 'Actual filament weight (excluding the plastic/cardboard spool)',

    block3Badge: 'Optional Additional Hardware',
    block3Title: 'Accessories & Finishing',
    block3Subtitle: 'Screws, magnets, packaging, sanding sheets, paints, keychain rings and inserts',
    block3EmptyText: 'No accessories or finishing items added to this print job.',
    addAccessoryBtn: 'Add accessory or finishing item',
    savedTemplatesBtn: 'Saved templates',
    saveAsTemplateBtn: 'Save template',
    templateSavedSuccess: 'Saved!',
    deleteTemplateBtn: 'Delete template',
    accNamePlaceholder: 'Item name (e.g.: Keychain ring, Neodymium magnet)',
    accModePackage: 'Purchased in bulk pack',
    accModeDirect: 'Direct unit cost',
    accPackagePriceLabel: 'Pack price',
    accPackageQtyLabel: 'Pack quantity',
    accQtyPerPieceLabel: 'Qty per piece',
    accDirectCostLabel: 'Cost per piece',
    accUnitUn: 'pcs',
    accUnitG: 'grams',
    accUnitMl: 'ml',
    accCalculatedPerPiece: 'Cost per piece:',

    block4Badge: 'Optional Sales & Pricing',
    block4Title: 'Pricing & Selling',
    block4Subtitle: 'Target profit margin, shipping, and suggested retail price for customers',
    profitMarginLabel: 'Target profit margin over cost',
    profitMarginDesc: 'Markup percentage added on top of total unit manufacturing cost',
    profitMarginSuffix: '% profit',
    marginAtacado: 'Wholesale / Bulk',
    marginCompetitivo: 'Competitive',
    marginPadrao: 'Maker Standard (2x)',
    marginRecomendado: 'Recommended',
    marginPremium: 'Premium / Custom',
    shippingCostLabel: 'Shipping or delivery fee',
    shippingCostDesc: 'Carrier post or delivery expense',
    shippingModeTotal: 'Total shipping fee (split across batch pieces)',
    shippingModeUnit: 'Individual shipping fee (per each piece)',
    shippingFree: 'Free / Local pickup',

    resultPendingTitle: 'Waiting for inputs',
    resultPendingDesc: 'To compute exact manufacturing cost and retail price, enter values in Section 1 above:',
    resultStepTime: 'Print duration (hours and minutes)',
    resultStepFilament: 'Filament used (in grams)',
    resultStepPieces: 'Quantity of pieces printed',
    resultCostPerPieceLabel: 'Estimated cost per piece',
    resultUnitCostLabel: 'Cost per piece',
    resultBatchCostTotalLabel: 'Total batch cost',
    resultSalePriceLabel: 'Suggested sale price per piece',
    resultEstimatedProfitLabel: 'Estimated profit per piece',
    resultBreakdownTitle: 'Cost breakdown per piece',
    resultFilamentItem: 'Filament used',
    resultEnergyItem: 'Electricity power',
    resultDepreciationItem: 'Machine depreciation',
    resultAccessoriesItem: 'Accessories & Hardware',
    resultBatchTotalSuffix: 'Batch total',
    resultAccessoriesIncluded: 'Items included per piece:',
    resultNoticePricingActive: 'Sale price calculated including profit margin and shipping.',
    resultNoticePricingInactive: 'Manufacturing cost above does not include profit or shipping. Fill Section 4 to set selling price.',
    copySummaryBtn: 'Copy summary',
    copiedSummarySuccess: 'Summary copied!',
    newCalculationBtn: 'New calculation',
    viewResultMobileBtn: 'View Results',

    backToCalc: 'Back to Calculator',
    guideBadge: 'Technical Engineering Guide',
    guideTitle: 'The Complete Guide: How to Accurately Calculate 3D Print Costs',
    guideSubtitle: 'Understand the four foundational pillars of FDM pricing and learn how to account for every cent of filament, power, depreciation, and hardware.',
    guideReadingTime: '6 min read',
    guideSec1Title: 'The Invisible Loss in 3D Printing',
    guideSec1P1: 'Many hobbyists and makers make the mistake of pricing 3D prints simply by weighing raw filament (and multiplying by 2x or 3x) or using an arbitrary hourly rate.',
    guideSec1P2: 'This approach overlooks major overhead costs: electricity pulled by heated beds, printer depreciation, wear items, purge towers, support waste, and packaging.',
    guidePillar1Title: 'Pillar 1: Raw Material (Filament per Gram)',
    guidePillar1Desc: 'Calculate filament cost using sliced weight from your slicer (including supports and purge towers) divided by net spool weight and multiplied by spool purchase price.',
    guidePillar1Formula: 'Filament Cost = (Sliced Grams × 1.05 ÷ Net Spool Grams) × Total Spool Price',
    guidePillar2Title: 'Pillar 2: True Electricity Consumption (kWh)',
    guidePillar2Desc: 'A 3D printer only draws peak wattage while heating initially. Once up to temperature, PID control pulses heating elements, drawing far less continuous power.',
    guidePillar2Formula: 'Power Cost = (Average Watts ÷ 1000) × Print Hours × Rate per kWh',
    guidePillar3Title: 'Pillar 3: Machine Depreciation & Repair Reserve',
    guidePillar3Desc: 'Nozzles, belts, PEI sheets, and stepper motors wear over time. Allocating an hourly rate reserves funds for replacement parts and machine renewal.',
    guidePillar3Formula: 'Hourly Depreciation = Printer Purchase Price ÷ Estimated Working Lifespan (e.g. 5,000h)',
    guidePillar4Title: 'Pillar 4: Hardware, Finishing & Packaging',
    guidePillar4Desc: 'Functional prints often require threaded inserts, screws, neodymium magnets, keychain rings, sandpaper, primer, and shipping boxes.',
    guidePillar4Formula: 'Accessory Cost/Piece = Pack Price ÷ Pack Quantity × Quantity per Piece',
    openCalculatorBtn: 'Calculate now in tool',

    faqBadge: 'Help Center & Common Questions',
    faqTitle: 'Frequently Asked Questions on 3D Printing Costs',
    faqSubtitle: 'Clear answers on electricity draw, slicer calculations, profit margins, and commercial pricing for FDM manufacturing.',
    faqSearchPlaceholder: 'Search question (e.g., electricity, filament, profit margin, slicer)...',
    faqList: [
      {
        q: 'How do I calculate the exact cost of a 3D print?',
        a: 'Total production cost combines four key components: (1) Sliced filament weight multiplied by cost per gram, (2) Electricity cost (average machine kW × print hours × utility rate), (3) Machine depreciation (printer price ÷ lifespan hours), and (4) Hardware accessories or packaging.',
      },
      {
        q: 'Why is average power draw lower than the power supply rating?',
        a: 'The power supply is sized to handle simultaneous initial heating of the hotend and bed. Once at target temperature, PID thermal management pulses heating elements rapidly, keeping average consumption between 90W and 140W for PLA.',
      },
      {
        q: 'How do I find my true electric rate per kWh?',
        a: 'Divide your total electricity bill amount by the total kilowatt-hours (kWh) consumed in that billing cycle. This incorporates transmission charges, taxes, and tier surcharges.',
      },
      {
        q: 'What is machine depreciation and why must I include it?',
        a: 'Depreciation ensures each hour of machine operation reserves money to fix worn components (nozzles, belts, bearings) and amortize capital expenditure for new printer replacement.',
      },
      {
        q: 'Does my 3D slicer already include supports and infill weight?',
        a: 'Yes! Slicers like Bambu Studio, OrcaSlicer, PrusaSlicer, and Cura calculate all extruded filament: perimeters, infill, standard/tree supports, brims, skirts, and multi-color purge towers. Always use slicer weight.',
      },
      {
        q: 'What profit margin should I charge for 3D prints?',
        a: 'For custom on-demand prints and client prototyping, margins between 100% and 200% above production cost are common. For wholesale batches or bulk promotional items, margins between 50% and 100% are standard.',
      },
    ],

    pillarsTitle: 'How is exact 3D print cost calculated?',
    pillarsSubtitle: 'Our calculator divides production into the 4 fundamental pillars recognized by additive manufacturing cost engineering:',
    pillar1Badge: 'Pillar 1',
    pillar1Title: 'Filament Used',
    pillar1Desc: 'Calculates raw material cost per gram based on spool purchase price, shipping, and sliced weight.',
    pillar2Badge: 'Pillar 2',
    pillar2Title: 'Electricity Usage',
    pillar2Desc: 'Measures kWh consumption based on tested continuous PID power draw (not initial heating peak).',
    pillar3Badge: 'Pillar 3',
    pillar3Title: 'Machine Depreciation',
    pillar3Desc: 'Allocates printer investment over active hours to fund maintenance, replacement parts, and renewal.',
    pillar4Badge: 'Pillar 4',
    pillar4Title: 'Finishing & Profit',
    pillar4Desc: 'Adds hardware items (screws, inserts, keyrings), shipping costs, and applies your profit margin.',
    deepenKnowledgeTitle: 'Want to master 3D print pricing?',
    deepenKnowledgeDesc: 'Check out our comprehensive technical guide or browse answers to the most common maker questions.',

    seoMethodTitle: 'How is 3D printing cost calculated?',
    seoMethodDesc: 'To avoid invisible losses, every 3D print job (PLA, ABS, PETG, TPU) must account for 4 core manufacturing components plus your intended profit margin:',
    seoStep1Tag: 'Raw Material',
    seoStep1Title: 'Filament Used',
    seoStep1Desc: 'Calculated by dividing spool cost by net weight (g) and multiplying by sliced weight (including supports, brim and purge).',
    seoStep2Tag: 'Power in kWh',
    seoStep2Title: 'Electricity Usage',
    seoStep2Desc: 'Multiplies average machine power (90W to 150W under PID control) by total print time and your utility electricity rate per kWh.',
    seoStep3Tag: 'Equipment Wear',
    seoStep3Title: 'Depreciation',
    seoStep3Desc: 'Allocates printer investment over expected working lifespan (5,000h to 6,000h), reserving funds for repairs and hardware replacement.',
    seoStep4Tag: 'Markup & Shipping',
    seoStep4Title: 'Sale Price',
    seoStep4Desc: 'Applies profit margin (50% to 200%) over total production cost plus shipping, ensuring fair compensation for your maker business.',
    seoCtaQuestion: 'Want to dive deeper into 3D print pricing?',
    seoCtaSub: 'Read our comprehensive engineering guide and browse answers to the most common maker questions.',
    seoReadGuideBtn: 'Read Complete Guide',
    seoViewFaqBtn: 'View FAQ',

    footerMission: 'Free, professional 3D printing cost calculator for FDM additive manufacturing. Built for makers and workshops.',
    footerLocalData: 'Your parameters are saved locally in your browser',
    footerNoSignup: '100% Free & No Sign-up Required',
    footerPagesTitle: 'Pages',
    footerPoliciesTitle: 'Legal & Policies',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Use',
    footerAbout: 'About & Methodology',
    footerDisclaimer: 'Disclaimer',
    footerContactTitle: 'Contact',
    footerContact: 'Contact Us',
    footerCookiePreferences: 'Cookie Preferences',
    footerRightsReserved: 'All rights reserved.',
    footerComplianceNotice: 'Compliant with Google AdSense, Analytics, and GDPR privacy guidelines.',

    footerAboutText: 'CalcLab is a professional cost estimation tool for FDM additive manufacturing.',
    footerFreeTag: '100% Free & No Sign-up Required',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    aboutMethodology: 'About & Methodology',
    contactUs: 'Contact Us',
    disclaimer: 'Disclaimer',
    allRightsReserved: 'All rights reserved.',
    openSourceNotice: 'Built for makers, 3D printing businesses, and 3D hobbyists worldwide.',
    cookieConsentTitle: 'Privacy & Cookies',
    cookieConsentDesc: 'We use cookies and similar technologies for anonymous analytics (Google Analytics 4) and relevant advertising display.',
    cookieAcceptBtn: 'Accept all',
    cookieDeclineBtn: 'Essential only',
    cookiePolicyBtn: 'View policy',

    cookieTitle: 'Privacy & Cookies',
    cookieDesc: 'We use analytical and advertising cookies (Google Analytics 4 & AdSense) to understand website usage and keep the tool free.',
    cookieAcceptAll: 'Accept all',
    cookieEssentialOnly: 'Essential only',
    cookieReadPrivacy: 'Read our Privacy Policy',

    summaryTitle: '📊 3D Print Cost Summary',
    summaryPieces: 'Pieces in batch',
    summaryTotalTime: 'Total time',
    summaryMaterial: 'Material',
    summaryCostPerPiece: 'MANUFACTURING COST PER PIECE',
    summaryBatchCost: 'TOTAL BATCH COST',
    summaryBreakdownTitle: 'Breakdown per piece',
    summaryFilament: 'Filament',
    summaryEnergy: 'Electricity',
    summaryDepreciation: 'Equipment depreciation',
    summaryAccessories: 'Accessories & Finishing',
    summaryNoAccessories: 'No additional accessories',
    summaryPricingSection: '🏷️ COMMERCIAL PRICING & SALE',
    summaryCostProd: 'Production cost',
    summaryShipping: 'Shipping fee',
    summaryProfit: 'Estimated profit',
    summaryFinalSale: '⭐ FINAL RETAIL PRICE',
    summaryNote: '⚠️ Note: Estimate based on provided parameters.',
  },

  es: {
    appTitle: 'CalcLab',
    appSubtitle: 'Calculadora de Impresión 3D',
    tagline: '¿Cuánto cuesta tu impresión 3D?',
    siteTitle: 'Calculadora de Impresión 3D | Coste, Energía y Precio de Venta - CalcLab',
    siteDescription: 'Calculadora de impresión 3D online y gratuita. Calcula filamento por gramo, consumo de energía en kWh, amortización de la máquina y margen comercial.',
    navCalculator: 'Calculadora',
    navGuide: 'Guía de Costes',
    navFaq: 'Preguntas (FAQ)',
    navFAQ: 'Preguntas (FAQ)',
    navSettings: 'Ajustes',
    tutorialBtn: 'Tutorial Práctico',
    langSelectLabel: 'Idioma / Región',
    currencyNotice: 'Moneda: EUR (€)',

    heroH1: 'Calculadora de Impressão 3D: Custo Real, Energia e Preço de Venda',
    heroDesc: 'Descubre con exactitud cuánto cuesta imprimir tus piezas 3D FDM. Calcula el coste de filamento por gramo, consumo eléctrico en kWh, amortización de la impresora, acabados y fija tu margen de beneficio.',
    heroTitle: 'Calculadora de Impresión 3D: Coste Real, Energía y Precio de Venta',
    heroSubtitle: 'Descubre con exactitud cuánto cuesta imprimir tus piezas 3D FDM. Calcula filamento por gramo, kWh de luz, amortización por hora y fija tu margen con seguridad.',

    tutorialBannerTitle: 'Tutorial demostrativo activado',
    tutorialBannerDesc: 'Ejemplo cargado: Lote de 5 llaveros articulados con coste de filamento, consumo eléctrico, anillas metálicas, margen del 100% y envío.',
    tutorialActiveTitle: 'Tutorial demostrativo activado',
    tutorialActiveDesc: 'Ejemplo cargado: Lote de 5 llaveros articulados con coste de filamento, consumo eléctrico, anillas metálicas, margen del 100% y envío.',
    tutorialExitBtn: 'Salir del ejemplo y limpiar',
    tutorialStartBtn: 'Tutorial rápido (ejemplo práctico)',
    tutorialInlineBtn: 'Ver cómo funciona en el tutorial práctico',

    block1Badge: 'Bloque Principal de Entrada',
    block1Title: 'Tu impresión',
    block1Subtitle: 'Introduce el tiempo y filamento de tu laminador para calcular el coste exacto de fabricación',
    slicerTipTitle: 'Copia el tiempo y el filamento indicados en tu laminador (Cura, Bambu Studio, PrusaSlicer, Orca).',
    slicerTipDesc: 'El tiempo y los gramos corresponden a la cama de impresión completa (incluyendo soportes y purga). El número de piezas divide el coste total en partes iguales.',
    projectNameLabel: 'Nombre del proyecto o pieza (opcional)',
    projectNamePlaceholder: 'Ej.: Soporte para auriculares, Jarrón decorativo, Lote de 10 llaveros',
    printTimeLabel: 'Tiempo total de impresión del lote',
    hoursLabel: 'Horas',
    minutesLabel: 'Minutos',
    usedFilamentLabel: 'Filamento gastado según el laminador',
    usedFilamentDesc: 'Gramos totales en la base (incluye soportes, balsa y torre de purga). Añadimos un 5% de desperdicio automáticamente.',
    filamentWasteLabel: 'Desperdicio (5%)',
    filamentTotalLabel: 'Peso total con desperdicio',
    pieceCountLabel: 'Cantidad de piezas impresas en la base',
    pieceCountDesc: 'Cuántas unidades idénticas se fabrican en esta misma tirada',
    pieceCountSuffix: 'unidad(es) en la base',

    block2Badge: 'Costes de Máquina y Material',
    block2Title: 'Impresora y filamento',
    block2Subtitle: 'Consumo eléctrico verificado en banco, amortización horaria y coste de bobina',
    block2ShowBtn: 'Ver y modificar costes de máquina',
    block2HideBtn: 'Plegar costes de máquina',
    selectPrinterLabel: 'Selecciona tu impresora 3D',
    selectPrinterCustom: 'Otra / Personalizada (introducir vatios medios)',
    customBrandLabel: 'Marca de la impresora',
    customBrandPlaceholder: 'Ej.: Anycubic, Creality, Artillery',
    customModelLabel: 'Modelo',
    customModelPlaceholder: 'Ej.: Kobra 2 Neo, Genius Pro',
    avgPowerLabel: 'Potencia media en funcionamiento estable',
    avgPowerDesc: 'Consumo medio en régimen continuo con PID (no es la potencia máxima de la fuente)',
    avgPowerCatalogVerified: 'Consumo medido en banco para este modelo imprimiendo PLA.',
    avgPowerCustomWarn: 'Introduce la potencia media real (habitualmente entre 85W y 180W en FDM abierta).',
    benchSourceLabel: 'Fuente de la medición',
    benchTestedAt: 'Probado en',
    viewPowerTableBtn: 'Ver tabla comparativa de consumo',
    energyTariffLabel: 'Tarifa eléctrica (por kWh)',
    energyTariffDesc: 'Divide el total de tu factura de luz entre los kWh consumidos en el mes',
    printerPriceLabel: 'Precio de compra de la impresora',
    printerPriceDesc: 'Inversión en el equipo para calcular la amortización por hora de uso',
    lifespanLabel: 'Vida útil estimada de la impresora',
    lifespanDesc: 'En horas de impresión activa (estándar FDM: 5.000 a 6.000 horas)',
    filamentTypeLabel: 'Tipo de filamento',
    spoolPriceLabel: 'Precio de la bobina de filamento',
    spoolPriceDesc: 'Cuánto pagaste por la bobina completa con portes e impuestos',
    spoolWeightLabel: 'Peso neto de la bobina',
    spoolWeightDesc: 'Peso real del filamento (sin contar el carrete plástico)',

    block3Badge: 'Elementos Adicionales Opcionales',
    block3Title: 'Accesorios y Acabados',
    block3Subtitle: 'Tornillos, imanes, embalajes, lijas, pinturas, anillas de llavero e insertos',
    block3EmptyText: 'No hay accesorios ni acabados añadidos a esta impresión.',
    addAccessoryBtn: 'Añadir accesorio o acabado',
    savedTemplatesBtn: 'Plantillas guardadas',
    saveAsTemplateBtn: 'Guardar plantilla',
    templateSavedSuccess: '¡Guardado!',
    deleteTemplateBtn: 'Eliminar plantilla',
    accNamePlaceholder: 'Nombre del artículo (ej.: Anilla de llavero, Imán de neodimio)',
    accModePackage: 'Comprado en paquete/lote',
    accModeDirect: 'Coste directo por unidad',
    accPackagePriceLabel: 'Precio del lote',
    accPackageQtyLabel: 'Cant. en lote',
    accQtyPerPieceLabel: 'Cant. por pieza',
    accDirectCostLabel: 'Coste por pieza',
    accUnitUn: 'uds',
    accUnitG: 'gramos',
    accUnitMl: 'ml',
    accCalculatedPerPiece: 'Coste por pieza:',

    block4Badge: 'Fase Comercial Opcional',
    block4Title: 'Fijación de Precios y Venta',
    block4Subtitle: 'Margen de beneficio objetivo, portes y precio final recomendado de venta',
    profitMarginLabel: 'Margen de beneficio deseado sobre el coste',
    profitMarginDesc: 'Porcentaje de beneficio a sumar a los costes de fabricación de la pieza',
    profitMarginSuffix: '% de margen',
    marginAtacado: 'Mayorista / Lotes',
    marginCompetitivo: 'Competitivo',
    marginPadrao: 'Estándar Maker (2x)',
    marginRecomendado: 'Recomendado',
    marginPremium: 'Premium / Exclusivo',
    shippingCostLabel: 'Coste de envío o portes',
    shippingCostDesc: 'Gasto de mensajería, paquetería o entrega',
    shippingModeTotal: 'Coste total de envío (a repartir entre las piezas)',
    shippingModeUnit: 'Coste de envío individual (por cada pieza)',
    shippingFree: 'Gratis / Recogida en taller',

    resultPendingTitle: 'Esperando datos',
    resultPendingDesc: 'Para calcular el coste de fabricación y el precio sugerido, completa el Bloque 1 arriba:',
    resultStepTime: 'Tiempo de impresión (horas y minutos)',
    resultStepFilament: 'Filamento consumido (en gramos)',
    resultStepPieces: 'Cantidad de piezas impresas',
    resultCostPerPieceLabel: 'Coste estimado por pieza',
    resultUnitCostLabel: 'Coste por pieza',
    resultBatchCostTotalLabel: 'Coste total del lote',
    resultSalePriceLabel: 'Precio de venta recomendado por pieza',
    resultEstimatedProfitLabel: 'Beneficio estimado por pieza',
    resultBreakdownTitle: 'Desglose de costes por pieza',
    resultFilamentItem: 'Filamento consumido',
    resultEnergyItem: 'Energía eléctrica',
    resultDepreciationItem: 'Amortización de máquina',
    resultAccessoriesItem: 'Accesorios y acabados',
    resultBatchTotalSuffix: 'Lote total',
    resultAccessoriesIncluded: 'Artículos incluidos por pieza:',
    resultNoticePricingActive: 'Precio de venta calculado con margen de beneficio y portes.',
    resultNoticePricingInactive: 'El coste anterior no incluye beneficio ni portes. Configura el Bloque 4 para fijar precio.',
    copySummaryBtn: 'Copiar resumen',
    copiedSummarySuccess: '¡Resumen copiado!',
    newCalculationBtn: 'Nuevo cálculo',
    viewResultMobileBtn: 'Ver Resultado',

    backToCalc: 'Volver a la Calculadora',
    guideBadge: 'Guía Técnica de Ingeniería',
    guideTitle: 'Guía Definitiva: Cómo Calcular el Coste Real de una Impresión 3D',
    guideSubtitle: 'Conoce los cuatro pilares fundamentales del cálculo de costes en fabricación aditiva FDM y aprende a presupuestar cada gramo, kilovatio y desgaste.',
    guideReadingTime: '6 min de lectura',
    guideSec1Title: 'Las Pérdidas Invisibles en Impresión 3D',
    guideSec1P1: 'Muchos makers noveles cometen el error de calcular el precio de una pieza solo pesando el filamento (multiplicando por 2 o 3) o aplicando una tarifa plana por hora.',
    guideSec1P2: 'Este método ignora costes críticos: la energía consumida por la cama caliente, la amortización de componentes, el filamento gastado en soportes y el acabado.',
    guidePillar1Title: 'Pilar 1: Materia Prima (Filamento por Gramo)',
    guidePillar1Desc: 'Calcula el filamento con los gramos laminados (incluyendo soportes, balsa y purgas), dividido por el peso neto y multiplicado por el precio del carrete con envío.',
    guidePillar1Formula: 'Coste Filamento = (Gramos Laminados × 1,05 ÷ Peso Neto Bobina en g) × Precio Total Bobina',
    guidePillar2Title: 'Pillar 2: Consumo Eléctrico Real (kWh)',
    guidePillar2Desc: 'Una impresora 3D no consume la potencia máxima durante todo el trabajo. Tras calentar al inicio, el control PID reduce el consumo medio notablemente.',
    guidePillar2Formula: 'Coste Eléctrico = (Potencia Media en Vatios ÷ 1000) × Horas de Impresión × Tarifa kWh',
    guidePillar3Title: 'Pilar 3: Amortización y Fondo de Mantenimiento',
    guidePillar3Desc: 'Boquillas, correas, láminas PEI y motores sufren desgaste por fricción. Cada hora de trabajo debe reservar fondos para repuestos y renovación de equipo.',
    guidePillar3Formula: 'Amortización/Hora = Precio de Compra ÷ Vida Útil Estimada (ej: 5.000h)',
    guidePillar4Title: 'Pilar 4: Tornillería, Insumos y Acabado',
    guidePillar4Desc: 'Las piezas funcionales a menudo incorporan insertos roscados, imanes, tornillos, anillas de llavero, lijas, imprimación, pintura y cajas de envío.',
    guidePillar4Formula: 'Coste Accesorio/Pieza = Precio Lote ÷ Unidades Lote × Cantidad por Pieza',
    openCalculatorBtn: 'Calcular ahora en la herramienta',

    faqBadge: 'Centro de Ayuda y Preguntas',
    faqTitle: 'Preguntas Frecuentes sobre Costes en Impresión 3D',
    faqSubtitle: 'Respuestas claras sobre consumo de electricidad, cálculo en laminadores, margen de beneficio y precios en el mercado FDM.',
    faqSearchPlaceholder: 'Buscar pregunta (ej.: energía, filamento, margen, laminador)...',
    faqList: [
      {
        q: '¿Cómo calculo el coste de una impresión 3D?',
        a: 'El coste total suma cuatro factores: (1) Coste del filamento laminado consumido (gramos × coste por gramo), (2) Consumo eléctrico (potencia media en kW × horas de trabajo × precio del kWh), (3) Amortización de máquina (precio impresora ÷ vida útil en horas) y (4) Accesorios y empaquetado.',
      },
      {
        q: '¿Por qué la potencia media es inferior a la indicada en la fuente de alimentación?',
        a: 'La fuente está dimensionada para la demanda punta al calentar cama y fusor al mismo tiempo. Al estabilizar la temperatura, el control térmico PID pulsa la energía, reduciendo el consumo medio a 90W - 140W en PLA.',
      },
      {
        q: '¿Cómo averiguo el precio del kWh en mi factura eléctrica?',
        a: 'Divide el importe total en euros de la factura entre los kWh consumidos en dicho mes. De esta forma incluyes peajes de acceso, impuestos (IVA, impuesto eléctrico) y términos de potencia.',
      },
      {
        q: '¿Qué es la amortización y por qué debo incluirla?',
        a: 'La amortización reserva una cantidad por cada hora de funcionamiento para reemplazar componentes con desgaste (boquillas, extrusores, correas) y acumular fondos para renovar la máquina al agotar su vida útil.',
      },
      {
        q: '¿El laminador (Cura, Bambu Studio, Prusa) incluye el peso de los soportes?',
        a: '¡Sí! Los laminadores calculan minuciosamente todo el material extruido: perímetros, relleno, soportes estándar o en árbol, bordes, faldas y torres de purga multicolor. Utiliza siempre la pesada del software laminador.',
      },
      {
        q: '¿Qué margen de beneficio debería aplicar en mis ventas?',
        a: 'Para encargos a medida y prototipos con modelo suministrado, márgenes entre el 100% y el 200% son comunes. Para tiradas medianas o regalos al por mayor, márgenes entre el 50% y el 100% son habituales.',
      },
    ],

    pillarsTitle: '¿Cómo se calcula el coste exacto de una impresión 3D?',
    pillarsSubtitle: 'Nuestra calculadora divide la producción en los 4 pilares fundamentales de la ingeniería de costes aditiva:',
    pillar1Badge: 'Pilar 1',
    pillar1Title: 'Filamento Gastado',
    pillar1Desc: 'Calcula el coste de materia prima por gramo según el precio de la bobina, portes y peso laminado.',
    pillar2Badge: 'Pilar 2',
    pillar2Title: 'Energía Eléctrica',
    pillar2Desc: 'Mide el consumo real en kWh basado en la potencia continua con control PID (no la fuente pico).',
    pillar3Badge: 'Pilar 3',
    pillar3Title: 'Amortización de Máquina',
    pillar3Desc: 'Reparte la inversión del equipo entre sus horas útiles para renovar componentes y máquinas.',
    pillar4Badge: 'Pilar 4',
    pillar4Title: 'Acabados y Beneficio',
    pillar4Desc: 'Suma accesorios (imanes, tornillos, anillas), portes y aplica tu margen comercial para el cliente.',
    deepenKnowledgeTitle: '¿Deseas dominar la fijación de precios en impresión 3D?',
    deepenKnowledgeDesc: 'Revisa nuestra guía técnica detallada o consulta las preguntas frecuentes más habituales.',

    seoMethodTitle: '¿Cómo se calcula el coste de una impresión 3D?',
    seoMethodDesc: 'Para no tener pérdidas invisibles, el presupuesto de cualquier trabajo en impresora 3D (PLA, ABS, PETG, TPU) debe cubrir 4 conceptos esenciales más tu beneficio:',
    seoStep1Tag: 'Materia Prima',
    seoStep1Title: 'Filamento Consumido',
    seoStep1Desc: 'Se calcula dividiendo el precio de la bobina entre su peso neto (g) y multiplicándolo por los gramos laminados (con soportes y purgas).',
    seoStep2Tag: 'Consumo en kWh',
    seoStep2Title: 'Energía Eléctrica',
    seoStep2Desc: 'Multiplica la potencia media real de la máquina (de 90W a 150W con PID) por las horas de trabajo y el precio del kWh de tu factura.',
    seoStep3Tag: 'Desgaste de Máquina',
    seoStep3Title: 'Amortización',
    seoStep3Desc: 'Reparte la inversión de compra entre las horas de vida útil estimada (5.000h a 6.000h), garantizando fondos para repuestos y nuevas impresoras.',
    seoStep4Tag: 'Margen y Portes',
    seoStep4Title: 'Precio de Venta',
    seoStep4Desc: 'Aplica el margen de beneficio (50% a 200%) sobre la base de costes más el transporte, asegurando una retribución justa para tu taller maker.',
    seoCtaQuestion: '¿Deseas profundizar en la fijación de precios en impresión 3D?',
    seoCtaSub: 'Consulta nuestra guía técnica detallada y resuelve tus dudas en la sección de preguntas frecuentes.',
    seoReadGuideBtn: 'Leer Guía Completa',
    seoViewFaqBtn: 'Ver Dudas (FAQ)',

    footerMission: 'Calculadora profesional y gratuita de costes para impresión 3D FDM. Creada para makers, talleres y entusiastas.',
    footerLocalData: 'Tus datos se guardan únicamente de forma local en tu navegador',
    footerNoSignup: '100% Gratis & Sin Registro',
    footerPagesTitle: 'Páginas',
    footerPoliciesTitle: 'Institucional',
    footerPrivacy: 'Política de Privacidad',
    footerTerms: 'Términos de Uso',
    footerAbout: 'Sobre & Metodología',
    footerDisclaimer: 'Aviso Legal',
    footerContactTitle: 'Contacto',
    footerContact: 'Contacto',
    footerCookiePreferences: 'Preferencias de Cookies',
    footerRightsReserved: 'Todos los derechos reservados.',
    footerComplianceNotice: 'Desarrollado en conformidad con las directrices de Google AdSense, Analytics y RGPD.',

    footerAboutText: 'CalcLab es una herramienta profesional de costes para fabricación aditiva FDM.',
    footerFreeTag: '100% Gratis y Sin Registro',
    privacyPolicy: 'Política de Privacidad',
    termsOfUse: 'Términos de Uso',
    aboutMethodology: 'Sobre el Proyecto y Metodología',
    contactUs: 'Contacto',
    disclaimer: 'Aviso Legal y Exención',
    allRightsReserved: 'Todos los derechos reservados.',
    openSourceNotice: 'Creado para la comunidad maker, talleres y entusiastas de la impresión 3D.',
    cookieConsentTitle: 'Privacidad y Cookies',
    cookieConsentDesc: 'Utilizamos cookies y tecnologías similares para análisis de audiencia anónimo (Google Analytics 4) y mostrar publicidad relevante.',
    cookieAcceptBtn: 'Aceptar todo',
    cookieDeclineBtn: 'Solo esenciales',
    cookiePolicyBtn: 'Ver política',

    cookieTitle: 'Privacidad y Cookies',
    cookieDesc: 'Utilizamos cookies analíticas y publicitarias (Google Analytics 4 y AdSense) para comprender el uso del sitio y mantener la herramienta gratuita.',
    cookieAcceptAll: 'Aceptar todo',
    cookieEssentialOnly: 'Solo esenciales',
    cookieReadPrivacy: 'Ver Política de Privacidad',

    summaryTitle: '📊 Resumen de Costes',
    summaryPieces: 'Piezas en lote',
    summaryTotalTime: 'Tiempo total',
    summaryMaterial: 'Material',
    summaryCostPerPiece: 'COSTE DE FABRICACIÓN POR PIEZA',
    summaryBatchCost: 'COSTE TOTAL DEL LOTE',
    summaryBreakdownTitle: 'Desglose por pieza',
    summaryFilament: 'Filamento',
    summaryEnergy: 'Energía eléctrica',
    summaryDepreciation: 'Amortización de equipo',
    summaryAccessories: 'Accesorios y acabados',
    summaryNoAccessories: 'Sin accesorios adicionales',
    summaryPricingSection: '🏷️ FIJACIÓN DE PRECIOS Y VENTA',
    summaryCostProd: 'Coste de fabricación',
    summaryShipping: 'Portes de envío',
    summaryProfit: 'Beneficio estimado',
    summaryFinalSale: '⭐ PRECIO FINAL DE VENTA',
    summaryNote: '⚠️ Nota: Estimación calculada con los datos facilitados.',
  },
};
