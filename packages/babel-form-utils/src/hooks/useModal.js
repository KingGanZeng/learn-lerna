/* 设置modal的展示隐藏
 * @Author: jiangxiaowei
 * @Date: 2020-05-14 11:09:04
 * @Last Modified by:   jiangxiaowei
 * @Last Modified time: 2020-05-14 11:09:04
 */

import { useState, useCallback } from 'react'

export default (defaultStatus) => {
  const [visible, setVisible] = useState(defaultStatus)
  const showModal = useCallback(() => {
    setVisible(true)
  }, [])
  const hideModal = useCallback(() => {
    setVisible(false)
  }, [])

  return [visible, showModal, hideModal]
}
