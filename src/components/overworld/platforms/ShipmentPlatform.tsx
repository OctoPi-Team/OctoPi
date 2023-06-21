import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { PlatformFixProps, SceneProps } from '../../../App';
import Button from '../objects/Button';
import { SHIPMENT } from '../../../AllColorVariables';
import Tube from '../objects/Tube';
import Text from '../objects/Text';
import { Box3, Vector3 } from 'three';
import Cylinder from '../objects/Cylinder';

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
			{isPlatformFixed?.shipment ? (
				<ObjectLoad
					path="/Packet/packet.glb"
					position={[position[0] - 2.5, position[1] + 0.75, position[2] + 4]}
					scale={[0.13, 0.13, 0.13]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					animated
					targetPosition={[position[0] - 2.5, position[1] + 0.75, position[2] + 0.25]}
				/>
			) : null}
			<ObjectLoad
				path="/Packet/packet.glb"
				position={[position[0] - 4, position[1], position[2] - 1]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			{isPlatformFixed?.shipment ? (
				<ObjectLoad
					path="/Hubwagen/hubwagen.glb"
					position={[position[0] - 2.6, position[1], position[2] - 3.5]}
					scale={[0.09, 0.09, 0.09]}
					rotation={[0, 210, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			) : (
				<ObjectLoad
					path="/Hubwagen/hubwagen.glb"
					position={[position[0] + 3, position[1], position[2] + 5]}
					scale={[0.09, 0.09, 0.09]}
					rotation={[0, -90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
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
			{/*
			<Tube name="Tube" position={[position[0] + 7.6, position[1], position[2] + 0.5]} size={[0.5, 8, 1]} />
			*/}
			{isPlatformFixed?.monitoring ? null : (
				<Tube
					name="brokenShipmentTube1"
					position={[0, 0, 0]}
					size={[0.5, 8, 1]}
					vectors={[
						new Vector3(1.5, -1, -5),
						new Vector3(1.5, -1, 8),
						new Vector3(1.5, 3.5, 8),
						new Vector3(1.5, 3.5, 15),
						new Vector3(1, 2.5, 15),
						new Vector3(2, 2.5, 15),
						new Vector3(2, 2.5, 18),
						new Vector3(2, 5, 18),
						new Vector3(2, 5.7, 21),
					]}
				/>
			)}
			{isPlatformFixed?.shipment ? null : (
				<ObjectLoad
					path="/ScherbenGross/scherbenGross.glb"
					position={[position[0] + 1, position[1], position[2] + 2]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			{isPlatformFixed?.shipment ? null : (
				<ObjectLoad
					path="/ScherbenKlein1/scherbenKlein.glb"
					position={[position[0] + 2, position[1], position[2] + 3]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			{isPlatformFixed?.shipment ? null : (
				<ObjectLoad
					path="/ScherbenKlein2/scherbenKlein.glb"
					position={[position[0] + 1, position[1], position[2] + 3]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			{isPlatformFixed?.shipment ? null : (
				<Tube
					name="brokenShipmentTube2"
					position={[0, 0, 0]}
					size={[0.5, 8, 1]}
					vectors={[new Vector3(16.6, 4, 25.5), new Vector3(15.7, 10, 25.5), new Vector3(12, 11, 27.1)]}
				/>
			)}
			{isPlatformFixed?.shipment ? (
				<Tube
					name="finalShipmentTube"
					position={[0, 0, 0]}
					size={[0.5, 8, 1]}
					vectors={[
						new Vector3(1.5, -1, -5),
						new Vector3(1.5, -1, 8),
						new Vector3(1.5, 3.5, 8),
						new Vector3(1.5, 3.5, 15),
						new Vector3(1, 2.5, 15),
						new Vector3(2, 2.5, 15),
						new Vector3(2, 2.5, 18),
						new Vector3(2, 5, 18),
						new Vector3(2, 5, 25),
						new Vector3(2, 2, 25.5),
						new Vector3(16.6, 2, 25.5),
						new Vector3(15.7, 10, 25.5),

						new Vector3(5.6, 10, 30),
						new Vector3(5.5, 8.4, 30),
					]}
					ballAnimation={isPlatformFixed?.shipment}
				/>
			) : (
				<Tube
					name="brokenShipmentTube3"
					position={[0, 0, 0]}
					size={[0.5, 8, 1]}
					vectors={[new Vector3(8.5, 10.9, 28.7), new Vector3(5.6, 10, 30), new Vector3(5.5, 8.4, 30)]}
				/>
			)}{' '}
			{isPlatformFixed?.shipment ? null : (
				<ObjectLoad
					path="/ScherbenGross/scherbenGross.glb"
					position={[position[0] - 7, position[1], position[2] - 2]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			{isPlatformFixed?.shipment ? null : (
				<ObjectLoad
					path="/ScherbenKlein1/scherbenKlein.glb"
					position={[position[0] - 7, position[1], position[2] - 3.5]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			{isPlatformFixed?.shipment ? null : (
				<ObjectLoad
					path="/ScherbenGross/scherbenGross.glb"
					position={[position[0] - 7, position[1], position[2] - 0.5]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			<Cylinder
				position={[position[0] - 6.95, position[1], position[2] - 7.1]}
				color={SHIPMENT}
				collisionRefSetter={addCollisionBox}
			/>
			{isPlatformFixed?.shipment ? (
				<Cylinder
					position={[position[0] - 7.2, position[1], position[2] + 0.2]}
					color={SHIPMENT}
					collisionRefSetter={addCollisionBox}
				/>
			) : null}
			{isPlatformFixed?.shipment ? (
				<Cylinder
					position={[position[0] + 8.35, position[1], position[2] + 0.4]}
					color={SHIPMENT}
					collisionRefSetter={addCollisionBox}
				/>
			) : (
				<Cylinder
					position={[position[0] + 7.55, position[1], position[2] + 0.5]}
					color={SHIPMENT}
					collisionRefSetter={addCollisionBox}
				/>
			)}
			<Button
				customName="shipment"
				position={[position[0] - 6, position[1] + 6, position[2] - 9]}
				reference={buttonReference}
			/>
		</>
	);
}
