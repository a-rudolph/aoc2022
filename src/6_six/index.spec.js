const { one, two, uniq } = require("./index.ts");

const tests = [
  "5 bvwbjplbgvbhsrlpgdmjqwftvncz 23",
  "6 nppdvjthqldpwncqszvftbrmjlhg 23",
  "10 nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg 29",
  "11 zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw 26",
];

describe("day 6", () => {
  test("uniq", () => {
    const trues = ["abcd", "bcda", "phjedbtg"];

    const falses = ["abcda", "abcdd", "aacd", "cacd"];

    trues.forEach((input) => {
      expect(uniq(input.split(""))).toBe(true);
    });

    falses.forEach((input) => {
      expect(uniq(input.split(""))).toBe(false);
    });
  });

  test("part 1", () => {
    tests.forEach((string) => {
      const [answer, input] = string.split(" ");

      expect(String(one(input))).toBe(answer);
    });
  });

  test("part 2", () => {
    tests.forEach((string) => {
      const [, input, answer] = string.split(" ");

      expect(String(two(input))).toBe(answer);
    });
  });
});
