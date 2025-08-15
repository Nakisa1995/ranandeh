import Hero from '@/components/Hero';
import CategoryTiles from '@/components/CategoryTiles';
import {I18nProvider} from '@/lib/i18n';

export default function HomePage({params:{locale}}:{params:{locale:'en'|'fa'}}){
  return (
    <div className="space-y-8">
      <Hero />
      <CategoryTiles locale={locale} />
      <section className="card">
        <h2 className="text-xl font-semibold">Why Ranandeh?</h2>
        <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
          <li>Bilingual EN/FA with instant switch.</li>
          <li>Mock tests, hazard perception and instructor search.</li>
          <li>Clean UX with cards & navigation.</li>
        </ul>
      </section>
    </div>
  );
}
