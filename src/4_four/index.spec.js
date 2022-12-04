const { one, two } = require("./index.ts");

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe("day 4", () => {
  test("part 1", () => {
    expect(one(testInput)).toBe(2);
  });

  test("part 2", () => {
    expect(two(testInput)).toBe(4);
  });
});
