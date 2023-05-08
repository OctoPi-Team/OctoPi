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

function getInterpolatedStairHeight(stairLength: number, stairHeight: number, currentProgression: number) {
	return currentProgression / (stairLength / stairHeight);
}

function getHeight(
	lower_limit: number,
	upper_limit: number,
	lowerHeight: number,
	upperHeight: number,
	currentPos: number
) {
	const progression_until_3nd_platform = upper_limit - currentPos;
	if (progression_until_3nd_platform > 0) {
		return (
			lowerHeight +
			getInterpolatedStairHeight(upper_limit - lower_limit, upperHeight - lowerHeight, currentPos - lower_limit)
		);
	}
	return upperHeight;
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

		const stair_one_start = 10;
		const stair_two_start = 6.5;
		if (ref.current.position.x > stair_two_start) {
			// second to third plattform
			ref.current.position.y = getHeight(stair_two_start, 9, 1.3, 2.1, ref.current.position.x);
		} else if (ref.current.position.z > stair_one_start) {
			// first to second platform
			ref.current.position.y = getHeight(stair_one_start, 16, 0.5, 1.3, ref.current.position.z);
		} else {
			// first plattform and default
			ref.current.position.y = startPosition.y;
		}
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
