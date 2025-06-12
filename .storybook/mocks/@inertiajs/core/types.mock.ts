// import type { CancelToken } from 'axios'
import { AxiosProgressEvent, AxiosResponse } from 'axios'

export type Errors = Record<string, string>
export type ErrorBag = Record<string, Errors>

export interface PageProps {
  [key: string]: unknown
}

export interface Page<SharedProps extends PageProps = PageProps> {
  component: string
  props: PageProps &
    SharedProps & {
      errors: Errors & ErrorBag
      deferred?: Record<string, VisitOptions['only']>
    }
  url: string
  version: string | null
  clearHistory: boolean
  encryptHistory: boolean
  deferredProps?: Record<string, VisitOptions['only']>
  mergeProps?: string[]
  deepMergeProps?: string[]

  /** @internal */
  rememberedState: Record<string, unknown>
}

export type ActiveVisit = PendingVisit & Required<VisitOptions>

export type RequestPayload = Record<string, FormDataConvertible> | FormData

export type PreserveStateOption = boolean | 'errors' | ((page: Page) => boolean)

export type PendingVisitOptions = {
  url: URL
  completed: boolean
  cancelled: boolean
  interrupted: boolean
}

export type PendingVisit = Visit & PendingVisitOptions

export type VisitHelperOptions<T extends RequestPayload = RequestPayload> = Omit<VisitOptions<T>, 'method' | 'data'>

export type Visit<T extends RequestPayload = RequestPayload> = {
  method: Method
  data: T
  replace: boolean
  preserveScroll: PreserveStateOption
  preserveState: PreserveStateOption
  only: Array<string>
  except: Array<string>
  headers: Record<string, string>
  errorBag: string | null
  forceFormData: boolean
  queryStringArrayFormat: 'indices' | 'brackets'
  async: boolean
  showProgress: boolean
  prefetch: boolean
  fresh: boolean
  reset: string[]
  preserveUrl: boolean
}

export type Progress = AxiosProgressEvent

export type GlobalEventsMap = {
  before: {
    parameters: [PendingVisit]
    details: {
      visit: PendingVisit
    }
    result: boolean | void
  }
  start: {
    parameters: [PendingVisit]
    details: {
      visit: PendingVisit
    }
    result: void
  }
  progress: {
    parameters: [Progress | undefined]
    details: {
      progress: Progress | undefined
    }
    result: void
  }
  finish: {
    parameters: [ActiveVisit]
    details: {
      visit: ActiveVisit
    }
    result: void
  }
  cancel: {
    parameters: []
    details: null
    result: void
  }
  navigate: {
    parameters: [Page]
    details: {
      page: Page
    }
    result: void
  }
  success: {
    parameters: [Page]
    details: {
      page: Page
    }
    result: void
  }
  error: {
    parameters: [Errors]
    details: {
      errors: Errors
    }
    result: void
  }
  invalid: {
    parameters: [AxiosResponse]
    details: {
      response: AxiosResponse
    }
    result: boolean | void
  }
  exception: {
    parameters: [Error]
    details: {
      exception: Error
    }
    result: boolean | void
  }
  prefetched: {
    parameters: [AxiosResponse, ActiveVisit]
    details: {
      response: AxiosResponse
      fetchedAt: number
      visit: ActiveVisit
    }
    result: void
  }
  prefetching: {
    parameters: [ActiveVisit]
    details: {
      visit: ActiveVisit
    }
    result: void
  }
}

export type GlobalEventNames = keyof GlobalEventsMap

export type GlobalEventParameters<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]['parameters']

export type GlobalEventResult<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]['result']

export type GlobalEventDetails<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]['details']

export type GlobalEventCallback<TEventName extends GlobalEventNames> = (
  ...params: GlobalEventParameters<TEventName>
) => GlobalEventResult<TEventName>

export type VisitCallbacks = {
  // onCancelToken: { ({ cancel, token }: { cancel: VoidFunction, token: CancelToken }): void }
  onCancelToken: { ({ cancel }: { cancel: VoidFunction }): void }
  onBefore: GlobalEventCallback<'before'>
  onStart: GlobalEventCallback<'start'>
  onProgress: GlobalEventCallback<'progress'>
  onFinish: GlobalEventCallback<'finish'>
  onCancel: GlobalEventCallback<'cancel'>
  onSuccess: GlobalEventCallback<'success'>
  onError: GlobalEventCallback<'error'>
  onPrefetched: GlobalEventCallback<'prefetched'>
  onPrefetching: GlobalEventCallback<'prefetching'>
}

export type VisitOptions<T extends RequestPayload = RequestPayload> = Partial<Visit<T> & VisitCallbacks>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormDataKeys<T extends Record<any, any>> = T extends T
  ? keyof T extends infer Key extends Extract<keyof T, string>
    ? Key extends Key
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? T[Key] extends Record<any, any>
        ? `${Key}.${FormDataKeys<T[Key]>}` | Key
        : Key
      : never
    : never
  : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormDataValues<T extends Record<any, any>, K extends FormDataKeys<T>> = K extends `${infer P}.${infer Rest}`
  ? P extends keyof T
    ? Rest extends FormDataKeys<T[P]>
      ? FormDataValues<T[P], Rest>
      : never
    : never
  : K extends keyof T
    ? T[K]
    : never

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type FormDataConvertible =
  | Array<FormDataConvertible>
  | { [key: string]: FormDataConvertible }
  | Blob
  | FormDataEntryValue
  | Date
  | boolean
  | number
  | null
  | undefined

export type LinkPrefetchOption = 'mount' | 'hover' | 'click'
