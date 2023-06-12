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
	setplayerpos?: (setplayerpos: Vector3) => void;
	playerpos?: Vector3;
};

export default function App() {
	const [playerstartingPos, setPlayerstartingPos] = useState<Vector3>(new Vector3(0, -0.3, 0));
	const [scene, setScene] = useState<Scene>(Scene.Overworld);
	const [visible, setVisible] = useState(true);
	const delay = 10000;
	let timeoutId: NodeJS.Timeout;
	let hadMoved = false;

	useEffect(() => {
		if (!visible && !hadMoved) {
			timeoutId = setTimeout(() => setVisible(true), delay);
		}
		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setVisible(true), delay); // Adjust the delay (in milliseconds) as per your requirement
			hadMoved = false;
		};

		const handleActivity = () => {
			hadMoved = true;
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
				<Overworld sceneProps={{ setSceneHook: setScene }} visible={visible} startingpos={playerstartingPos} />
			)}
			{scene === Scene.Shipment && (
				<ShipmentGame setSceneHook={setScene} visible={visible} setplayerpos={setPlayerstartingPos} />
			)}
		</>
	);
}
