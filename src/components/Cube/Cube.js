import React, { useRef } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox } from '@react-three/cannon'

const deg2rad = degrees => degrees * (Math.PI / 180);

function Box(props) {
  const box_ref = useRef()
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 0, 0] }));
  {console.log(props.data.T_GYRO_R)}
  useFrame(() => {
    box_ref.current.rotation.y = deg2rad(props.data.T_GYRO_Y);
    box_ref.current.rotation.x = deg2rad(props.data.T_GYRO_R);
    box_ref.current.rotation.z = deg2rad(props.data.T_GYRO_P);
  })
  
  
  return (
    <mesh
      onClick={() => {
        api.velocity.set(0, 0, 0);
      }}
      ref={box_ref}
      position={[0, 2, 0]}
    >
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="darkblue" />
    </mesh>
  );
}

function Plane() {
 
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial/>
    </mesh>
  );
}

export default function Cube(props) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 15, 10]} angle={0.3} />
      <Physics>
        
        <Box data={props.data} roll={props.roll} yaw={props.yaw} pitch={props.pitch} />
        <Plane />
      </Physics>
    </Canvas>
  );
}