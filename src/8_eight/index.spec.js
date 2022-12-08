const { one, two } = require("./index.ts");

const input = `
30373
25512
65332
33549
35390
`.slice(1, -1);

describe("day 8", () => {
  test("part 1", () => {
    expect(one(input)).toBe(21);
  });

  test("part 2", () => {
    expect(two(input)).toBe(8);
  });
});
