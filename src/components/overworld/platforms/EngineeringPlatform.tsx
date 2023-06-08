import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { ENGINEERING } from '../../../AllColorVariables';
import { Box3 } from 'three';

type EngineeringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function EngineeringPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: EngineeringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform name={''} position={position} size={[15, 0.5, 18]} reference={reference} color={ENGINEERING} />
			<ObjectLoad
				path="/Plattformbeschriftung/EngineeringLogo/engineering-logo.glb"
				position={[position[0] + 8.25, position[1], position[2] - 9]}
				scale={[2, 2, 2]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Wegweiser/wegweiser.glb"
				position={[position[0], position[1], position[2]]}
				scale={[0.4, 0.4, 0.4]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Zeichentisch/zeichentisch_2.glb"
				position={[position[0] - 2, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Schreibtisch/schreibtisch_3.glb"
				position={[position[0], position[1], position[2] + 7]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Monitor/monitor.glb"
				position={[position[0] - 2.5, position[1] + 4, position[2] + 3.5]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Drehstuhl/drehstuhl_3.glb"
				position={[position[0], position[1], position[2] + 6]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
		</>
	);
}
