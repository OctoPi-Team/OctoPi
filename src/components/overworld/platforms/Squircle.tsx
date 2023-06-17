import { forwardRef } from 'react';
import { Mesh, Shape } from 'three';

export interface SquircleProps {
	position: [number, number, number];
	color: string;
	dimensions: [number, number, number];
	borderRadius?: number;
	rotation?: [number, number, number];
}

const Squircle = forwardRef<Mesh, SquircleProps>(({ position, color, dimensions, borderRadius, rotation }, ref) => {
	const [length, depth, width] = dimensions;
	const shape = new Shape();
	shape.moveTo(-length / 2 + (borderRadius || 0), -width / 2);
	// Draw the squircle shape, it consists of 4 straights and 4 quadratic curves
	shape.moveTo(-length / 2 + (borderRadius || 0), width / 2);
	shape.quadraticCurveTo(-length / 2, width / 2, -length / 2, width / 2 - (borderRadius || 0));
	shape.lineTo(-length / 2, -width / 2 + (borderRadius || 0));
	shape.quadraticCurveTo(-length / 2, -width / 2, -length / 2 + (borderRadius || 0), -width / 2);
	shape.lineTo(length / 2 - (borderRadius || 0), -width / 2);
	shape.quadraticCurveTo(length / 2, -width / 2, length / 2, -width / 2 + (borderRadius || 0));
	shape.lineTo(length / 2, width / 2 - (borderRadius || 0));
	shape.quadraticCurveTo(length / 2, width / 2, length / 2 - (borderRadius || 0), width / 2);
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
