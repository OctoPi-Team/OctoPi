import { useRef, useEffect } from 'react';
import THREE, {
	Color,
	Euler,
	Mesh,
	Vector3,
	Vector2,
	MathUtils,
	Material,
	BufferGeometry,
	MeshStandardMaterial,
	SphereGeometry,
	TubeGeometry,
	CatmullRomCurve3,
} from 'three';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color?: number | string | THREE.Color;
	rotation: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};
function Tube({
	name = 'Tube',
	position = [0, 0, 0],
	size = [1, 1, 1],
	color = 'white',
	rotation = [0, 0, 0],
	reference,
}: TubeProps): JSX.Element {
	const curve = new CatmullRomCurve3([
		new Vector3(0, 0, 0),
		new Vector3(0, 7, 0),
		new Vector3(-10.5, 7, 5),
		new Vector3(-10.6, 5.5, 5),
	]);

	const tubeGeometry = new TubeGeometry(curve, 100, 0.4, 100, false);

	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={tubeGeometry} />
				<meshStandardMaterial color={color} transparent opacity={0.5} />
			</mesh>
		</>
	);
}

export default Tube;
