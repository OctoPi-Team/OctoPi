import { useFrame } from '@react-three/fiber';
import { PlatformFixProps, Scene, SceneProps } from '../../App';
import { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Box3, BufferGeometry, Material, MathUtils, Mesh, Vector2, Vector3 } from 'three';
import { STAIR_WIDTH, StairType } from './platforms/Stair';
import ObjectLoad from '../ObjectLoad';

export const PLAYER_SIZE = 0.5;
const SPEED = 0.1;
const COLLISION_IS_ACTIVE = true;
const ROTATION_SPEED = 0.1;
const keys = {
	up: false,
	down: false,
	left: false,
	right: false,
};
let movementVector = new Vector3();

interface PlayerArgs {
	startPosition: Vector3;
	platforms: Box3[];
	stairs: StairType[];
	sceneProps?: SceneProps;
	buttons: Mesh<BufferGeometry, Material | Material[]>[];
	collisionObjects: Box3[];
	setButton: Dispatch<SetStateAction<string>>;
	isOnButton: boolean;
	setIsOnButton: Dispatch<SetStateAction<boolean>>;
	setIsPlatformFixed: ((newProps: Partial<PlatformFixProps>) => void) | undefined;
	isPlatformFixed: PlatformFixProps | undefined;
}

function Player({
	startPosition,
	platforms,
	stairs,
	buttons,
	sceneProps,
	collisionObjects,
	setButton,
	setIsOnButton,
	setIsPlatformFixed,
	isPlatformFixed,
	isOnButton,
}: PlayerArgs) {
	const ref = useRef<Mesh>(null);
	const [rotation, setRotation] = useState<Vector3>(new Vector3(0, 0, 0));
	const [targetRotation, setTargetRotation] = useState<Vector3>(new Vector3(0, 0, 0));

	// player movement
	useFrame(() => {
		if (!ref.current) return;
		const playerPosition = ref.current.position.clone();
		const buttonPositionAndName = buttons.map(button => ({
			name: button.name,
			position: button.position.clone(),
		}));

		// Each button must have a 'customName'; based on this string a certain action for the button can be
		// executed in the switch case construct

		for (const button of buttonPositionAndName) {
			if (playerPosition.distanceTo(button.position) < 1) {
				const BUTTON_TIMEOUT = 3000;
				if (!isOnButton) {
					switch (button.name) {
						case 'shipment':
							if (sceneProps) sceneProps.setSceneHook(Scene.Shipment);
							break;
						case 'production':
							setButton('Production');
							setIsOnButton(true);
							if (setIsPlatformFixed) {
								if (isPlatformFixed?.production === false) {
									setIsPlatformFixed({ production: true });
								}
							}
							setTimeout(() => {
								setIsOnButton(false);
							}, BUTTON_TIMEOUT);

							break;
						case 'engineering':
							setButton('Engineering');
							setIsOnButton(true);
							setTimeout(() => {
								setIsOnButton(false);
								if (setIsPlatformFixed) {
									if (isPlatformFixed?.engineering === false) {
										setIsPlatformFixed({ engineering: true });
									}
								}
							}, BUTTON_TIMEOUT);
							break;
						case 'parts':
							setButton('Parts');
							setIsOnButton(true);
							setTimeout(() => {
								setIsOnButton(false);
								if (setIsPlatformFixed) {
									if (isPlatformFixed?.parts === false) {
										setIsPlatformFixed({ parts: true });
									}
								}
							}, BUTTON_TIMEOUT);
							break;
						case 'design':
							setButton('Design');
							setIsOnButton(true);
							setTimeout(() => {
								setIsOnButton(false);
								if (setIsPlatformFixed) {
									if (isPlatformFixed?.design === false) {
										setIsPlatformFixed({ design: true });
									}
								}
							}, BUTTON_TIMEOUT);
							break;
						case 'monitoring':
							setButton('Monitoring');
							setIsOnButton(true);
							setTimeout(() => {
								setIsOnButton(false);
								if (setIsPlatformFixed) {
									if (isPlatformFixed?.monitoring === false) {
										setIsPlatformFixed({ monitoring: true });
									}
								}
							}, BUTTON_TIMEOUT);
							break;
					}
				}
			}
		}
		const movementVector = getMovementVectorFromKeys(SPEED);
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
		if (movementVector.x != 0 || movementVector.z != 0) {
			// player rotation
			setTargetRotation(getPlayerRotationFromKeys(targetRotation));
			setRotation(getNewLerpedPlayerRoation(rotation, targetRotation, ROTATION_SPEED));
		}
	});

	return (
		<mesh
			name="player"
			ref={ref}
			position={[startPosition.x, startPosition.y + PLAYER_SIZE / 2, startPosition.z]}
			rotation={rotation.toArray()}>
			<ObjectLoad path="/Player/player.glb" position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]} rotation={[0, 90, 0]} />
			<ObjectLoad path="/Helmet/helmet.glb" position={[0, 1, 0]} scale={[1, 1, 1]} rotation={[0, -90, 0]} />
		</mesh>
	);
}

function getHeight(stairLength: number, stairHeight: number, currentProgression: number, lowerHeight: number) {
	// get height of the player based on position on the staircase
	// uses trigonometry
	return lowerHeight + currentProgression / (stairLength / stairHeight);
}

function getMovementVectorFromKeys(speed: number): Vector3 {
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
	const rotationDeg = MathUtils.radToDeg(rotation.y);
	const targetRotationDeg = MathUtils.radToDeg(targetRotation.y);

	// Calculate the difference between the two angles
	let diff = targetRotationDeg - rotationDeg;

	// Adjust the difference to ensure it falls within the range of -180 to 180 degrees
	diff = ((diff + 180) % 360) - 180;

	const diffRotation = MathUtils.degToRad(diff);
	rotation.y += diffRotation * rotation_speed;
	return rotation;
}

function getPlayerRotationFromKeys(currentRotation: Vector3): Vector3 {
	const a = Math.atan2(-movementVector.x, -movementVector.z);
	return new Vector3(currentRotation.x, a, currentRotation.z);
}

export const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = event => {
	if (event.key === 'ArrowRight') keys.right = true;
	if (event.key === 'ArrowDown') keys.down = true;
	if (event.key === 'ArrowLeft') keys.left = true;
	if (event.key === 'ArrowUp') keys.up = true;
	setMovementVectorFromKeys();
};

function setMovementVectorFromKeys() {
	resetKeys();
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
}

export const handleKeyUp: React.KeyboardEventHandler<HTMLDivElement> = event => {
	if (event.key === 'ArrowRight') keys.right = false;
	if (event.key === 'ArrowDown') keys.down = false;
	if (event.key === 'ArrowLeft') keys.left = false;
	if (event.key === 'ArrowUp') keys.up = false;
	setMovementVectorFromKeys();
};

export const handleJoystickMove = (stick: IJoystickUpdateEvent | Vector2) => {
	resetKeys();
	if (stick.x && stick.y) {
		movementVector = new Vector3(-stick.x, 0, stick.y).applyAxisAngle(new Vector3(0, 1, 0), MathUtils.degToRad(45));
	}
};

export function resetKeys() {
	movementVector = new Vector3();
}

export const handleJoystickStop = () => {
	resetKeys();
};

export default Player;

export const ExportedForTestingOnly = {
	handleJoystickStop,
	handleJoystickMove,
	getHeight,
	getNewLerpedPlayerRoation,
	getNewPlayerHeight,
	getAngleFromThreePoints,
	flattenVector,
	checkIfPlayerCollidesWithPlatformBorderOrObject,
	getMovementVectorFromKeys,
};
