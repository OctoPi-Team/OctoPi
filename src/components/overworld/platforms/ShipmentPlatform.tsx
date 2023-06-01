import { Color } from 'three';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { SceneProps } from '../../../App';
import Button from '../objects/Button';
import { BLUE } from '../../../AllColorVariables';

type ShipmentPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	sceneProps?: SceneProps;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};

export default function ShipmentPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
}: ShipmentPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform
				name={'Shipment'}
				position={position}
				size={[15, 0.5, 18]}
				reference={reference}
				color={new Color(BLUE)}
			/>
			<ObjectLoad path="/LaufbandUndTrichter.glb" position={position} scale={[0.1, 0.1, 0.1]} rotation={[0, 180, 0]} />
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Hubwagen/hubwagen.glb"
				position={[position[0] + 2, position[1], position[2] + 7.5]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/LKW/lkw.glb"
				position={[position[0], position[1], position[2] + 9]}
				scale={[0.08, 0.06, 0.05]}
				rotation={[0, 90, 0]}
			/>
			<ObjectLoad
				path="/Palette/palette.glb"
				position={[14, 2, 10.5]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/PaketMitAugen/paketMitAugen.glb"
				position={[position[0] + 5.8, position[1] + 1, position[2] - 7.25]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[0, 8, 0]}
			/>
			<ObjectLoad
				path="/UmgeknicktesPaket/umgeknicktesPaket.glb"
				position={[position[0] - 6, position[1], position[2] - 8]}
				scale={[0.13, 0.13, 0.13]}
				rotation={[0, 8, 0]}
			/>
			<ObjectLoad
				path="/Paket_1/paket_1.glb"
				position={[position[0] - 3, position[1], position[2] - 2]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Paket_2/paket_2.glb"
				position={[position[0] - 3.5, position[1], position[2] - 2]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[5.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<Button position={position} reference={buttonreference} />
		</>
	);
}
