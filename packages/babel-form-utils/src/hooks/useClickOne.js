/*
 * 按钮只可以点击一次
 * @Author: jiangxiaowei
 * @Date: 2020-05-14 16:54:56
 * @Last Modified by: jiangxiaowei
 * @Last Modified time: 2020-05-14 16:54:56
 */
import { useRef, useEffect, useCallback } from 'react'

export default () => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = true
  }, [])
  const startClick = useCallback(() => {
    ref.current = false
  }, [])
  const stopClick = useCallback(() => {
    ref.current = true
  }, [])
  return [ref.current, startClick, stopClick]
}
