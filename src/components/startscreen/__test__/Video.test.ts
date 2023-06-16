import React from 'react';
import { render, screen } from '@testing-library/react';
import Video from '../Video';

describe('VideoTest', function () {
	it('VideoContainer', async function () {
		render(React.createElement(Video));

		const videoElement = screen.getByTestId('start-animation-video');
		expect(videoElement.childNodes).toHaveLength(1);
	});

	it('VideoSource', async function () {
		render(React.createElement(Video));

		const sourceElement = screen.getByTestId('start-animation-source');
		expect(sourceElement.getAttribute('src')).toBe('Startanimation.mov');
	});
});
