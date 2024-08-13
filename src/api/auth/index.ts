import request from '@/axios'

/**
 * 獲取此權限可使用的路由
 */
export const getAuthApi = (): Promise<any> => {
  return request.get({ url: '/auth' })
}
