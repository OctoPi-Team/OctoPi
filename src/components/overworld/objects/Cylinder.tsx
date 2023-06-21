import { RED } from '../../../AllColorVariables';
import {
	Box3,
	BufferGeometry,
	Color,
	CylinderGeometry,
	Group,
	InstancedMesh,
	Material,
	Mesh,
	MeshStandardMaterial,
	Vector3,
} from 'three';
import { useRef, useState } from 'react';

type CylinderProps = {
	name?: string;
	position: [number, number, number];
	color: number | string | Color;
	reference?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
	collisionRefSetter?: (meshRef: Box3) => void;
	customCollisionBoxes?: { positionOffset: Vector3; size: Vector3 }[];
};

function Cylinder({
	name = 'cylinder',
	position = [0, 0, 0],
	color,
	reference,
	collisionRefSetter,
	customCollisionBoxes,
}: CylinderProps) {
	// create cylinder
	const SHOW_COLLISION_BOX = false;
	const meshRef = useRef<InstancedMesh<BufferGeometry, Material | Material[]>>(null);
	const [collisionRefWasSet, setCollisionRefWasSet] = useState(false);
	const [collisionBoxes, setCollisionBoxes] = useState<Box3[]>([]);

	function addCollisionBox(newBox: Box3) {
		setCollisionBoxes(boxes => [...boxes, newBox]);
	}

	if (reference && meshRef.current) {
		reference(meshRef.current);
	}

	if (!collisionRefWasSet && collisionRefSetter && meshRef.current) {
		setCollisionRefWasSet(true);
		const boxes: Box3[] = [];
		if (customCollisionBoxes && customCollisionBoxes.length > 0) {
			for (const box of customCollisionBoxes) {
				boxes.push(
					new Box3().setFromCenterAndSize(
						box.positionOffset.clone().add(new Vector3(position[0], position[1] + box.size.y / 2, position[2])),
						box.size
					)
				);
			}
		} else {
			boxes.push(new Box3().setFromObject(meshRef.current.clone()));
		}
		for (const box of boxes) {
			addCollisionBox(box);
			collisionRefSetter(box);
		}
	}
	const cylinderGeometry = new CylinderGeometry(1, 1, 1, 32);
	const cylinderMaterial = new MeshStandardMaterial({ color: color });
	const cylinderMesh = new Mesh(cylinderGeometry, cylinderMaterial);

	// create hole
	const holeGeometry = new CylinderGeometry(0.5, 0.5, 1, 32);
	const holeMaterial = new MeshStandardMaterial({ color: color });
	const holeMesh = new Mesh(holeGeometry, holeMaterial);

	// hole in cylinder
	const cylinderWithHole = new Group();
	cylinderWithHole.add(cylinderMesh);
	cylinderWithHole.add(holeMesh);

	cylinderMesh.position.set(0, 0, 0);
	holeMesh.position.set(0, 0, 0);

	return (
		<>
			{SHOW_COLLISION_BOX &&
				collisionBoxes &&
				collisionBoxes.map((box, index) => (
					<mesh key={index} position={box.getCenter(new Vector3(...position))}>
						<boxGeometry args={box.getSize(new Vector3(0, 0, 0)).toArray()} />
						<meshLambertMaterial color={RED} opacity={0.6} transparent={true} />
					</mesh>
				))}

			<mesh ref={meshRef} name={name} position={position} castShadow receiveShadow>
				<primitive object={holeMesh} />
			</mesh>
		</>
	);
}

export default Cylinder;
