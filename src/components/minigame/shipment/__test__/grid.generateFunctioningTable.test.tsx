import { ExportedForTestingOnly } from "../Grid";


it('generateFunctioningTableSizeIsZeroTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([0, 0])).toBe([]);
});
it('generateFunctioningTableSizeIsOneTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([1, 1])).toBe([]);
});
it('generateFunctioningTableSizeIsBiggerOneWithValidationTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([3, 3])).toBe([]);
});
it('generateFunctioningTableNegativeXTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([-1, 0])).toBe([]);
});
it('generateFunctioningTableNegativeYTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([0, -1])).toBe([]);
});
it('generateFunctioningTableNegativeSizeTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([-1, -1])).toBe([]);
});
it('generateFunctioningTableIsTenBigTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([10, 10])).toBe([]);
});
it('generateFunctioningTableIsVeryLargeTest', async function () {
    expect(ExportedForTestingOnly.generateFunctioningTable([100, 100])).toBe([]);
});