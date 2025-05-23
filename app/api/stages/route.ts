import { NextResponse } from 'next/server';
import stages from '../../../lib/mock-data/stages.json';

export async function GET() {
  await new Promise((res) => setTimeout(res, 300));
  return NextResponse.json(stages);
}
