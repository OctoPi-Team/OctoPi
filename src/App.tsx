import './index.css';

import { useEffect, useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';

export enum Scene {
	Overworld,
	Shipment,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
	visible?: boolean;
};

export default function App() {
	const [scene, setScene] = useState<Scene>(Scene.Overworld);
	const [visible, setVisible] = useState(true);
	const delay = 60000;
	let timeoutId: NodeJS.Timeout;

	useEffect(() => {
		if (!visible) {
			timeoutId = setTimeout(() => setVisible(true), delay);
		}
		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setVisible(true), delay); // Adjust the delay (in milliseconds) as per your requirement
		};

		const handleActivity = () => {
			resetTimer();
		};
		// Add event listeners to detect user activity
		window.addEventListener('touchmove', handleActivity);
		window.addEventListener('keydown', handleActivity);

		// Start the timer initially
		resetTimer();

		// Clean up event listeners
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('touchmove', handleActivity);
			window.removeEventListener('keydown', handleActivity);
		};
	}, [visible]);

	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			{scene === Scene.Overworld && <Overworld sceneProps={{ setSceneHook: setScene }} visible={visible} />}
			{scene === Scene.Shipment && <ShipmentGame setSceneHook={setScene} visible={visible} />}
		</>
	);
}
