import './styles.css';
import { useRef } from 'react';
import { Mesh, BufferGeometry, Material } from 'three';

function CoordOrigin() {
	const originHelper = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	return (
		<mesh ref={originHelper}>
			<sphereGeometry args={[0.1, 8, 8]} />
			<meshBasicMaterial color="red" />
		</mesh>
	);
}

export default CoordOrigin;
