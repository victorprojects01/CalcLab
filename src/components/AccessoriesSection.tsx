import React, { useState } from 'react';
import {
  PackagePlus,
  Trash2,
  BookmarkPlus,
  Plus,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AccessoryItem, AccessoryUnit, SavedAccessoryTemplate } from '../types';
import { NumericInput } from './NumericInput';
import { parseLocalNumber } from '../utils/calculator';
import { IconAcessorios } from './icons/CalcLabIcons';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';

interface AccessoriesSectionProps {
  items: AccessoryItem[];
  savedTemplates: SavedAccessoryTemplate[];
  onUpdateItems: (items: AccessoryItem[]) => void;
  onSaveTemplate: (template: SavedAccessoryTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const AccessoriesSection: React.FC<AccessoriesSectionProps> = ({
  items,
  savedTemplates,
  onUpdateItems,
  onSaveTemplate,
  onDeleteTemplate,
}) => {
  const { language, formatMoney } = useLanguage();
  const t = translations[language];
  const [isExpanded, setIsExpanded] = useState<boolean>(items.length > 0);
  const [showSavedTemplates, setShowSavedTemplates] = useState(false);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);

  const handleAddNew = () => {
    setIsExpanded(true);
    const newItem: AccessoryItem = {
      id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: '',
      mode: 'package',
      unit: 'un',
      packagePrice: '',
      packageQuantity: '',
      quantityPerPiece: '1',
      directCostPerPiece: '',
    };
    onUpdateItems([...items, newItem]);
  };

  const handleRemove = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    onUpdateItems(updated);
    if (updated.length === 0) {
      setIsExpanded(false);
    }
  };

  const handleUpdate = (id: string, updates: Partial<AccessoryItem>) => {
    const updated = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onUpdateItems(updated);
  };

  const handleApplyTemplate = (template: SavedAccessoryTemplate) => {
    const newItem: AccessoryItem = {
      id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: template.name,
      mode: template.mode,
      unit: template.unit,
      packagePrice: template.packagePrice,
      packageQuantity: template.packageQuantity,
      quantityPerPiece: template.quantityPerPiece,
      directCostPerPiece: template.directCostPerPiece,
    };
    onUpdateItems([...items, newItem]);
    setShowSavedTemplates(false);
    setIsExpanded(true);
  };

  const handleSaveAsTemplate = (item: AccessoryItem) => {
    if (!item.name.trim()) return;
    const template: SavedAccessoryTemplate = {
      id: `tpl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: item.name.trim(),
      mode: item.mode,
      unit: item.unit,
      packagePrice: item.packagePrice,
      packageQuantity: item.packageQuantity,
      quantityPerPiece: item.quantityPerPiece,
      directCostPerPiece: item.directCostPerPiece,
    };
    onSaveTemplate(template);
    setJustSavedId(item.id);
    setTimeout(() => setJustSavedId(null), 2500);
  };

  const calculateItemCostPerPiece = (item: AccessoryItem): number => {
    if (item.mode === 'direct') {
      return parseLocalNumber(item.directCostPerPiece) || 0;
    }
    const pkgPrice = parseLocalNumber(item.packagePrice);
    const pkgQty = parseLocalNumber(item.packageQuantity);
    const perPiece = parseLocalNumber(item.quantityPerPiece);
    if (pkgPrice && pkgQty && perPiece && pkgQty > 0) {
      return (pkgPrice / pkgQty) * perPiece;
    }
    return 0;
  };

  return (
    <section
      id="bloco-acessorios"
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs transition-all overflow-hidden"
      aria-labelledby="heading-acessorios"
    >
      <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center p-1.5 shrink-0 text-indigo-600">
            <IconAcessorios className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                {t.block3Badge}
              </span>
              <h2 id="heading-acessorios" className="text-base md:text-lg font-bold text-slate-900">
                {t.block3Title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.block3Subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              type="button"
              id="btn-toggle-accessories"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors min-h-[44px] cursor-pointer"
            >
              <span>{isExpanded ? (language === 'en' ? 'Collapse' : language === 'es' ? 'Plegar' : 'Recolher') : `${items.length} ${items.length === 1 ? (language === 'en' ? 'item' : 'item') : (language === 'en' ? 'items' : 'itens')}`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}

          <button
            type="button"
            id="btn-add-accessory"
            onClick={handleAddNew}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 rounded-xl border border-indigo-200/80 transition-all min-h-[44px] shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t.addAccessoryBtn}</span>
            <span className="sm:hidden">{language === 'en' ? 'Add' : language === 'es' ? 'Añadir' : 'Adicionar'}</span>
          </button>
        </div>
      </div>

      {/* Modelos rápidos */}
      {savedTemplates.length > 0 && (
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {t.savedTemplatesBtn}:
            </span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {savedTemplates.map((tpl) => (
              <div key={tpl.id} className="flex items-center rounded-lg border border-slate-200 bg-white shadow-2xs">
                <button
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="text-xs font-semibold text-slate-700 hover:text-indigo-600 px-2.5 py-1 transition-colors cursor-pointer"
                >
                  + {tpl.name}
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteTemplate(tpl.id)}
                  className="text-slate-300 hover:text-rose-500 p-1 border-l border-slate-100 transition-colors cursor-pointer"
                  title={t.deleteTemplateBtn}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {items.length === 0 && (
        <div className="p-8 text-center space-y-2">
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.block3EmptyText}
          </p>
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
          >
            <PackagePlus className="w-3.5 h-3.5" />
            <span>{t.addAccessoryBtn}</span>
          </button>
        </div>
      )}

      {/* Lista de Itens */}
      {items.length > 0 && isExpanded && (
        <div className="p-5 md:p-6 space-y-4">
          {items.map((item, index) => {
            const costPerPiece = calculateItemCostPerPiece(item);
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div className="flex-1 w-full sm:w-auto flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 bg-white w-5 h-5 rounded-md flex items-center justify-center border border-slate-200 shrink-0">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      placeholder={t.accNamePlaceholder}
                      value={item.name}
                      onChange={(e) => handleUpdate(item.id, { name: e.target.value })}
                      className="w-full text-xs font-bold text-slate-800 bg-white px-2.5 py-1.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleSaveAsTemplate(item)}
                      disabled={!item.name.trim()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-200 transition-colors disabled:opacity-40 cursor-pointer"
                      title={t.saveAsTemplateBtn}
                    >
                      {justSavedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">{t.templateSavedSuccess}</span>
                        </>
                      ) : (
                        <>
                          <BookmarkPlus className="w-3 h-3" />
                          <span>{t.saveAsTemplateBtn}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                      title={t.deleteTemplateBtn}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Seleção do Modo */}
                <div className="flex items-center gap-3 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`mode-${item.id}`}
                      checked={item.mode === 'package'}
                      onChange={() => handleUpdate(item.id, { mode: 'package' })}
                      className="text-indigo-600"
                    />
                    <span className="font-medium text-slate-700">{t.accModePackage}</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`mode-${item.id}`}
                      checked={item.mode === 'direct'}
                      onChange={() => handleUpdate(item.id, { mode: 'direct' })}
                      className="text-indigo-600"
                    />
                    <span className="font-medium text-slate-700">{t.accModeDirect}</span>
                  </label>
                </div>

                {/* Campos do Modo Pacote */}
                {item.mode === 'package' && (
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                    <NumericInput
                      id={`pkg-price-${item.id}`}
                      label={t.accPackagePriceLabel}
                      placeholder="Ex: 25.00"
                      value={item.packagePrice}
                      onChange={(val) => handleUpdate(item.id, { packagePrice: val })}
                    />
                    <NumericInput
                      id={`pkg-qty-${item.id}`}
                      label={t.accPackageQtyLabel}
                      placeholder="100"
                      value={item.packageQuantity}
                      onChange={(val) => handleUpdate(item.id, { packageQuantity: val })}
                      inputMode="numeric"
                    />
                    <NumericInput
                      id={`piece-qty-${item.id}`}
                      label={t.accQtyPerPieceLabel}
                      placeholder="4"
                      value={item.quantityPerPiece}
                      onChange={(val) => handleUpdate(item.id, { quantityPerPiece: val })}
                      inputMode="numeric"
                    />
                    <div className="flex flex-col justify-end p-2 bg-white rounded-xl border border-slate-200/90 text-right">
                      <span className="text-[10px] text-slate-400 block">{t.accCalculatedPerPiece}</span>
                      <strong className="text-xs sm:text-sm text-indigo-700 font-bold">
                        {formatMoney(costPerPiece)}
                      </strong>
                    </div>
                  </div>
                )}

                {/* Campos do Modo Direto */}
                {item.mode === 'direct' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <NumericInput
                      id={`direct-cost-${item.id}`}
                      label={t.accDirectCostLabel}
                      placeholder="Ex: 0.50"
                      value={item.directCostPerPiece}
                      onChange={(val) => handleUpdate(item.id, { directCostPerPiece: val })}
                    />
                    <div className="flex flex-col justify-end p-2 bg-white rounded-xl border border-slate-200/90 text-right">
                      <span className="text-[10px] text-slate-400 block">{t.accCalculatedPerPiece}</span>
                      <strong className="text-xs sm:text-sm text-indigo-700 font-bold">
                        {formatMoney(costPerPiece)}
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
