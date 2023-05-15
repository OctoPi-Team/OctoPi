import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { BufferGeometry, Material, MathUtils, Mesh, Raycaster, Vector3 } from 'three';
import { StairType } from './Stair';

const PLAYER_SIZE = 0.5;
const SPEED = 0.05;
const COLLISION_RANGE = 0.26;
const COLLISION_IS_ACTIVE = true;

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
	stairs: StairType[];
}

function getHeight(stairLength: number, stairHeight: number, currentProgression: number, lowerHeight: number) {
	// get height of the player based on position on the staircase
	// uses trigometry
	//       y2
	//   ----------
	//   |       /
	//   |      /
	// x2|--y1-/
	//   |    /
	//   x1  /this line is the stair
	//   |../
	//   |a/
	//   |/
	// x1 is the progression on the staircase width
	// y1 is the progression on the staircase height
	// x2 is the total width of the staircase
	// y2 is the total height of the staircase
	// these values are calculated via difference between the values passed into the function
	// y1 is the current height/result we want
	// tan(x2/y1) = alpha = tan(x1/y2) -> tan-1(tan(x1/y2)) = x2/y1 -> 1/y1 = (x1/y2)/x2 -> y1 = x2 / (x1/y2)
	// adding the lowerHeight gives us the wanted result
	return lowerHeight + currentProgression / (stairLength / stairHeight);
}

function Player({ startPosition, platforms, stairs }: PlayerArgs) {
	const ref = useRef<Mesh>(null);
	// player movement
	useFrame(delta => {
		if (!ref.current) return;

		const playerPosition = ref.current.position.clone();
		const topOfPlayer = playerPosition.y + PLAYER_SIZE;
		// collision points are origins of raycasts
		// they are positioned at the edge of the top side of the cube with a distance to the center of COLLISION_RANGE
		const collisionPoints: Vector3[] = [
			// right
			new Vector3(playerPosition.x, topOfPlayer, playerPosition.z + COLLISION_RANGE),
			// down
			new Vector3(playerPosition.x - COLLISION_RANGE, topOfPlayer, playerPosition.z),
			// left
			new Vector3(playerPosition.x, topOfPlayer, playerPosition.z - COLLISION_RANGE),
			// up
			new Vector3(playerPosition.x + COLLISION_RANGE, topOfPlayer, playerPosition.z),
		];

		// loop through all points to check if the raycast from that point downwards hits a platform
		// depending on the result the player can or cant move in the direction of this point
		for (const pointId in collisionPoints) {
			const point = collisionPoints[pointId];
			const downVector = new Vector3(0, -1, 0).clone().normalize();
			const ray = new Raycaster(point, downVector);
			const results = ray.intersectObjects(platforms);

			if (results.length > 0 || !COLLISION_IS_ACTIVE) {
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

		for (const stair of stairs) {
			function flattenVector(v: Vector3, planeTransformer: Vector3 = new Vector3(1, 0, 1)) {
				return v.clone().multiply(planeTransformer);
			}
			const flattenedStart = flattenVector(stair.startPosition);
			const flattenedEnd = flattenVector(stair.endPosition);
			const flattenedPlayer = flattenVector(playerPosition);

			function getAngleFromThreePoints(start: Vector3, middle: Vector3, end: Vector3) {
				const dir1 = new Vector3().subVectors(middle, start);
				const dir2 = new Vector3().subVectors(middle, end);
				return MathUtils.radToDeg(dir2.angleTo(dir1));
			}
			const angleBetweenStairStartAndPlayer = getAngleFromThreePoints(flattenedPlayer, flattenedStart, flattenedEnd);
			const angleBetweenStairEndAndPlayer = getAngleFromThreePoints(flattenedPlayer, flattenedEnd, flattenedStart);
			const flatStairLength = flattenedStart.distanceTo(flattenedEnd);
			const distanceFromPlayerToStairCenter = flattenVector(stair.mesh.position).distanceTo(flattenedPlayer);
			if (
				// player is after startPosition
				angleBetweenStairStartAndPlayer < 90 &&
				// player is before endPosition
				angleBetweenStairEndAndPlayer < 90 &&
				// player is near enough to the stairs
				distanceFromPlayerToStairCenter < flatStairLength
			) {
				// calculate player height
				// D
				// |
				// A---C
				// |  /
				// | /
				// |/
				// B
				//
				// A - Current Progression Point on stair
				// B - Stair Start
				// C - Player Position
				// D - Stair End
				// progression == |AB| == cos(alpha)*|BC|
				let progression =
					Math.cos(MathUtils.degToRad(angleBetweenStairStartAndPlayer)) * flattenedStart.distanceTo(flattenedPlayer);
				if (progression < 0.07) {
					progression = 0;
				} else if (flatStairLength - progression < 0.07) {
					progression = flatStairLength;
				}
				ref.current.position.y = getHeight(
					flatStairLength,
					stair.endPosition.y - stair.startPosition.y,
					progression,
					stair.startPosition.y + PLAYER_SIZE / 2
				);
			}
		}
		/*
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
		*/
	});

	return (
		<mesh name="player" ref={ref} position={[startPosition.x, startPosition.y + PLAYER_SIZE / 2, startPosition.z]}>
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
