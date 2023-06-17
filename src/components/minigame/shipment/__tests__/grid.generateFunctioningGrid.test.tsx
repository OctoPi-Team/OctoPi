import { ExportedForTestingOnly } from '../Grid';

function testForValidGrid(grid: any) {
	expect('board' in grid).toBeTruthy();
	expect('emptyTile' in grid).toBeTruthy();
	expect(grid.emptyTile.length == 2).toBeTruthy();
	expect(typeof grid.emptyTile[0] === 'number').toBeTruthy();
	expect(typeof grid.emptyTile[1] === 'number').toBeTruthy();
	expect(grid.board.length === 3).toBeTruthy();
	expect(grid.board[0].length === 3).toBeTruthy();
	expect(grid.board[1].length === 3).toBeTruthy();
	expect(grid.board[2].length === 3).toBeTruthy();
}

it('generateFunctioningGridWithNegativeVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(-1);
	testForValidGrid(result);
});
it('generateFunctioningGridWithZeroAsVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(0);
	testForValidGrid(result);
});
it('generateFunctioningGridWithPositiveVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(1);
	testForValidGrid(result);
});
it('generateFunctioningGridWithLargeVariantsTest', async function () {
	const result = ExportedForTestingOnly.generateFunctioningGrid(100);
	testForValidGrid(result);
});
it('generateFunctioningGridAndCompareVariantsTest', async function () {
	let lastVariant = null;
	let equalAfter = false;
	for (let i = 0; i < 50; i++) {
		const result = ExportedForTestingOnly.generateFunctioningGrid(i);
		if (lastVariant) {
			if (result == lastVariant) {
				equalAfter = true;
			}
			if (equalAfter) expect(result).toEqual(lastVariant);
			else expect(result == lastVariant).toBeFalsy();
		}
		lastVariant = result;
	}
});
