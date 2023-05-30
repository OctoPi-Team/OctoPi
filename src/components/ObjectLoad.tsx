import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material, MathUtils } from 'three';
import { Scene } from '../App';

// This interface is used to set the options of the ObjectLoad function.
type ObjectLoadOptions = {
	path: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	onClick?: ((val: Scene.Shipment) => void) | null;
};
// This function is to load an object from a .obj file and a .mtl file. To use it no knowlage of the ObjextLoad function is needed.
export default function ObjectLoad({
	path,
	position,
	scale = [1, 1, 1], // Default scale is 1, 1, 1.
	reference,
	rotation = [0, 0, 0], // Default rotation is 0, 0, 0, the rotation is in degrees.
	onClick,
}: ObjectLoadOptions): JSX.Element {
	const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);

	if (reference && meshRef.current) {
		reference(meshRef.current);
	}
	const obj = useLoader(GLTFLoader, path);

	useEffect(() => {
		if (meshRef.current) {
			const meshPosition = new Vector3(...position);
			meshRef.current.position.copy(meshPosition);
			meshRef.current.rotation.set(
				MathUtils.degToRad(rotation[0]),
				MathUtils.degToRad(rotation[1]),
				MathUtils.degToRad(rotation[2])
			);
		}
	}, position);

	return (
		<mesh
			ref={meshRef}
			position={position}
			scale={new Vector3(scale[0], scale[1], scale[2])}
			rotation={rotation}
			onClick={() => {
				if (onClick) onClick(Scene.Shipment);
			}}>
			<primitive object={obj.scene} />
		</mesh>
	);
}
