import THREE, {
	CatmullRomCurve3,
	DoubleSide,
	Mesh,
	MeshBasicMaterial,
	SphereGeometry,
	TubeGeometry,
	Vector3,
} from 'three';
import { GREEN, RED, BLUE, PINK } from '../../../AllColorVariables';
const COLORS = [GREEN, RED, BLUE, PINK];
type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color?: number | string | THREE.Color;
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	vectors?: [...Vector3[]];
	detailed?: boolean;
	ballAnimation?: boolean;
	ballColor?: number | string | THREE.Color;
};
function Tube({
	name = 'Tube',
	position = [0, 0, 0],
	vectors = [new Vector3(0, 0, 0), new Vector3(0, 6, 0), new Vector3(-10.5, 6, 5), new Vector3(-10.6, 4.5, 5)],
	detailed = false,
	ballAnimation = false,
	ballColor = COLORS[Math.floor(Math.random() * COLORS.length)],
}: TubeProps): JSX.Element {
	const curve = new CatmullRomCurve3(vectors);
	const tubeGeometry = new TubeGeometry(curve, 1000, 0.4, detailed ? 50 : 15, false);
	//const material = new MeshPhysicalMaterial({roughness: 0.01, transmission: 1, thickness: 1, side: DoubleSide });

	const ballRadius = 0.3;
	const ballGeometry = new SphereGeometry(ballRadius, 32, 32);
	const ballMaterial = new MeshBasicMaterial({ color: ballColor });
	const ballMesh = new Mesh(ballGeometry, ballMaterial);

	const ballSpeed = 1;

	let ballPosition = 0;

	const animateBall = () => {
		requestAnimationFrame(animateBall);
		const tubePosition = curve.getPointAt(ballPosition % 1);
		ballMesh.position.copy(tubePosition);
		ballPosition += ballSpeed * 0.001;
	};
	if (ballAnimation) {
		animateBall();
	}
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
			{ballAnimation && <primitive object={ballMesh} />}
		</>
	);
}

export default Tube;
