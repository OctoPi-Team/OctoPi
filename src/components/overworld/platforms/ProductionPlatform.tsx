import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type PartsPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function PartsPlatform({ position = [0, 0, 0], reference }: PartsPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[19, 0.5, 12]} reference={reference} color={new Color(0x587b7f)} />
			<ObjectLoad
				pathObj="/Schreibtisch/schreibtisch.obj"
				pathMtl="/Schreibtisch/schreibtisch.mtl"
				position={[position[0], position[1], position[2] - 1]}
				scale={[1, 1, 0.5]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Notebook/notebook.obj"
				pathMtl="/Notebook/notebook.mtl"
				position={[position[0], position[1] + 4, position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Drehstuhl/drehstuhl.obj"
				pathMtl="/Drehstuhl/drehstuhl.mtl"
				position={[position[0], position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
