const getLines = (input: string) => {
  const lines = input.split('\n')

  return lines
}

const getCrateMap = (input: string) => {
  const [map] = input.split('\n\n')

  const lines = getLines(map)
  lines.pop()
  lines.shift()

  const crates = lines.map(getCrates)

  const cols: string[][] = []

  crates.forEach((crateLine) => addCratesToColumns(crateLine, cols))

  return cols
}

const addCratesToColumns = (crates: string[], columns: string[][] = []) => {
  crates.forEach((crate, col) => {
    if (crate !== ' ') {
      columns[col] = columns?.[col]?.concat(crate) || [crate]
    }
  })
}

const getCrates = (line: string) => {
  const crates = []
  for (let i = 1; i < line.length; i += 4) {
    crates.push(line[i])
  }

  return crates
}

const getCommands = (input: string) => {
  const [, commands] = input.split('\n\n')

  const lines = getLines(commands)

  return lines.map(parseCommand)
}

const parseCommand = (line: string) => {
  const [_move, amount, _from, start, _to, end] = line.split(' ')

  return [amount, start, end].map(Number) as [number, number, number]
}

const moveCrates = (model: string, columns: string[][], amount: number, start: number, end: number) => {
  const from = columns[start - 1]
  const to = columns[end - 1]

  const moving = from.splice(0, amount)

  if (model === '9000') {
    moving.reverse()
  }

  to.unshift(...moving)
}

const one = (input: string) => {
  const crates = getCrateMap(input) 
  const commands = getCommands(input)

  commands.forEach((command) => {
    moveCrates('9000', crates, ...command)
  })

  return crates.map((crate) => crate[0]).filter(Boolean).join('')
}

const two = (input: string) => {
  const crates = getCrateMap(input) 
  const commands = getCommands(input)

  commands.forEach((command) => {
    moveCrates('9001', crates, ...command)
  })

  return crates.map((crate) => crate[0]).filter(Boolean).join('')
}

export {
  one, two, getCrateMap,
}
