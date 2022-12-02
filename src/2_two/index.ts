const test = `
A Y
B X
C Z`;

const map = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "loss",
  Y: "draw",
  Z: "win",
} as const;

type Inputs = keyof typeof map;

const scores: { [key: string]: number } = {
  win: 6,
  draw: 3,
  loss: 0,
  rock: 1,
  paper: 2,
  scissors: 3,
};

const getMineByResult = (you: Inputs, result: string) => {
  if (result === "draw") {
    return map[you];
  }

  const found = wins.find(([win, loss]) => {
    if (result === "loss") {
      return loss === map[you];
    }

    return win === map[you];
  })!;

  const [loss, win] = found;

  if (result === "loss") {
    return loss;
  }

  return win;
};

const expected = 15;

const wins = [
  ["paper", "scissors"],
  ["scissors", "rock"],
  ["rock", "paper"],
];

const getResult = (you: Inputs, me: Inputs) => {
  const yours = map[you];
  const mine = map[me];

  if (yours === mine) {
    return "draw";
  }

  console.log({ you, me });
  console.log({ yours, mine });

  const isWin = wins.some((picks) => {
    return picks[0] === yours && picks[1] === mine;
  });

  if (isWin) {
    return "win";
  }

  return "loss";
};

export const theThing = (value: string) => {
  const lines = value.split("\n").filter(Boolean);

  const picks = lines.map((line) => line.split(" "));

  let score = 0;

  picks.forEach((pick: [Inputs, Inputs]) => {
    const result = map[pick[1]];

    const mine = getMineByResult(pick[0], result);

    console.log(result);

    score += scores[result] + scores[mine];

    console.log(score);
  });

  console.log("expected", expected);
  console.log("given", score);
};

theThing(test);
