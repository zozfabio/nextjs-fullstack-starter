import { z } from 'zod'
import {
  useCallback,
  useEffect,
  PropsWithChildren,
  forwardRef,
  useRef,
  createContext,
  useContext,
  useState,
  ForwardedRef,
  ReactNode
} from 'react'

// eslint-disable-next-line no-restricted-imports
import { useForm as useRHFForm, FieldValues } from 'react-hook-form'
// eslint-disable-next-line no-restricted-imports
import { zodResolver } from '@hookform/resolvers/zod'

export interface FormProps {
  schema: z.ZodSchema
  onSubmit: (values: FieldValues) => void
  onInvalid?: (errors: FieldValues) => void
  defaultValues?: FieldValues
  fullHeight?: boolean
}

type FormContext = ReturnType<typeof useRHFForm>

export function createRefContext() {
  function useFormContext(state: FormContext) {
    const store = useRef(state)

    const get = useCallback(() => store.current, [])

    const subscribers = useRef(new Set<() => void>())

    const set = useCallback((value: Partial<FormContext>) => {
      store.current = { ...store.current, ...value }
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => {
        subscribers.current.delete(callback)
      }
    }, [])

    return {
      get,
      set,
      subscribe
    }
  }

  type UseFormContextReturnType = ReturnType<typeof useFormContext>

  const StoreContext = createContext<UseFormContextReturnType | null>(null)

  function FormContextProvider({
    children,
    state
  }: {
    children: ReactNode
    state: FormContext
  }) {
    return (
      <StoreContext.Provider value={useFormContext(state)}>
        {children}
      </StoreContext.Provider>
    )
  }

  function useForm<SelectorOutput>(
    selector: (store: FormContext) => SelectorOutput
  ): [SelectorOutput, (value: Partial<FormContext>) => void] {
    const store = useContext(StoreContext)
    if (!store) {
      throw new Error('Store not found')
    }

    const [state, setState] = useState(() => selector(store.get()))

    // TODO: use useExternalStorageState hook
    useEffect(
      () =>
        store.subscribe(() => {
          setState(selector(store.get()))
        }),
      [selector, store]
    )

    return [state, store.set]
  }

  return {
    FormContextProvider,
    useForm
  }
}

const { FormContextProvider, useForm } = createRefContext()

const Form = forwardRef(function Form(
  {
    defaultValues,
    schema,
    onSubmit,
    onInvalid,
    children
  }: PropsWithChildren<FormProps>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const form = useRHFForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues
  })
  return (
    <FormContextProvider state={form}>
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
        {children}
      </form>
    </FormContextProvider>
  )
})

export { useForm }
export default Form
