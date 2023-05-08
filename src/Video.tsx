/* eslint-disable react/no-unknown-property */
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAspect, useVideoTexture, useTexture } from '@react-three/drei';

export default function Video() {
	return (
		<Canvas orthographic>
			<Scene />
		</Canvas>
	);
}

function Scene() {
	const size = useAspect(1800, 1000);
	return (
		<mesh scale={size}>
			<planeGeometry />
			<Suspense fallback={<FallbackMaterial url="10.jpg" />}>
				<VideoMaterial url="10.mp4" />
			</Suspense>
		</mesh>
	);
}

type VideoMaterialType = {
	url: string;
};

function VideoMaterial({ url }: VideoMaterialType) {
	const texture = useVideoTexture(url);
	return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function FallbackMaterial({ url }: VideoMaterialType) {
	const texture = useTexture(url);
	return <meshBasicMaterial map={texture} toneMapped={false} />;
}
