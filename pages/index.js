import usePresence from "../components/usePresence";
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Background from './background';

export default function Home() {

  const [players, setPlayers] = useState([]);

  const onPlayerJoined = newPlayer => {
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const onPlayerLeft = departedPlayer => {
    setPlayers(prevPlayers =>
      prevPlayers.filter(p => p.connectionId !== departedPlayer.connectionId));
  }

  const [channel, ably] = usePresence(
    "testing",
    member => onPlayerJoined(member),
    member => onPlayerLeft(member));

  return (
    <main className={styles.container}>
      <svg className={styles.gamewindow}>
        <Background styles="width: 100%"/>
        {players.map(p =>
          <circle
            key={p.connectionId}
            cx={p.data.x}
            cy={p.data.y}
            r="10"
            className={styles.player}
            stroke={p.clientId} />)}
      </svg>
    </main>
  )
}
