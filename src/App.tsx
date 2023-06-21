import './index.css';
import { useEffect, useState } from 'react';
import Overworld from './components/overworld/Overworld';
import ShipmentGame from './components/minigame/shipment/ShipmentGame';
import { LoadingScreen } from './components/startscreen/LoadingScreen';
import { Vector3 } from 'three';
import ImageScreen from './components/ui/ImageScreen';

export enum Scene {
	Overworld,
	Shipment,
	EndScreen,
	IdleScreen,
	BTPinfo,
	StartScreen,
}

export type SceneProps = {
	setSceneHook: (newActiveScene: Scene) => void;
	visible?: boolean;
	setPlayerPos?: (setplayerpos: Vector3) => void;
	playerPos?: Vector3;
	isPlatformFixed?: PlatformFixProps;
	setIsPlatformFixed?: (newProps: Partial<PlatformFixProps>) => void;
};

export type PlatformFixProps = {
	shipment: boolean;
	design: boolean;
	parts: boolean;
	engineering: boolean;
	monitoring: boolean;
	production: boolean;
};

export default function App() {
	const DEFAULT_SCENE = Scene.IdleScreen;
	const delay = 2 * 60 * 1000;
	let timeoutId: NodeJS.Timeout;

	const [playerstartingPos, setPlayerstartingPos] = useState<Vector3>(new Vector3(0, 0, 0));
	const [scene, setScene] = useState<Scene>(DEFAULT_SCENE);
	const [isPlatformFixed, setIsPlatformFixed] = useState<PlatformFixProps>({
		shipment: false,
		design: false,
		parts: false,
		engineering: false,
		monitoring: false,
		production: false,
	});

	function setPlatformFixed(newProps: Partial<PlatformFixProps>) {
		setIsPlatformFixed(prevProps => ({ ...prevProps, ...newProps }));
	}

	useEffect(() => {
		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setScene(Scene.IdleScreen), delay);
		};
		if (!timeoutId) {
			// Add event listeners to detect user activity
			document.addEventListener('touchmove', resetTimer);
			document.addEventListener('keydown', resetTimer);
			document.addEventListener('click', resetTimer);
			document.addEventListener('mousemove', resetTimer);
		}
		// re-start the timer
		resetTimer();
	}, []);

	useEffect(() => {
		if (
			isPlatformFixed.design &&
			isPlatformFixed.parts &&
			isPlatformFixed.monitoring &&
			isPlatformFixed.production &&
			isPlatformFixed.engineering &&
			isPlatformFixed.shipment
		)
			setScene(Scene.EndScreen);
	}, [isPlatformFixed]);

	function showStartScreen() {
		// reset fixed state
		setIsPlatformFixed({
			shipment: false,
			design: false,
			parts: false,
			engineering: false,
			monitoring: false,
			production: false,
		});
		// move player to main platform
		setPlayerstartingPos(new Vector3(0, 0, 0));
		// change scene to startscreen
		setScene(Scene.StartScreen);
	}
	return (
		<>
			{scene === Scene.IdleScreen && <ImageScreen imageSource={'/Innovation-Factory.jpg'} onclick={showStartScreen} />}
			{scene === Scene.StartScreen && <LoadingScreen setScene={setScene} />}
			{scene === Scene.EndScreen && <ImageScreen imageSource={'/EndScreen.png'} onclick={showStartScreen} />}
			{scene === Scene.BTPinfo && (
				<ImageScreen
					imageSource="/BTPinfo/BTP_Vorteile.png"
					backButton={true}
					onclick={() => setScene(Scene.Overworld)}
					init={() => setPlayerstartingPos(new Vector3(0, 0, 0))}
				/>
			)}
			{scene === Scene.Shipment && (
				<ShipmentGame
					setSceneHook={setScene}
					setPlayerPos={setPlayerstartingPos}
					setIsPlatformFixed={setPlatformFixed}
				/>
			)}
			{/*Overworld needs to placed beneith the minigames because it is always loaded*/}
			<Overworld
				setSceneHook={setScene}
				visible={scene === Scene.Overworld}
				playerPos={playerstartingPos}
				setIsPlatformFixed={setPlatformFixed}
				isPlatformFixed={isPlatformFixed}
			/>
		</>
	);
}
