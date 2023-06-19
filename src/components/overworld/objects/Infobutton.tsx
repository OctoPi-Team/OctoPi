import { useEffect, useRef } from 'react';
import THREE, { Mesh } from 'three';
import ObjectLoad from '../../ObjectLoad';

type InfobuttonProps = {
	position: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	customName: string; // Add customName prop
};

export default function Infobutton({ position, reference, customName }: InfobuttonProps) {
	const buttonRef = useRef<Mesh>(null);

	// Call the reference prop and pass the buttonRef as an argument whenever the ref changes
	useEffect(() => {
		if (buttonRef.current && reference) {
			reference(buttonRef.current);
		}
	}, [buttonRef, reference]);

	return (
		<ObjectLoad
			path="/Infotafelbutton/infotafelbutton.glb"
			position={position}
			scale={[0.5, 0.5, 0.5]}
			rotation={[0, 90, 0]}
			reference={reference}
			customName={customName}
		/>
	);
}
