<script setup lang="tsx">
import { reactive, ref, watch, onMounted } from 'vue'
import { Form, FormSchema } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'
import { ElCheckbox } from 'element-plus'
import { useForm } from '@/hooks/web/useForm'
// import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useValidator } from '@/hooks/web/useValidator'
import { useUserStore } from '@/store/modules/user'
import { BaseButton } from '@/components/Button'
import { getMaintainApi } from '@/api/common'
import { getCaptchaTokenApi, getCaptchaNumberApi, loginApi } from '@/api/login'
import { UserLoginType, UserType } from '@/api/login/types'

const { required } = useValidator()

const emit = defineEmits(['to-register'])

const userStore = useUserStore()

const { currentRoute } = useRouter()

const { t } = useI18n()

const rules = {
  username: [required()],
  password: [required()]
}

const schema = reactive<FormSchema[]>([
  {
    field: 'title',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return <h2 class="text-2xl font-bold text-center w-[100%]">{t('login.login')}</h2>
        }
      }
    }
  },
  {
    field: 'username',
    label: t('login.username'),
    // value: 'admin',
    component: 'Input',
    colProps: {
      span: 24
    },
    componentProps: {
      placeholder: 'admin or test'
    }
  },
  {
    field: 'password',
    label: t('login.password'),
    // value: 'admin',
    component: 'InputPassword',
    colProps: {
      span: 24
    },
    componentProps: {
      style: {
        width: '100%'
      },
      placeholder: 'admin or test'
    }
  },
  {
    field: 'tool',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="flex justify-between items-center w-[100%]">
                <ElCheckbox v-model={remember.value} label={t('login.remember')} size="small" />
              </div>
            </>
          )
        }
      }
    }
  },
  {
    field: 'login',
    colProps: {
      span: 24
    },
    formItemProps: {
      slots: {
        default: () => {
          return (
            <>
              <div class="w-[100%]">
                <BaseButton
                  loading={loading.value}
                  type="primary"
                  class="w-[100%]"
                  onClick={signIn}
                >
                  {t('login.login')}
                </BaseButton>
              </div>
            </>
          )
        }
      }
    }
  }
])

const remember = ref(userStore.getRememberMe)

const initLoginInfo = () => {
  const loginInfo = userStore.getLoginInfo
  if (loginInfo) {
    const { username, password } = loginInfo
    setValues({ username, password })
  }
}
onMounted(() => {
  initLoginInfo()
  getMaintainApi().then((response) => {
    console.log('response', response)
  })
})

const { formRegister, formMethods } = useForm()
const { getFormData, getElFormExpose, setValues } = formMethods

const loading = ref(false)

const redirect = ref<string>('')

watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

// 登入認證資訊
const captchaParams = {
  authcode: 0,
  SS: 0,
  TS: 0,
  SR: 0
}

// 登录
const signIn = async () => {
  const formRef = await getElFormExpose()
  const formData = await getFormData()
  console.log('formData', formData)
  await formRef?.validate(async (isValid) => {
    if (isValid) {
      loading.value = true
      const formData = await getFormData<UserLoginType>()
      try {
        // 先取得驗證碼Token
        const response = await getCaptchaTokenApi()

        if (!response) return
        captchaParams.SR = response.SR
        captchaParams.SS = response.SS
        captchaParams.TS = response.TS

        // 取得驗證碼數字
        const captchaNumberResponse = await getCaptchaNumberApi(response.SR)
        if (!captchaNumberResponse) return
        captchaParams.authcode = captchaNumberResponse.Result.VerificationCode

        setTimeout(async () => {
          const loginResponse = await loginApi({
            account: formData.username,
            passwd: formData.password,
            authcode: captchaParams.authcode,
            SS: captchaParams.SS,
            TS: captchaParams.TS,
            SR: captchaParams.SR
          })
          console.log('loginResponse', loginResponse)
        }, 2000)

        // 進行登入

        // const res = await loginApi(formData)
        // if (res) {
        //   // 是否记住我
        //   if (unref(remember)) {
        //     userStore.setLoginInfo({
        //       username: formData.username,
        //       password: formData.password
        //     })
        //   } else {
        //     userStore.setLoginInfo(undefined)
        //   }
        //   userStore.setRememberMe(unref(remember))
        //   userStore.setUserInfo(res.data)
        //   // 是否使用动态路由
        //   if (appStore.getDynamicRouter) {
        //     getRole()
        //   } else {
        //     await permissionStore.generateRoutes('static').catch(() => {})
        //     permissionStore.getAddRouters.forEach((route) => {
        //       addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
        //     })
        //     permissionStore.setIsAddRouters(true)
        //     push({ path: redirect.value || permissionStore.addRouters[0].path })
        //   }
        // }
      } finally {
        loading.value = false
      }
    }
  })
}

// 获取角色信息
// const getRole = async () => {
//   const formData = await getFormData<UserType>()
//   const params = {
//     roleName: formData.username
//   }
//   const res =
//     appStore.getDynamicRouter && appStore.getServerDynamicRouter
//       ? await getAdminRoleApi(params)
//       : await getTestRoleApi(params)
//   if (res) {
//     const routers = res.data || []
//     userStore.setRoleRouters(routers)
//     appStore.getDynamicRouter && appStore.getServerDynamicRouter
//       ? await permissionStore.generateRoutes('server', routers).catch(() => {})
//       : await permissionStore.generateRoutes('frontEnd', routers).catch(() => {})

//     permissionStore.getAddRouters.forEach((route) => {
//       addRoute(route as RouteRecordRaw) // 动态添加可访问路由表
//     })
//     permissionStore.setIsAddRouters(true)
//     push({ path: redirect.value || permissionStore.addRouters[0].path })
//   }
// }
</script>

<template>
  <Form
    :schema="schema"
    :rules="rules"
    label-position="top"
    hide-required-asterisk
    size="large"
    class="dark:(border-1 border-[var(--el-border-color)] border-solid)"
    @register="formRegister"
  />
</template>
