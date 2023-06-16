import React, { useRef } from 'react';
import { Mesh, Vector3, Shape, ExtrudeGeometry } from 'three';
import { useFrame } from 'react-three-fiber';

interface SquircleProps {
	position?: [number, number, number];
	color?: string;
	dimensions?: [number, number, number];
	borderRadius?: number;
	rotation?: [number, number, number];
}

const Squircle: React.FC<SquircleProps> = ({
	position = [0, 3, 0],
	color = 'lightgray',
	dimensions = [1, 1, 1],
	borderRadius = 2,
	rotation = [Math.PI / 2, 0, 0],
}) => {
	const meshRef = useRef<Mesh>(null);

	const [length, depth, width] = dimensions;
	const shape = new Shape();
	shape.moveTo(-length / 2 + borderRadius, -width / 2);
	// Create the squircle shape, it consists of 4 straights and 4 quadratic curves
	shape.lineTo(length / 2 - borderRadius, -width / 2);
	shape.quadraticCurveTo(length / 2, -width / 2, length / 2, -width / 2 + borderRadius);
	shape.lineTo(length / 2, width / 2 - borderRadius);
	shape.quadraticCurveTo(length / 2, width / 2, length / 2 - borderRadius, width / 2);
	shape.lineTo(-length / 2 + borderRadius, width / 2);
	shape.quadraticCurveTo(-length / 2, width / 2, -length / 2, width / 2 - borderRadius);
	shape.lineTo(-length / 2, -width / 2 + borderRadius);
	shape.quadraticCurveTo(-length / 2, -width / 2, -length / 2 + borderRadius, -width / 2);

	const extrudeSettings = {
		depth: depth,
		bevelEnabled: false,
	};

	return (
		<mesh ref={meshRef} position={position} rotation={rotation} castShadow receiveShadow>
			<extrudeGeometry args={[shape, extrudeSettings]} />
			<meshStandardMaterial color={color} roughness={0.5} metalness={0.5} />
		</mesh>
	);
};

export default Squircle;
