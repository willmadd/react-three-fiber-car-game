import { useTexture } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import * as THREE from 'three';
const Car = ({carRef, arcCenterX, trackRadius}) => {
  const vehicleColours = [0xff6347, 0x1e90ff, 0xbada55, 0xfff68f];

  const randomColor = vehicleColours[Math.floor(Math.random() * 4)];

  const textureArr = ["textures/1.jpeg", "textures/2.jpeg", "textures/3.jpeg", "textures/4.jpeg", "textures/5.jpeg", "textures/6.jpeg"];

  const loadedTexturesArr = textureArr.map(text => {
    return useLoader(TextureLoader, `${text}`);
  });

  console.log(loadedTexturesArr);

  const getCarFront = () => {
    let canvas = document.createElement("canvas"),
      ctx;
    ctx = canvas.getContext("2d");
    canvas.width = 64;
    canvas.height = 32;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 64, 32);
    ctx.fillStyle = "#666666";
    ctx.fillRect(6, 4, 52, 24);
    return new THREE.CanvasTexture(canvas);
  };

  const getCarSides = () => {
    let canvas = document.createElement("canvas"),
      ctx;
    ctx = canvas.getContext("2d");
    canvas.width = 64;
    canvas.height = 32;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 64, 32);
    ctx.fillStyle = "#666666";
    ctx.fillRect(4, 4, 24, 24);
    ctx.fillStyle = "#666666";
    ctx.fillRect(33, 4, 26, 24);
    return new THREE.CanvasTexture(canvas);
  };

  const carFront = getCarFront();
  const carSides = getCarSides();

  return (
    <group ref={carRef}>
      <mesh position={[0, 0, -16]}>
        <boxBufferGeometry args={[33, 12, 12]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
      <mesh position={[0,0,16]}>
        <boxBufferGeometry args={[33, 12, 12]} />
        <meshLambertMaterial color={0x333333} />
      </mesh>
      <mesh position={[0,6,0]}>
        <boxBufferGeometry args={[29, 16, 66]} />
        <meshLambertMaterial color={randomColor} />

      </mesh>
      <mesh position={[0,16,-6]}>
        <boxBufferGeometry attach="geometry" args={[25, 16, 30]} />
        <meshLambertMaterial attach="material-0" map={carSides} />
        <meshLambertMaterial attach="material-1" map={carSides} />
        <meshStandardMaterial attach="material-2" color={"white"} />
        <meshStandardMaterial attach="material-3" color={"green"} />
        <meshLambertMaterial attach="material-4" map={carFront} />
        <meshLambertMaterial attach="material-5"  map={carFront} />
      </mesh>
    </group>
  );
};

export default Car;
