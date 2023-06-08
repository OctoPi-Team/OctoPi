import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { SceneProps } from '../../../App';
import Button from '../objects/Button';
import { SHIPMENT } from '../../../AllColorVariables';
import Tube from '../objects/Tube';
import Text from '../../Text';
import { Box3 } from 'three';

type ShipmentPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	sceneProps?: SceneProps;
	buttonreference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function ShipmentPlatform({
	position = [0, 0, 0],
	reference,
	buttonreference,
	addCollisionBox,
}: ShipmentPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[18, 0.5, 18]} reference={reference} color={SHIPMENT} />
			<Text text={'Shipment'} position={[position[0] + 10, position[1], position[2] - 9]} rotation={[0, 270, 0]} />
			<ObjectLoad
				path="/LaufbandUndTrichter.glb"
				position={[position[0] - 3, position[1], position[2] + 4]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 1.5, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 3.4, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Hubwagen/hubwagen.glb"
				position={[position[0] + 3, position[1], position[2] + 5]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, -90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/LKW/lkw.glb"
				position={[position[0], position[1], position[2] + 9.5]}
				scale={[1, 1, 1]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Palette/palette.glb"
				position={[position[0] - 0.5, position[1], position[2] + 3]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/PaketMitAugen/paketMitAugen.glb"
				position={[position[0] + 5.8, position[1], position[2] - 7.25]}
				scale={[0.25, 0.25, 0.25]}
				rotation={[0, 8, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<group name="palette-with-empty-pakets">
				<ObjectLoad
					path="/Palette/palette.glb"
					position={[position[0] - 0.5, position[1], position[2] + 3]}
					scale={[0.15, 0.15, 0.15]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/UmgeknicktesPaket/umgeknicktesPaket.glb"
					position={[position[0] - 0.7, position[1] + 0.5, position[2] + 3.7]}
					scale={[0.13, 0.13, 0.13]}
					rotation={[0, 8, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/UmgeknicktesPaket/umgeknicktesPaket.glb"
					position={[position[0] - 0.7, position[1] + 0.5, position[2] + 2.4]}
					scale={[0.13, 0.13, 0.13]}
					rotation={[0, 8, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] + 5, position[1], position[2] - 5.5]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 3.5, position[1], position[2] - 1.5]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 3.6, position[1], position[2] - 1]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Tube name="Tube" position={[position[0] + 7.6, position[1] - 1.9, position[2] + 0.5]} size={[0.5, 8, 1]} />
			<Button position={[position[0] - 6, position[1] + 6, position[2] - 9]} reference={buttonreference} />
		</>
	);
}
