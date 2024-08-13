export interface IAuth {
  CreditTransferGold: 'Y ' | 'N'
  Lv2ModifySet: any
  NeedCheckEmail: 'Y ' | 'N'
  NeedToChangePassWD: boolean
  RequestId: string
  Success: boolean
  Time: number
  TrackingCodeSwitch: 'Y ' | 'N'
  TwoFactorWithdrawal: 'Y ' | 'N'
  SystemSet: []
  VisualCurrencyChannel: 'Y ' | 'N'
  account: string
  isqrcode: any
  level: string
  userid: string
  UserPermissions: IUserPermissions
}

export interface IUserPermissions {
  SuperUser: {
    SuperUser: 'Y ' | 'N'
  }
  Manager: {
    UserManager: 'Y ' | 'N'
    UserSearch: 'Y ' | 'N'
    LoginRecord: 'Y ' | 'N'
    AppLoginRecord: 'Y ' | 'N'
    BetExport: 'Y ' | 'N'
    CalculationWinloss: 'Y ' | 'N'
    WinlossRecord: 'Y ' | 'N'
    RebateWinlossRecord: 'Y ' | 'N'
    UserGameAccountSearch: 'Y ' | 'N'
  }
  Message: {
    News: 'Y ' | 'N'
    Marquee: 'Y ' | 'N'
    WebMaintain: 'Y ' | 'N'
  }
  Preferential: {
    Offers: 'Y ' | 'N'
    CommissionCount: 'Y ' | 'N'
  }
  CashSystem: {
    BalanceRecord: 'Y ' | 'N'
    OrderNumSearch: 'Y ' | 'N'
  }
  Report: {
    WebReport: 'Y ' | 'N'
    MemReport: 'Y ' | 'N'
    MemList: 'Y ' | 'N'
    MemStatistics: 'Y ' | 'N'
    MemberBetHistory: 'Y ' | 'N'
    Unsettlement: 'Y ' | 'N'
    SmsHistory: 'Y ' | 'N'
    DailyWDReport: 'Y ' | 'N'
  }
  SystemSet: []
  Export: {
    UserManageData: 'Y ' | 'N'
    LoginLog: 'Y ' | 'N'
    ReportMemListData: 'Y ' | 'N'
    ReportSmsHistory: 'Y ' | 'N'
    ReportWebSummary: 'Y ' | 'N'
    ReportMemSummary: 'Y ' | 'N'
    ReportMemberBetHistory: 'Y ' | 'N'
    ReportUnSettlement: 'Y ' | 'N'
  }
  CtrlRecord: {
    CtrlRecord: 'Y ' | 'N'
  }
}
