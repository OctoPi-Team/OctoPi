import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { MONITORING } from '../../../AllColorVariables';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';
import Tube from '../objects/Tube';
import Button from '../objects/Button';
import { PlatformFixProps } from '../../../App';

type MonitoringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function MonitoringPlatform({
	position = [0, 0, 0],
	reference,
	buttonReference,
	addCollisionBox,
	isPlatformFixed,
}: MonitoringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[14, 0.5, 21]} reference={reference} color={MONITORING} />
			<Text
				text={'MONITORING'}
				color={MONITORING}
				position={[position[0] + 3, position[1] + 5, position[2] - 15]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path={
					isPlatformFixed?.monitoring
						? '/Radarschuessel/radarschuessel.glb'
						: '/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb'
				}
				position={[position[0], position[1], position[2] + 5]}
				scale={[0.8, 0.8, 0.8]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(2, 2, 2) }]}
			/>
			<ObjectLoad
				path={
					isPlatformFixed?.monitoring
						? '/Radarschuessel/radarschuessel.glb'
						: '/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb'
				}
				position={[position[0] - 2, position[1], position[2] - 7]}
				scale={[0.7, 0.7, 0.7]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(2, 2, 2) }]}
			/>
			<ObjectLoad
				path="/TischMitTV/tischMitTV.glb"
				position={[position[0] + 3.5, position[1], position[2] - 0.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 7, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1, 2, 2) }]}
			/>
			<ObjectLoad
				path="/TischMitTV/tischMitTV.glb"
				position={[position[0] + 2.5, position[1], position[2] - 4.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 7, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1, 2, 2) }]}
			/>
			<Tube
				position={[position[0] - 5, position[1], position[2] + 9]}
				size={[0.5, 8, 1]}
				vectors={[new Vector3(0, 0, 0), new Vector3(0, 2, 0), new Vector3(6, 2, 0), new Vector3(6, 0, 0)]}
			/>
			<Tube
				position={[position[0] - 5, position[1], position[2] - 8]}
				size={[0.5, 8, 1]}
				vectors={[new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 3), new Vector3(0, 0, 3)]}
			/>
			<Button
				customName="monitoring"
				position={[position[0] - 8, position[1] + 6, position[2] - 9]}
				reference={buttonReference}
			/>
		</>
	);
}
