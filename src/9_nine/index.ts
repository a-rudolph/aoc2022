type Coord = `${number}|${number}`;
type Dir = "R" | "L" | "U" | "D";

const parse = (coord: Coord) => {
  return coord.split("|").map(Number) as [number, number];
};

const join = (x: number, y: number) => {
  return `${x}|${y}` as Coord;
};

const getNext = (current: Coord, dir: Dir) => {
  const [x, y] = parse(current);

  switch (dir) {
    case "D":
      return join(x, y - 1);
    case "U":
      return join(x, y + 1);
    case "L":
      return join(x - 1, y);
    case "R":
      return join(x + 1, y);
  }
};

const getFollowup = (h: Coord, t: Coord) => {
  const [hx, hy] = parse(h);
  const [tx, ty] = parse(t);

  const avgx = (hx + tx) / 2;
  const avgy = (hy + ty) / 2;

  const x = hx <= tx ? Math.floor(avgx) : Math.ceil(avgx);
  const y = hy <= ty ? Math.floor(avgy) : Math.ceil(avgy);

  return join(x, y);
};

class Grid {
  private visited: Coord[] = ["0|0"];
  private rope: Coord[] = [];

  private verbose = false;
  private logEveryMove = true;

  constructor({
    length = 2,
    verbose = false,
    start = "0|0",
  }: { length?: number; verbose?: boolean; start?: Coord } = {}) {
    this.verbose = verbose;
    this.rope = Array(length).fill(start);
    this.visited = [start];

    this.log("init grid");
    this.print();
  }

  private log(...args: Parameters<typeof console.log>) {
    if (!this.verbose) return;

    console.log(...args);
  }

  private get head(): Coord {
    return this.rope[0];
  }
  private get tail(): Coord {
    return this.rope[this.rope.length - 1];
  }

  private isAdjacent(a: Coord = this.head, b: Coord = this.tail) {
    const [hx, hy] = parse(a);
    const [tx, ty] = parse(b);

    const diffX = Math.abs(hx - tx) <= 1;
    const diffY = Math.abs(hy - ty) <= 1;

    return diffX && diffY;
  }

  private moveHead(dir: Dir) {
    const prevHead = this.head;

    const next = getNext(prevHead, dir);

    this.moveRope(0, next);
  }

  private moveRope(knot: number, destination: Coord) {
    const h = this.rope[knot];
    const t = this.rope[knot + 1];

    if (!h) return;

    this.rope[knot] = destination;

    if (!t) {
      this.moveTail();
      return;
    }

    if (this.isAdjacent(destination, t)) return;

    this.moveRope(knot + 1, getFollowup(destination, t));
  }

  private moveTail() {
    if (this.tail === this.visited[this.visited.length - 1]) return;

    this.visited.push(this.tail);
  }

  public move(dir: Dir, count: number) {
    this.log(dir, count);

    for (let i = 0; i < count; i++) {
      this.moveHead(dir);

      if (this.logEveryMove) {
        this.print();
      }
    }
    this.print();
  }

  public getVisitedCount() {
    const found: { [key: string]: boolean } = {};

    this.visited.forEach((coord) => {
      if (found[coord]) return false;

      found[coord] = true;

      return true;
    });

    return Object.keys(found).length;
  }

  public print() {
    if (!this.verbose) return;

    const x = 20;
    const y = 20;

    const row = ".".repeat(x);

    const map = Array(y)
      .fill(".")
      .map(() => {
        return [...row];
      });

    this.rope.forEach((knot, i) => {
      const [x, y] = parse(knot);

      if (map[y][x] !== ".") return;

      if (i === 0) {
        map[y][x] = "H";

        return;
      }

      map[y][x] = `${i}`;
    });

    const rows = map.map((row) => row.join("")).reverse();

    const output = rows.join("\n").concat("\n");

    this.log(output);
  }
}

export const one = (input: string) => {
  const grid = new Grid({ verbose: false });

  const commands = input.split("\n");

  commands.forEach((command) => {
    const [dir, count] = command.split(" ");

    grid.move(dir as Dir, Number(count));
  });

  return grid.getVisitedCount();
};

export const two = (input: string) => {
  const grid = new Grid({ length: 10 });

  const commands = input.split("\n");

  commands.forEach((command) => {
    const [dir, count] = command.split(" ");

    grid.move(dir as Dir, Number(count));
  });

  return grid.getVisitedCount();
};
