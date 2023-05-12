import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material, MathUtils } from 'three';

type ObjectLoadOptions = {
	pathObj: string;
	pathMtl: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function ObjectLoad({
	pathObj,
	pathMtl,
	position,
	rotation = [0, 0, 0],
	reference,
}: ObjectLoadOptions): JSX.Element {
	const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	const materials = useLoader(MTLLoader, pathMtl);
	if (reference && meshRef.current) {
		reference(meshRef.current);
	}
	const obj = useLoader(OBJLoader, pathObj, loader => {
		materials.preload();
		loader.setMaterials(materials);
	});

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
		<mesh ref={meshRef} position={position}>
			<primitive object={obj} />
		</mesh>
	);
}
