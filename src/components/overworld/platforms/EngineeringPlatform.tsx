import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type EngineeringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function EngineeringPlatform({ position = [0, 0, 0], reference }: EngineeringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform name={'Engineering'} position={position} size={[15, 0.5, 18]} reference={reference} color={new Color(0xdabdd65)} />
			<ObjectLoad
				pathObj="/Wegweiser/wegweiser.obj"
				pathMtl="/Wegweiser/wegweiser.mtl"
				position={[position[0] + 7, position[1], position[2]]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 0, 0]}
			/>
            <ObjectLoad
				pathObj="/Zeichentisch/zeichentisch_2.obj"
				pathMtl="/Zeichentisch/zeichentisch_2.mtl"
				position={[position[0] - 2, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
			/>
            <ObjectLoad
				pathObj="/Schreibtisch/schreibtisch_3.obj"
				pathMtl="/Schreibtisch/schreibtisch_3.mtl"
				position={[position[0], position[1], position[2] + 7]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
			/>
			<ObjectLoad
				pathObj="/Monitor/monitor.obj"
				pathMtl="/Monitor/monitor.mtl"
				position={[position[0] - 2.5, position[1] + 4, position[2] + 3.5]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				pathObj="/Drehstuhl/drehstuhl_3.obj"
				pathMtl="/Drehstuhl/drehstuhl_3.mtl"
				position={[position[0], position[1], position[2] + 6]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 180, 0]}
			/>
		</>
	);
}
