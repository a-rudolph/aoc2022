const { one, two, testInput } = require("./index.ts");

const input = testInput;

describe("day 7", () => {
  test("part 1", () => {
    expect(one(input)).toBe(95437);
  });

  test("part 2", () => {
    expect(two(input)).toBe(24933642);
  });
});
