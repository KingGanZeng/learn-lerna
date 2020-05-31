/*
 * @Author: jiangxiaowei
 * @Date: 2020-05-27 21:46:47
 * @Last Modified by:   jiangxiaowei
 * @Last Modified time: 2020-05-27 21:46:47
 */
import { useCallback } from 'react'
import { useCusDispatch } from 'hooks'

/**
 * 查询表单数据的hook
 * @param {object} param {
 *  options 表单数据
 *  queryFunc 表单query函数
 *  requestCache 是否每次都调查询接口
 *  fieldKey 表单的key
 * }
 */
const useQuery = ({ options, queryFunc, requestCache, fieldKey }) => {
  const dispatch = useCusDispatch()
  return useCallback(async () => {
    //   当options为空||requestCache为true,调用接口查询
    if (!options || options.length === 0 || !requestCache) {
      const data = await queryFunc()
      dispatch({
        type: 'setUiSchema',
        [`properties.${fieldKey}.options`]: data,
      })
    }
  }, [dispatch, fieldKey, options, queryFunc, requestCache])
}

export default useQuery
