import React from 'react';

export default function Video() {
	return (
		<React.Fragment>
			<video
				data-testid="start-animation-video"
				className="video"
				height={window.innerHeight}
				width={window.innerWidth}
				preload="auto"
				autoPlay
				muted
				data-setup="{}">
				<source data-testid="start-animation-source" src="Startanimation.mp4" type="video/mp4"></source>
			</video>
		</React.Fragment>
	);
}
