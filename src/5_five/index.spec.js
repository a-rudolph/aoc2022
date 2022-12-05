const { one, two, getCrateMap } = require("./index.ts");

const testInput = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe("day 5", () => {
  test("getCrateMap", () => {
    expect(getCrateMap(testInput)).toStrictEqual([
      ["N", "Z"],
      ["D", "C", "M"],
      ["P"],
    ]);
  });

  test("part 1", () => {
    expect(one(testInput)).toBe("CMZ");
  });

  test("part 2", () => {
    expect(two(testInput)).toBe("MCD");
  });
});
