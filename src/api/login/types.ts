export interface UserLoginType {
  username: string
  password: string
}

export interface UserType {
  username: string
  password: string
  role: string
  roleId: string
}

export interface IVerifyCodeResponse {
  SR: number
  SS: number
  TS: number
  token: string
}

export interface ICaptchaNumberResponse {
  VerificationCode: number
}

export interface IloginResponse {
  success: number
  uid: string
}
