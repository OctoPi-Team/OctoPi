import { useRef, useEffect, useState, MutableRefObject } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import { Mesh, Vector3, BufferGeometry, Material, MathUtils, MeshLambertMaterial, Box3 } from 'three';
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
	collsisionRefSetter?: (meshRef: Box3) => void;
};

// This function is to load an object from a .obj file and a .mtl file. To use it no knowlage of the ObjectLoad function is needed.
export default function ObjectLoad({
	path,
	position,
	scale = [1, 1, 1], // Default scale is 1, 1, 1.
	reference,
	rotation = [0, 0, 0], // Default rotation is 0, 0, 0, the rotation is in degrees.
	onClick,
	collsisionRefSetter
}: ObjectLoadOptions): JSX.Element {
	const SHOW_COLLISION_BOX = false;
	const meshRef = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	const [collsionRefWasSet, collsionRefSet] = useState(false);

	if (reference && meshRef.current) {
		reference(meshRef.current);
	}
	if (!collsionRefWasSet && collsisionRefSetter && meshRef.current) {
		collsionRefSet(true);
		collsisionRefSetter(new Box3().setFromObject(meshRef.current.clone()));
	}
	const dracoLoader = new DRACOLoader();
	dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
	const obj = useLoader(GLTFLoader, path, loader => {
		loader.setDRACOLoader(dracoLoader);
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

	// only for collision Box visualization
	let meshBox;
	if (meshRef.current && collsisionRefSetter)
		meshBox = new Box3().setFromObject(meshRef.current.clone());

	return (
		<>
			{SHOW_COLLISION_BOX && meshBox &&
				<mesh position={meshBox.getCenter(new Vector3().fromArray(position))}>
					<boxGeometry args={meshBox.getSize(new Vector3(0, 0, 0)).toArray()} />
					<meshLambertMaterial color={RED} opacity={0.6} transparent={true} />
				</mesh>
			}
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
