import React from 'react';
import './style/loadingscreen.css';

type VideoProps = {
	onClick: () => void;
};
export default function Video({ onClick }: VideoProps) {
	return (
		<React.Fragment>
			<video
				onClick={onClick}
				data-testid="start-animation-video"
				className="video"
				height={window.innerHeight}
				width={window.innerWidth}
				preload="auto"
				autoPlay
				muted
				data-setup="{}">
				<source data-testid="start-animation-source" src="Start_Animation.mp4" type="video/mp4"></source>
			</video>
		</React.Fragment>
	);
}
