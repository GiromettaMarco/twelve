import { router } from '@mocks/@inertiajs/core/router.mock'
import type { FormDataConvertible, FormDataKeys, FormDataValues, Method, Progress, VisitOptions } from '@mocks/@inertiajs/core/types.mock'
import { cloneDeep, isEqual } from 'es-toolkit'
import { get, has, set } from 'es-toolkit/compat'
import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react'

type SetDataByObject<TForm> = (data: TForm) => void
type SetDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SetDataByKeyValuePair<TForm extends Record<any, any>> = <K extends FormDataKeys<TForm>>(
  key: K,
  value: FormDataValues<TForm, K>
) => void
type FormDataType = Record<string, FormDataConvertible>
type FormOptions = Omit<VisitOptions, 'data'>

export interface InertiaFormProps<TForm extends FormDataType> {
  data: TForm
  isDirty: boolean
  errors: Partial<Record<FormDataKeys<TForm>, string>>
  hasErrors: boolean
  processing: boolean
  progress: Progress | null
  wasSuccessful: boolean
  recentlySuccessful: boolean
  setData: SetDataByObject<TForm> & SetDataByMethod<TForm> & SetDataByKeyValuePair<TForm>
  transform: (callback: (data: TForm) => object) => void
  setDefaults(): void
  setDefaults(field: FormDataKeys<TForm>, value: FormDataConvertible): void
  setDefaults(fields: Partial<TForm>): void
  reset: (...fields: FormDataKeys<TForm>[]) => void
  clearErrors: (...fields: FormDataKeys<TForm>[]) => void
  setError(field: FormDataKeys<TForm>, value: string): void
  setError(errors: Record<FormDataKeys<TForm>, string>): void
  submit: (...args: [Method, string, FormOptions?] | [{ url: string; method: Method }, FormOptions?]) => void
  get: (url: string, options?: FormOptions) => void
  patch: (url: string, options?: FormOptions) => void
  post: (url: string, options?: FormOptions) => void
  put: (url: string, options?: FormOptions) => void
  delete: (url: string, options?: FormOptions) => void
  cancel: () => void
}

export default function useForm<TForm extends FormDataType>(initialValues?: TForm): InertiaFormProps<TForm>
export default function useForm<TForm extends FormDataType>(
  rememberKey: string,
  initialValues?: TForm
): InertiaFormProps<TForm>
export default function useForm<TForm extends FormDataType>(
  rememberKeyOrInitialValues?: string | TForm,
  maybeInitialValues?: TForm
): InertiaFormProps<TForm> {
  const isMounted = useRef<boolean>(null)
  const [defaults, setDefaults] = useState(
    (typeof rememberKeyOrInitialValues === 'string' ? maybeInitialValues : rememberKeyOrInitialValues) || ({} as TForm)
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cancelToken = useRef<any>(null)
  const recentlySuccessfulTimeoutId = useRef<NodeJS.Timeout>(null)
  const [data, setData] = useState(defaults)
  const [errors, setErrors] = useState({} as Partial<Record<FormDataKeys<TForm>, string>>)
  const [hasErrors, setHasErrors] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(null)
  const [wasSuccessful, setWasSuccessful] = useState(false)
  const [recentlySuccessful, setRecentlySuccessful] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transform = useRef((data: any) => data)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const submit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]) => {
      const objectPassed = typeof args[0] === 'object'

      const method: Method = objectPassed ? args[0].method : args[0]
      const url = objectPassed ? args[0].url : args[1]
      const options = (objectPassed ? args[1] : args[2]) ?? {}

      const _options = {
        ...options,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onCancelToken: (token: any) => {
          cancelToken.current = token

          if (options.onCancelToken) {
            return options.onCancelToken(token)
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onBefore: (visit: any) => {
          setWasSuccessful(false)
          setRecentlySuccessful(false)
          clearTimeout(recentlySuccessfulTimeoutId.current || undefined)

          if (options.onBefore) {
            return options.onBefore(visit)
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onStart: (visit: any) => {
          setProcessing(true)

          if (options.onStart) {
            return options.onStart(visit)
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onProgress: (event: any) => {
          setProgress(event)

          if (options.onProgress) {
            return options.onProgress(event)
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (page: any) => {
          if (isMounted.current) {
            setProcessing(false)
            setProgress(null)
            setErrors({})
            setHasErrors(false)
            setWasSuccessful(true)
            setRecentlySuccessful(true)
            setDefaults(cloneDeep(data))
            recentlySuccessfulTimeoutId.current = setTimeout(() => {
              if (isMounted.current) {
                setRecentlySuccessful(false)
              }
            }, 2000)
          }

          if (options.onSuccess) {
            return options.onSuccess(page)
          }
        },
        onError: (errors: SetStateAction<Partial<Record<FormDataKeys<TForm>, string>>>) => {
          if (isMounted.current) {
            setProcessing(false)
            setProgress(null)
            setErrors(errors)
            setHasErrors(true)
          }

          if (options.onError) {
            return options.onError(errors)
          }
        },
        onCancel: () => {
          if (isMounted.current) {
            setProcessing(false)
            setProgress(null)
          }

          if (options.onCancel) {
            return options.onCancel()
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFinish: (visit: any) => {
          if (isMounted.current) {
            setProcessing(false)
            setProgress(null)
          }

          cancelToken.current = null

          if (options.onFinish) {
            return options.onFinish(visit)
          }
        }
      }

      if (method === 'delete') {
        router.delete(url, { ..._options, data: transform.current(data) })
      } else {
        router[method](url, transform.current(data), _options)
      }
    },
    [data, setErrors, transform]
  )

  const setDataFunction = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-function-type
    (keyOrData: FormDataKeys<TForm> | Function | TForm, maybeValue?: any) => {
      if (typeof keyOrData === 'string') {
        setData((data) => set(cloneDeep(data), keyOrData, maybeValue))
      } else if (typeof keyOrData === 'function') {
        setData((data) => keyOrData(data))
      } else {
        setData(keyOrData as TForm)
      }
    },
    [setData]
  )

  const setDefaultsFunction = useCallback(
    (fieldOrFields?: FormDataKeys<TForm> | Partial<TForm>, maybeValue?: FormDataConvertible) => {
      if (typeof fieldOrFields === 'undefined') {
        setDefaults(() => data)
      } else {
        setDefaults((defaults) => {
          return typeof fieldOrFields === 'string'
            ? set(cloneDeep(defaults), fieldOrFields, maybeValue)
            : Object.assign(cloneDeep(defaults), fieldOrFields)
        })
      }
    },
    [data, setDefaults]
  )

  const reset = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...fields: any[]) => {
      if (fields.length === 0) {
        setData(defaults)
      } else {
        setData((data) =>
          (fields as Array<FormDataKeys<TForm>>)
            .filter((key) => has(defaults, key))
            .reduce(
              (carry, key) => {
                return set(carry, key, get(defaults, key))
              },
              { ...data } as TForm
            )
        )
      }
    },
    [setData, defaults]
  )

  const setError = useCallback(
    (fieldOrFields: FormDataKeys<TForm> | Record<FormDataKeys<TForm>, string>, maybeValue?: string) => {
      setErrors((errors) => {
        const newErrors = {
          ...errors,
          ...(typeof fieldOrFields === 'string'
            ? { [fieldOrFields]: maybeValue }
            : (fieldOrFields as Record<FormDataKeys<TForm>, string>))
        }
        setHasErrors(Object.keys(newErrors).length > 0)
        return newErrors
      })
    },
    [setErrors, setHasErrors]
  )

  const clearErrors = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...fields: any[]) => {
      setErrors((errors) => {
        const newErrors = (Object.keys(errors) as Array<FormDataKeys<TForm>>).reduce(
          (carry, field) => ({
            ...carry,
            ...(fields.length > 0 && !fields.includes(field) ? { [field]: errors[field] } : {})
          }),
          {}
        )
        setHasErrors(Object.keys(newErrors).length > 0)
        return newErrors
      })
    },
    [setErrors, setHasErrors]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createSubmitMethod = (method: Method) => (url: any, options: any) => {
    submit(method, url, options)
  }
  const getMethod = useCallback(createSubmitMethod('get'), [submit])
  const post = useCallback(createSubmitMethod('post'), [submit])
  const put = useCallback(createSubmitMethod('put'), [submit])
  const patch = useCallback(createSubmitMethod('patch'), [submit])
  const deleteMethod = useCallback(createSubmitMethod('delete'), [submit])

  const cancel = useCallback(() => {
    if (cancelToken.current) {
      cancelToken.current.cancel()
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformFunction = useCallback((callback: (data: any) => any) => {
    transform.current = callback
  }, [])

  return {
    data,
    setData: setDataFunction,
    isDirty: !isEqual(data, defaults),
    errors,
    hasErrors,
    processing,
    progress,
    wasSuccessful,
    recentlySuccessful,
    transform: transformFunction,
    setDefaults: setDefaultsFunction,
    reset,
    setError,
    clearErrors,
    submit,
    get: getMethod,
    post,
    put,
    patch,
    delete: deleteMethod,
    cancel
  }
}
