import service from './service'
import { CONTENT_TYPE } from '@/constants'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { useUserStoreWithOut } from '@/store/modules/user'

const request = (option: AxiosConfig) => {
  const { url, method, params, data, headers, responseType } = option

  const userStore = useUserStoreWithOut()
  const localeStore = useLocaleStoreWithOut()

  return service.request({
    url: url,
    method,
    params,
    data: data,
    responseType: responseType,
    headers: {
      'Content-Type': CONTENT_TYPE,
      Localize: localeStore.getCurrentLocale.lang,
      Uid: userStore.getToken ?? '',
      ...headers
    }
  })
}

export default {
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<T>
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<T>
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<T>
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<T>
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url)
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest()
  }
}
