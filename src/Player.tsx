/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

// keys stores the current state of keyboard presses
const keys = {
	left: false,
	right: false,
	up: false,
	down: false,
};

interface PlayerArgs {
	startPosition: Vector3;
}

function Player({ startPosition }: PlayerArgs) {
	const ref = useRef<Mesh>(null);

	// player movement
	useFrame(() => {
		if (!ref.current) return;

		const speed = 0.05;
		if (keys.left) ref.current.position.x -= speed;
		if (keys.right) ref.current.position.x += speed;
		if (keys.up) ref.current.position.z -= speed;
		if (keys.down) ref.current.position.z += speed;
	});

	return (
		<mesh name="player" ref={ref} position={startPosition} scale={[1, 1, 1]}>
			<boxBufferGeometry args={[0.5, 0.5, 0.5]} />
			<meshStandardMaterial color={'blue'} />
		</mesh>
	);
}

// change keys based on input events
export const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
	if (event.key === 'ArrowLeft') keys.left = true;
	if (event.key === 'ArrowRight') keys.right = true;
	if (event.key === 'ArrowUp') keys.up = true;
	if (event.key === 'ArrowDown') keys.down = true;
};

export const handleKeyUp: React.KeyboardEventHandler<HTMLDivElement> = event => {
	if (event.key === 'ArrowLeft') keys.left = false;
	if (event.key === 'ArrowRight') keys.right = false;
	if (event.key === 'ArrowUp') keys.up = false;
	if (event.key === 'ArrowDown') keys.down = false;
};

export default Player;
