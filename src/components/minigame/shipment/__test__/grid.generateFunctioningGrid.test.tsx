import { ExportedForTestingOnly } from '../Grid';

it('generateFunctioningGridWithNegativeVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(-1);
	const grid = result;
	expect('board' in grid).toBeTruthy();
	expect('emptyTile' in grid).toBeTruthy();
	expect(grid.emptyTile.length == 2).toBeTruthy();
	expect(typeof grid.emptyTile[0] === 'number').toBeTruthy();
	expect(typeof grid.emptyTile[1] === 'number').toBeTruthy();
	expect(grid.board.length === 3).toBeTruthy();
	expect(grid.board[0].length === 3).toBeTruthy();
	expect(grid.board[1].length === 3).toBeTruthy();
	expect(grid.board[2].length === 3).toBeTruthy();
});
it('generateFunctioningGridWithZeroAsVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(0);
});
it('generateFunctioningGridWithPositiveVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(1);
});
it('generateFunctioningGridWithLargeVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(100);
});
it('generateFunctioningGridAndCompareVariantsTest', async function () {
	let lastVariant = null;
	for (let i = 0; i < 50; i++) {
		const result = ExportedForTestingOnly.generateFunctioningGrid(i);
		if (lastVariant) expect(result).toEqual(lastVariant);
		lastVariant = result;
	}
});
