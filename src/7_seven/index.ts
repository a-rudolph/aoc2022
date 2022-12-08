const TAB = "  ";

class File {
  public name: string;
  public path: string;
  public size: number;
  public parent: Dir;

  constructor(name: string, size: number, path?: string) {
    this.name = name;
    this.size = size;
    this.path = path;
  }

  getSize() {
    return this.size;
  }

  setParent(parent: Dir) {
    this.parent = parent;
  }

  print(depth: number = 0) {
    console.log(
      TAB.repeat(depth).concat("- ", this.name, " ", String(this.size))
    );
  }
}

class Dir {
  public name: string;
  public path: string;
  public children: Record<string, Dir | File> = {};
  public parent: Dir;

  constructor(name: string, path?: string) {
    this.name = name;
    this.path = path;
  }

  getSize(): number {
    return this.getChildren().reduce((acc, cur) => acc + cur.getSize(), 0);
  }

  getChildren() {
    return Object.values(this.children);
  }

  print(depth: number = 0) {
    const indents = TAB.repeat(depth);
    console.log(indents.concat("- ", this.name));

    this.getChildren().forEach((item) => {
      item.print(depth + 1);
    });
  }

  setParent(parent: Dir) {
    this.parent = parent;
  }

  appendItem(item: Dir | File) {
    item.setParent(this);

    this.children[item.name] = item;
  }
}

const cd = (arg: string) => {
  if (arg === "..") {
    dir.current = dir.current.parent;
    return;
  }

  if (arg === "/") {
    dir.current = Home;
    return;
  }

  const next = dir.current.children[arg];

  if (next instanceof File) return;

  dir.current = next;
};

const ls = () => {
  // noop
};

const createItem = (type: string, name: string) => {
  if (type === "dir") {
    createDir(name);
    return;
  }

  const size = Number(type);

  createFile(name, size);
};

const createDir = (name: string) => {
  const NewDir = new Dir(name);

  dir.current.appendItem(NewDir);
};

const createFile = (name: string, size: number) => {
  const NewFile = new File(name, size);

  dir.current.appendItem(NewFile);
};

const runCommand = (cmd: string, arg?: string) => {
  if (cmd === "ls") {
    ls();
    return;
  }

  if (cmd === "cd") {
    cd(arg);
    return;
  }

  console.log(`command ${cmd} not found`);
};

const getLines = (input: string) => {
  return input.split("\n");
};

const parseLine = (line: string) => {
  const args = line.split(" ");

  if (args[0] === "$") {
    const [_$, cmd, arg] = args;

    runCommand(cmd, arg);
    return;
  }

  const [type, name] = args;

  createItem(type, name);
};

const runScript = (input: string) => {
  const lines = getLines(input);

  lines.forEach(parseLine);

  console.log("script complete");
  Home.print();
};

const Home = new Dir("/", "/");

const dir: { current: Dir } = { current: Home };

export const one = (input: string) => {
  runScript(input);

  console.log(dir.current.getSize());
};

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

one(input);

export const two = () => {};
