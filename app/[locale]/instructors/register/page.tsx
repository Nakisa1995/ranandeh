'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterInstructorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd) as any;

    try {
      const res = await fetch('/api/instructors/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      router.push(`/en/instructors?q=${encodeURIComponent(String(payload.city || ''))}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container py-8 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Register as Instructor</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="Full name" required className="w-full border rounded px-3 py-2" />
        <input name="email" type="email" placeholder="Email" required className="w-full border rounded px-3 py-2" />
        <input name="password" type="password" placeholder="Password (min 6)" required className="w-full border rounded px-3 py-2" />
        <input name="city" placeholder="City" required className="w-full border rounded px-3 py-2" />
        <input name="postcode" placeholder="Postcode" className="w-full border rounded px-3 py-2" />
        <input name="phone" placeholder="Phone" className="w-full border rounded px-3 py-2" />
        <input name="hourlyRate" type="number" placeholder="Hourly rate £" className="w-full border rounded px-3 py-2" />
        <textarea name="bio" placeholder="Short bio" rows={4} className="w-full border rounded px-3 py-2" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="rounded bg-black text-white px-4 py-2 disabled:opacity-60 dark:bg-white dark:text-black">
          {loading ? 'Submitting…' : 'Create account'}
        </button>
      </form>
    </section>
  );
}
