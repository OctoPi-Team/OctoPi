import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

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
				position={[position[0], 10, position[2]]}
				scale={[0.8, 0.8, 0.8]}
				rotation={[0, 0, 0]}
			/>

			<ObjectLoad
				pathObj="/Kaffeemaschine/kaffeemaschine.obj"
				pathMtl="/Kaffeemaschine/kaffeemaschine.mtl"
				position={[position[0] - 3, position[1], position[2] - 7]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 8, 0]}
			/>

			<ObjectLoad
				pathObj="/TV/tv.obj"
				pathMtl="/TV/tv.mtl"
				position={[position[0] + 3, position[1], position[2] - 4]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 8, 0]}
			/>
		</>
	);
}
