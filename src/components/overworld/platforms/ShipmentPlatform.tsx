import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';

type ShipmentPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function ShipmentPlatform({ position = [0, 0, 0], reference }: ShipmentPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Shipment'}
				position={position}
				size={[15, 0.5, 18]}
				reference={reference}
				color={new Color(0xb2c4d1)}
			/>
			<ObjectLoad
				pathObj="/LaufbandUndTrichter.obj"
				pathMtl="/LaufbandUndTrichter.mtl"
				position={position}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 180, 0]}
			/>
			<ObjectLoad
				pathObj="/Packet/Packet.obj"
				pathMtl="/Packet/Packet.mtl"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Packet/Packet.obj"
				pathMtl="/Packet/Packet.mtl"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Hubwagen/Hubwagen.obj"
				pathMtl="/Hubwagen/Hubwagen.mtl"
				position={[position[0] + 2, position[1], position[2] + 7.5]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/LKW/LKW.obj"
				pathMtl="/LKW/LKW.mtl"
				position={[position[0], position[1], position[2] + 9]}
				scale={[0.08, 0.06, 0.05]}
				rotation={[0, 90, 0]}
			/>
		</>
	);
}
