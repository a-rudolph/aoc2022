const testInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

const expected = 45000;

export const theThing = (value: string) => {
  const lines = value.split("\n");

  const numbers = lines.map((line) => Number(line || "0"));

  let highest = new Array(3).fill(0);

  let sum = 0;

  const replaceHighest = (value: number) => {
    highest.sort((a, b) => a - b);

    for (let i = 0; i < highest.length; i++) {
      if (value > highest[i]) {
        highest[i] = value;
        return;
      }
    }
  };

  numbers.forEach((number) => {
    if (!number) {
      replaceHighest(sum);

      sum = 0;
      return;
    }

    sum += number;
  });

  console.log("expected", expected);
  console.log("given", highest[0] + highest[1] + highest[2]);
};

theThing(testInput);
