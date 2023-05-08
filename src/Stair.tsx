/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

// keys stores the current state of keyboard presses
const keys = {
	left: false,
	right: false,
	up: false,
	down: false,
};

interface StairArgs {
	startPosition: Vector3;
	orientation: [number, number, number];
	length: number;
}

function Stair({ startPosition, orientation, length }: StairArgs) {
	const ref = useRef<Mesh>(null);
	return (
		<mesh ref={ref} position={startPosition} rotation={orientation}>
			<boxBufferGeometry args={[1, 0.1, length]} />
			<meshStandardMaterial color={'white'} />
		</mesh>
	);
}

export default Stair;
