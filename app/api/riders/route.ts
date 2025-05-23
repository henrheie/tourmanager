import { NextResponse } from 'next/server';
import riders from '../../../lib/mock-data/riders.json';

export async function GET() {
  await new Promise((res) => setTimeout(res, 300));
  return NextResponse.json(riders);
}
