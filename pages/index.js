import Head from 'next/head'
import usePresence from "../components/usePresence";
import { useState } from 'react';

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
    <div>
      <Head>
        <title>Ably Canvas Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <svg width="100" height="100">
          {players.map(p => <circle key={p.connectionId} cx={p.data.x} cy={p.data.y} r="10" stroke="gray" fill="#000" />)}
        </svg>
      </main>
    </div>
  )
}
