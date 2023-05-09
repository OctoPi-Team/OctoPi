import './styles.css';

import React from 'react';

export default function Video({ setVisible }: any) {
	return (
		<React.Fragment>
			<video
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
				<source src="start_animation.mp4" type="video/mp4"></source>
			</video>
		</React.Fragment>
	);
}
