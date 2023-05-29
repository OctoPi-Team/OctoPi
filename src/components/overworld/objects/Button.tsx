import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import ObjectLoad from '../../ObjectLoad';

type ButtonProps = {
	position: [number, number, number];
	reference: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function Button(props: ButtonProps) {
	const buttonRef = useRef<Mesh>(null);

	// Call the reference prop and pass the buttonRef as an argument whenever the ref changes
	useEffect(() => {
		if (buttonRef.current) {
			props.reference(buttonRef.current);
		}
	}, [buttonRef, props.reference]);

	return (
		<ObjectLoad
			path="/Button/button.glb"
			position={[props.position[0] + 10, props.position[1] - 6, props.position[2] + 10]}
			scale={[1, 1, 1]}
			rotation={[0, 90, 0]}
			reference={props.reference}
		/>
	);
}
