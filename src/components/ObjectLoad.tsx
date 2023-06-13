import { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material, MathUtils, Box3 } from 'three';
import { Scene } from '../App';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RED } from '../AllColorVariables';

// This interface is used to set the options of the ObjectLoad function.
type ObjectLoadOptions = {
	path: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	onClick?: ((val: Scene.Shipment) => void) | null;
	collisionRefSetter?: (meshRef: Box3) => void;
	customCollisionBox?: { positionOffset: Vector3; size: Vector3 };
};

// This function is to load an object from a .obj file and a .mtl file. To use it no knowlage of the ObjectLoad function is needed.
export default function ObjectLoad({
	path,
	position,
	scale = [1, 1, 1], // Default scale is 1, 1, 1.
	reference,
	rotation = [0, 0, 0], // Default rotation is 0, 0, 0, the rotation is in degrees.
	onClick,
	collisionRefSetter,
	customCollisionBox,
}: ObjectLoadOptions): JSX.Element {
	const SHOW_COLLISION_BOX = true;
	const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	const [collsionRefWasSet, collsionRefSet] = useState(false);
	const [collisionBox, setCollisionBox] = useState<Box3>();

	if (reference && meshRef.current) {
		reference(meshRef.current);
	}
	if (!collsionRefWasSet && collisionRefSetter && meshRef.current) {
		collsionRefSet(true);
		let box;
		if (customCollisionBox)
			box = new Box3().setFromCenterAndSize(
				customCollisionBox.positionOffset
					.clone()
					.add(new Vector3(position[0], position[1] + customCollisionBox.size.y / 2, position[2])),
				customCollisionBox.size
			);
		else box = new Box3().setFromObject(meshRef.current.clone());
		setCollisionBox(box);
		collisionRefSetter(box);
	}
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
	const obj = useLoader(GLTFLoader, path, loader => {
		loader.setDRACOLoader(dracoLoader);
	});
	// 'castShadows' needs to be set to true for every node of complex 3D models, since they consist of more than one part;
	obj.scene.traverse(function (node) {
		node.castShadow = true;
	});

	useEffect(() => {
		if (meshRef.current) {
			const meshPosition = new Vector3(...position);
			meshRef.current.position.copy(meshPosition);
			meshRef.current.rotation.set(
				MathUtils.degToRad(rotation[0]),
				MathUtils.degToRad(rotation[1]),
				MathUtils.degToRad(rotation[2])
			);
		}
	}, position);

	return (
		<>
			{SHOW_COLLISION_BOX && collisionBox && (
				<mesh position={collisionBox.getCenter(new Vector3().fromArray(position))}>
					<boxGeometry args={collisionBox.getSize(new Vector3(0, 0, 0)).toArray()} />
					<meshLambertMaterial color={RED} opacity={0.6} transparent={true} />
				</mesh>
			)}
			<mesh
				castShadow
				receiveShadow
				ref={meshRef}
				position={position}
				scale={new Vector3(scale[0], scale[1], scale[2])}
				rotation={rotation}
				onClick={() => {
					if (onClick) onClick(Scene.Shipment);
				}}>
				<primitive object={obj.scene.clone(true)} />
			</mesh>
		</>
	);
}
