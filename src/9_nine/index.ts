import { input } from "./input"

type Coord = `${number}|${number}`
type Dir = 'R' | 'L' | 'U' | 'D'

const parse = (coord: Coord) => {
  return coord.split('|').map(Number) as [number, number]
}

const join = (x: number, y: number) => {
  return `${x}|${y}` as Coord
}

const getNext = (current: Coord, dir: Dir) => {
  const [x, y] = parse(current)

  switch (dir) {
    case 'D':
      return join(x, y - 1)
    case 'U':
      return join(x, y + 1)
    case 'L':
      return join(x - 1, y)
    case 'R':
      return join(x + 1, y)
  }
}

const getNextCoord = (a: Coord, b: Coord) => {
  const [ax, ay] = parse(a)
  const [bx, by] = parse(b)

  let x = bx
  let y = by

  if (ax > bx) {
    x++
  }

  if (ax < bx) {
    x--
  }

  if (ay > by) {
    y++
  }

  if (ay < by) {
    y--
  }

  const result = join(x, y)

  console.log(a, b, result)

  return result
}

const start = '0|0'

class Grid {
  private rope: Coord[] = []

  private visited: Coord[] = [start]

  private verbose = true
  private logEveryMove = false

  constructor(length: number = 2) {
    this.rope = Array(length).fill(start)
  }

  private log(...args: Parameters<typeof console.log>) {
    if (!this.verbose) return

    console.log(...args)
  }

  private get head(): Coord {
    return this.rope[0]
  }

  private get tail(): Coord {
    return this.visited[this.visited.length - 1]
  }

  private isAdjacent(a: Coord = this.head, b: Coord = this.tail) {
    const [hx, hy] = parse(a)
    const [tx, ty] = parse(b)

    const diffX = Math.abs(hx - tx) <= 1
    const diffY = Math.abs(hy - ty) <= 1

    return diffX && diffY
  }

  private moveHead(dir: Dir) {
    let next = getNext(this.head, dir)

    this.moveKnot(0, next)
  }

  private moveKnot(index: number, coord: Coord) {
    const next = getNextCoord(coord, this.rope[index])
    this.rope[index] = coord

    if (!this.rope[index + 1]) {
      // we're the tail
      this.moveTail(coord)
      return
    }

    if (this.isAdjacent(this.rope[index], this.rope[index + 1])) {
      this.log('\n')
      return
    }

    this.moveKnot(index + 1, next)
  }

  private moveTail(coord: Coord) {
    this.visited.push(coord)
  }

  public move(dir: Dir, count: number) {
    this.log(dir, count)

    for (let i = 0; i < count; i++) {
      this.moveHead(dir)

      if (this.logEveryMove) {
        this.print()
      }
    }
    this.print()

  }

  public getVisitedCount() {
    const found: {[key: string]: boolean} = {}

    this.visited.forEach((coord) => {
      if (found[coord]) return false

      found[coord] = true

      return true
    })

    return Object.keys(found).length
  }

  public print() {
    if (!this.verbose) return

    const row: string[] = Array(6).fill('.')

    const map = Array(6).fill(null).map((_) => {
      return row.slice()
    })

    this.rope.forEach((coord, i, all) => {
      const [x, y] = parse(coord)
      
      const prev = map[y][x]
      
      if (prev !== '.') return
      
      let char = '.'
      
      switch (true) {
        case i === 0:
          char = 'H'
          break
        case i === all.length - 1:
          char = 'T'
          break
        default:
          char = String(i)
      }

      map[y][x] = char
    })


    const rows = map.map((row) => row.join(''))

    const output = [...rows].reverse().join('\n').concat('\n')

    this.log(output)
  }
}

export const one = (input: string) => {
  const grid = new Grid()

  const commands = input.split('\n')

  commands.forEach((command) => {
    const [dir, count] = command.split(' ')

    grid.move(dir as Dir, Number(count))
  })

  return grid.getVisitedCount()
}

export const two = (input: string) => {
  const grid = new Grid(10)

  const commands = input.split('\n').slice(0, 1)

  commands.forEach((command) => {
    const [dir, count] = command.split(' ')

    grid.move(dir as Dir, Number(count))
  })

  return grid.getVisitedCount()
}

const input1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

console.log(two(input1))