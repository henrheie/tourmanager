"use client";
import { use } from 'react';
import Link from 'next/link';
import { useLeaderboard } from '@/lib/fetchers';

export default function LeaguePage({ params }: { params: { id: string } }) {
  const { data } = use(useLeaderboard());
  const invite = `https://example.com/league/${params.id}`;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Liga {params.id}</h1>
      <p className="mb-2">Inviter venner med lenken: <span className="underline">{invite}</span></p>
      <aside className="bg-gray-200 p-2 mb-2">Chat (dummy)</aside>
      <Link href="/leaderboard" className="text-blue-600">Se leaderboard</Link>
    </div>
  );
}
