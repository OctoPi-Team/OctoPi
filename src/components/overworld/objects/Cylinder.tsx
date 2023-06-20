import { GREEN, RED } from '../../../AllColorVariables';
import { CylinderGeometry, Group, Mesh, MeshBasicMaterial } from 'three';

type CylinderProps = {
	name?: string;
	position: [number, number, number];
	color: number | string | THREE.Color;
};

function Cylinder({ name = 'cylinder', position = [0, 0, 0], color }: CylinderProps) {
	// create cylinder
	const cylinderGeometry = new CylinderGeometry(1, 1, 1, 32);
	const cylinderMaterial = new MeshBasicMaterial({ color: GREEN });
	const cylinderMesh = new Mesh(cylinderGeometry, cylinderMaterial);

	// create hole
	const holeGeometry = new CylinderGeometry(0.5, 0.5, 1, 32);
	const holeMaterial = new MeshBasicMaterial({ color: color });
	const holeMesh = new Mesh(holeGeometry, holeMaterial);

	// hole in cylinder
	const cylinderWithHole = new Group();
	cylinderWithHole.add(cylinderMesh);
	cylinderWithHole.add(holeMesh);

	cylinderMesh.position.set(0, 0, 0);
	holeMesh.position.set(0, 0, 0);

	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={holeMesh} />
			</mesh>
		</>
	);
}

export default Cylinder;