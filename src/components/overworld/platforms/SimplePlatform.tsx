import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, Color } from '@react-three/fiber';
import { Box3, Vector3 } from 'three';
import { SimpleText } from './SimpleText';

// This interface is used to set the options of the ObjectLoad function.
type SimplePlatformProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color: Color;
	reference?: (meshRef: Box3) => void;
};

// This function is to load an object from a .obj file and a .mtl file. To use it no knowlage of the ObjextLoad function is needed.
export default function SimplePlatform({ name, position, size = [1, 0.1, 1], color, reference }: SimplePlatformProps) {
	const ref = useRef<THREE.Mesh>(null);
	const [collsionRefWasSet, collsionRefSet] = useState(false);

	if (!collsionRefWasSet && reference && ref.current) {
		collsionRefSet(true);
		reference(new Box3().setFromObject(ref.current).expandByVector(new Vector3(1, 10, 1)));
	}
	useEffect(() => {
		if (ref && ref.current) {
			const meshPosition = new Vector3(position[0], position[1] - size[1] / 2, position[2]);
			ref.current.position.copy(meshPosition);
		}
	}, position);

	const { camera } = useThree();
	const meshRef = useRef<THREE.Mesh>(null);
	const textRef = useRef<THREE.Mesh>(null);
	useFrame(() => {
		if (meshRef.current && textRef.current) {
			meshRef.current.lookAt(camera.position);
			textRef.current.lookAt(camera.position);
		}
	});

	return (
		<>
			<SimpleText position={position} textValue={name} />
			<mesh ref={ref} castShadow receiveShadow>
				<boxGeometry args={size} />
				<meshStandardMaterial color={color} />
			</mesh>
		</>
	);
}
