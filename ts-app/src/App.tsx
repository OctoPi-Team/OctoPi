import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

function Cube() {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += delta;
			meshRef.current.rotation.y += delta;
		}
	});

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={'hotpink'} />
		</mesh>
	);
}

export default function App() {
	return (
		<Canvas>
			<ambientLight intensity={0.5} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
			<pointLight position={[-10, -10, -10]} />
			<Cube />
		</Canvas>
	);
}
