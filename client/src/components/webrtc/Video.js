import { useRef, useEffect, useContext, useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import VideoControls from "./lib/VideoControls";

const videoControls = new VideoControls()

function Video({ srcObject, id, call, name, socketId }) {
  const videoRef = useRef(null)
  const { removePeer } = useContext(ConnectionContext)
  const [videoReady, setVideoReady] = useState()


  useEffect(() => {
    videoRef.current.srcObject = srcObject
    console.log('playing video', srcObject);
    videoRef.current.play()
  }, [srcObject])


  useEffect(() => {
    const videoEventListener = videoRef.current.addEventListener('play', (event) => {
      setVideoReady(true)
    })
    return videoEventListener?.removeEventListener('play')
  }, [videoRef, setVideoReady])

  const toggleVideo = () => {
    videoControls.toggleVideo(videoRef.current.srcObject)
  }

  const toggleAudio = () => {
    videoControls.toggleAudio(videoRef.current.srcObject)
  }

  const handleRemoveUser = () => {
    removePeer(id)
  }


  return (
    <div className="peerVideoCon">
      <span className="name">{name}</span>
      <div className="peerVideoControls">
        {videoReady ?
          <>
            <button onClick={toggleVideo}>video</button>
            <button onClick={toggleAudio}>audio</button>
            <button onClick={handleRemoveUser}>X</button>
          </>
          : <span>Loading</span>
        }
      </div>
      <video ref={videoRef} preload="none" />
    </div>
  );
}

export default Video;