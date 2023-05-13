import '../styles.css';
import { useRef } from 'react';
import { Mesh, BufferGeometry, Material, Vector3 } from 'three';

type CoordProps = {
	position?: Vector3;
}

function CoordOrigin({ position = new Vector3(0, 0, 0) }: CoordProps) {
	const originHelper = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	return (
		<mesh ref={originHelper} position={position}>
			<sphereGeometry args={[0.1, 8, 8]} />
			<meshBasicMaterial color="red" />
		</mesh>
	);
}

export default CoordOrigin;
