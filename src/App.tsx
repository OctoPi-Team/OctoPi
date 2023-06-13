import './index.css';

import { useEffect, useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import { Vector3 } from 'three';

export enum Scene {
	Overworld,
	Shipment,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
	visible?: boolean;
	setPlayerPos?: (setplayerpos: Vector3) => void;
	playerPos?: Vector3;
};

export default function App() {
	const [playerstartingPos, setPlayerstartingPos] = useState<Vector3>(new Vector3(0, 0, 0));
	const [scene, setScene] = useState<Scene>(Scene.Overworld);
	const [visible, setVisible] = useState(true);

	const delay = 60000;
	let timeoutId: NodeJS.Timeout;
	let hasMoved = false;

	useEffect(() => {
		if (!visible && !hasMoved) {
			timeoutId = setTimeout(() => setVisible(true), delay);
		}
		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setVisible(true), delay); // Adjust the delay (in milliseconds) as per your requirement
			hasMoved = false;
		};

		const handleActivity = () => {
			hasMoved = true;
			resetTimer();
		};
		// Add event listeners to detect user activity
		window.addEventListener('touchmove', handleActivity);
		window.addEventListener('keydown', handleActivity);
		window.addEventListener('click', handleActivity);
		// Start the timer initially
		resetTimer();

		// Clean up event listeners
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('touchmove', handleActivity);
			window.removeEventListener('keydown', handleActivity);
			window.removeEventListener('click', handleActivity);
		};
	}, [visible]);

	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			{scene === Scene.Overworld && (
				<Overworld setSceneHook={setScene} visible={visible} playerPos={playerstartingPos} />
			)}
			{scene === Scene.Shipment && (
				<ShipmentGame setSceneHook={setScene} visible={visible} setPlayerPos={setPlayerstartingPos} />
			)}
		</>
	);
}
