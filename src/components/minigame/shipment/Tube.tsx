import THREE, { Vector3, TubeGeometry, CatmullRomCurve3, DoubleSide } from 'three';

type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color?: number | string | THREE.Color;
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
	vectors?: [...Vector3[]];
};

function Tube({
	name = 'Tube',
	position = [0, 0, 0],
	color = 'white',
	vectors = [new Vector3(0, 0, 0), new Vector3(0, 7, 0), new Vector3(-10.5, 7, 5), new Vector3(-10.6, 5.5, 5)],
}: TubeProps): JSX.Element {
	const curve = new CatmullRomCurve3(vectors);

	const tubeGeometry = new TubeGeometry(curve, 100, 0.4, 100, false);

	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={tubeGeometry} />
				<meshStandardMaterial color={color} transparent opacity={0.5} side={DoubleSide} />
				{/* <meshStandardMaterial attach="material" color={'white'} transparent opacity={0.5} side={BackSide} /> */}
			</mesh>
		</>
	);
}

export default Tube;
