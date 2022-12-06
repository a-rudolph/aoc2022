export const uniq = (arr: string[]) => {
  for (let i = 0; i <= arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return false
      }
    }
  }
  return true
}

const findEndOfPacket = (input: string, packetSize: number) => {
  for (let i = 0; i < input.length - packetSize; i++) {
    const section = input.slice(i, i + packetSize)

    const isUniq = uniq(section.split(''))

    if (isUniq) {
      return i + packetSize
    }
  }

  return 'sorry'
}

export const one = (input: string) => {
  const packetSize = 4

  return findEndOfPacket(input, packetSize)
}

export const two = (input: string) => {
  const packetSize = 14

  return findEndOfPacket(input, packetSize)
}
