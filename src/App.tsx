import React, { useRef, useState, useEffect } from 'react';
import { Mesh, BufferGeometry, Material } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const SIZE = 10; // must be less than 10 for now (for the database to work properly)

function saveState(id: number, state: boolean) {
	localStorage.setItem(id.toString(), state.toString());
}

// the object that creates the 3D Box
function Box(props: any) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	// hooks that are used to make changes when the user hovers/clicks the boxes
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(props.block.state);

	const boxSize = 0.5;
	// useFrame((state, delta) => (ref.current.rotation.x += delta))
	return (
		<mesh
			position={props.position}
			ref={ref}
			scale={clicked ? 2 : 1}
			onClick={() => {
				// toogle clicked state
				click(!clicked);
				saveState(props.block.id, !clicked);
			}}
			onPointerOver={() => hover(true)}
			onPointerOut={() => hover(false)}>
			<boxGeometry args={[boxSize, boxSize, boxSize]} />
			<meshStandardMaterial color={clicked ? 'hotpink' : hovered ? 'green' : 'orange'} />
		</mesh>
	);
}

function Group(props: any) {
	const offset = SIZE / 2;
	const boxes = [];
	for (let x = 0; x < SIZE; x++) {
		for (let y = 0; y < SIZE; y++) {
			boxes.push(<Box position={[x - offset, y - offset, 0]} block={props.blocks[x * 10 + y]} />);
		}
	}
	return <>{boxes}</>;
}

export default function App() {
	// set Hooks for the data and the fetchstate
	// when the fetch of the blocks is ready the data is stored in blocksData
	// after that the fetchStatus is changed and the 3d Blocks are loaded
	const [blocksData, setBlocksData] = useState<{ id: number; state: boolean }[]>([]);
	const [fetchStatus, setFetchStatus] = useState('pending');
	useEffect(updateStates, []);

	function updateStates() {
		const blocks = [];
		for (let id = 0; id < SIZE * SIZE; id++) {
			blocks.push({
				id: id,
				state: localStorage.getItem(id.toString()) === 'true' || false,
			});
		}
		setBlocksData(blocks);
		setFetchStatus('done');
	}

	return (
		<>
			{fetchStatus === 'pending' && <p>Loading...</p>}
			{fetchStatus === 'error' && <p>Error fetching data.</p>}
			{fetchStatus === 'done' && (
				<Canvas>
					<ambientLight intensity={0.5} />
					<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
					<pointLight position={[-10, -10, -10]} />
					<Group blocks={blocksData} />
					<OrbitControls />
				</Canvas>
			)}
		</>
	);
}
