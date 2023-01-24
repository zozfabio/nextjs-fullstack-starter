import { GridProps } from '@mui/material'

import { FieldValues } from '..'

export interface FormProps extends Pick<GridProps, 'container' | 'spacing'> {
  defaultValues?: FieldValues
  validationSchema: any // TODO: tipar o atributo vSchema do form
  onInvalid?: (errors: FieldValues) => void
  onSubmit: (values: FieldValues) => void
  fullHeight?: boolean
}
