import THREE, { Vector3, TubeGeometry, DoubleSide, CubicBezierCurve3 } from 'three';
import { WHITE } from '../../../AllColorVariables';

const standardVectors = [
	new Vector3(0, 0, 0),
	new Vector3(0, 7, 0),
	new Vector3(-10.5, 7, 5),
	new Vector3(-10.6, 5.5, 5),
];

type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color?: number | string | THREE.Color;
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	vectors?: [...Vector3[]];
	render?: boolean;
};

function Tube({
	name = 'Tube',
	position = [0, 0, 0],
	color = WHITE,
	vectors = standardVectors,
	render = true,
}: TubeProps): JSX.Element {
	const curve = new CubicBezierCurve3(vectors[0], vectors[1], vectors[2], vectors[3]);
	const opacity = render ? 0.5 : 0;
	const tubeGeometry = new TubeGeometry(curve, 100, 0.4, 100, false);

	return (
		<>
			{render && (
				<mesh castShadow name={name} position={position}>
					<primitive object={tubeGeometry} />
					<meshPhysicalMaterial
						color={color}
						transparent={true}
						depthWrite={false}
						opacity={opacity}
						roughness={0.75}
						thickness={0.5}
						side={DoubleSide}
					/>
				</mesh>
			)}
		</>
	);
}

export default Tube;
