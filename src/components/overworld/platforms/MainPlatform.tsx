import SimplePlatform from './SimplePlatform';
import { PINK } from '../../../AllColorVariables';
import { Box3 } from 'three';
import ObjectLoad from '../../ObjectLoad';

type MainPlatformOptions = {
	position?: [number, number, number];
	reference?: (meshRef: Box3) => void;
	addCollisionBox?: (newCollisionBox: Box3) => void;
};

export default function MainPlatform({
	position = [0, 0, 0],
	reference,
	addCollisionBox,
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
			<gridHelper position={[position[0], position[1], position[2] + 4]} args={[2, 2, 'black', 'black']} />

			<ObjectLoad
				path="/kleinerTisch/kleinerTisch.glb"
				position={[position[0], position[1], position[2] - 5.5]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Infotafel/infotafel.glb"
				position={[position[0] + 5.5, position[1], position[2] + 6]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Infotafel/infotafel.glb"
				position={[position[0] + 9.5, position[1], position[2] + 2]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 90, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Infotafel/infotafel.glb"
				position={[position[0] - 9.3, position[1], position[2] + 6]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 0, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Infotafel/infotafel.glb"
				position={[position[0] - 9.5, position[1], position[2] - 2.2]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 270, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Infotafel/infotafel.glb"
				position={[position[0] - 4.7, position[1], position[2] - 6]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<ObjectLoad
				path="/Infotafel/infotafel.glb"
				position={[position[0] + 3.8, position[1], position[2] - 6]}
				scale={[0.45, 0.45, 0.45]}
				rotation={[0, 180, 0]}
				collisionRefSetter={addCollisionBox}
			/>
			<gridHelper position={[position[0], position[1], position[2] - 4]} args={[2, 2, 'black', 'black']} />
		</>
	);
}
