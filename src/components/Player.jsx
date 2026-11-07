import { useState } from 'react'

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [playerName, setPlayerName] = useState(initialName)

  function handleEditClick() {
    // Met à jour le state en se basant sur le state précédent
    setIsEditing((editing) => !editing)

    // appeler la fonction onChangeName() si modification du nom en cours
    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value)
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing) {
    editablePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} required />
    )
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}
