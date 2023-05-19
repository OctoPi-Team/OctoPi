import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { BufferGeometry, Material, MathUtils, Mesh, Raycaster, Vector3 } from 'three';
import { StairType } from './platforms/Stair';
import ObjectLoad from '../ObjectLoad';

const playerSize = 0.5;
const speed = 0.1;
const collisionRange = 0.26;
const collisionIsActive = true;

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
	const [rotation, setRotation] = useState<Vector3>(new Vector3(0, 0, 0));
	// player movement
	useFrame(() => {
		if (!ref.current) return;

		const playerPosition = ref.current.position.clone();
		const topOfPlayer = playerPosition.y + playerSize;
		// collision points are origins of raycasts
		// they are positioned at the edge of the top side of the cube with a distance to the center of collisionRange
		const collisionPoints: Vector3[] = [
			// right
			new Vector3(playerPosition.x, topOfPlayer, playerPosition.z + collisionRange),
			// down
			new Vector3(playerPosition.x - collisionRange, topOfPlayer, playerPosition.z),
			// left
			new Vector3(playerPosition.x, topOfPlayer, playerPosition.z - collisionRange),
			// up
			new Vector3(playerPosition.x + collisionRange, topOfPlayer, playerPosition.z),
		];

		// loop through all points to check if the raycast from that point downwards hits a platform
		// depending on the result the player can or cant move in the direction of this point
		for (const pointId in collisionPoints) {
			const point = collisionPoints[pointId];
			const downVector = new Vector3(0, -1, 0).clone().normalize();
			const ray = new Raycaster(point, downVector);
			const results = ray.intersectObjects(platforms);

			if (results.length > 0 || !collisionIsActive) {
				switch (String(pointId)) {
					case '0': // right
						if (keys.right) {
							ref.current.position.z += speed / 2;
							ref.current.position.x -= speed / 2;
						}
						break;
					case '1': // down
						if (keys.down) {
							ref.current.position.x -= speed / 2;
							ref.current.position.z -= speed / 2;
						}
						break;
					case '2': // left
						if (keys.left) {
							ref.current.position.z -= speed / 2;
							ref.current.position.x += speed / 2;
						}
						break;
					case '3': // up
						if (keys.up) {
							ref.current.position.x += speed / 2;
							ref.current.position.z += speed / 2;
						}
						break;
				}
			}
		}

		function flattenVector(v: Vector3, planeTransformer: Vector3 = new Vector3(1, 0, 1)) {
			return v.clone().multiply(planeTransformer);
		}
		function getAngleFromThreePoints(start: Vector3, middle: Vector3, end: Vector3) {
			const dir1 = new Vector3().subVectors(middle, start);
			const dir2 = new Vector3().subVectors(middle, end);
			return MathUtils.radToDeg(dir2.angleTo(dir1));
		}
		for (const stair of stairs) {
			const flattenedStart = flattenVector(stair.startPosition);
			const flattenedEnd = flattenVector(stair.endPosition);
			const flattenedPlayer = flattenVector(playerPosition);

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
				// |/<-- alpha
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
					stair.startPosition.y + playerSize / 2
				);
			}

			//Set rotation here
			const newRotation = new Vector3();
			if (keys.right) {
				newRotation.y += Math.PI / 1.3;
			}
			if (keys.down) {
				newRotation.y += Math.PI / 4;
			}
			if (keys.left) {
				newRotation.y -= Math.PI / 4;
			}
			if (keys.up) {
				newRotation.y -= Math.PI / 1.35;
			}
			setRotation(newRotation);
		}
	});

	return (
		<mesh
			name="player"
			ref={ref}
			position={[startPosition.x, startPosition.y + playerSize / 2, startPosition.z]}
			rotation={rotation.toArray()} // Set rotation based on state
		>
			<ObjectLoad
				pathObj="/Player/Player.obj"
				position={[0, 0, 0]}
				pathMtl="/Player/Player.mtl"
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 90, 0]}
			/>
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
