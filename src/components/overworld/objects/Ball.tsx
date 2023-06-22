import THREE, { CatmullRomCurve3, Mesh, MeshPhysicalMaterial, SphereGeometry } from 'three';
import { GREEN, RED, BLUE, PINK } from '../../../AllColorVariables';
const COLORS = [GREEN, RED, BLUE, PINK];

type BallProps = {
	ballAnimation?: boolean;
	ballColor?: number | string | THREE.Color;
	curve: CatmullRomCurve3;
};
function Ball({
	curve,
	ballAnimation = false,
	ballColor = COLORS[Math.floor(Math.random() * COLORS.length)],
}: BallProps): JSX.Element {
	const ballRadius = 0.3;
	const ballGeometry = new SphereGeometry(ballRadius, 32, 32);
	const ballMaterial = new MeshPhysicalMaterial({ color: ballColor });
	const ballMesh = new Mesh(ballGeometry, ballMaterial);
	ballMesh.castShadow = true;
	ballMesh.receiveShadow = true;

	const ballSpeed = 1;

	function getRandomPosition(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}
	// random ball position
	let ballPosition = getRandomPosition(1000, 10000);

	const animateBall = () => {
		requestAnimationFrame(animateBall);
		const tubePosition = curve.getPointAt(ballPosition % 1);
		ballMesh.position.copy(tubePosition);
		ballPosition += ballSpeed * 0.001;
	};
	if (ballAnimation) {
		animateBall();
	}
	return <primitive object={ballMesh} />;
}

export default Ball;
