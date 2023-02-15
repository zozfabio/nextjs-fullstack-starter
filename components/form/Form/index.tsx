import {
  useCallback,
  useEffect,
  useMemo,
  PropsWithChildren,
  forwardRef,
  Ref,
  useImperativeHandle
} from 'react'

import Grid from '@mui/material/Grid'

import { vResolver, useForm, FormProvider, FieldValues } from 'components/form'

import { FormProps } from './types'

const Form = (
  {
    defaultValues,
    validationSchema,
    onSubmit,
    onInvalid,
    container = true,
    spacing = 2,
    fullHeight = true,
    children
  }: PropsWithChildren<FormProps>,
  ref: Ref<Pick<HTMLFormElement, 'submit'>>
) => {
  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      onSubmit(values)
    },
    [onSubmit]
  )
  const handleOnInvalid = useCallback(
    (errors: FieldValues) => {
      onInvalid && onInvalid(errors)
    },
    [onInvalid]
  )
  const { handleSubmit, reset, ...methods } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: vResolver(validationSchema),
    defaultValues
  })
  const memoizedDefaultValues = useMemo(
    () => (defaultValues ? defaultValues : {}),
    [defaultValues]
  )
  useEffect(() => {
    reset(memoizedDefaultValues)
  }, [memoizedDefaultValues, reset])
  const submitHandler = handleSubmit(handleOnSubmit, handleOnInvalid)
  useImperativeHandle(
    ref,
    () => ({
      submit() {
        submitHandler()
      }
    }),
    [submitHandler]
  )
  return (
    <FormProvider handleSubmit={handleSubmit} reset={reset} {...methods}>
      <form
        onSubmit={submitHandler}
        style={fullHeight ? { height: '100%' } : {}}
      >
        {container ? (
          <Grid container spacing={spacing}>
            {children}
          </Grid>
        ) : (
          children
        )}
      </form>
    </FormProvider>
  )
}

export default forwardRef<
  Pick<HTMLFormElement, 'submit'>,
  PropsWithChildren<FormProps>
>(Form)
