import { PARTS } from '../../../AllColorVariables';
import ObjectLoad from '../../ObjectLoad';
import SimplePlatform from './SimplePlatform';
import Text from '../../Text';
import { Box3, Vector3 } from 'three';
import Tube from '../objects/Tube';
import { PlatformFixProps } from '../../../App';
import Button from '../objects/Button';

type PartsPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	buttonReference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
	isPlatformFixed: PlatformFixProps | undefined;
};

export default function PartsPlatform({
	position = [0, 0, 0],
	reference,
	buttonReference,
	addCollisionBox,
	isPlatformFixed,
}: PartsPlatformOptions): JSX.Element {
	return (
		<>
			<SimplePlatform position={position} size={[24, 0.5, 18]} reference={reference} color={PARTS} />
			<Tube
				name="tubeToParts"
				position={[0, 0, 0]}
				size={[0.5, 8, 1]}
				vectors={[
					new Vector3(1, -1, -5),
					new Vector3(1, -1, -12),
					new Vector3(12, -1, -12),
					new Vector3(12, 4, -12),
					new Vector3(12, 4, -18),
					new Vector3(12, -1, -18),
					new Vector3(12, -1, -35),
					new Vector3(12, 1, -35),
					new Vector3(2, 1, -35),
					new Vector3(2, 1, -30),
					new Vector3(2, 0, -30),
					new Vector3(21, 0, -30),
					new Vector3(21, 0, -32),
					new Vector3(21, 3, -32),
					new Vector3(26, 3, -32),
					new Vector3(26, 0, -32),
				]}
			/>
			<Text
				text={'PARTS'}
				color={PARTS}
				position={[position[0] + 13.5, position[1] + 1, position[2] - 9]}
				rotation={[0, -90, 0]}
			/>
			<ObjectLoad
				path="/Metallregal/metallregal.glb"
				position={[position[0] - 1, position[1], position[2] - 2.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Metallregal/metallregal.glb"
				position={[position[0] - 1, position[1], position[2] - 6.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] - 6, position[1], position[2] - 2.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] - 6, position[1], position[2] - 6.5]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] + 10, position[1], position[2] + 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] + 10, position[1], position[2]]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] + 10, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] + 6, position[1], position[2] + 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] + 6, position[1], position[2]]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path={isPlatformFixed?.parts ? '/Metallregal/metallregal.glb' : '/kaputtesMetallregal/kaputtesMetallregal.glb'}
				position={[position[0] + 6, position[1], position[2] - 4]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Palette/palette.glb"
				position={[position[0] + 10, position[1], position[2] + -7]}
				scale={[0.15, 0.15, 0.15]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<group>
				<ObjectLoad
					path="/Palette/palette.glb"
					position={[position[0] + 10, position[1], position[2] + 7]}
					scale={[0.15, 0.15, 0.15]}
					rotation={[0, 90, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Packet/packet.glb"
					position={[position[0] + 8, position[1] + 2, position[2] + 5]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/Paket_2/paket_2.glb"
					position={[position[0] + 8, position[1] + 2, position[2] + 6]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 0, 0]}
					collisionRefSetter={addCollisionBox}
				/>
				<ObjectLoad
					path="/UmgeknicktesPaket/umgeknicktesPaket.glb"
					position={[position[0] + 9, position[1] + 2, position[2] + 5.5]}
					scale={[0.1, 0.1, 0.1]}
					rotation={[0, 8, 0]}
					collisionRefSetter={addCollisionBox}
				/>
			</group>
			<ObjectLoad
				path="/SchreibtischMitStuhl/schreibtischMitStuhl.glb"
				position={[position[0] - 10, position[1], position[2] - 8]}
				scale={[0.3, 0.3, 0.3]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<Button
				customName="parts"
				position={[position[0] - 9, position[1] + 6, position[2] - 6]}
				reference={buttonReference}
			/>
		</>
	);
}
