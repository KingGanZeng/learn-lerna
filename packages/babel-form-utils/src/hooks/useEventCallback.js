/*
 * @Author: jiangxiaowei
 * @Date: 2020-05-14 11:09:25
 * @Last Modified by:   jiangxiaowei
 * @Last Modified time: 2020-05-14 11:09:25
 */

import { useCallback, useRef, useEffect } from 'react'

/**
 * 重写useCallback（保证函数即使dependencies依赖改变。也不会重新生成）
 * 解决因为useCallback的依赖频繁变化导致useCallback缓存效果很差甚至影响性能的问题
 * fn 函数
 * dependencies 依赖数组
 */
export default (fn, dependencies) => {
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useEffect(() => {
    ref.current = fn
  }, [fn, ...dependencies])

  return useCallback(
    (...restProps) => {
      const fn = ref.current
      return fn(...restProps)
    },
    [ref]
  )
}
