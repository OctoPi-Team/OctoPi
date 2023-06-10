import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { MONITORING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';
import Tube from '../objects/Tube';

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
				position={[position[0], position[1], position[2] + 5]}
				scale={[0.8, 0.8, 0.8]}
				rotation={[0, 0, 0]}
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
				path="/TischMitTV/tischMitTV.glb"
				position={[position[0] + 2.5, position[1], position[2] - 4.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 30, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Tube
				position={[position[0] - 5, position[1] - 1.9, position[2] + 9]}
				size={[0.5, 8, 1]}
				vectors={[new Vector3(0, 0, 0), new Vector3(0, 3, 0), new Vector3(6, 3, 0), new Vector3(6, 0, 0)]}
			/>
			<Tube
				position={[position[0] - 5, position[1] - 1.9, position[2] - 8]}
				size={[0.5, 8, 1]}
				vectors={[new Vector3(0, 0, 0), new Vector3(0, 4, 0), new Vector3(0, 4, 3), new Vector3(0, 0, 3)]}
			/>
		</>
	);
}
