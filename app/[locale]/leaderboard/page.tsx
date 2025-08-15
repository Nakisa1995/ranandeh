export default function LeaderboardPage(){
  const demo = [
    {name:'Nima', score: 49, tests: 12},
    {name:'Sarah', score: 47, tests: 8},
    {name:'Ali', score: 45, tests: 15},
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Leaderboard</h1>
      <div className="card">
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr><th className="py-2">Rank</th><th>Name</th><th>Best Score</th><th>Tests</th></tr>
          </thead>
          <tbody>
            {demo.map((r,i)=>(
              <tr key={r.name} className="border-b last:border-0">
                <td className="py-2">{i+1}</td>
                <td>{r.name}</td>
                <td>{r.score}/50</td>
                <td>{r.tests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
