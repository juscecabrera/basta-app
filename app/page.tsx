'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleJoinGame = () => {
    if (gameId && playerName) {
      router.push(`/game/${gameId}?player=${encodeURIComponent(playerName)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Basta Multijugador</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium">ID de la partida</label>
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Ej: sala123"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tu nombre</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="Ej: Juan"
          />
        </div>
        <button
          onClick={handleJoinGame}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Unirse a la partida
        </button>
      </div>
    </div>
  );
}