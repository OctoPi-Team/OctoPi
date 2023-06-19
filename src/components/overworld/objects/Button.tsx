import { useEffect, useRef } from 'react';
import THREE, { Mesh } from 'three';
import ObjectLoad from '../../ObjectLoad';

type ButtonProps = {
	position: [number, number, number];
	scale: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	customName: string; // Add customName prop
};

export default function Button({ position, scale, reference, customName }: ButtonProps) {
	const buttonRef = useRef<Mesh>(null);

	// Call the reference prop and pass the buttonRef as an argument whenever the ref changes
	useEffect(() => {
		if (buttonRef.current && reference) {
			reference(buttonRef.current);
		}
	}, [buttonRef, reference]);

	return (
		<ObjectLoad
			path="/Button/button.glb"
			position={position}
			scale={scale}
			rotation={[0, 90, 0]}
			reference={reference}
			customName={customName}
		/>
	);
}
