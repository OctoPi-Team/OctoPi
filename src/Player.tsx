import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { BufferGeometry, Material, Mesh, Raycaster, Vector3 } from 'three';

const PLAYER_SIZE = 0.5;
const SPEED = 0.05;
// x-z plane

// keys stores the current state of keyboard presses
const keys = {
	left: false,
	right: false,
	up: false,
	down: false,
};

interface PlayerArgs {
	startPosition: Vector3;
	platforms: Mesh<BufferGeometry, Material | Material[]>[];
}

function getHeight(
	lower_limit: number,
	upper_limit: number,
	lowerHeight: number,
	upperHeight: number,
	currentPos: number
) {
	// get height of the player based on position on the staircase
	// uses trigometry
	// x1 is the progression on the staircase width
	// y1 is the progression on the staircase height
	// x2 is the total width of the staircase
	// y2 is the total height of the staircase
	// these values are calculated via difference between the values passed into the function
	// y1 is the current height/result we want
	// tan(x2/y1) = alpha = tan(x1/y2) -> tan-1(tan(x1/y2)) = x2/y1 -> 1/y1 = (x1/y2)/x2 -> y1 = x2 / (x1/y2)
	// adding the lowerHeight gives us the wanted result

	const progression_until_3nd_platform = upper_limit - currentPos;
	if (progression_until_3nd_platform > 0) {
		const stairLength = upper_limit - lower_limit;
		const stairHeight = upperHeight - lowerHeight;
		const currentProgression = currentPos - lower_limit;
		return lowerHeight + currentProgression / (stairLength / stairHeight);
	}
	return upperHeight;
}

function Player({ startPosition, platforms }: PlayerArgs) {
	const ref = useRef<Mesh>(null);
	console.log(platforms);
	console.log(typeof platforms);

	// player movement
	useFrame(() => {
		if (!ref.current) return;

		// middle of cube (only works when player is a cube)
		// TODO change this code when the player sint a cube anymore -> create invisible collision cube
		const originPoint = ref.current.position.clone();

		const collisionPoints: Vector3[] = [
			new Vector3(originPoint.x, originPoint.y + PLAYER_SIZE / 2, originPoint.z + PLAYER_SIZE / 2),
			new Vector3(originPoint.x, originPoint.y + PLAYER_SIZE / 2, originPoint.z - PLAYER_SIZE / 2),
			new Vector3(originPoint.x - PLAYER_SIZE / 2, originPoint.y + PLAYER_SIZE / 2, originPoint.z),
			new Vector3(originPoint.x + PLAYER_SIZE / 2, originPoint.y + PLAYER_SIZE / 2, originPoint.z),
		];

		for (const pointId in collisionPoints) {
			const point = collisionPoints[pointId];
			const ray = new Raycaster(point, new Vector3(0, -1, 0).clone().normalize());
			const results = ray.intersectObjects(platforms);

			// collsion with current raycast origin
			if (results.length > 0) {
				switch (String(pointId)) {
					case '0': // right
						if (keys.right) ref.current.position.z += SPEED;
						break;
					case '1': // down
						if (keys.down) ref.current.position.x -= SPEED;
						break;
					case '2': // left
						if (keys.left) ref.current.position.z -= SPEED;
						break;
					case '3': // up
						if (keys.up) ref.current.position.x += SPEED;
						break;
				}
			}
		}

		// height
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
			<boxBufferGeometry args={[PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE]} />
			<meshStandardMaterial color={'blue'} />
		</mesh>
	);
}

// change 'keys' based on input events
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
