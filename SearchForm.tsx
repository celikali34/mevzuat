"use client";

import { FormEvent, useState } from "react";

type SearchResponse = {
  summary: string;
  explanation: string;
  reasoning: string;
  regulationRefs: Array<{
    lawName: string;
    articleNumber: string;
    url?: string;
  }>;
  decisionRefs: Array<{
    decisionNumber: string;
    date?: string;
    url?: string;
  }>;
};

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SearchResponse | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/.netlify/functions/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      if (!res.ok) {
        throw new Error("Arama sırasında bir hata oluştu.");
      }

      const data = (await res.json()) as SearchResponse;
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-6 shadow-lg shadow-slate-900/40 space-y-3"
      >
        <label className="block text-xs font-medium text-slate-300 mb-1">
          Soru veya anahtar kelime
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-500"
          placeholder="Örn: 4734 sayılı Kanuna göre aşırı düşük teklif açıklaması için verilen süre kaç gündür?"
        />
        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-slate-500">
            Şu an için yalnızca yazılı sorular destekleniyor. PDF veya ekran
            görüntüsü yükleme, ileriki sürümlerde eklenecektir.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Analiz ediliyor..." : "Ara"}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-6 space-y-2">
            <h2 className="text-sm font-semibold text-slate-100">
              Özet cevap
            </h2>
            <p className="text-sm text-slate-200">{result.summary}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <h3 className="text-xs font-semibold text-slate-200">
                  Açıklama
                </h3>
                <p className="text-xs md:text-sm text-slate-300 whitespace-pre-line">
                  {result.explanation}
                </p>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                <h3 className="text-xs font-semibold text-slate-200">
                  Hukuki gerekçe
                </h3>
                <p className="text-xs md:text-sm text-slate-300 whitespace-pre-line">
                  {result.reasoning}
                </p>
              </section>
            </div>

            <aside className="space-y-4">
              {result.regulationRefs.length > 0 && (
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
                  <h3 className="text-xs font-semibold text-slate-200">
                    Mevzuat atıfları
                  </h3>
                  <ul className="space-y-1">
                    {result.regulationRefs.map((ref, idx) => (
                      <li
                        key={`${ref.lawName}-${ref.articleNumber}-${idx}`}
                        className="text-[11px] text-slate-300"
                      >
                        <span className="block font-medium">
                          {ref.lawName} – {ref.articleNumber}
                        </span>
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-blue-400 hover:underline"
                          >
                            Kaynağı görüntüle
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {result.decisionRefs.length > 0 && (
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
                  <h3 className="text-xs font-semibold text-slate-200">
                    Kurul kararları
                  </h3>
                  <ul className="space-y-1">
                    {result.decisionRefs.map((ref, idx) => (
                      <li
                        key={`${ref.decisionNumber}-${idx}`}
                        className="text-[11px] text-slate-300"
                      >
                        <span className="block font-medium">
                          {ref.decisionNumber}
                        </span>
                        {ref.date && (
                          <span className="block text-[10px] text-slate-500">
                            {ref.date}
                          </span>
                        )}
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-blue-400 hover:underline"
                          >
                            Kararı görüntüle
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>
        </div>
      )}
    </section>
  );
}

