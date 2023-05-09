/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material } from 'three';

type PlatformProps = {
	position?: [number, number, number];
};

const Platform = ({ position = [0, 0, 0] }: PlatformProps) => {
	const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	const materials = useLoader(MTLLoader, '/Ebene.mtl');

	const obj = useLoader(OBJLoader, '/Ebene.obj', loader => {
		materials.preload();
		loader.setMaterials(materials);
	});

	useEffect(() => {
		if (meshRef.current) {
			const meshPosition = new Vector3(...position);
			meshRef.current.position.copy(meshPosition);
		}
	}, position);

	return (
		<mesh ref={meshRef} position={position}>
			<primitive object={obj} />
		</mesh>
	);
};

export default Platform;
