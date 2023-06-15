import React, { useRef } from 'react';
import { Mesh, Vector3, Shape, ExtrudeGeometry } from 'three';
import { useFrame } from 'react-three-fiber';

interface SquircleProps {
	position?: Vector3;
	color?: string;
	size?: number;
	borderRadius?: number;
	depth?: number;
}

const Squircle: React.FC<SquircleProps> = ({
	position = new Vector3(0, 3, 0),
	color = 'lightgray',
	size = 4,
	borderRadius = 1,
	depth = 0.3,
}) => {
	const meshRef = useRef<Mesh>(null);

	// only for visualization purposes
	useFrame(() => {
		if (meshRef.current) {
			meshRef.current.rotation.x += 0.01;
			meshRef.current.rotation.y += 0.01;
		}
	});

	// Create the squircle shape
	const shape = new Shape();
	shape.moveTo(-size / 2 + borderRadius, -size / 2);
	shape.lineTo(size / 2 - borderRadius, -size / 2);
	shape.quadraticCurveTo(size / 2, -size / 2, size / 2, -size / 2 + borderRadius);
	shape.lineTo(size / 2, size / 2 - borderRadius);
	shape.quadraticCurveTo(size / 2, size / 2, size / 2 - borderRadius, size / 2);
	shape.lineTo(-size / 2 + borderRadius, size / 2);
	shape.quadraticCurveTo(-size / 2, size / 2, -size / 2, size / 2 - borderRadius);
	shape.lineTo(-size / 2, -size / 2 + borderRadius);
	shape.quadraticCurveTo(-size / 2, -size / 2, -size / 2 + borderRadius, -size / 2);

	const extrudeSettings = {
		depth,
		bevelEnabled: false,
	};

	return (
		<mesh ref={meshRef} position={position} castShadow receiveShadow>
			<extrudeGeometry args={[shape, extrudeSettings]} />
			<meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
		</mesh>
	);
};

export default Squircle;
