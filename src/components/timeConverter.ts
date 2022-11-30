import dayjs from "dayjs";

export const timeConverter = (time: string): number => {
  const splitTimeToNumber = time.split(":").map(val => parseInt(val))
  return splitTimeToNumber[0] * 60 + splitTimeToNumber[1]
}

export const timeConverterNumberForTime = (time: number): string => {
  return dayjs.duration(time, 'm').format("HH:mm")
}