const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

export default function GameBoard({ onSelectSquare, turns }) {
  // Transformer le tableau "turns" en un tableau multidimensionel
  // Dériver le state du jeu "gameBoard" à partir des tours joués "turns → on crée une valeur calculée "gameBoard"
  // qui est dérivée du state "gameTurns" qui est géré dans le composant parent "App"
  let gameBoard = initialGameBoard

  for (const turn of turns) {
    const { square, player } = turn
    const { row, col } = square
    // Symbol du joueur qui a joué sur la case
    gameBoard[row][col] = player
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}
