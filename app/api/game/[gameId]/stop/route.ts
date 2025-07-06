import { NextRequest, NextResponse } from 'next/server';

// Almacenamiento en memoria para el prototipo
const games: {
  [gameId: string]: {
    letter: string;
    categories: string[];
    players:

 { [playerId: string]: { answers: { [category: string]: string } } };
    stopped: boolean;
  };
} = {};

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId') || req.url.split('/').slice(-2)[0];
  const { playerId } = await req.json();

  if (typeof gameId !== 'string' || !playerId) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!games[gameId]) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 });
  }

  games[gameId].stopped = true;
  return NextResponse.json({ success: true });
}