const { one, two } = require("./index.ts");

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

describe("day 9", () => {
  test.only("part 1", () => {
    expect(one(input)).toBe(13);
  });

  test("part 2", () => {
    expect(two(input)).toBe(8);
  });
});
