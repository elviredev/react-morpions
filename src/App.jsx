import Player from './components/Player'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js'

// On ne créé pas un nouvel état pour "activePlayer", on le dérive de "gameTurns"
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  // Si dernier joueur était X, alors le joueur actif est O
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

function App() {
  // Gérer les tours de jeu de chaque joueur pour afficher les logs
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    // quand une case est sélectionnée, on ajoute un nouveau tour au tableau des tours
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      // "currentPlayer" est dérivé de "prevTurns" ce qui évite de
      // fusionner le state "gameTurns" avec le state "activePlayer dans "updateTurns"
      const updatedTurns = [
        // Ajout d'un objet comprenant le nouveau tour & le joueur actif responsable de ce tour
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]

      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
