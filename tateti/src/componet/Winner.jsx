import { Square } from "./square";

// eslint-disable-next-line react/prop-types
export function Winner({winner, resetGame}) {
  if (winner === null) return null;

  const winnerText = winner === false ? "El Juego Terminó en Empate" : "Ganó";
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Empezar de Nuevo</button>
        </footer>
      </div>
    </section>
  );
}
