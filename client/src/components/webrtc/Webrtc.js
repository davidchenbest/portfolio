import { useContext } from 'react';
import './App.css';
import Video from './Video'
import UserVideo from './UserVideo'
import { ConnectionContext } from './ConnectionContext';
import RoomSocket from './RoomSocket';

function Webrtc() {
  const { peers } = useContext(ConnectionContext)

  return (
    <div className='webrtcCon'>
      <RoomSocket />
      <UserVideo />
      <div className='peerVideos'>
        {peers.map((p, i) =>
          <Video call={p.call} id={p.id} srcObject={p.srcObject} key={i} name={p.name} />
        )}
      </div>
    </div>
  );
}

export default Webrtc;