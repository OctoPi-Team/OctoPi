import { useProgress } from '@react-three/drei';

type LoadingScreenProps = {
	setVisible: (visible: boolean) => void;
};

export const LoadingScreen = ({ setVisible }: LoadingScreenProps) => {
	const { progress } = useProgress();
	return (
		<div className={'loadingScreen'}>
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
	);
};
