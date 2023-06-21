import { forwardRef } from 'react';
import { Mesh, Shape } from 'three';

export interface SquircleProps {
	position: [number, number, number];
	color: string;
	dimensions: [number, number, number];
	borderRadius?: number;
	rotation?: [number, number, number];
}

const Squircle = forwardRef<Mesh, SquircleProps>(({ position, color, dimensions, borderRadius = 0, rotation }, ref) => {
	const [length, depth, width] = dimensions;
	const shape = new Shape();
	const halfLength = length / 2;
	const halfWidth = width / 2;
	shape.moveTo(-halfLength + borderRadius, -halfWidth);
	// Draw the squircle shape, it consists of 4 straights and 4 quadratic curves
	shape.moveTo(-halfLength + borderRadius, halfWidth);
	shape.quadraticCurveTo(-halfLength, halfWidth, -halfLength, halfWidth - borderRadius);
	shape.lineTo(-halfLength, -halfWidth + borderRadius);
	shape.quadraticCurveTo(-halfLength, -halfWidth, -halfLength + borderRadius, -halfWidth);
	shape.lineTo(halfLength - borderRadius, -halfWidth);
	shape.quadraticCurveTo(halfLength, -halfWidth, halfLength, -halfWidth + borderRadius);
	shape.lineTo(halfLength, halfWidth - borderRadius);
	shape.quadraticCurveTo(halfLength, halfWidth, halfLength - borderRadius, halfWidth);
	const extrudeSettings = {
		depth: depth,
		bevelEnabled: false,
	};
	return (
		<mesh ref={ref} position={position} rotation={rotation} castShadow receiveShadow>
			<extrudeGeometry args={[shape, extrudeSettings]} />
			<meshStandardMaterial color={color} />
		</mesh>
	);
});
Squircle.displayName = 'Squircle';
export default Squircle;
