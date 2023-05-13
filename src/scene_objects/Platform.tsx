import { Mesh, BufferGeometry, Material } from 'three';
import ObjectLoad from '../ObjectLoad';

type PlatformProps = {
	position?: [number, number, number];
	addPlatformRef?: (meshRef: Mesh<BufferGeometry, Material | Material[]>) => void;
};

function Platform({ position = [0, 0, 0], addPlatformRef }: PlatformProps) {
	return <ObjectLoad pathObj="/Ebene.obj" pathMtl="/Ebene.mtl" position={position} reference={addPlatformRef} />;
}

export default Platform;
