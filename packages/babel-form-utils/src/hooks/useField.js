/*
 * Field表单onChange生成 hooks
 * 该hooks会自动根据
 * @Author: jiangxiaowei
 * @Date: 2020-05-20 20:31:51
 * @Last Modified by: jiangxiaowei
 * @Last Modified time: yyyy-05-dd 15:10:43
 */

import moment from 'moment'
import useCusDispatch from './useCusDispatch'
import useEventCallback from './useEventCallback'
import { useDebounceFn } from '@umijs/hooks'
import { typeCheck } from 'utils/common'

/**
 * 格式化Moment类型数据
 * @param {array|string} value
 * @param {string} format 格式化模板
 * @returns {string|array}
 */
function formatMomentData({ value, format }) {
  if (value) {
    if (Array.isArray(value)) {
      return [value[0].format(format), value[1].format(format)]
    } else {
      return moment(value).format(format)
    }
  }
  return value
}

/**
 * 格式化颜色选择器数据
 * @param {object|string} value 颜色选择器表单值
 */
function formatColor({ value }) {
  if (typeCheck(value) === 'Object') {
    switch (value.source) {
      case 'rgb':
        return `rgba(${value?.rgb?.r || 0},${value?.rgb?.g || 0},${
          value?.rgb?.b || 0
        },${value?.rgb?.a || 1})`
      default:
        return value?.hex || '#ffffff'
    }
  }
  return value
}

/**
 * 格式化uploader数据
 */
function formatUploader({ value }) {
  if (typeCheck(value) === 'Object') {
    return value?.fileList || value
  }
  return value
}

let formatMap = {
  isMoment: formatMomentData,
  isColor: formatColor,
  isUploader: formatUploader,
}

/* 例子
import { useField } from 'hooks'
const myComponent = ({fieldKey,onChange})=>{
    const onchange = useField(fieldKey,onChange)
    <Input
        onChange={_onChange}
    />
}
*/

/**
 * @param {string} fieldKey 必填 表单change触发，更改formData的key值
 * @param {function} onChange 可选 表单触发change事件后的回调
 * @param {object} options 可选 表单字段特殊处理配置。注意：options中只能有一个字段的值是true。否则不会对特殊数据进行格式化
 */
const useField = (fieldKey, onChange, options = {}) => {
  const dispatch = useCusDispatch()
  // onChange 回调 debounce
  const { run } = useDebounceFn(
    (val) => {
      onChange && onChange(val)
    },
    [onChange],
    500
  )

  return useEventCallback(
    (e) => {
      let value = e?.target ? e?.target?.value : e
      // 判断当前传的options配置项是否需要特殊format处理
      const specialFormatKeys = Object.keys(options).filter(
        (item) => options[item] === true
      )
      if (specialFormatKeys.length === 1 && formatMap[specialFormatKeys[0]]) {
        value = formatMap[specialFormatKeys[0]]({ value, ...options })
      }
      if (options?.isDelete) {
        dispatch({
          type: 'deleteFormData',
          key: fieldKey,
        })
      } else {
        dispatch({
          type: 'setFormData',
          [fieldKey]: value,
        })
      }
      run(value)
    },
    [dispatch, onChange, fieldKey]
  )
}

export default useField
