export type AccessoryUnit = 'un' | 'g' | 'ml';

export type AccessoryCalculationMode = 'package' | 'direct';

export interface AccessoryItem {
  id: string;
  name: string;
  mode: AccessoryCalculationMode;
  unit: AccessoryUnit;
  packagePrice: string; // string to handle typing with comma
  packageQuantity: string;
  quantityPerPiece: string;
  directCostPerPiece: string; // string when mode is 'direct'
}

export interface SavedAccessoryTemplate {
  id: string;
  name: string;
  mode: AccessoryCalculationMode;
  unit: AccessoryUnit;
  packagePrice: string;
  packageQuantity: string;
  quantityPerPiece: string;
  directCostPerPiece: string;
}

export interface PrinterCatalogItem {
  id: string;
  brand: string;
  model: string;
  averagePowerWatts: number | null; // null if not verified
  referenceSource: string;
  referenceDate: string;
  testConditions: string;
}

export interface PrinterConfig {
  selectedPrinterId: string; // 'custom' or catalog ID
  customBrand: string;
  customModel: string;
  averagePowerWatts: string; // string for input editing
  printerPurchasePrice: string;
  lifespanHours: string;
  energyTariffPerKwh: string;
}

export interface PrintConfig {
  projectName: string;
  filamentType: string;
  spoolPrice: string;
  spoolNetWeightGrams: string;
  usedFilamentGrams: string;
  durationHours: string;
  durationMinutes: string;
  pieceCount: string;
}

export interface PricingConfig {
  shippingCost: string;
  shippingMode: 'total' | 'unit';
  profitMarginPercent: string;
}

export interface CalculatedAccessory {
  id: string;
  name: string;
  costPerPiece: number;
  totalCost: number;
  description: string;
}

export interface CalculationResult {
  isComplete: boolean;
  missingFields: string[];
  totalHours: number;
  pieceCount: number;
  // Totais da impressão inteira
  energyCostTotal: number;
  depreciationCostTotal: number;
  filamentCostTotal: number;
  filamentWasteGrams: number;
  totalFilamentGrams: number;
  accessoriesCostTotal: number;
  printBatchTotal: number; // energia + depreciação + filamento + acessórios totais
  // Por peça individual
  energyCostPerPiece: number;
  depreciationCostPerPiece: number;
  filamentCostPerPiece: number;
  accessoriesCostPerPiece: number;
  unitCost: number;
  // Detalhes dos acessórios
  accessoriesBreakdown: CalculatedAccessory[];
  // Precificação e Preço de Venda
  shippingCostTotal: number;
  shippingCostPerPiece: number;
  profitMarginPercent: number;
  profitTotal: number;
  profitPerPiece: number;
  finalSalePriceTotal: number;
  finalSalePricePerPiece: number;
  hasPricingCalculated: boolean;
}
