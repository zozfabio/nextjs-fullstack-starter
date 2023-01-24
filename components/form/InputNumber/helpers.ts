const zeroDigitsMemo = new Map<number, string>()
const getZeroDigits = (size: number) => {
  if (zeroDigitsMemo.has(size)) {
    return zeroDigitsMemo.get(size)
  }
  const zeroDigits = Array(size).fill('0').join('')
  zeroDigitsMemo.set(size, zeroDigits)
  return zeroDigits
}

export const getDigits = (
  value: string,
  decimalSize: number,
  allowNegative: boolean
) => {
  const size = decimalSize + 1
  const zero = getZeroDigits(size)
  const negative = allowNegative && value.startsWith('-')
  let digits = value.replace(/\D+/g, '')
  if (digits.length < size) {
    digits = `${zero}${digits}`.slice(-size)
  }
  if (negative && digits !== zero) {
    digits = `-${digits}`
  }
  return digits
}

export const getUserDigits = (
  value: string,
  decimalSize: number,
  allowNegative: boolean
) => {
  const size = decimalSize + 1
  const zero = getZeroDigits(size)
  const [negativeStart, negativeEnd] = [
    value.startsWith('-'),
    value.endsWith('-')
  ]
  let negative = allowNegative && (negativeStart || negativeEnd)
  if (negativeStart && negativeEnd) {
    negative = false
  }
  let digits = value.replace(/\D+/g, '')
  if (digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  if (digits.length < size) {
    digits = `${zero}${digits}`.slice(-size)
  }
  if (negative && digits !== zero) {
    digits = `-${digits}`
  }
  return digits
}

export const formatDigits = (
  digits: string,
  decimalSize: number,
  decimalSeparator: string,
  thousandSeparator: string,
  allowNegative: boolean
) => {
  let formatted = ''
  const zero = getZeroDigits(decimalSize + 1)
  const negative = allowNegative && digits.startsWith('-')
  if (negative) {
    digits = digits.slice(1)
  }
  while (digits.length > 0) {
    if (decimalSize > 0 && !formatted) {
      formatted = `${decimalSeparator}${digits.slice(-decimalSize)}`
      digits = digits.slice(0, digits.length - decimalSize)
    } else if (thousandSeparator && digits.length > 3) {
      formatted = `${thousandSeparator}${digits.slice(-3)}${formatted}`
      digits = digits.slice(0, digits.length - 3)
    } else {
      formatted = `${digits}${formatted}`
      digits = ''
    }
  }
  if (negative && digits !== zero) {
    formatted = `-${formatted}`
  }
  return formatted
}

export const parseDigits = (
  digits: string,
  decimalSize: number,
  allowNegative: boolean
) => {
  const negative = allowNegative && digits.startsWith('-')
  if (negative) {
    digits = digits.slice(1)
  }
  let parsed =
    decimalSize > 0
      ? +`${digits.slice(0, digits.length - decimalSize)}.${digits.slice(
          -decimalSize
        )}`
      : +digits

  if (negative && parsed > 0) {
    parsed = -parsed
  }
  return parsed
}

export const moveCursorEnd = (input: HTMLInputElement) => {
  const cursorPos = input.value.length
  input.setSelectionRange(cursorPos, cursorPos)
}
