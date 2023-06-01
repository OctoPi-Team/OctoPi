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
				path="/Schreibtisch/schreibtisch.glb"
				position={[position[0], position[1], position[2] - 3]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
			/>
			<ObjectLoad
				path="/Notebook/notebook.glb"
				position={[position[0] - 9.5, position[1] + 4, position[2] - 9.5]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				path="/Drehstuhl/drehstuhl.glb"
				position={[position[0], position[1], position[2] - 4]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				path="/Roboterarm_kaputt/roboterarm_kaputt.glb"
				position={[position[0] + 6, position[1], position[2]]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Notebook/notebook_2.glb"
				position={[position[0] + 4, position[1] + 4, position[2] - 6.5]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Drehstuhl/drehstuhl_2.glb"
				position={[position[0] + 4, position[1], position[2] - 3]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Schreibtisch/schreibtisch_2.glb"
				position={[position[0] + 4, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 270, 0]}
			/>
		</>
	);
}
