import SimplePlatform from './SimplePlatform';
import { PINK } from '../../../AllColorVariables';
import { Box3, BufferGeometry, Material, Mesh } from 'three';
import ObjectLoad from '../../ObjectLoad';
import Button from '../objects/Button';
import { PlatformFixProps } from '../../../App';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function MainPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
	buttonReference,
	isPlatformFixed,
}: MainPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[20, 0.5, 13]} reference={reference} color={PINK} />
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0], position[1], position[2] + 5.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TV/tv.glb"
				position={[position[0] - 0.02, position[1] + 0.87, position[2] + 5.65]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<group name="info-board-and-buttons">
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] + 5.2, position[1], position[2] + 6]}
					scale={[0.45, 0.45, 0.45]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					visible={isPlatformFixed?.shipment}
				/>
				<Button
					customName="shipmentInfo"
					position={[position[0] + 5.2, position[1], position[2] + 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
					visible={isPlatformFixed?.shipment}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] + 9.5, position[1], position[2] + 2]}
					scale={[0.45, 0.45, 0.45]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
					visible={isPlatformFixed?.monitoring}
				/>
				<Button
					customName="monitoringInfo"
					position={[position[0] + 8.7, position[1], position[2] + 2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
					visible={isPlatformFixed?.monitoring}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] - 5.3, position[1], position[2] + 6]}
					scale={[0.45, 0.45, 0.45]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					visible={isPlatformFixed?.engineering}
				/>
				<Button
					customName="engineeringInfo"
					position={[position[0] - 5.3, position[1], position[2] + 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
					visible={isPlatformFixed?.engineering}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] - 9.5, position[1], position[2] - 2.2]}
					scale={[0.45, 0.45, 0.45]}
					rotation={[0, 270, 0]}
					collisionRefSetter={addCollisionBox}
					visible={isPlatformFixed?.design}
				/>
				<Button
					customName="designInfo"
					position={[position[0] - 8.7, position[1], position[2] - 2.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
					visible={isPlatformFixed?.design}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] - 4.7, position[1], position[2] - 6]}
					scale={[0.45, 0.45, 0.45]}
					rotation={[0, 180, 0]}
					collisionRefSetter={addCollisionBox}
					visible={isPlatformFixed?.production}
				/>
				<Button
					customName="productionInfo"
					position={[position[0] - 4.7, position[1], position[2] - 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
					visible={isPlatformFixed?.production}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] + 3.8, position[1], position[2] - 6]}
					scale={[0.45, 0.45, 0.45]}
					rotation={[0, 180, 0]}
					collisionRefSetter={addCollisionBox}
					visible={isPlatformFixed?.parts}
				/>
				<Button
					customName="partsInfo"
					position={[position[0] + 3.8, position[1], position[2] - 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
					visible={isPlatformFixed?.parts}
				/>
			</group>
			<ObjectLoad
				path="/Sitzhocker/sitzhocker.glb"
				position={[position[0] + 1.5, position[1], position[2] - 4.8]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 30, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Sitzhocker/sitzhocker.glb"
				position={[position[0], position[1], position[2] - 5.5]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Sitzhocker/sitzhocker.glb"
				position={[position[0] - 1.5, position[1], position[2] - 5]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 10, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button
				customName="BTPinfo"
				position={[position[0], position[1], position[2] + 4]}
				reference={buttonReference}
				scale={[1, 1, 1]}
			/>
		</>
	);
}
