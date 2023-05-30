import { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
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

function Stair({ startPosition, endPosition, reference }: StairProps) {
	const ref = useRef<Mesh>(null);
	const length = startPosition.distanceTo(endPosition);
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
			ref.current.position.copy(centerPosition);
			ref.current.lookAt(endPosition);
		}
	});

	return (
		<mesh ref={ref} castShadow receiveShadow>
			<boxGeometry args={[2, 0.25, length]} />
			<meshStandardMaterial color={WHITE} />
		</mesh>
	);
}

export default Stair;
