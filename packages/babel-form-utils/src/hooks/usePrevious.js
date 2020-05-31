/*
 * @Author: jiangxiaowei
 * @Date: 2020-05-14 11:08:53
 * @Last Modified by:   jiangxiaowei
 * @Last Modified time: 2020-05-14 11:08:53
 */
import { useRef, useEffect } from 'react'

// 返回上一次的value值
export default (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
