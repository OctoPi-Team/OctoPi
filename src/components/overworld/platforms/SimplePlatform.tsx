import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box3, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { SimpleText } from './SimpleText';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { PLAYER_SIZE } from '../Player';
import { RED } from '../../../AllColorVariables';

// This interface is used to set the options of the ObjectLoad function.
type SimplePlatformProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color: string;
	reference?: (meshRef: Box3) => void;
};

// This function is to load an object from a .obj file and a .mtl file. To use it no knowlage of the ObjextLoad function is needed.
export default function SimplePlatform({ name, position, size = [1, 0.1, 1], color, reference }: SimplePlatformProps) {
	const ref = useRef<THREE.Mesh>(null);
	const [collsionRefWasSet, collsionRefSet] = useState(false);
	const [meshBox, setMeshBox] = useState<Box3>();

	const SHOW_COLLISION_BOX = false;
	if (!collsionRefWasSet && reference && ref.current) {
		collsionRefSet(true);
		const plattformPadding = 0.3;
		const collisionBox = new Box3(
			new Vector3(
				position[0] - size[0] / 2 - plattformPadding,
				position[1] - 1,
				position[2] - size[2] / 2 - plattformPadding
			),
			new Vector3(
				position[0] + size[0] / 2 + plattformPadding,
				position[1] + PLAYER_SIZE * 3,
				position[2] + size[2] / 2 + plattformPadding
			)
		);
		setMeshBox(collisionBox);
		reference(collisionBox);
	}
	useEffect(() => {
		if (ref && ref.current) {
			const meshPosition = new Vector3(position[0], position[1] - size[1] / 2, position[2]);
			ref.current.position.copy(meshPosition);
		}
	});

	const { camera } = useThree();
	const meshRef = useRef<THREE.Mesh>(null);
	const textRef = useRef<THREE.Mesh>(null);
	useFrame(() => {
		if (meshRef.current && textRef.current) {
			meshRef.current.lookAt(camera.position);
			textRef.current.lookAt(camera.position);
		}
	});

	const roundedBoxGeometry = new RoundedBoxGeometry(size[0], size[1], size[2], 4, 2);
	const roundedBoxMaterial = new MeshStandardMaterial({ color });

	const roundedBoxMesh = new Mesh(roundedBoxGeometry, roundedBoxMaterial);
	//roundedBoxMesh.position.set(0, 0, 0);

	return (
		<>
			{SHOW_COLLISION_BOX && meshBox && (
				<mesh position={meshBox.getCenter(new Vector3().fromArray(position))}>
					<boxGeometry args={meshBox.getSize(new Vector3(0, 0, 0)).toArray()} />
					<meshLambertMaterial color={RED} opacity={0.6} transparent={true} />
				</mesh>
			)}
			<SimpleText position={position} textValue={name} />
			<mesh ref={ref} castShadow receiveShadow>
				<primitive object={roundedBoxMesh} />
			</mesh>
		</>
	);
}
