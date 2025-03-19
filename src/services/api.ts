import { BareFetcher, Key, Middleware, SWRConfiguration, SWRHook } from 'swr'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { MessageText } from 'utils/messages'
import {
  clearLocalStorage,
  getFromLocalStorage,
  LocalStorageKey,
} from 'utils/localStorageUtils'

const URL_API = import.meta.env.VITE_BACKAPI || ''

export enum MethodHTTP {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ResponseInterface {
  message: string
  status: number
  data: any
}

axios.defaults.timeout = 120000

interface FetchApiParamsInterface {
  endpoint: string
  body?: any
  methodApi?: MethodHTTP
}

export const fetchApi = async ({
  endpoint,
  body = {},
  methodApi = MethodHTTP.GET,
}: FetchApiParamsInterface) => {
  const token = getFromLocalStorage(LocalStorageKey.TOKEN)
  const authorizationHeader = token ? { Authorization: `Bearer ${token}` } : {}
  const url = `${URL_API}${endpoint}`
  const apiParameters = methodApi === MethodHTTP.GET ? { ...body } : {}
  const apiData = methodApi !== MethodHTTP.GET ? { ...body } : {}
  const options: AxiosRequestConfig = {
    headers: {
      ...authorizationHeader,
    },
    url,
    method: methodApi, // Axios default is GET
    data: { ...apiData },
    params: { ...apiParameters },
  }

  return axios(options)
    .then((response: AxiosResponse) => response.data)
    .then((response: ResponseInterface) => {
      // Using SWR
      if (methodApi === MethodHTTP.GET) {
        if (response.status !== 200) return null
        if (response.data && response.data.records)
          return {
            records: response.data.records,
            cnt: response.data?.cnt || 0,
          }
        if (response.data) return response.data
        return response
      }
      return response
    })
    .catch((error: AxiosError) => {
      if (error.code === 'ERR_NETWORK') {
        toast.error(MessageText.noConnection)
      }
      if (error.response) {
        const { status } = error.response
        if (status === 401) {
          clearLocalStorage()
          history.pushState(null, '', '/login?expired=1')
          history.go()
          return null
        }
        toast.error(MessageText.serverError)
      }
      return null
    })
}

const disableCache: Middleware = (useSWRNext: SWRHook) => {
  return <Data = any, Error = any>(
    key: Key,
    fetcher: BareFetcher<Data> | null,
    config: SWRConfiguration<Data, Error, BareFetcher<Data>>,
  ) => {
    const swr = useSWRNext(key, fetcher, config)
    const { data, isValidating } = swr
    return { ...swr, data: isValidating ? undefined : data }
  }
}

export const swrParams: SWRConfiguration = {
  fetcher: fetchApi,
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  refreshWhenHidden: true,
  refreshWhenOffline: true,
  shouldRetryOnError: false,
  focusThrottleInterval: 0,
  errorRetryCount: 0,
  use: [disableCache],
}
