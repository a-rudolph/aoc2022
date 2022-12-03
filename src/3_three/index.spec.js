const { one, two } = require("./index.ts");

const testInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe("day 3", () => {
  test("part 1", () => {
    expect(one(testInput)).toBe(157);
  });

  test("part 2", () => {
    expect(two(testInput)).toBe(70);
  });
});
