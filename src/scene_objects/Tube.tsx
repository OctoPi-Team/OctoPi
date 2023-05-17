import { useRef, useEffect } from 'react';
import { Color, Euler, Mesh, Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color: number | string | THREE.Color;
	rotation: number;
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

function Tube({name, position = [0, 0, 0], size = [1, 0.1, 1], color, rotation, reference }: TubeProps) {
	return (	
		<mesh position={position}>
			<cylinderBufferGeometry attach="geometry" args={[size[0], size[0], size[1], 32]} />
			<meshStandardMaterial color={color} transparent opacity={0.8}/>
		</mesh>
	);
}

export default Tube;
