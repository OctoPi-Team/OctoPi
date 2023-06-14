import { useFrame } from '@react-three/fiber';
import { Scene, SceneProps } from '../../App';
import React, { useRef, useState } from 'react';
import { Box3, BufferGeometry, Material, MathUtils, Mesh, Vector2, Vector3 } from 'three';
import { STAIR_WIDTH, StairType } from './platforms/Stair';
import ObjectLoad from '../ObjectLoad';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';

export const PLAYER_SIZE = 0.5;
const SPEED = 0.1;
const COLLISION_IS_ACTIVE = true;
const ROTATION_SPEED = 0.1;

// keys stores the current state of keyboard presses
export const keys = {
	left: false,
	right: false,
	up: false,
	down: false,
};

interface PlayerArgs {
	startPosition: Vector3;
	platforms: Box3[];
	stairs: StairType[];
	sceneProps?: SceneProps;
	buttons: Mesh<BufferGeometry, Material | Material[]>[];
	collisionObjects: Box3[];
}

function Player({ startPosition, platforms, stairs, buttons, sceneProps, collisionObjects }: PlayerArgs) {
	const ref = useRef<Mesh>(null);
	const [rotation, setRotation] = useState<Vector3>(new Vector3(0, 0, 0));
	const [targetRotation, setTargetRotation] = useState<Vector3>(new Vector3(0, 0, 0));

	// player movement
	useFrame(() => {
		if (!ref.current) return;
		const playerPosition = ref.current.position.clone();
		const buttonPositions = buttons.map(button => button.position.clone());
		for (const buttonPosition of buttonPositions) {
			if (playerPosition.distanceTo(buttonPosition) < 1) {
				// TODO add button ability for other platforms
				if (sceneProps) sceneProps.setSceneHook(Scene.Shipment);
			}
		}
		const movementVector = getMovementVectorFromKeys(SPEED, keys);
		// move player forward
		ref.current.position.x += movementVector.x;
		ref.current.position.z += movementVector.z;
		// player collision detection
		let counter = 0; // 0 - x, 1 - z, 2 - both
		while (
			counter < 3 &&
			checkIfPlayerCollidesWithPlatformBorderOrObject(
				new Box3().setFromCenterAndSize(ref.current.position, new Vector3(0.8, 0.8, 0.8)),
				platforms,
				collisionObjects
			)
		) {
			// if he collides with anything move him back again
			switch (counter) {
				case 0:
					// only x changes
					ref.current.position.x -= movementVector.x;
					break;
				case 1:
					// only z changes (reset x again)
					ref.current.position.x += movementVector.x;
					ref.current.position.z -= movementVector.z;
					break;
				case 2:
					// both change (z is still changed from counter=1)
					ref.current.position.x -= movementVector.x;
					break;
			}
			counter++;
		}
		try {
			// player height
			ref.current.position.y = getNewPlayerHeight(stairs, playerPosition, STAIR_WIDTH, PLAYER_SIZE);
		} catch (Error) {
			// dont set a new height because he isnt on a stair anymore
		}

		// player rotation
		setTargetRotation(getPlayerRotationFromKeys(targetRotation));
		setRotation(getNewLerpedPlayerRoation(rotation, targetRotation, ROTATION_SPEED));
	});

	return (
		<mesh
			name="player"
			ref={ref}
			position={[startPosition.x, startPosition.y + PLAYER_SIZE / 2, startPosition.z]}
			rotation={rotation.toArray()}>
			<ObjectLoad path="/Player/player.glb" position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]} rotation={[0, 90, 0]} />
		</mesh>
	);
}

function getHeight(stairLength: number, stairHeight: number, currentProgression: number, lowerHeight: number) {
	// get height of the player based on position on the staircase
	// uses trigonometry
	return lowerHeight + currentProgression / (stairLength / stairHeight);
}

function getMovementVectorFromKeys(
	speed: number,
	keys: {
		left: boolean;
		right: boolean;
		up: boolean;
		down: boolean;
	}
): Vector3 {
	let movementVector = new Vector3();
	if (keys.right) {
		movementVector.z += 1;
		movementVector.x -= 1;
	}
	if (keys.down) {
		movementVector.x -= 1;
		movementVector.z -= 1;
	}
	if (keys.left) {
		movementVector.z -= 1;
		movementVector.x += 1;
	}
	if (keys.up) {
		movementVector.x += 1;
		movementVector.z += 1;
	}
	// normalize Vector to avoid diagonal speedUp
	movementVector = movementVector.normalize().multiplyScalar(speed);
	return movementVector;
}

function checkIfPlayerCollidesWithPlatformBorderOrObject(
	playerBox: Box3,
	platforms: Box3[],
	collisionObjects: Box3[]
): boolean {
	// the collision with the platform is done by checking if the Box3 (placed above the platform or stair) contains the player completely
	// the collision with the objects checks for intesection of the player with the Box3 of any objects
	return (
		(!platforms.some(x => x.containsBox(playerBox)) && COLLISION_IS_ACTIVE) || // collision with platform or stair border
		(collisionObjects && playerBox && collisionObjects.some(x => x.intersectsBox(playerBox))) // collision with objects
	);
}

function flattenVector(v: Vector3, planeTransformer: Vector3 = new Vector3(1, 0, 1)) {
	return v.clone().multiply(planeTransformer);
}

function getAngleFromThreePoints(start: Vector3, middle: Vector3, end: Vector3) {
	// start       end
	//      \     /
	//       \---/
	//        \a/
	//       middle
	const dir1 = new Vector3().subVectors(middle, start);
	const dir2 = new Vector3().subVectors(middle, end);
	return MathUtils.radToDeg(dir2.angleTo(dir1));
}

function getNewPlayerHeight(
	stairs: StairType[],
	playerPosition: Vector3,
	stairWidth: number,
	playerSize: number
): number {
	for (const stair of stairs) {
		const flattenedStart = flattenVector(stair.startPosition);
		const flattenedEnd = flattenVector(stair.endPosition);
		const flattenedPlayer = flattenVector(playerPosition);

		const angleBetweenStairStartAndPlayer = getAngleFromThreePoints(flattenedPlayer, flattenedStart, flattenedEnd);
		const angleBetweenStairEndAndPlayer = getAngleFromThreePoints(flattenedPlayer, flattenedEnd, flattenedStart);
		const flatStairLength = flattenedStart.distanceTo(flattenedEnd);
		const sidewayDistanceFromPlayerToStair =
			Math.sin(MathUtils.degToRad(angleBetweenStairStartAndPlayer)) * flattenedStart.distanceTo(flattenedPlayer);
		if (
			// player is after startPosition
			angleBetweenStairStartAndPlayer < 90 &&
			// player is before endPosition
			angleBetweenStairEndAndPlayer < 90 &&
			// player is near enough to the stairs
			sidewayDistanceFromPlayerToStair <= (stairWidth / 2) * 1.5 // temporary fix for player collision missdetection that leads to the player moving off the stair
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
			return getHeight(
				flatStairLength,
				stair.endPosition.y - stair.startPosition.y,
				progression,
				stair.startPosition.y + playerSize / 2
			);
		}
	}
	throw new Error();
}

function getNewLerpedPlayerRoation(rotation: Vector3, targetRotation: Vector3, rotation_speed: number): Vector3 {
	const fullCirclesOfDiffBetweenRotationAndTargetRotation = rotation.y - ((rotation.y + Math.PI) % (Math.PI * 2) - Math.PI);
	targetRotation.y += fullCirclesOfDiffBetweenRotationAndTargetRotation;
	// Smoothly rotate the player towards the target rotation
	const diffRotation = new Vector3().subVectors(targetRotation, rotation);

	// Ensure the rotation difference is within -Math.PI to Math.PI range
	diffRotation.y = ((diffRotation.y + Math.PI) % (Math.PI * 2)) - Math.PI;

	const rotationStep = new Vector3().copy(diffRotation).multiplyScalar(rotation_speed);
	return new Vector3().addVectors(rotation, rotationStep);
}

function getPlayerRotationFromKeys(currentRotation: Vector3): Vector3 {
	let rotationDegree = MathUtils.radToDeg(currentRotation.y);
	if (keys.right && keys.down) {
		rotationDegree = 90;
	} else if (keys.down && keys.left) {
		rotationDegree = 0;
	} else if (keys.left && keys.up) {
		rotationDegree = 270;
	} else if (keys.up && keys.right) {
		rotationDegree = 180;
	} else if (keys.right) {
		rotationDegree = 135;
	} else if (keys.down) {
		rotationDegree = 45;
	} else if (keys.left) {
		rotationDegree = 315;
	} else if (keys.up) {
		rotationDegree = 225;
	}
	return new Vector3(currentRotation.x, MathUtils.degToRad(rotationDegree), currentRotation.z);
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

export const handleJoystickMove = (stick: IJoystickUpdateEvent) => {
	// reset all keys
	handleJoystickStop();
	if (stick.x && stick.y) {
		// calculate angle of joystick
		const directionVector = new Vector2(stick.x, stick.y);
		const directionAngle = MathUtils.radToDeg(directionVector.angle());
		// 0 deg is Right 180deg is Left etc.
		//    102.5  57.5
		//    \    |    /
		//     \   |   /
		//      \  |  /
		// 147.5 \ | / 12.5
		//        \|/
		//180 --------------0
		//        /|\
		// 212.5 / | \ 347.5
		//      /  |  \
		//     /   |   \
		//    /    |    \
		//   257.5   302.5
		if (directionAngle > 302.5 || directionAngle < 57.5) {
			keys.right = true;
		}
		if (directionAngle > 12.5 && directionAngle < 147.5) {
			keys.up = true;
		}
		if (directionAngle > 102.5 && directionAngle < 257.5) {
			keys.left = true;
		}
		if (directionAngle > 212.5 && directionAngle < 347.5) {
			keys.down = true;
		}
	}
};

export function resetKeys() {
	keys.left = false;
	keys.right = false;
	keys.up = false;
	keys.down = false;
}

export const handleJoystickStop = () => {
	resetKeys();
};

export default Player;

export const ExportedForTestingOnly = {
	keys,
	handleJoystickStop,
	handleJoystickMove,
	getPlayerRotationFromKeys,
	getHeight,
	getNewLerpedPlayerRoation,
	getNewPlayerHeight,
	getAngleFromThreePoints,
	flattenVector,
	checkIfPlayerCollidesWithPlatformBorderOrObject,
	getMovementVectorFromKeys,
};
