import { GREEN, RED } from '../../../AllColorVariables';
import { CylinderGeometry, Group, Mesh, MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

type CylinderProps = {
	name?: string;
	position: [number, number, number];
	color: number | string | THREE.Color;
};

function Cylinder({ name = 'cylinder', position = [0, 0, 0], color }: CylinderProps) {
	// create cylinder
	const cylinderGeometry = new CylinderGeometry(1, 1, 2, 32);
	const cylinderMaterial = new MeshBasicMaterial({ color: GREEN });
	const cylinderMesh = new Mesh(cylinderGeometry, cylinderMaterial);

	// create hole
	const holeGeometry = new CylinderGeometry(0.5, 0.5, 2, 32);
	const holeMaterial = new MeshBasicMaterial({ color: color });
	const holeMesh = new Mesh(holeGeometry, holeMaterial);

	// hole in cylinder
	const cylinderWithHole = new Group();
	cylinderWithHole.add(cylinderMesh);
	cylinderWithHole.add(holeMesh);

	cylinderMesh.position.set(0, 0, 0);
	holeMesh.position.set(0, 0, 0);
	/*
const tubeGeometry = new TubeGeometry(curve, 100, 0.4, detailed ? 50 : 10, false);
	const ballGeometry = new SphereGeometry(ballRadius, 32, 32);
*/
	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={holeMesh} />
			</mesh>
		</>
	);
}

export default Cylinder;
