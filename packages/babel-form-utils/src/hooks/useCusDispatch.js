/*
 * 使用
 * import { useCusDispatch } from 'hooks'
 * const MyComponent = () => {
 *      const dispatch = useCusDispatch();
 *      //使用dispatch改变store
 *      return <span>Foo</span>;
 * }
 * @Author: jiangxiaowei
 * @Date: 2020-05-14 16:05:56
 * @Last Modified by: jiangxiaowei
 * @Last Modified time: 2020-05-14 16:27:06
 */
import { useContext } from 'react'
import { FormDataContext } from 'reducers'

export default () => useContext(FormDataContext)
