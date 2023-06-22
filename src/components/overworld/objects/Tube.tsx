import THREE, {
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	Material,
	Mesh,
	MeshBasicMaterial,
	SphereGeometry,
	TubeGeometry,
	Vector3,
} from 'three';
import { GREEN, RED, BLUE, PINK } from '../../../AllColorVariables';
import Ball from './Ball';
const COLORS = [GREEN, RED, BLUE, PINK];

type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color?: number | string | Color;
	reference?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
	vectors?: [...Vector3[]];
	detailed?: boolean;
	ballAnimation?: boolean;
	ballColor?: number | string | Color;
};
function Tube({
	name = 'Tube',
	position = [0, 0, 0],
	vectors = [new Vector3(0, 0, 0), new Vector3(0, 6, 0), new Vector3(-10.5, 6, 5), new Vector3(-10.6, 4.5, 5)],
	detailed = false,
	ballAnimation = false,
}: TubeProps): JSX.Element {
	const curve = new CatmullRomCurve3(vectors);
	const tubeGeometry = new TubeGeometry(curve, 1000, 0.4, detailed ? 50 : 15, false);

	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={tubeGeometry} />
				<meshPhysicalMaterial
					color={'0x00ff00'}
					roughness={0.1}
					transmission={0.9}
					metalness={0.1}
					transparent={true}
					opacity={0.4}
				/>
			</mesh>
			{ballAnimation && (
				<>
					<Ball curve={curve} ballAnimation={ballAnimation} />
					<Ball curve={curve} ballAnimation={ballAnimation} />
					<Ball curve={curve} ballAnimation={ballAnimation} />
					<Ball curve={curve} ballAnimation={ballAnimation} />
				</>
			)}
		</>
	);
}

export default Tube;
