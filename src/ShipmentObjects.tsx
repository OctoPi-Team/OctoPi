import ObjectLoad from './ObjectLoad';

export default function ShipmentObjects(): JSX.Element {
	return (
		<>
			<ObjectLoad
				pathObj="/Laufband/laufband.obj"
				pathMtl="/Laufband/laufband.mtl"
				position={[0, 0, 0]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Packet/packet.obj"
				pathMtl="/Packet/packet.mtl"
				position={[1, 0, 0]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Trichter/trichter.obj"
				pathMtl="/Trichter/trichter.mtl"
				position={[2, 0, 0]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
			<ObjectLoad
				pathObj="/Huetchen/huetchen.obj"
				pathMtl="/Huetchen/huetchen.mtl"
				position={[3, 0, 0]}
				scale={[0.1, 0.1, 0.1]}
				rotation={[0, 0, 0]}
			/>
		</>
	);
}
