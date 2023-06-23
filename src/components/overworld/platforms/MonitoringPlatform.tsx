import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import { MONITORING } from '../../../AllColorVariables';
import Text from '../objects/Text';
import { Box3, BufferGeometry, Material, Mesh, Vector3 } from 'three';
import Tube from '../objects/Tube';
import { PlatformFixProps } from '../../../App';
import Button from '../objects/Button';
import Cylinder from '../objects/Cylinder';

type MonitoringPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function MonitoringPlatform({
	position = [0, 0, 0],
	reference,
	buttonReference,
	addCollisionBox,
	isPlatformFixed,
}: MonitoringPlatformOptions): JSX.Element {
	const visibiltyForDamaged = !isPlatformFixed?.monitoring;
	const visibiltyForFixed = isPlatformFixed?.monitoring;
	return (
		<>
			<SimplePlatform position={position} size={[14, 0.5, 21]} reference={reference} color={MONITORING} />
			<Text
				text={'MONITORING'}
				color={MONITORING}
				position={[position[0] + 3, position[1] + 5, position[2] - 15]}
				rotation={[0, 270, 0]}
			/>
			<group>
				<ObjectLoad
					path={'/Radarschuessel/radarschuessel.glb'}
					position={[position[0], position[1], position[2] + 5]}
					scale={[0.8, 0.8, 0.8]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(2, 2, 2) }]}
					visible={visibiltyForFixed}
				/>
				<ObjectLoad
					path={'/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb'}
					position={[position[0], position[1], position[2] + 5]}
					scale={[0.8, 0.8, 0.8]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
					customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(2, 2, 2) }]}
					visible={visibiltyForDamaged}
				/>
			</group>
			<group>
				<ObjectLoad
					path={'/Radarschuessel/radarschuessel.glb'}
					position={[position[0] - 2, position[1], position[2] - 7]}
					scale={[0.7, 0.7, 0.7]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
					customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(2, 2, 2) }]}
					visible={visibiltyForFixed}
				/>
				<ObjectLoad
					path={'/Radarschuessel_kaputt_final/radarschuessel_kaputt_final.glb'}
					position={[position[0] - 2, position[1], position[2] - 7]}
					scale={[0.7, 0.7, 0.7]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
					customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(2, 2, 2) }]}
					visible={visibiltyForDamaged}
				/>
			</group>

			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] + 3.5, position[1], position[2] - 0.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/TV/tv.glb"
				position={[position[0] + 3.8, position[1] + 0.88, position[2] - 0.5]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0] + 2.5, position[1], position[2] - 4.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 7, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1, 2, 2) }]}
			/>
			<ObjectLoad
				path="/Fernglas/fernglas.glb"
				position={[position[0] + 2.5, position[1] + 0.9, position[2] - 4]}
				scale={[0.07, 0.07, 0.07]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1, 2, 2) }]}
			/>
			<ObjectLoad
				path="/Taschenlampe/taschenlampe.glb"
				position={[position[0] + 2.3, position[1] + 1, position[2] - 5.3]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
				customCollisionBoxes={[{ positionOffset: new Vector3(), size: new Vector3(1, 2, 2) }]}
			/>
			<Tube
				name="tubeToMonitoring"
				position={[0, 0, 0]}
				size={[0.5, 8, 1]}
				vectors={[
					new Vector3(2, -1, -5),
					new Vector3(3, -1, -8),
					new Vector3(15, -1, -8),
					new Vector3(15, 0, 5),
					new Vector3(20, 0, 6),
					new Vector3(20, 6, 6),
					new Vector3(25.5, 6, 6),
					new Vector3(26.5, 3, 6),
					new Vector3(33, 3, 6),
					new Vector3(33, 8, 6),
					new Vector3(33, 8, -15),
					new Vector3(33, 5, -15),
					new Vector3(19.5, 5, -15),
					new Vector3(19.5, 2, -15),
					new Vector3(19.5, 2, -11.6),
					new Vector3(19.5, 6, -10.75),
					new Vector3(19.5, 6, -8.25),
					new Vector3(19.5, 4, -7.75),
				]}
				ballAnimation={isPlatformFixed?.monitoring}
			/>
			<Cylinder
				position={[position[0] - 5.5, position[1], position[2] - 8.15]}
				color={MONITORING}
				collisionRefSetter={addCollisionBox}
			/>
			<Cylinder
				position={[position[0] - 5.5, position[1], position[2] - 4.85]}
				color={MONITORING}
				collisionRefSetter={addCollisionBox}
			/>
			<Cylinder
				position={[position[0] - 5.32, position[1], position[2] + 8.98]}
				color={MONITORING}
				collisionRefSetter={addCollisionBox}
			/>
			<Cylinder
				position={[position[0] + 0.95, position[1], position[2] + 8.98]}
				color={MONITORING}
				collisionRefSetter={addCollisionBox}
			/>

			<Button
				customName="monitoring"
				position={[position[0] + 2, position[1], position[2] + 1]}
				scale={[1, 1, 1]}
				reference={buttonReference}
			/>
		</>
	);
}
