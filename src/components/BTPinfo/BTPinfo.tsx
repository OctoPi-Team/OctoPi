import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function BTPinfo() {
	function Image() {
		const texture = useLoader(TextureLoader, '/BTPinfo/BTP Vorteile.png');
		return (
			<mesh>
				<planeBufferGeometry attach="geometry" args={[3, 3]} />
				<meshBasicMaterial attach="material" map={texture} />
			</mesh>
		);
	}

	return (
		<Canvas>
			<Image />
		</Canvas>
	);
}
