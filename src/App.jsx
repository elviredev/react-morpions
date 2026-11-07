import Player from './components/Player'
import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'
import Log from './components/Log.jsx'
import { WINNING_COMBINATIONS } from './winning-combinations.js'
import GameOver from './components/GameOver.jsx'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

// On ne créé pas un nouvel état pour "activePlayer", on le dérive de "gameTurns"
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  // Si dernier joueur était X, alors le joueur actif est O
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

/** *
 * On évite de créer un nouvel état pour "gameBoard", on le dérive de "gameTurns"
 * On crée une valeur calculée "gameBoard" qui sera une copie de "INITIAL_GAME_BOARD"
 * et de chaque tableau à l'intérieur car c'est une référence vers une valeur extérieure à App} gameTurns  *
 */
function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map((array) => [...array])

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    // Symbol du joueur qui a joué sur la case
    gameBoard[row][col] = player
  }

  return gameBoard
}

/** Définir le gagnant qui est une valeur dérivé de gameBoard */
function deriveWinner(gameBoard, players) {
  let winner

  // Parcourir les combinaisons gagnantes à chaque fois que le composant est rendu
  for (const combination of WINNING_COMBINATIONS) {
    // On stocke dans des variables le symbol présent dans notre tableau de jeu sur ces 3 cases
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column] // 1ère case de la combinaison
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column] // 2è case
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column] // 3è case

    // Vérifie si les 3 cases ont des symbols identiques
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      // Afficher le nom du joueur qui a gagné correspondant à son symbol
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  // State principal: source de vérité
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  /** Match null si aucun gagnat et si les 9 tours sont joués */
  const hasDraw = gameTurns.length === 9 && !winner

  // Fonction qui gère la sélection d'une case
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

  /** Relancer le jeu */
  function handleRestart() {
    setGameTurns([])
  }

  /** Met à jour le nom du joueur quand il a changé via le composant Player */
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
