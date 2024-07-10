import { get } from 'lodash-es'
import request from '@/axios'
import type { UserType } from './types'

interface RoleParams {
  roleName: string
}

// export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {
//   return request.post({ url: '/mock/user/login', data })
// }

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
}
export const loginApi = (postData: ILoginData): Promise<any> => {
  return request.post({ url: '/', data: postData })
}

/**
 * 獲取驗證碼Token
 */
export interface IVerifyCode {
  SR: number
  SS: number
  TS: number
  token: string
}
export const getCaptchaTokenApi = (): Promise<IVerifyCode> => {
  return request.get({ url: '/token' })
}

/**
 * 獲取數字認證碼
 */
export interface ICaptchaNumberResponse {
  VerificationCode: number
}
export const getCaptchaNumberApi = (
  SR: number
): Promise<{
  Result: ICaptchaNumberResponse
}> => {
  return request.get({ url: 'v0/captchatest/' + `${SR}` })
}
