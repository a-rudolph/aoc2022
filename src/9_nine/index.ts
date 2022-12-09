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

class Grid {
  private head: Coord = '0|0'
  private visited: Coord[] = ['0|0']
  
  private verbose = false
  private logEveryMove = true

  private log(...args: Parameters<typeof console.log>) {
    if (!this.verbose) return

    console.log(...args)
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
    const prevHead = this.head

    this.head = getNext(prevHead, dir)

    if (this.isAdjacent()) return

    this.moveTail(prevHead)
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
    const [hx, hy] = parse(this.head)
    const [tx, ty] = parse(this.tail)

    const rows: string[] = []

    for (let y = 0; y <= Math.max(hy, ty, 5); y++) {
      for (let x = 0; x <= Math.max(hx, tx, 5); x++) {
        let char = '.'

        switch (true) {
          case x === hx && y === hy:
            char = 'H'
            break
          case x === tx && y === ty:
            char = 'T'
            break
        }

        rows[y] = (rows[y] || '').concat(char)
      }
    }

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
