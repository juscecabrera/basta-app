'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';

interface GameState {
  letter: string;
  categories: string[];
  players: { [playerId: string]: { answers: { [category: string]: string } } };
  stopped: boolean;
}

export default function Game() {
  const params = useParams();
  const searchParams = useSearchParams();
  const gameId = params.gameId as string;
  const playerId = searchParams.get('player') || '';
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!gameId || !playerId) return;

    const fetchGameState = async () => {
      const res = await fetch(`/api/game/${gameId}`);
      const data = await res.json();
      setGameState(data);
    };

    fetchGameState();
    const interval = setInterval(fetchGameState, 2000); // Polling cada 2s
    return () => clearInterval(interval);
  }, [gameId, playerId]);

  const handleAnswerChange = (category: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmitAnswers = async () => {
    await fetch(`/api/game/${gameId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId, answers }),
    });
  };

  const handleStop = async () => {
    await fetch(`/api/game/${gameId}/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId }),
    });
  };

  if (!gameState) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Partida: {gameId}</h1>
      <p className="text-lg mb-4">Letra: {gameState.letter}</p>
      {gameState.stopped ? (
        <div>
          <h2 className="text-xl font-semibold">Resultados</h2>
          {Object.entries(gameState.players).map(([pid, data]) => (
            <div key={pid} className="mt-4">
              <h3 className="font-medium">{pid}</h3>
              <ul>
                {Object.entries(data.answers).map(([cat, ans]) => (
                  <li key={cat}>
                    {cat}: {ans || 'Sin respuesta'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="mb-4">
            {gameState.categories.map((category) => (
              <div key={category} className="mb-2">
                <label className="block text-sm font-medium">{category}</label>
                <input
                  type="text"
                  value={answers[category] || ''}
                  onChange={(e) => handleAnswerChange(category, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  disabled={gameState.stopped}
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmitAnswers}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Enviar respuestas
          </button>
          <button
            onClick={handleStop}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            ¡Basta!
          </button>
        </div>
      )}
    </div>
  );
}