import { useProgress } from '@react-three/drei';
import './loadingscreen.css';
import Video from './Video';

type LoadingScreenProps = {
	setVisible: (visible: boolean) => void;
};

export const LoadingScreen = ({ setVisible }: LoadingScreenProps) => {
	const { progress } = useProgress();
	const button = document.querySelector('.loadingScreen__button') as HTMLElement;
	if (button) {
		if (progress < 100) {
			button.style.backgroundColor = 'grey';
		}
		if (progress === 100) {
			button.style.backgroundColor = 'rgba(0, 149, 7, 0.729)';
			window.addEventListener('touchstart', () => {
				setVisible(false);
			});
		}
	}
	return (
		<>
			<div className="loadingScreen">
				<div className="loadingScreen__progress">
					<div
						className="loadingScreen__progress__value"
						style={{
							width: `${progress}%`,
						}}
					/>
				</div>
				<div className="loadingScreen__board">
					<h1 className="loadingScreen__title">Renovate to Innovate</h1>
					<button
						className="loadingScreen__button"
						disabled={progress < 100}
						onClick={() => {
							setVisible(false);
						}}>
						Start
					</button>
				</div>
			</div>
			<Video setVisible={setVisible} />
		</>
	);
};
