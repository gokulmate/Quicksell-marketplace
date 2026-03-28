import React from "react";

export default function ComparisonTable({ selectedProducts, removeProduct, onAddToCart }) {
  if (selectedProducts.length < 2) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="flex flex-col items-center justify-center gap-3 p-14 mx-4 mt-10 rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">⚖️</div>
        <p className="text-gray-400 text-sm font-medium tracking-wide">Select at least 2 products to compare</p>
      </div>
    );
  }

  const allFeatureKeys = Array.from(
    new Set(selectedProducts.flatMap(p => Object.keys(p.features || {})))
  );

  const rowLabel = "p-4 text-xs font-semibold text-gray-400 uppercase tracking-widest bg-gray-50 w-40";
  const rowCell = "p-4 text-sm text-gray-700";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .ct-wrap * { font-family: 'DM Sans', sans-serif; }
        .ct-remove:hover { background: #fee2e2; color: #ef4444; }
        .ct-cart:hover { background: #d1fae5; color: #10b981; }
        .diff-badge { font-size: 9px; background: #fef3c7; color: #d97706; padding: 1px 5px; border-radius: 4px; font-weight: 600; letter-spacing: 0.04em; vertical-align: middle; margin-left: 6px; }
        .feature-row:hover td { background: #f9fafb; }
        .diff-row td { background: #fffbeb !important; }
        .diff-row:hover td { background: #fef3c7 !important; }
      `}</style>

<div className="ct-wrap mt-10 mx-4 mb-10 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white">
<p className="text-xs text-gray-400 mb-2 px-2">
  👉 Swipe left/right to compare more products
</p>
<table className="min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              {/* Header label cell */}
              <th className="p-5 w-40 bg-gray-50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Product</span>
              </th>

              {/* Product columns */}
              {selectedProducts.map((p, i) => (
                <th key={p.id} className="p-5 border-l border-gray-100 bg-white">
                  <div className="flex flex-col gap-3">
                    {/* Product image */}
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-contain" />
                    </div>

                    {/* Name, price, actions */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 text-base leading-snug">{p.name}</p>
                        <p className="text-emerald-600 font-semibold text-sm mt-0.5">${p.price}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="ct-remove w-7 h-7 rounded-lg bg-gray-100 text-gray-400 text-xs flex items-center justify-center transition-colors"
                          title="Remove"
                        >✕</button>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="ct-cart w-7 h-7 rounded-lg bg-gray-100 text-green-500 text-sm flex items-center justify-center transition-colors"
                          title="Add to Cart"
                        >🛒</button>
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Price row */}
            <tr className="feature-row border-t border-gray-100">
              <td className={rowLabel}>Price</td>
              {selectedProducts.map(p => (
                <td key={p.id} className={`${rowCell} border-l border-gray-100 font-semibold text-emerald-600`}>
                  ${p.price}
                </td>
              ))}
            </tr>

            {/* Feature rows */}
            {allFeatureKeys.map((key) => {
              const values = selectedProducts.map(p => p.features?.[key] || "N/A");
              const isDiff = new Set(values).size > 1;

              return (
                <tr key={key} className={`feature-row border-t border-gray-100 ${isDiff ? "diff-row" : ""}`}>
                  <td className={rowLabel}>
                    {key}
                    {isDiff && <span className="diff-badge">DIFF</span>}
                  </td>
                  {selectedProducts.map(p => (
                    <td key={p.id} className={`${rowCell} border-l border-gray-100 ${isDiff ? "font-medium text-gray-800" : "text-gray-500"}`}>
                      {p.features?.[key] ?? <span className="text-gray-200">—</span>}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}