import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { SceneProps } from '../../../App';
import Button from '../objects/Button';

type ShipmentPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	sceneProps?: SceneProps;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function ShipmentPlatform({
	position = [0, 0, 0],
	reference,
	sceneProps,
	buttonreference,
}: ShipmentPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Shipment'}
				position={position}
				size={[15, 0.5, 18]}
				reference={reference}
				color={new Color('#b2c4d1')}
			/>
			<ObjectLoad
				pathObj="/LaufbandUndTrichter.obj"
				pathMtl="/LaufbandUndTrichter.mtl"
				position={position}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				pathObj="/Packet/packet.obj"
				pathMtl="/Packet/packet.mtl"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Packet/packet.obj"
				pathMtl="/Packet/packet.mtl"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Hubwagen/hubwagen.obj"
				pathMtl="/Hubwagen/hubwagen.mtl"
				position={[position[0] + 2, position[1], position[2] + 7.5]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/LKW/lkw.obj"
				pathMtl="/LKW/lkw.mtl"
				position={[position[0], position[1], position[2] + 9]}
				scale={[0.08, 0.06, 0.05]}
				rotation={[0, 90, 0]}
			/>
			<Button position={position} reference={buttonreference} />
		</>
	);
}
