import { ExportedForTestingOnly } from '../Grid';

it('isNeighbourOfEmptyTileWithGridPositionOnZeroZeroCornerTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 0], [1, 1]);
});
it('isNeighbourOfEmptyTileWithGridPositionHasNegativeXTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([-1, 0], [1, 1]);
});
it('isNeighbourOfEmptyTileWithGridPositionHasNegativeYTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([0, -1], [1, 1]);
});
it('isNeighbourOfEmptyTileWithGridPositionIsNegativeTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([-1, -1], [1, 1]);
});
it('isNeighbourOfEmptyTileWithGridPositionXIsPositiveTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 0], [1, 1]);
});
it('isNeighbourOfEmptyTileWithGridPositionYIsPositiveTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 1], [1, 1]);
});
it('isNeighbourOfEmptyTileWithGridPositionIsPositiveTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [0, 1]);
});
it('isNeighbourOfEmptyTileWithEmptyTileOnZeroZeroCornerTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [0, 0]);
});
it('isNeighbourOfEmptyTileWithEmptyTileHasNegativeXTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [-1, 0]);
});
it('isNeighbourOfEmptyTileWithEmptyTileHasNegativeYTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [0, -1]);
});
it('isNeighbourOfEmptyTileWithEmptyTileIsNegativeTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [-1, -1]);
});
it('isNeighbourOfEmptyTileWithEmptyTileXIsPositiveTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [1, 0]);
});
it('isNeighbourOfEmptyTileWithEmptyTileYIsPositiveTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 1], [0, 1]);
});
it('isNeighbourOfEmptyTileWithEmptyTileIsPositiveTest', async function () {
	ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 1], [1, 1]);
});
it('isNeighbourOfEmptyTileBothTilesAreTheSameTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 0], [0, 0])).toBeFalsy();
});
it('isNeighbourOfEmptyTileGridPositionIsLeftOfEmptyTileTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 0], [1, 0])).toBeTruthy();
});
it('isNeighbourOfEmptyTileGridPositionIsRightOfEmptyTileTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([1, 0], [0, 0])).toBeTruthy();
});
it('isNeighbourOfEmptyTileGridPositionIsOnTopOfEmptyTileTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 0], [0, 1])).toBeTruthy();
});
it('isNeighbourOfEmptyTileGridPositionIsOnTheBottomOfEmptyTileTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 1], [0, 0])).toBeTruthy();
});
it('isNeighbourOfEmptyTileGridPositionIsDiagonalToEmptyTileTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 0], [1, 1])).toBeFalsy();
});
it('isNeighbourOfEmptyTileGridPositionIsMoreThanOneAwayOfEmptyTileTest', async function () {
	expect(ExportedForTestingOnly.isNeighbourOfEmptyTile([0, 0], [2, 2])).toBeFalsy();
});
