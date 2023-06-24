import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Clock, Mesh, Vector3 } from 'three';

const AnimatedMesh = () => {
	const meshRef = useRef<Mesh>(null);
	const clock = useRef<Clock>(new Clock());
	const startPosition = new Vector3(0, 0, 0);
	const endPosition = new Vector3(2, 0, 0);

	useFrame(() => {
		const elapsedTime = clock.current.getElapsedTime();
		const duration = 2;
		let t = Math.min(elapsedTime / duration, duration);
		// Check if the end position is reached
		if (t === duration) {
			// Reset the elapsed time and restart the animation
			clock.current.start();
			t = 0;
		}
		// Interpolate between the starting and ending positions
		const newPosition = new Vector3().lerpVectors(startPosition, endPosition, t);

		// Update the mesh position
		if (meshRef.current) {
			meshRef.current.position.copy(newPosition);
		}
	});

	return (
		<mesh ref={meshRef}>
			{/* Your mesh geometry and material */}
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="red" />
		</mesh>
	);
};

export default AnimatedMesh;
