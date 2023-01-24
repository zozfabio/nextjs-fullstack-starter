export const moneyFormat = (value: number) => {
  const options = { style: 'currency', currency: 'BRL' }
  return new Intl.NumberFormat('pt-br', options).format(value)
}

export enum RoundingMode {
  NONE,
  CEILING,
  FLOOR
}

export function round(num: number, scale = 0, mode = RoundingMode.NONE) {
  const mult = parseInt('1' + '0'.repeat(scale))
  num = num * mult
  if (mode === RoundingMode.CEILING) {
    num = Math.ceil(num)
  } else if (mode === RoundingMode.FLOOR) {
    num = Math.floor(num)
  } else {
    num = Math.round(num)
  }
  return num / mult
}
