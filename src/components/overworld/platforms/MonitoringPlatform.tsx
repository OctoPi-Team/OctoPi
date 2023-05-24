import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type MonitoringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function MonitoringPlatform({ position = [0, 0, 0], reference }: MonitoringPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Monitoring'}
				position={position}
				size={[14, 0.5, 19]}
                reference={reference}
				color={new Color(0xdddddd)}
			/>
			<ObjectLoad
				pathObj="/Radarschuessel/radarschuessel.obj"
				pathMtl="/Radarschuessel/radarschuessel.mtl"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
