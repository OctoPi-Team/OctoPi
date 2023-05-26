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
			<SimplePlatform
				name={'Producting'}
				position={position}
				size={[19, 0.5, 12]}
				reference={reference}
				color={new Color(0x587b7f)}
			/>
			<ObjectLoad
				pathObj="/Schreibtisch/schreibtisch.obj"
				pathMtl="/Schreibtisch/schreibtisch.mtl"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.5, 0.5, 0.5]}
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
				position={[position[0] + 4, position[1], position[2]]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
