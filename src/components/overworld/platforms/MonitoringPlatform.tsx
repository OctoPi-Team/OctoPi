import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { MONITORING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3 } from 'three';
import Button from '../objects/Button';

type MonitoringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function MonitoringPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
	addCollisionBox,
}: MonitoringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[14, 0.5, 21]} reference={reference} color={MONITORING} />
			<Text text={'Monitoring'} position={[position[0] + 3, position[1] + 5, position[2] - 8]} rotation={[0, 270, 0]} />
			<ObjectLoad
				path="/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb"
				position={[position[0], position[1], position[2] + 5]}
				scale={[0.8, 0.8, 0.8]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb"
				position={[position[0] - 2, position[1], position[2] - 7]}
				scale={[0.8, 0.8, 0.8]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TischMitTV/tischMitTV.glb"
				position={[position[0] + 3.5, position[1], position[2] - 0.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 7, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] - 5, position[1], position[2] + 9]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button position={[position[0] - 8, position[1] + 6, position[2] - 9]} reference={buttonreference} />
		</>
	);
}
