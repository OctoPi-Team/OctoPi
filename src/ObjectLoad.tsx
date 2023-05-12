import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material, MathUtils } from 'three';

// This interface is used to set the options of the ObjectLoad function.
type ObjectLoadOptions = {
	pathObj: string;
	pathMtl: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};
// This function is used to load an object from a .obj file and a .mtl file.
// The position and rotation of the object can be set.
// The reference function is used to get the mesh of the object.
// The mesh can be used to change the position and rotation of the object.
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
