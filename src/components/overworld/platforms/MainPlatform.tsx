import SimplePlatform from './SimplePlatform';
import { PINK } from '../../../AllColorVariables';
import { Box3, BufferGeometry, Material, Mesh } from 'three';
import ObjectLoad from '../../ObjectLoad';
import Button from '../objects/Button';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function MainPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
	buttonReference,
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
				position={[position[0] - 0.02, position[1] + 0.88, position[2] + 5.65]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<group name="info-board-and-buttons">
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] + 5.2, position[1], position[2] + 6]}
					scale={[0.35, 0.35, 0.35]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<Button
					customName="shipmentInfo"
					position={[position[0] + 5.2, position[1], position[2] + 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] + 9.5, position[1], position[2] + 2]}
					scale={[0.35, 0.35, 0.35]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<Button
					customName="monitoringInfo"
					position={[position[0] + 8.7, position[1], position[2] + 2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] - 5.3, position[1], position[2] + 6]}
					scale={[0.35, 0.35, 0.35]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<Button
					customName="engineeringInfo"
					position={[position[0] - 5.3, position[1], position[2] + 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] - 9.5, position[1], position[2] - 2.2]}
					scale={[0.35, 0.35, 0.35]}
					rotation={[0, 270, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<Button
					customName="designInfo"
					position={[position[0] - 8.7, position[1], position[2] - 2.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] - 4.7, position[1], position[2] - 6]}
					scale={[0.35, 0.35, 0.35]}
					rotation={[0, 180, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<Button
					customName="productionInfo"
					position={[position[0] - 4.7, position[1], position[2] - 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
				/>
				<ObjectLoad
					path="/Infotafel/infotafel.glb"
					position={[position[0] + 3.8, position[1], position[2] - 6]}
					scale={[0.35, 0.35, 0.35]}
					rotation={[0, 180, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<Button
					customName="partsInfo"
					position={[position[0] + 3.8, position[1], position[2] - 5.2]}
					scale={[0.6, 0.6, 0.6]}
					reference={buttonReference}
				/>
			</group>
			<ObjectLoad
				path="/Sitzhocker/sitzhocker.glb"
				position={[position[0] + 1.5, position[1], position[2] - 4.8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 30, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Sitzhocker/sitzhocker.glb"
				position={[position[0], position[1], position[2] - 5.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Sitzhocker/sitzhocker.glb"
				position={[position[0] - 1.5, position[1], position[2] - 5]}
				scale={[0.3, 0.3, 0.3]}
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
