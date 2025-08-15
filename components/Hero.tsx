'use client';
import {useI18n} from '@/lib/i18n';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

export default function Hero(){
  const {t, locale} = useI18n();
  const router = useRouter();
  const [q,setQ] = useState('');
  return (
    <section className="rounded-2xl bg-gradient-to-br from-brand/10 to-brand-light/10 p-6 sm:p-10 border">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ranandeh</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{t('Home.subtitle')}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input className="input" placeholder="Search city / جستجوی شهر" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn-primary" onClick={()=>{
          const usp = new URLSearchParams(); if(q) usp.set('q', q);
          router.push(`/${locale}/instructors?${usp.toString()}`);
        }}>Search</button>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <a className="btn-ghost" href={`/${locale}/tests`}>Mock Test</a>
        <a className="btn-ghost" href={`/${locale}/tests`}>Hazard Perception</a>
        <a className="btn-ghost" href={`/${locale}/tests`}>Road Signs</a>
        <a className="btn-ghost" href={`/${locale}/leaderboard`}>Leaderboard</a>
      </div>
    </section>
  );
}
