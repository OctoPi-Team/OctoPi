import ReactThreeTestRenderer from '@react-three/test-renderer';
import SimplePlatform from '../SimplePlatform';

test('mesh to have two children', async () => {
	const simplePlatform = <SimplePlatform position={[1, 2, 3]} color={0x000000} />;
	console.log(simplePlatform);
	//const renderer = await ReactThreeTestRenderer.create()
	//console.log(renderer.scene.children);
	console.log('???');
	//console.log(renderer.getInstance());
});
