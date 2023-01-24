import { PrimaryActionProps, SecondaryActionProps } from './types'

export function shouldMountPrimaryAction({
  primaryActionOnClick
}: PrimaryActionProps): boolean {
  return !!primaryActionOnClick
}

export function shouldMountSecondaryAction({
  disableSecondaryAction
}: SecondaryActionProps): boolean {
  return !disableSecondaryAction
}
