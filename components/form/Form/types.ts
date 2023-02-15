import { z } from 'zod'
import { GridProps } from '@mui/material'

import { FieldValues } from 'components/form'

export interface FormProps extends Pick<GridProps, 'container' | 'spacing'> {
  defaultValues?: FieldValues
  validationSchema: z.ZodSchema
  onInvalid?: (errors: FieldValues) => void
  onSubmit: (values: FieldValues) => void
  fullHeight?: boolean
}
