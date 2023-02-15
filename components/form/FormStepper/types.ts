import { z } from 'zod'
import { ReactNode } from 'react'
import { TabsProps, TabProps } from '@mui/material'

import { FieldValues } from 'components/form'

export interface StepperTabProps extends Omit<TabProps, 'label'> {
  index: number
  active: number
  label: string
  valid?: boolean
}

export interface StepperPanelProps {
  index: number
  active: number
}

export interface FormStepperStep extends Omit<TabProps, 'label'> {
  label: string
  panel: ReactNode
}

export interface FormStepperProps
  extends Pick<TabsProps, 'ref' | 'disabled' | 'sx'> {
  steps: FormStepperStep[]
  defaultValues?: FieldValues
  validationSchema: z.ZodSchema
  onInvalid?: (errors: FieldValues) => void
  onSubmit: (
    values: FieldValues
  ) => Promise<Record<string, string> | void> | void
  onCancel?: () => void
  onCancelYes?: () => void
  cancelTitle?: string
  cancelMessage?: string
  disabledCancelButton?: boolean
  disabledPrimaryButton?: boolean
  labelPrimaryButton?: string
  mode?: 'new' | 'edit'
  secondaryActionsLeft?: ReactNode[]
  secondaryActionsRight?: ReactNode[]
  queryParamsToKeep?: string[]
}
