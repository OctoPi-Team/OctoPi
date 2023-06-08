import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { MONITORING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3 } from 'three';

type MonitoringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function MonitoringPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
}: MonitoringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[14, 0.5, 21]} reference={reference} color={MONITORING} />
			<Text text={'Monitoring'} position={[position[0] + 3, position[1] + 5, position[2] - 8]} rotation={[0, 270, 0]} />
			<ObjectLoad
				path="/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb"
				position={[position[0], position[1] - 0.5, position[2] + 5]}
				scale={[0.7, 0.7, 0.7]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TV/tv.glb"
				position={[position[0] + 3, position[1] + 2, position[2] - 4]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 8, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] + 3.5, position[1], position[2] - 0.5]}
				scale={[0.5, 0.5, 0.6]}
				rotation={[0, 8, 0]}
				collisionRefSetter={addCollisionBox}
			/>
		</>
	);
}
