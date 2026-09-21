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
import { formatCurrency, parseLocalNumber } from '../utils/calculator';
import { IconAcessorios, IconAcabamento } from './icons/CalcLabIcons';

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
  const [isExpanded, setIsExpanded] = useState<boolean>(items.length > 0);
  const [showSavedTemplates, setShowSavedTemplates] = useState(false);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);

  // Adicionar novo item
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
    onUpdateItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleAddFromTemplate = (template: SavedAccessoryTemplate) => {
    setIsExpanded(true);
    const newItem: AccessoryItem = {
      ...template,
      id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    onUpdateItems([...items, newItem]);
  };

  const handleSaveToTemplates = (item: AccessoryItem) => {
    if (!item.name.trim()) return;
    const template: SavedAccessoryTemplate = {
      id: `template-${Date.now()}`,
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

  const getItemCostPerPiece = (item: AccessoryItem): number | null => {
    if (item.mode === 'direct') {
      return parseLocalNumber(item.directCostPerPiece);
    }
    const price = parseLocalNumber(item.packagePrice);
    const qtyPkg = parseLocalNumber(item.packageQuantity);
    const qtyPiece = parseLocalNumber(item.quantityPerPiece);
    if (price === null || qtyPkg === null || qtyPiece === null || qtyPkg <= 0) return null;
    return (price / qtyPkg) * qtyPiece;
  };

  return (
    <section
      id="bloco-acessorios-acabamento"
      className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm transition-all overflow-hidden"
      aria-labelledby="heading-acessorios"
    >
      {/* Cabeçalho do Bloco 3 */}
      <div className="p-5 md:p-6 border-b border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center p-1.5 shrink-0">
            <IconAcessorios className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                Bloco 3
              </span>
              <h2 id="heading-acessorios" className="text-base md:text-lg font-bold text-slate-900">
                Acabamento e acessórios
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Seção opcional para argolas, ímãs, parafusos, cola, tinta ou embalagens
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            id="btn-toggle-accessories"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors min-h-[44px]"
            aria-expanded={isExpanded}
          >
            <span>{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Estado Inicial Recolhido (quando não há itens adicionados) */}
      {!isExpanded && items.length === 0 && (
        <div id="convite-acessorios" className="p-5 md:p-6 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Vai usar argolas, ímãs, tinta ou outros materiais?
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Adicione os componentes extras para calcular o custo exato de cada unidade pronta para venda.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {savedTemplates.length > 0 && (
              <button
                type="button"
                id="btn-ver-salvos-inicial"
                onClick={() => {
                  setIsExpanded(true);
                  setShowSavedTemplates(true);
                }}
                className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-xl min-h-[44px] flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Salvos ({savedTemplates.length})</span>
              </button>
            )}

            <button
              type="button"
              id="btn-add-accessory-main"
              onClick={handleAddNew}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar acessório</span>
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo Aberto */}
      {isExpanded && (
        <div className="p-5 md:p-6 space-y-5">
          {/* Barra superior de ações dentro do bloco */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <p className="text-xs text-slate-600">
              {items.length === 0
                ? 'Nenhum acessório adicionado ainda.'
                : `${items.length} ${items.length === 1 ? 'acessório configurado' : 'acessórios configurados'}:`}
            </p>

            <div className="flex items-center gap-2">
              {savedTemplates.length > 0 && (
                <button
                  type="button"
                  id="btn-toggle-saved-drawer"
                  onClick={() => setShowSavedTemplates(!showSavedTemplates)}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl flex items-center gap-1.5 min-h-[44px] transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Biblioteca ({savedTemplates.length})</span>
                  {showSavedTemplates ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}

              <button
                type="button"
                id="btn-add-another-accessory"
                onClick={handleAddNew}
                className="px-3.5 py-2 text-xs font-bold text-blue-600 bg-blue-50/80 hover:bg-blue-100/70 rounded-xl flex items-center gap-1.5 min-h-[44px] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar outro item</span>
              </button>
            </div>
          </div>

          {/* Gaveta de biblioteca de itens salvos para reuso */}
          {showSavedTemplates && savedTemplates.length > 0 && (
            <div id="drawer-templates-salvos" className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Reutilizar item salvo
                </span>
                <span className="text-[11px] text-slate-400">Clique para incluir nesta peça</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {savedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs hover:border-blue-400 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => handleAddFromTemplate(template)}
                      className="flex items-center gap-2 text-left flex-1 truncate pr-2 hover:text-blue-600"
                    >
                      <IconAcabamento className="w-4 h-4 shrink-0 text-blue-600" />
                      <div className="truncate">
                        <span className="font-semibold text-slate-800 truncate block">{template.name}</span>
                        <span className="text-[11px] text-slate-500">
                          {template.mode === 'direct'
                            ? `R$ ${template.directCostPerPiece} / peça`
                            : `${template.quantityPerPiece} ${template.unit} de emb.`}
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteTemplate(template.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 rounded-md min-w-[32px] min-h-[32px] flex items-center justify-center"
                      title="Excluir da biblioteca"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cards de Acessórios (otimizados para celular sem tabelas largas) */}
          <div className="space-y-4" id="lista-cards-acessorios">
            {items.map((item, index) => {
              const costPerPiece = getItemCostPerPiece(item);

              return (
                <div
                  key={item.id}
                  id={`card-acessorio-${item.id}`}
                  className="p-4 md:p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50/80 transition-all space-y-3.5"
                >
                  {/* Topo do Card: Número, Nome e Ações */}
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
                    <div className="flex items-center gap-2.5 flex-1">
                      <span className="w-6 h-6 rounded-lg bg-blue-100/70 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        id={`input-nome-acc-${item.id}`}
                        placeholder="Nome (ex: Argola de chaveiro, Ímã 8x2mm, Tinta)"
                        value={item.name}
                        onChange={(e) => handleUpdate(item.id, { name: e.target.value })}
                        className="w-full text-sm font-semibold text-slate-900 bg-transparent border-0 border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none py-1"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Salvar na biblioteca para reutilizar */}
                      <button
                        type="button"
                        id={`btn-salvar-template-${item.id}`}
                        onClick={() => handleSaveToTemplates(item)}
                        disabled={!item.name.trim()}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 min-h-[36px] transition-colors ${
                          justSavedId === item.id
                            ? 'text-emerald-700 bg-emerald-100'
                            : 'text-slate-600 hover:text-blue-700 hover:bg-white bg-white/80 border border-slate-200 disabled:opacity-40'
                        }`}
                        title="Salvar na biblioteca para reutilizar em outras peças"
                      >
                        {justSavedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[11px] font-bold">Salvo</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline text-[11px]">Salvar item</span>
                          </>
                        )}
                      </button>

                      {/* Excluir item */}
                      <button
                        type="button"
                        id={`btn-excluir-acc-${item.id}`}
                        onClick={() => handleRemove(item.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
                        title="Remover este acessório"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Alternância de Modalidade: Por embalagem vs "Já sei o custo por peça" */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500 font-medium">Como você quer calcular:</span>
                    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-0.5 shadow-2xs">
                      <button
                        type="button"
                        id={`btn-mode-pkg-${item.id}`}
                        onClick={() => handleUpdate(item.id, { mode: 'package' })}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          item.mode === 'package'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Calcular pela embalagem
                      </button>
                      <button
                        type="button"
                        id={`btn-mode-direct-${item.id}`}
                        onClick={() => handleUpdate(item.id, { mode: 'direct' })}
                        className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          item.mode === 'direct'
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Já sei o custo por peça
                      </button>
                    </div>
                  </div>

                  {/* Formulário do Modo 1: Embalagem */}
                  {item.mode === 'package' && (
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor={`select-unidade-${item.id}`} className="text-xs font-semibold text-slate-700">
                          Unidade de medida
                        </label>
                        <select
                          id={`select-unidade-${item.id}`}
                          value={item.unit}
                          onChange={(e) => handleUpdate(item.id, { unit: e.target.value as AccessoryUnit })}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50/60 focus:bg-white min-h-[44px] py-2 px-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 shadow-2xs"
                        >
                          <option value="un">Unidade (un)</option>
                          <option value="g">Gramas (g)</option>
                          <option value="ml">Mililitros (ml)</option>
                        </select>
                      </div>

                      <NumericInput
                        id={`input-preco-emb-${item.id}`}
                        label="Preço da embalagem"
                        prefix="R$"
                        placeholder="Ex: 25,00"
                        value={item.packagePrice}
                        onChange={(val) => handleUpdate(item.id, { packagePrice: val })}
                        required
                      />

                      <NumericInput
                        id={`input-qtd-emb-${item.id}`}
                        label="Qtd na embalagem"
                        suffix={item.unit}
                        placeholder="Ex: 100"
                        value={item.packageQuantity}
                        onChange={(val) => handleUpdate(item.id, { packageQuantity: val })}
                        required
                      />

                      <NumericInput
                        id={`input-qtd-usada-${item.id}`}
                        label="Qtd usada por peça"
                        suffix={item.unit}
                        placeholder="Ex: 1"
                        value={item.quantityPerPiece}
                        onChange={(val) => handleUpdate(item.id, { quantityPerPiece: val })}
                        required
                      />
                    </div>
                  )}

                  {/* Formulário do Modo 2: Já sei o custo por peça */}
                  {item.mode === 'direct' && (
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 max-w-sm">
                      <NumericInput
                        id={`input-custo-direto-${item.id}`}
                        label="Custo do material por peça"
                        prefix="R$"
                        placeholder="Ex: 0,75"
                        value={item.directCostPerPiece}
                        onChange={(val) => handleUpdate(item.id, { directCostPerPiece: val })}
                        helpText="Ideal para tintas, lixas, cola instantânea ou fitas onde é mais prático estimar um valor fixo por peça."
                        required
                      />
                    </div>
                  )}

                  {/* Custo Calculado por Peça */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-500 font-medium">Custo calculado deste acabamento:</span>
                    <span className="text-sm font-bold text-slate-900">
                      {costPerPiece !== null ? (
                        <>
                          <span className="text-blue-700">{formatCurrency(costPerPiece)}</span>
                          <span className="text-slate-400 font-normal text-xs ml-1">/ peça</span>
                        </>
                      ) : (
                        <span className="text-slate-400 font-normal">Preencha os valores para calcular</span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
