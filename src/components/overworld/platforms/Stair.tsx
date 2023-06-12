import { useEffect, useRef, useState } from 'react';
import { Mesh, Vector3, MathUtils, Box3 } from 'three';
import { WHITE } from '../../../AllColorVariables';

export type StairType = {
	mesh: Box3;
	startPosition: Vector3;
	endPosition: Vector3;
};

export const STAIR_WIDTH = 2;

interface StairProps {
	startPosition: Vector3;
	endPosition: Vector3;
	reference?: (stair: StairType) => void;
}

function getCorrectedStairOffset(centerPosition: Vector3, direction: Vector3, stairHeight: number): Vector3 {
	const heightAngle = MathUtils.degToRad(90) - direction.angleTo(new Vector3(0, -1, 0));
	const heightOffset = (Math.cos(heightAngle) * stairHeight) / 2;
	const planeOffset = (Math.sin(heightAngle) * stairHeight) / 2;
	const offsetPerDirection = direction.clone().normalize().multiply(new Vector3(1, 0, 1)).multiplyScalar(planeOffset);
	return new Vector3(offsetPerDirection.x, heightOffset, offsetPerDirection.z);
}

function Stair({ startPosition, endPosition, reference }: StairProps) {
	const ref = useRef<Mesh>(null);
	const length = startPosition.distanceTo(endPosition);
	const stairHeight = 0.25;
	const [collsionRefWasSet, collsionRefSet] = useState(false);

	const direction = new Vector3().subVectors(startPosition, endPosition);
	const centerPosition = startPosition.clone().sub(
		direction
			.clone()
			.normalize()
			.multiplyScalar(length / 2)
	);
	if (!collsionRefWasSet && reference && ref.current) {
		collsionRefSet(true);
		const boxScaler = new Vector3(direction.x != 0 ? 1.4 : 1, 10, direction.z != 0 ? 1.4 : 1);
		reference({
			mesh: new Box3().setFromObject(ref.current).expandByVector(boxScaler),
			startPosition: startPosition.clone(),
			endPosition: endPosition.clone(),
		});
	}
	useEffect(() => {
		if (ref && ref.current) {
			// move the stair to the middle between start and end point and look at (rotate to) the end point
			const offset = getCorrectedStairOffset(centerPosition, direction, stairHeight);
			ref.current.position.copy(centerPosition.clone().sub(offset));
			ref.current.lookAt(endPosition.clone().sub(offset));
		}
	});

	return (
		<mesh ref={ref} castShadow receiveShadow>
			<boxGeometry args={[STAIR_WIDTH, stairHeight, length]} />
			<meshStandardMaterial color={WHITE} />
		</mesh>
	);
}

export default Stair;
