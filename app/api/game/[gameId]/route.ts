import { NextRequest, NextResponse } from 'next/server';

// Almacenamiento en memoria para el prototipo
const games: {
  [gameId: string]: {
    letter: string;
    categories: string[];
    players: { [playerId: string]: { answers: { [category: string]: string } } };
    stopped: boolean;
  };
} = {};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId') || req.url.split('/').pop();

  if (typeof gameId !== 'string') {
    return NextResponse.json({ error: 'Invalid gameId' }, { status: 400 });
  }

  if (!games[gameId]) {
    // Crear nueva partida
    games[gameId] = {
      letter: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Letra aleatoria
      categories: ['Nombre', 'Animal', 'Cosa', 'Lugar', 'Comida'],
      players: {},
      stopped: false,
    };
  }

  return NextResponse.json(games[gameId]);
}