const { one, two } = require("./index.ts");

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const test2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

describe("day 9", () => {
  test("part 1", () => {
    expect(one(input)).toBe(13);
  });

  test("part 2.1", () => {
    expect(two(input)).toBe(1);
  });

  test("part 2.2", () => {
    expect(two(test2)).toBe(36);
  });
});
