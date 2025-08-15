import Link from 'next/link';
export default function TestsPage(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Mock tests</h1>
      <div className="card space-y-2">
        <p className="text-sm opacity-80">Take a quick practice test. (Sample only; add licensed questions later)</p>
        <div className="flex gap-2">
          <Link className="btn-primary" href="#"> Start a demo test </Link>
          <Link className="btn-ghost" href="#"> Hazard Perception </Link>
          <Link className="btn-ghost" href="#"> Road Signs </Link>
        </div>
      </div>
    </div>
  );
}
