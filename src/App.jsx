import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, OrthographicCamera, Text, Html } from "@react-three/drei";
import Car from "./Car";
import Track from "./Track";
import RenderMap from "./RenderMap";
import { useKeyboardControls } from './hooks/useKeyboardControls'
// import { useKeyboardControls } from '../hooks/useKeyboardControls'
const Scene = () => {
  const carRef = useRef();
  const cameraRef = useRef();
  const trackRef = useRef();
  const [score, setScore] = useState(0);
  const [ready, setReady] = useState(true);
  const [otherVehicles, setOtherVehicles] = useState([]);
  // const [lastTimeStamp, setLastTimeStamp] = useState("");
  const [playerAngleMoved, setPlayerAngleMoved] = useState(0);
  const [moveVehicle, setMoveVehicle] = useState(false);

    const { moveBackward, moveForward, moveLeft, moveRight } =
    useKeyboardControls()

  const trackRadius = 225;
  const trackWidth = 45;
  const innerTrackRadius = trackRadius - trackWidth;
  const outerTrackRadius = trackRadius + trackWidth;

  const arcAngle1 = (1 / 3) * Math.PI;
  const deltaY = Math.sin(arcAngle1) * innerTrackRadius;
  const arcAngle2 = Math.asin(deltaY / outerTrackRadius);

  const arcCenterX = Math.cos(arcAngle1) * innerTrackRadius + Math.cos(arcAngle2 * outerTrackRadius) / 2;

  const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius);
  const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius);

  const playerAngleInitial = Math.PI*2;
  let lastTimeStamp = null;

  useFrame((state, delta) => {
    // if(!lastTimeStamp)
    const timeStamp = state.clock.elapsedTime
    if(!lastTimeStamp){
      lastTimeStamp = timeStamp
    }
    const timeDelta = timeStamp - lastTimeStamp; 
    const xAngle = moveVehicle?timeDelta:0;
    const yAngle = moveVehicle?timeDelta:0;
    // console.log(angle)
    // if(moveVehicle){
      carRef.current.rotation.y -= moveVehicle?0.01659:0;
      carRef.current.position.x = Math.cos(playerAngleInitial + xAngle) * trackRadius - arcCenterX
      carRef.current.position.z = Math.sin(playerAngleInitial + yAngle) * trackRadius
    // }
  });

  const getSpeed = () =>{

  }


  const reset = () => {
    setScore(0)
    setPlayerAngleMoved(0)
    // movePlayerCar(0)
    // setLastTimeStamp(null)
    setOtherVehicles([])
    setReady(true)

  };

  const handleStart = () =>{
    setMoveVehicle(true)
  }

  useEffect(() => {
    cameraRef.current.lookAt(trackRef.current.position);
    reset()
  }, []);

  const aspectRatio = window.innerWidth / window.innerHeight;

  const cameraWidth = window.innerWidth;
  const cameraHeight = cameraWidth / aspectRatio;

  return (
    <>
      <axesHelper args={[20, 20, 20]} />
      <Html>
        <div className='score'>{`Score: ${score}`}</div>
        <button onClick={handleStart}>Play</button>
      </Html>
      <OrthographicCamera
        ref={cameraRef}
        position={[0, 500, 500]}
        makeDefault
        // near={0.4}
        args={[cameraWidth / -2, cameraWidth / 2, cameraHeight / 2, cameraHeight / -2]}
      />
      {/* <Text material-toneMapped={false} fontSize={2} font={`https://fonts.gstatic.com/s/itim/v10/0nknC9ziJOYe8ANAkOzaZwQ.woff2`}>William</Text> */}
      <ambientLight />
      <Car carRef={carRef} trackRadius={trackRadius} arcCenterX={arcCenterX}/>
      <Track trackRadius={trackRadius} arcCenterX={arcCenterX} trackRef={trackRef} mapWidth={cameraWidth} mapHeight={cameraHeight * 2} />
      <RenderMap />
      <axesHelper args={[20]} />
      {/* <Mirrors /> */}
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ fov: 70, position: [40, 40, 40] }}>
      <OrbitControls />
      <Scene />
    </Canvas>
  );
};

export default App;
