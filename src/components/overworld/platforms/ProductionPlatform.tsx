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
				path="/Roboterarm_kaputt/roboterarm_kaputt.glb"
				position={[position[0], position[1], position[2] + 2]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Plattformbeschriftung/ProductionLogo/production-logo.glb"
				position={[position[0] + 2, position[1], position[2] + 7]}
				scale={[2, 2, 2]}
				rotation={[0, 180, 0]}
			/>
			<gridHelper position={[position[0] - 3, position[1], position[2]]} args={[10, 10, 'black', 'white']} />

			<group>
				<ObjectLoad
					path="/Notebook/notebook_2.glb"
					position={[position[0] + 1.1, position[1] + 2, position[2] - 9.5]}
					scale={[0.28, 0.28, 0.28]}
					rotation={[0, 150, 0]}
				/>
				<ObjectLoad
					path="/Schreibtisch/schreibtisch.glb"
					position={[position[0] + 7, position[1], position[2] - 2]}
					scale={[0.5, 0.5, 0.25]}
					rotation={[0, 90, 0]}
				/>
				<ObjectLoad
					path="/Drehstuhl/drehstuhl.glb"
					position={[position[0] + 7, position[1], position[2] - 4]}
					scale={[0.25, 0.25, 0.25]}
					rotation={[0, 160, 0]}
				/>

			</group>
			<group name="corner-desk">
				<ObjectLoad
					path="/Schreibtisch/schreibtisch_2.glb"
					position={[position[0] + 5, position[1], position[2] + 3]}
					scale={[0.4, 0.4, 0.4]}
					rotation={[0, 50, 0]}
				/>
				<ObjectLoad
					path="/Drehstuhl/drehstuhl_2.glb"
					position={[position[0] + 5, position[1], position[2] + 1.6]}
					scale={[0.22, 0.22, 0.22]}
					rotation={[0, 170, 0]}
				/>
				<ObjectLoad
					path="/Notebook/notebook.glb"
					position={[position[0] + 3, position[1] - 0.2, position[2] - 1.5]}
					scale={[0.25, 0.25, 0.25]}
					rotation={[0, 140, 0]}
				/>
			</group>
		</>
	);
}
