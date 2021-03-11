import usePresence from "../components/usePresence";
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Background from '../components/background';
import Player from '../components/player';

export default function Home() {

  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [joined, setJoined] = useState(false);

  const onPlayerJoined = newPlayer => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const onPlayerLeft = departedPlayer => {
    setPlayers(prevPlayers =>
      prevPlayers.filter(p => p.connectionId !== departedPlayer.connectionId));
  }

  const [joinGame] = usePresence(
    "testing",
    member => onPlayerJoined(member),
    member => onPlayerLeft(member));

  const handleNameChange = event => {
    setPlayerName(event.target.value)
  };

  const handleJoinSubmit = event => {
    event.preventDefault();
    setJoined(() => true);
    joinGame(playerName);
  };

  return (
    <main className={styles.container}>
      {!joined && <form onSubmit={handleJoinSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={handleNameChange}></input>
        <button type="submit">Join</button>
      </form>
      }
      <svg className={styles.gamewindow}>
        <Background styles="width: 100%"/>
        {players.map(p => <Player player={p}></Player> )}
      </svg>
    </main>
  )
}
