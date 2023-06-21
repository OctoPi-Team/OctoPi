import { useProgress } from '@react-three/drei';
import './style/loadingscreen.css';
import Video from './Video';
import { Scene } from '../../App';

type LoadingScreenProps = {
	setScene: (newScene: Scene) => void;
};

export const LoadingScreen = ({ setScene }: LoadingScreenProps) => {

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
							setScene(Scene.Overworld);
						}}>
						START
					</button>
				</div>
			</div>
			<Video />
		</>
	);
};
