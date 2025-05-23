import { NextResponse } from 'next/server';
import leaderboard from '../../../lib/mock-data/leaderboard.json';

export async function GET() {
  await new Promise((res) => setTimeout(res, 300));
  return NextResponse.json(leaderboard);
}
