import { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { MTLLoader, OBJLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material } from 'three';
import ObjectLoad from './ObjectLoad';

type PlatformProps = {
	position?: [number, number, number];
	addPlatformRef?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
};

function Platform({ position = [0, 0, 0], addPlatformRef }: PlatformProps) {
	return (
		<ObjectLoad
			pathObj="/Ebene.obj"
			pathMtl="/Ebene.mtl"
			position={position}
			rotation={[0, 0, 0]}
			reference={addPlatformRef}
		/>
	);
}

export default Platform;
