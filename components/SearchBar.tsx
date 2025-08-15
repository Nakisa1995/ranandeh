'use client';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';

export default function SearchBar(){
  const router = useRouter();
  const params = useSearchParams();
  const [q,setQ] = useState(params.get('q') ?? '');
  useEffect(()=>{ setQ(params.get('q') ?? ''); }, [params]);
  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    const usp = new URLSearchParams(Array.from(params.entries()));
    if(q) usp.set('q', q); else usp.delete('q');
    router.push(`?${usp.toString()}`);
  }
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input className="input flex-1" placeholder="Search by city or instructor" value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn-ghost" type="submit">Search</button>
    </form>
  );
}
