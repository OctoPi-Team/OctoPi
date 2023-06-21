import React from 'react';

export default function Video() {
	return (
		<React.Fragment>
			<video
				data-testid="start-animation-video"
				loop
				className="video"
				height={window.innerHeight}
				width={window.innerWidth}
				preload="auto"
				autoPlay
				muted
				data-setup="{}">
				<source data-testid="start-animation-source" src="Startanimation.mov" type="video/mp4"></source>
			</video>
		</React.Fragment>
	);
}
