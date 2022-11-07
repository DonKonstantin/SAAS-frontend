export const timeConverter = (time: string): number => {
  const splitTimeToNumber = time.split(":").map(val => parseInt(val))
  return splitTimeToNumber[0] * 60 + splitTimeToNumber[1]
}