import styles from '../styles/Player.module.css';

const Player = (props) => {
    var p = props.player;
    return (
        <g>
            <circle
                key={p.connectionId}
                cx={p.data.x}
                cy={p.data.y}
                r="10"
                className={styles.player}
                stroke={p.clientId} />
            <text className={styles.name} x={p.data.x} y={p.data.y}>{p.data.name}</text>
        </g>
    );
}

export default Player;