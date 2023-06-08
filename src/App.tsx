import './index.css';

import { useEffect, useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import { get } from 'http';

export enum Scene {
	Overworld,
	Shipment,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
};

export default function App() {
	const [scene, setScene] = useState<Scene>(Scene.Overworld);
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setVisible(true), 3000); // Adjust the delay (in milliseconds) as per your requirement
		};

		const handleActivity = () => {
			setVisible(false);
			resetTimer();
		};

		// Add event listeners to detect user activity
		window.addEventListener('touched', handleActivity);
		window.addEventListener('keydown', handleActivity);

		// Start the timer initially
		resetTimer();

		// Clean up event listeners
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('touchend', handleActivity);
			window.removeEventListener('keydown', handleActivity);
		};
	}, []);
	return (
		<>
			{visible && <LoadingScreen setVisible={setVisible} />}
			{scene === Scene.Overworld && <Overworld sceneProps={{ setSceneHook: setScene }} visible={visible} />}
			{scene === Scene.Shipment && <ShipmentGame setSceneHook={setScene} />}
		</>
	);
}
