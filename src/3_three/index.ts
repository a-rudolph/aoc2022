type Sack = [string, string];

const abcs = "abcdefghijklmnopqrstuvwxyz";
const abcABC = abcs.concat(abcs.toUpperCase());

const getLines = (input: string) => {
  return input.split("\n").filter(Boolean);
};

const getGroups = (lines: string[]) => {
  const groups: string[][] = [];

  lines.forEach((line, i) => {
    const group = Math.floor(i / 3);
    groups[group] = (groups?.[group] || []).concat(line);
  });

  return groups;
};

const getSacks = (line: string): Sack => {
  const half = line.length / 2;

  return [line.slice(0, half), line.slice(half, half * 2)];
};

const findCommon = ([left, right]: Sack) => {
  // const left: {[key: string]: boolean} = {}
  // const right: {[key: string]: boolean} = {}

  // for (let content of sack[0]) {

  // }

  return left.split("").find((content) => right.includes(content));
};

const getScore = (letter: string) => {
  return abcABC.indexOf(letter) + 1;
};

const one = (input: string) => {
  const lines = getLines(input);
  const sacks = lines.map(getSacks);

  const common = sacks.map(findCommon);
  const score = common.map(getScore);

  return score.reduce((acc, cur) => acc + cur, 0);
};

const two = (input: string) => {
  const lines = getLines(input);
  const groups = getGroups(lines);

  const common = groups.map(([first, second, third]) => {
    return first.split("").find((char) => {
      return second.includes(char) && third.includes(char);
    });
  });

  const score = common.map(getScore);

  return score.reduce((acc, cur) => acc + cur, 0);
};

module.exports = {
  one,
  two,
};
