import InstructorCard from '@/components/InstructorCard';
import SearchBar from '@/components/SearchBar';

function demo(filter?: string){
  const list = [
    {name:'Ali Rezaei', city:'Coventry', phone:'+44 7000 000001', bio:'DVSA approved (ADI)'},
    {name:'Sarah Jones', city:'Birmingham', phone:'+44 7000 000002', bio:'Manual & Automatic'},
    {name:'Hassan Karimi', city:'London', phone:'+44 7000 000003', bio:'Farsi & English'},
  ];
  if (!filter) return list;
  const f = filter.toLowerCase();
  return list.filter(i => i.city.toLowerCase().includes(f) || i.name.toLowerCase().includes(f));
}

export default function InstructorsPage({searchParams}:{searchParams:{q?:string}}){
  const q = searchParams.q || '';
  const list = demo(q);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Instructors</h1>
      <div className="card"><SearchBar /></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.length ? list.map((i)=> <InstructorCard key={i.phone} {...i} />) : (
          <div className="text-sm opacity-70">No instructors found.</div>
        )}
      </div>
    </div>
  );
}
