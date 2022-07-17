import React from "react";
import * as THREE from "three";
const Track = ({ mapWidth, mapHeight, trackRef, arcCenterX, trackRadius }) => {


  const getLineMarkings = () => {
    const canvas = document.createElement("canvas");
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#546e90";
    ctx.fillRect(0, 0, mapWidth, mapHeight);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#E0ffff";
    ctx.setLineDash([10, 15]);

    //left loop
    ctx.beginPath();
    ctx.arc(mapWidth / 2 - arcCenterX, mapHeight / 2, trackRadius, 0, Math.PI * 2);
    ctx.stroke();

    //right loop
    ctx.beginPath();
    ctx.arc(mapWidth / 2 + arcCenterX, mapHeight / 2, trackRadius, 0, Math.PI * 2);
    ctx.stroke();
    return new THREE.CanvasTexture(canvas);
  };
  const linesTexture = getLineMarkings();

  // const fieldGeometry = new THREE.

//   const getLeftIsland = () => {
//     let islandLeftShape = new THREE.Shape();
//     islandLeftShape.absarc(-arcCenterX, 0, innerTrackRadius, arcAngle1, -arcAngle1, false);
//     islandLeftShape.absarc(arcCenterX, 0, outerTrackRadius+10, Math.PI + arcAngle2, Math.PI - arcAngle2, true);

//     return islandLeftShape;
//   };
//   const islandLeft = getLeftIsland();

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={trackRef}>
        <planeBufferGeometry args={[mapWidth, mapHeight]} />
        <meshLambertMaterial color={0xffffff} map={linesTexture} />
      </mesh>
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeBufferGeometry args={[[islandLeft], { depth: 6, bevelEnabled: false }]} />
        <meshLambertMaterial color={0x67c240} />
        <meshLambertMaterial color={0x23311c} />
      </mesh> */}
    </>
  );
};

export default Track;
