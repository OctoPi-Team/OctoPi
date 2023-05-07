/* eslint-disable react/no-unknown-property */
import './styles.css';
import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { MTLLoader, OBJLoader } from 'three-stdlib';

//Load .obj file
function Model(props: object) {
	const materials = useLoader(MTLLoader, '/Ebene.mtl');
	const obj = useLoader(OBJLoader, '/Ebene.obj', loader => {
		materials.preload();
		loader.setMaterials(materials);
	});
	return <primitive object={obj} {...props} />;
}

export default function App() {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas>
				<Suspense fallback={null}>
					<Stage>
						<Model />
					</Stage>
				</Suspense>
				<OrbitControls />
			</Canvas>
		</div>
	);
}
