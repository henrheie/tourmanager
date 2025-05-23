
import { use } from 'react';
import { useLeaderboard } from '@/lib/fetchers';

export default function LeaderboardPage() {
  const { data } = use(useLeaderboard());

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>#</th>
            <th>Spiller</th>
            <th>Poeng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx: number) => (
            <tr key={row.id} className="border-b">
              <td>{idx + 1}</td>
              <td>{row.name}</td>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
