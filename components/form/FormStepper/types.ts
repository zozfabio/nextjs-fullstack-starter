import { ReactNode } from 'react'

import { FieldValues } from '..'

import { TabsProps, TabProps } from '@mui/material'

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
  validationSchema: any // TODO: tipar o atributo vSchema do form
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
