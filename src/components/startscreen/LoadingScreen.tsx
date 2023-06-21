import { useProgress } from '@react-three/drei';
import './style/loadingscreen.css';
import Video from './Video';
import { Scene } from '../../App';

type LoadingScreenProps = {
	setVisible: (visible: boolean) => void;
	setScene: (newScene: Scene) => void
};

export const LoadingScreen = ({ setVisible, setScene }: LoadingScreenProps) => {
	const { progress } = useProgress();
	const button = document.querySelector('.loadingScreen__button') as HTMLElement;
	if (button) {
		if (progress < 100) {
			button.style.backgroundColor = 'grey';
		}
		if (progress === 100) {
			button.style.backgroundColor = 'rgba(0, 149, 7, 0.729)';
		}
	}
	function showOverworld() {
		if (progress === 100) {
			setVisible(false);
			setScene(Scene.Overworld);
		}
	}
	return (
		<>
			<div onClick={showOverworld} onTouchStart={showOverworld} className="loadingScreen">
				<div className="loadingScreen__progress">
					<div
						className="loadingScreen__progress__value"
						style={{
							width: `${progress}%`,
						}}
					/>
				</div>
				<div className="loadingScreen__board">
					<h1 className="loadingScreen__title">RENOVATE TO INNOVATE</h1>
					<button
						className="loadingScreen__button"
						disabled={progress < 100}
						onClick={() => {
							setVisible(false);
							setScene(Scene.Overworld);
						}}>
						START
					</button>
				</div>
			</div>
			<Video setVisible={setVisible} />
		</>
	);
};
