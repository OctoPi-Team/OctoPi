import ReactThreeTestRenderer from '@react-three/test-renderer';
import Stair from '../Stair';
import { Vector3 } from 'three';

test('RenderStairTest', async () => {
	const renderer = await ReactThreeTestRenderer.create(
		<Stair startPosition={new Vector3(0, 0, 0)} endPosition={new Vector3(1, 2, 3)} />
	);
	expect(renderer.scene.children).toHaveLength(1);
});
