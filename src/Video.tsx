import './styles.css';

import React from 'react';

type VideoArgs = {
	setVisible: (visibility: boolean) => void;
};

export default function Video({ setVisible }: VideoArgs) {
	return (
		<React.Fragment>
			<video
				data-testid="start-animation-video"
				loop
				className="video"
				onEnded={() => {
					setVisible(false);
				}}
				onClick={() => {
					setVisible(false);
				}}
				height={window.innerHeight}
				width={window.innerWidth}
				preload="auto"
				autoPlay
				muted
				data-setup="{}">
				<source data-testid="start-animation-source" src="start_animation.mp4" type="video/mp4"></source>
			</video>
		</React.Fragment>
	);
}
