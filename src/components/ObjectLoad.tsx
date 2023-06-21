import { useRef, useEffect, useState, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import {
	Vector3,
	BufferGeometry,
	Material,
	MathUtils,
	Box3,
	InstancedMesh,
	Mesh,
	MeshBasicMaterial,
	NearestFilter,
	Texture,
} from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

import { RED } from '../AllColorVariables';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/DracoLoader/');

// This interface is used to set the options of the ObjectLoad function.
type ObjectLoadOptions = {
	path: string;
	position: [number, number, number];
	rotation?: [number, number, number];
	scale?: [number, number, number];
	reference?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
	collisionRefSetter?: (meshRef: Box3) => void;
	customCollisionBoxes?: { positionOffset: Vector3; size: Vector3 }[];
	customName?: string; // Add customName property
	visible?: boolean;
};

// This function is to load an object from a .obj file and a .mtl file. To use it no knowlage of the ObjectLoad function is needed.
export default function ObjectLoad({
	path,
	position,
	scale = [1, 1, 1], // Default scale is 1, 1, 1.
	reference,
	rotation = [0, 0, 0], // Default rotation is 0, 0, 0, the rotation is in degrees.
	collisionRefSetter,
	customCollisionBoxes,
	customName, // Include customName in function parameters
	visible = true,
}: ObjectLoadOptions): JSX.Element {
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

			if (customName) {
				meshRef.current.name = customName; // Set the custom name
			}
		}
	}, [position, customName]);

	// buffer Mipmaps
	useMemo(() => {
		obj.scene.traverse(node => {
			if (node instanceof Mesh) {
				const materials = Array.isArray(node.material) ? node.material : [node.material];
				materials.forEach((material: MeshBasicMaterial) => {
					if (material.map instanceof Texture) {
						material.map.generateMipmaps = false;
						material.map.minFilter = NearestFilter;
						material.map.magFilter = NearestFilter;
						material.map.needsUpdate = true;
					}
				});
			}
		});
	}, [obj]);

	collisionBoxes.map((box, index) => (
		<mesh key={index} position={box.getCenter(new Vector3(...position))}>
			<boxGeometry args={box.getSize(new Vector3(0, 0, 0)).toArray()} />
			<meshLambertMaterial color={RED} opacity={0.6} transparent={true} />
		</mesh>
	));

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

			<mesh
				castShadow={true}
				receiveShadow={true}
				ref={meshRef}
				name={meshRef.current?.name}
				position={position}
				scale={new Vector3(scale[0], scale[1], scale[2])}
				rotation={rotation}>
				{visible && <primitive object={clone(obj.scene)} />}
			</mesh>
		</>
	);
}
