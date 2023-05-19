import THREE, { Vector3, TubeGeometry, CatmullRomCurve3 } from 'three';

type TubeProps = {
	name?: string;
	position: [number, number, number];
	size?: [number, number, number];
	color?: number | string | THREE.Color;
	rotation: [number, number, number];
	reference?: (meshRef: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>) => void;
};
function Tube({ name = 'Tube', position = [0, 0, 0], color = 'white' }: TubeProps): JSX.Element {
	const curve = new CatmullRomCurve3([
		new Vector3(0, 0, 0),
		new Vector3(0, 7, 0),
		new Vector3(-10.5, 7, 5),
		new Vector3(-10.6, 5.5, 5),
	]);

	const tubeGeometry = new TubeGeometry(curve, 100, 0.4, 100, false);

	return (
		<>
			<mesh name={name} position={position}>
				<primitive object={tubeGeometry} />
				<meshStandardMaterial color={color} transparent opacity={0.5} />
			</mesh>
		</>
	);
}

export default Tube;
