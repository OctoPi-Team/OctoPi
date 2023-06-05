import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { MONITORING } from '../../../AllColorVariables';

type MonitoringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function MonitoringPlatform({
	position = [0, 0, 0],
	reference,
}: MonitoringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[14, 0.5, 21]} reference={reference} color={MONITORING} />

			<ObjectLoad
				path="/Plattformbeschriftung/MonitoringLogo/monitoring-logo.glb"
				position={[position[0] + 3, position[1] + 5, position[2] - 8]}
				scale={[2, 2, 2]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path="/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb"
				position={[position[0], position[1] - 0.5, position[2] + 5]}
				scale={[0.7, 0.7, 0.7]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/TV/tv.glb"
				position={[position[0] + 3, position[1] + 2, position[2] - 4]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 8, 0]}
			/>
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] + 3.5, position[1], position[2] - 0.5]}
				scale={[0.5, 0.5, 0.6]}
				rotation={[0, 8, 0]}
			/>
		</>
	);
}
