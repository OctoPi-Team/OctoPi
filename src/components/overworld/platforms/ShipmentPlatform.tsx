import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { PlatformFixProps, SceneProps } from '../../../App';
import Button from '../../ui/Button';
import { SHIPMENT } from '../../../AllColorVariables';
import Tube from '../objects/Tube';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';

type ShipmentPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	sceneProps?: SceneProps;
	buttonReference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	setplayerpos?: (setplayerpos: Vector3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function ShipmentPlatform({
	position = [0, 0, 0],
	reference,
	buttonReference,
	addCollisionBox,
	isPlatformFixed,
}: ShipmentPlatformOptions): JSX.Element {
	return (
		//TODO do something on platform when isPlatformFixed.shipment = true
		<>
			<SimplePlatform position={position} size={[18, 0.5, 18]} reference={reference} color={SHIPMENT} />
			<Text
				text={'SHIPMENT'}
				color={SHIPMENT}
				position={[position[0] + 10, position[1], position[2] - 9]}
				rotation={[0, 270, 0]}
			/>
			<ObjectLoad
				path="/LaufbandUndTrichter.glb"
				position={[position[0] - 3, position[1], position[2] + 4]}
				scale={[0.12, 0.12, 0.12]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(0.6, 0, -2.2), size: new Vector3(1.6, 5, 8.2) }]}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 1, position[1], position[2] - 1]}
				scale={[0.2, 0.2, 0.2]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 4, position[1], position[2] - 1]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Hubwagen/hubwagen.glb"
				position={[position[0] + 3, position[1], position[2] + 5]}
				scale={[0.09, 0.09, 0.09]}
				rotation={[0, -90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/LKW/lkw.glb"
				position={[position[0] + 3, position[1] - 3, position[2] + 11]}
				scale={[0.8, 0.8, 0.8]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(5, 10, 4) }]}
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
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 8, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<group name="palette-with-empty-pakets">
				<ObjectLoad
					path="/Palette/palette.glb"
					position={[position[0] - 0.5, position[1], position[2] + 3]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/UmgeknicktesPaket/umgeknicktesPaket.glb"
					position={[position[0] - 0.7, position[1] + 0.5, position[2] + 3.7]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 8, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/UmgeknicktesPaket/umgeknicktesPaket.glb"
					position={[position[0] - 0.7, position[1] + 0.5, position[2] + 2.4]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 8, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] + 5, position[1], position[2] - 5.5]}
				scale={[0.15, 0.15, 0.15]}
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
			<Tube name="Tube" position={[position[0] + 7.6, position[1], position[2] + 0.5]} size={[0.5, 8, 1]} />
			<Tube
				name="Tube2"
				position={[position[0] - 7, position[1], position[2] - 7]}
				size={[0.5, 8, 1]}
				vectors={[new Vector3(0, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 1, 7), new Vector3(0, 0, 7)]}
			/>
			<Button
				customName="shipment"
				position={[position[0] - 6, position[1] + 6, position[2] - 9]}
				reference={buttonReference}
			/>
		</>
	);
}
