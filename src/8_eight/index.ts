type Coord = {x: number, y: number}
type Map = number[][]
type View = number[]

const getMap = (input: string) => {
  const lines = input.split('\n')

  return lines.map((line) => line.split('').map(Number))
}

const getViews = (map: Map, {x, y}: Coord) => {
  const left = map[x].slice(0, y).reverse()
  const right = map[x].slice(y + 1, map.length)

  const top = map.map((row) => row[y]).slice(0, x).reverse()
  const bottom = map.map((row) => row[y]).slice(x + 1, map[0].length)

  return [left, right, top, bottom]
}

const getDistance = (view: View, max: number) => {
  for (let i = 0; i < view.length; i++) {
    if (view[i] >= max) {
      return i + 1
    }
  }

  return view.length
}

const getScore = (views: View[], max: number) => {
  return views.reduce((acc, cur) => {
    return acc * getDistance(cur, max)
  }, 1)
}

const isEdgeTree = (map: Map, {x, y}: Coord) => {
  return [0, map.length - 1].includes(x) || [0, map[0].length - 1].includes(y)
}

const isTreeVisible = (map: Map, {x, y}: Coord) => {
  const current = map[x][y]

  if (isEdgeTree(map, {x, y})) {
    // edge trees are visible
    return true
  }

  const views = getViews(map, {x, y})

  return views.some((view) => view.every((tree) => tree < current))
}

export const one = (input: string) => {
  const map = getMap(input)

  let sum = 0

  map.forEach((row, x) => {
    row.forEach((_tree, y) => {
      const isVisible = isTreeVisible(map, {x, y})

      if (isVisible) {
        sum++
      }
    })
  })

  return sum
}

export const two = (input: string) => {
  const map = getMap(input)

  let bestView = 0

  map.forEach((row, x) => {
    row.forEach((tree, y) => {
      const isEdge = isEdgeTree(map, {x, y})

      if (isEdge) return

      const isVisible = isTreeVisible(map, {x, y})

      if (!isVisible) return

      const views = getViews(map, {x, y})

      const score = getScore(views, tree)

      bestView = Math.max(score, bestView)
    })
  })

  return bestView
}
