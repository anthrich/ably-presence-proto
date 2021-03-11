import Ably from "ably/promises";
import { useEffect } from 'react'

const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });

export default function usePresence(channelName, onNewPresence, onPresenceLeft) {
    const channel = ably.channels.get(channelName);

    const onMount = () => {
        channel.presence.subscribe('enter', member => {
            onNewPresence(member);
        });

        channel.presence.subscribe('present', member => {
            onNewPresence(member);
        })

        channel.presence.subscribe('leave', member => {
            onPresenceLeft(member);
        });
    }

    const joinGame = (name) => {
        var x = Math.floor(Math.random() * 100);
        var y = Math.floor(Math.random() * 100);
        channel.presence.enter({x,y,name});
    }

    const onUnmount = () => {
        channel.presence.leave();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    useEffect(useEffectHook, []);

    return [joinGame];
}
