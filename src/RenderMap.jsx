import { context } from '@react-three/fiber';
import React from 'react';

const RenderMap = ({mapWidth, mapHeight}) => {



    return (
        <mesh rotation={[-Math.PI/2 ,0,0]}>
            <planeBufferGeometry args={[mapWidth, mapHeight]} />
            <meshLambertMaterial color={0x546e90}/>
        </mesh>
    );
}

export default RenderMap;
