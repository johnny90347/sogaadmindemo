import request from '@/axios'
import type { UserType, IVerifyCodeResponse, ICaptchaNumberResponse, IloginResponse } from './types'

interface RoleParams {
  roleName: string
}

export const loginOutApi = (): Promise<IResponse> => {
  return request.get({ url: '/mock/user/loginOut' })
}

export const getUserListApi = ({ params }: AxiosConfig) => {
  return request.get<{
    code: string
    data: {
      list: UserType[]
      total: number
    }
  }>({ url: '/mock/user/list', params })
}

export const getAdminRoleApi = (
  params: RoleParams
): Promise<IResponse<AppCustomRouteRecordRaw[]>> => {
  return request.get({ url: '/mock/role/list', params })
}

export const getTestRoleApi = (params: RoleParams): Promise<IResponse<string[]>> => {
  return request.get({ url: '/mock/role/list2', params })
}

// TODO:以下開始

/**
 * 登入
 * @param postData 登入資料
 */
export interface ILoginData {
  account: string
  passwd: string
  authcode: number
  SS: number
  TS: number
  SR: number
  token: string
}
export const loginApi = (postData: ILoginData): Promise<IloginResponse> => {
  return request.post({
    url: '/',
    data: postData,
    headers: {
      'X-CSRF': postData.token
    }
  })
}

/**
 * 獲取驗證碼Token
 */

export const getCaptchaTokenApi = (): Promise<IVerifyCodeResponse> => {
  return request.get({ url: '/token' })
}

/**
 * 獲取數字認證碼
 */

export const getCaptchaNumberApi = (
  SR: number
): Promise<{
  Result: ICaptchaNumberResponse
}> => {
  return request.get({
    url: '/v0/captchatest/' + `${SR}`
  })
}

/**
 * 取得權限
 */
