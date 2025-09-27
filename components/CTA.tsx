'use client';

import Link from 'next/link';

export default function CTA({ locale='en' }:{locale?:'en'|'fa'}) {
  return (
    <section className="container my-12">
      <div className="card relative overflow-hidden p-7 lg:p-9 text-center">
        <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <h3 className="text-2xl font-bold">Ready to pass sooner?</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Start a full mock test now and track your progress.</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link href={`/${locale}/tests`} className="btn btn-primary">Start Mock Test</Link>
          <Link href={`/${locale}/instructors`} className="btn btn-ghost">Find Instructors</Link>
        </div>
      </div>
    </section>
  );
}
