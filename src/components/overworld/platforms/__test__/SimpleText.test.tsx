import ReactThreeTestRenderer from '@react-three/test-renderer';
import { SimpleText } from '../SimpleText';
/*
test("mesh to have two children", async () => {
    const renderer = await ReactThreeTestRenderer.create(<SimpleText position={[1, 2, 3]} textValue={"testText"} />)
    console.log(renderer.scene);
    expect(renderer.scene.children).toHaveLength(1);
    console.log(renderer.scene.children[0]);
})
*/
test('aa', async () => {
	const Mesh = () => {
		return (
			<mesh>
				<boxGeometry args={[2, 2]} />
				<meshBasicMaterial />
			</mesh>
		);
	};

	const renderer = await ReactThreeTestRenderer.create(<Mesh />);
	expect(renderer.scene.children[0].type).toEqual('Mesh');
	await renderer.update(<Mesh />);
	expect(renderer.scene.children[0].type).toEqual('Mesh');
});
