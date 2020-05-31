/*
 * 表单校验
 * @Author: jiangxiaowei
 * @Date: 2020-05-19 13:40:24
 * @Last Modified by: jiangxiaowei
 * @Last Modified time: yyyy-05-dd 15:30:48
 */
import { useDebounceFn } from '@umijs/hooks'
import validate from '../validate'

const useValidate = () => {
  const { run } = useDebounceFn(
    ({ dataSchema, formData, dispatch }) => {
      /*
      因为ajv中有option配置可以改变formData(useDefaults：true)修改默认值
      或者类似ajv-keywords的自定义关键字transform等情况会修改formData。
      所以需要在在validate中使用immer，并重新返回新的formData。在此需要对formData重新dispatch设置
      */

      const { errorsMap, formData: newFormData } = validate(
        dataSchema,
        formData
      )

      dispatch({
        type: 'setError',
        errors: errorsMap,
      })
      dispatch({
        type: 'setFormData',
        formData: newFormData,
      })
    },
    [],
    500
  )
  return run
}

export default useValidate
