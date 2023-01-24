import {
  SyntheticEvent,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  FunctionComponent
} from 'react'
import { useTranslate } from 'locale'

import { vResolver, useForm, FormProvider, FieldValues } from '..'

import { useRouter } from 'next/router'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import {
  useRoutesContext,
  useNavigationConfirmationContext
} from 'components/navigation'

import InputGroupProvider from '../InputGroupProvider'

import StepperPanel from './StepperPanel'
import StepperTab from './StepperTab'
import { StyledTabs } from './styles'
import { FormStepperProps } from './types'

// TODO - use Form

const FormStepper: FunctionComponent<FormStepperProps> = ({
  steps,
  defaultValues,
  validationSchema,
  onSubmit,
  onInvalid,
  onCancel,
  onCancelYes,
  cancelTitle,
  cancelMessage,
  disabledCancelButton,
  disabledPrimaryButton,
  labelPrimaryButton,
  mode,
  secondaryActionsLeft,
  secondaryActionsRight,
  queryParamsToKeep
}) => {
  const router = useRouter()
  const routes = useRoutesContext()
  const t = useTranslate(['common', 'components'])
  const fields = useRef<Map<number, string[]>>(new Map())
  const stepToForceFocus = useRef<number>()
  const [stepsState, setStepsState] = useState<Map<number, boolean>>(
    new Map([[0, true]])
  )
  const prevActive = useRef<number>(0)
  const setActiveAsValid = useRef(true)
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (!setActiveAsValid.current) {
      setActiveAsValid.current = true
      return
    }
    setStepsState((stepsState) => {
      const newStepsState = new Map(stepsState.entries())
      newStepsState.set(active, true)
      newStepsState.set(prevActive.current, true)
      return newStepsState
    })
  }, [active, prevActive, setActiveAsValid])
  useEffect(() => {
    if (mode === 'edit') {
      setStepsState(new Map(Array.from(steps.keys()).map((k) => [k, true])))
    }
  }, [mode, steps])
  const isAllStepsVisited = useCallback(() => {
    const nonDisabledSteps = steps.filter((stp) => !stp.disabled)
    for (const index in nonDisabledSteps) {
      const i: number = +index
      if (!stepsState.has(i) && i !== active) {
        return false
      }
    }
    return true
  }, [steps, stepsState, active])
  const onChangeStep = useCallback(
    (event: SyntheticEvent, nextActive: number) => {
      setActive((active) => {
        prevActive.current = active
        return nextActive
      })
    },
    [prevActive]
  )
  const previousStep = useCallback(() => {
    setActive((active) => {
      const nextActive = active - 1
      if (nextActive >= 0) {
        prevActive.current = active
        return nextActive
      }
      return active
    })
  }, [prevActive])
  const nextStep = useCallback(() => {
    setActive((active) => {
      const nextActive = active + 1
      if (nextActive <= steps.length - 1) {
        prevActive.current = active
        return nextActive
      }
      return active
    })
  }, [steps.length, prevActive])
  const redirect = useCallback(
    (path: string, params?: Record<string, string>) => {
      if (!router) return
      const queryMap = new Map<string, string>(
        Object.keys(router.query)
          .filter((k) => queryParamsToKeep && queryParamsToKeep.includes(k))
          .map((k) => [k, router.query[k]] as [string, string])
          .filter(([, v]) => typeof v === 'string') // runtime check
      )
      if (params) {
        Object.keys(params)
          .map((k) => [k, params[k]])
          .forEach(([k, v]) => queryMap.set(k, v))
      }
      const queryStr = Array.from(queryMap.entries())
        .map(([k, v]) => `${k}=${v}`)
        .join('&')
      if (queryStr) {
        router.push(`${path}?${queryStr}`)
      } else {
        router.push(path)
      }
    },
    [router, queryParamsToKeep]
  )
  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      setStepsState((stepsState) => {
        return new Map(Array.from(stepsState.keys()).map((k) => [k, true]))
      })
      const result = onSubmit(values)
      if (result && result instanceof Promise) {
        result
          .then((params) => {
            if (routes?.stepper?.onSubmit) {
              if (params) {
                redirect(routes.stepper.onSubmit, params)
              } else {
                redirect(routes.stepper.onSubmit)
              }
            } else if (router) {
              router.back()
            }
          })
          .catch((err) => console.error('Form Error!', err))
      }
    },
    [onSubmit, router, routes, redirect]
  )
  const verifyErrors = useCallback((errors: FieldValues, names?: string[]) => {
    if (!names) {
      return true
    }
    for (const i in names) {
      if (errors[names[i]]) return false
    }
    return true
  }, [])
  const forceFocus = useCallback(() => {
    if (stepToForceFocus.current !== undefined) {
      setActiveAsValid.current = false
      setActive((active) => {
        prevActive.current = active
        return stepToForceFocus.current!
      })
      stepToForceFocus.current = undefined
    }
  }, [stepToForceFocus, prevActive, setActive])
  const handleOnInvalid = useCallback(
    (errors: FieldValues) => {
      setStepsState((stepsState) => {
        const newStepsState = new Map(
          Array.from(stepsState.keys()).map((k) => [
            k,
            verifyErrors(errors, fields.current.get(k))
          ])
        )
        for (const [k, v] of Array.from(newStepsState.entries())) {
          if (!v) {
            stepToForceFocus.current = k
            break
          }
        }
        return newStepsState
      })
      forceFocus()
      onInvalid && onInvalid(errors)
    },
    [onInvalid, fields, verifyErrors, stepToForceFocus, forceFocus]
  )
  const { handleSubmit, reset, formState, ...methods } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: vResolver(validationSchema),
    defaultValues
  })
  const { setConfirmation, confirm } = useNavigationConfirmationContext()
  const isAnyFieldDirty = useMemo(() => {
    return Object.keys(formState.dirtyFields).length > 0
  }, [formState])
  useEffect(() => {
    if (isAnyFieldDirty) {
      setConfirmation({
        title:
          cancelTitle ||
          t('stepper.cancelConfirmation.title', { ns: 'components' }),
        message:
          cancelMessage ||
          t('stepper.cancelConfirmation.message', { ns: 'components' })
      })
    }
    return () => {
      setConfirmation()
    }
  }, [cancelMessage, cancelTitle, isAnyFieldDirty, setConfirmation, t])
  const memoizedDefaultValues = useMemo(
    () => (defaultValues ? defaultValues : {}),
    [defaultValues]
  )
  useEffect(() => {
    reset(memoizedDefaultValues)
  }, [memoizedDefaultValues, reset])
  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel()
      return
    }
    confirm()
      .then(() => {
        if (onCancelYes) {
          onCancelYes()
          return
        }
        if (routes?.stepper?.onCancel) {
          redirect(routes.stepper.onCancel)
        } else if (router) {
          router.back()
        }
      })
      .catch(() => {
        //
      })
  }, [confirm, onCancel, onCancelYes, routes, redirect, router])
  return (
    <>
      <FormProvider
        handleSubmit={handleSubmit}
        reset={reset}
        formState={formState}
        {...methods}
      >
        <form
          onSubmit={handleSubmit(handleOnSubmit, handleOnInvalid)}
          style={{ height: '100%' }}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={0}
            height={1}
          >
            <StyledTabs
              value={active}
              onChange={onChangeStep}
              aria-label={t('stepper.tabs.label', { ns: 'components' })}
            >
              {steps.map((step, i) => {
                return (
                  <StepperTab
                    key={i}
                    label={step.label}
                    active={active}
                    index={i}
                    valid={stepsState.get(i)}
                    disabled={step.disabled}
                  />
                )
              })}
            </StyledTabs>
            {steps.map((step, i) => {
              return (
                <InputGroupProvider
                  key={i}
                  registerField={(field: string) => {
                    const group = fields.current.get(i)
                    if (group) {
                      !group.includes(field) && group.push(field)
                    } else {
                      fields.current.set(i, [field])
                    }
                  }}
                >
                  <StepperPanel active={active} index={i}>
                    {step.panel}
                  </StepperPanel>
                </InputGroupProvider>
              )
            })}
            <Toolbar
              sx={{
                pb: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Stack direction="row" spacing={2}>
                {!disabledCancelButton ? (
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    color="primary"
                  >
                    {t('cancel', { ns: 'common' })}
                  </Button>
                ) : (
                  <>&nbsp;</>
                )}
                {secondaryActionsLeft &&
                  secondaryActionsLeft.map((action) => action)}
              </Stack>

              {steps.length > 1 && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Button
                    onClick={previousStep}
                    variant="outlined"
                    color="secondary"
                    disabled={active === 0}
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <Button
                    onClick={nextStep}
                    variant="outlined"
                    color="secondary"
                    disabled={active === steps.length - 1}
                  >
                    <ChevronRightIcon />
                  </Button>
                </Stack>
              )}
              <Stack direction="row" spacing={2}>
                {secondaryActionsRight &&
                  secondaryActionsRight.map((action) => action)}
                {!disabledPrimaryButton ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!isAllStepsVisited() || !isAnyFieldDirty}
                  >
                    {labelPrimaryButton || t('confirm', { ns: 'common' })}
                  </Button>
                ) : (
                  <>&nbsp;</>
                )}
              </Stack>
            </Toolbar>
          </Stack>
        </form>
      </FormProvider>
    </>
  )
}

FormStepper.defaultProps = {
  mode: 'new',
  disabledCancelButton: false,
  disabledPrimaryButton: false
}

export default FormStepper
