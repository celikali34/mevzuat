import SearchForm from "@/components/SearchForm";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
            Türk Kamu İhale Hukuku Asistanı
          </h1>
          <p className="text-slate-300 text-sm md:text-base">
            4734 sayılı Kanun, ikincil mevzuat ve Kamu İhale Kurulu kararları
            üzerinde anahtar kelime veya doğal dil sorularıyla semantik arama
            yapın. Cevaplar daima ilgili madde ve kurul kararlarıyla birlikte gelir.
          </p>
        </header>

        <SearchForm />

        <section className="mt-8 space-y-2">
          <h2 className="text-sm font-medium text-slate-200">
            Örnek sorular
          </h2>
          <ul className="text-xs md:text-sm text-slate-400 list-disc list-inside space-y-1">
            <li>
              4734 sayılı Kanuna göre aşırı düşük teklif açıklaması süresi
              nedir?
            </li>
            <li>
              İhale dokümanında yer almayan kriterlere göre teklif
              değerlendirmesi yapılabilir mi?
            </li>
            <li>
              Teklifim yaklaşık maliyetin üzerinde olduğu için reddedildi, buna
              ilişkin emsal kurul kararı var mı?
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

