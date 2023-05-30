import { useEffect, useRef } from 'react';
import { Mesh, Vector3, Vector2, MathUtils } from 'three';
import { WHITE } from '../../../AllColorVariables';

export type StairType = {
	mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
	startPosition: Vector3;
	endPosition: Vector3;
};

interface StairProps {
	startPosition: Vector3;
	endPosition: Vector3;
	reference?: (stair: StairType) => void;
}

function getCorrectedStairOffset(centerPosition: Vector3, direction: Vector3, stairHeight: number): Vector3 {
	const heightAngle = MathUtils.degToRad(90) - direction.angleTo(new Vector3(0, -1, 0));
	const heightOffset = Math.cos(heightAngle) * stairHeight / 2;
	const planeOffset = Math.sin(heightAngle) * stairHeight / 2;
	const offsetPerDirection = direction.clone().normalize().multiply(new Vector3(1, 0, 1)).multiplyScalar(planeOffset);
	return new Vector3(offsetPerDirection.x, heightOffset, offsetPerDirection.z);
}

function Stair({ startPosition, endPosition, reference }: StairProps) {
	const ref = useRef<Mesh>(null);
	const length = startPosition.distanceTo(endPosition);
	const stairHeight = 0.25;
	if (reference && ref.current) {
		reference({ mesh: ref.current, startPosition: startPosition.clone(), endPosition: endPosition.clone() });
	}
	useEffect(() => {
		if (ref && ref.current) {
			const direction = new Vector3().subVectors(startPosition, endPosition);
			// move the stair to the middle between start and end point and look at (rotate to) the end point
			const centerPosition = startPosition.clone().sub(
				direction
					.clone()
					.normalize()
					.multiplyScalar(length / 2)
			);
			const offset = getCorrectedStairOffset(centerPosition, direction, stairHeight);
			ref.current.position.copy(centerPosition.clone().sub(offset));
			ref.current.lookAt(endPosition.clone().sub(offset));
		}
	});

	return (
		<mesh ref={ref}>
			<boxGeometry args={[2, stairHeight, length]} />
			<meshStandardMaterial color={WHITE} />
		</mesh>
	);
}

export default Stair;
