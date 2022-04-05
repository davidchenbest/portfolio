
import React, { useState, createContext, useRef, useEffect, useCallback } from 'react'
import Peer from 'peerjs';
import UserVideoControls from './lib/UserVideoControls';

const userVideoControls = new UserVideoControls()

export const ConnectionContext = createContext()

const ConnectionProvider = (props) => {
    const PEER = useRef()
    const userVideoRef = useRef()
    const [error, setError] = useState('');
    const [peerId, setPeerId] = useState('');
    const [peers, setPeers] = useState([]);
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');
    const [videoReady, setVideoReady] = useState('');
    useEffect(() => {
        PEER.current = new Peer()
    }, [])
    useEffect(() => {
        PEER.current.on('open', (id) => {
            setPeerId(id)
        });

        // answer video call
        PEER.current.on('call', (incoming) => {
            incoming.answer(userVideoRef.current.srcObject)
            incoming.on('stream', function (remoteStream) {
                setPeers(pre => {
                    for (let i = 0; i < pre.length; i++) {
                        if (pre[i].id === incoming.peer) return pre
                    }
                    return [...pre, { call: incoming, srcObject: remoteStream, id: incoming.peer, name: incoming.metadata.caller }]
                })
            });
        })


    }, [userVideoRef])



    const callVideo = useCallback((remotePeerId, joinerName) => {
        console.log('calling', { remotePeerId, joinerName });
        const outgoing = PEER.current.call(remotePeerId, userVideoRef.current.srcObject, { metadata: { caller: name } })
        outgoing.on('stream', (remoteStream) => {
            console.log('stream remoteStream');
            setPeers(pre => {
                for (let i = 0; i < pre.length; i++) {
                    if (pre[i].id === outgoing.peer) return pre
                }
                return [...pre, { call: outgoing, srcObject: remoteStream, id: outgoing.peer, name: joinerName }]
            })
        });
    }, [name])

    const removePeer = useCallback(id => {
        setPeers(pre => {
            const newPeers = []
            for (const peer of pre) {
                if (peer.id === id) userVideoControls.replaceSendersTrack(peer.call, null);
                else newPeers.push(peer)
            }
            return newPeers
        })
    }, [])

    const removeAllPeers = () => {
        setPeers(pre => {
            for (const peer of pre) {
                userVideoControls.replaceSendersTrack(peer.call, null);
            }
            return []
        })
    }

    return (
        <ConnectionContext.Provider value={{
            userVideoRef, peerId, callVideo, peers, room, name, setRoom, setName,
            error, setError, removePeer, removeAllPeers, videoReady, setVideoReady
        }}>
            {props.children}
        </ConnectionContext.Provider>
    )
}

export default ConnectionProvider