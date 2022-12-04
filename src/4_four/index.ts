const splitLines = (input: string) => {
  return input.split("\n");
};

const getPairs = (lines: string[]) => {
  return lines.map((pair) => pair.split(",") as Pair);
};

type Pair = [string, string];

const fullOverlap = (pair: Pair) => {
  const first = pair[0].split("-").map(Number);
  const second = pair[1].split("-").map(Number);

  return first[0] <= second[0] && first[1] >= second[1];
};

const partialOverlap = (pair: Pair) => {
  const [aa, ab] = pair[0].split("-").map(Number);
  const [ba, bb] = pair[1].split("-").map(Number);

  if (aa <= ba && ba <= ab) {
    return true;
  }

  if (ba <= aa && aa <= bb) {
    return true;
  }

  return false;
};

const solve1 = (input: string) => {
  const lines = splitLines(input);
  const pairs = getPairs(lines);

  let sum = 0;

  pairs.forEach((pair) => {
    const reverse = [...pair].reverse() as Pair;
    if (fullOverlap(pair) || fullOverlap(reverse)) {
      sum++;
    }
  });

  return sum;
};

const solve2 = (input: string) => {
  const lines = splitLines(input);
  const pairs = getPairs(lines);

  let sum = 0;

  pairs.forEach((pair) => {
    if (partialOverlap(pair)) {
      sum++;
    }
  });

  return sum;
};

module.exports = {
  one: solve1,
  two: solve2,
};
