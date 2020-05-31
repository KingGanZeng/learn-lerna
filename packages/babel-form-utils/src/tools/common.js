/*
 * @Author: jiangxiaowei
 * @Date: 2020-05-30 15:05:13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-05-31 20:16:43
 */

/**
 * 去抖
 *
 * @exports
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns
 */
export function debounce(func, wait = 50, immediate) {
    var timeout, args, context, timestamp, result

    var later = function () {
      // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >=
      // 0一直为true，从而不断启动新的计时器延时执行func
      var last = +new Date() - timestamp

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }

    return function () {
      context = this
      args = arguments
      timestamp = +new Date()
      // 第一次调用该方法时，且immediate为true，则调用func函数
      var callNow = immediate && !timeout
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }

  /**
   * 基本数据类型检测
   * @param checkVar
   * @returns {string}
   */
  export function typeCheck(checkVar) {
    const typeClass = Object.prototype.toString.call(checkVar)

    return typeClass.split(' ')[1].split(']')[0]
  }

  /**
   * 判断变量是否为空
   * @param checkVar
   */
  export function isEmpty(checkVar) {
    let empty,
      varType = typeCheck(checkVar)

    switch (varType) {
      case 'Null':
      case 'Undefined':
        empty = true
        break
      case 'Array':
      case 'String':
        empty = checkVar.length === 0
        break
      default: {
        const keys = Object.keys(checkVar)
        empty = keys.length === 0
      }
    }

    return empty
  }

  /**
   *  设置data.a.b.c = value
   *  若data没有a.b 则依次赋值空对象，最后再将a.b.c设为value
   * @param {string} keys a.b.c
   * @param {object} data data.a.b.c
   * @param {any} value data.a.b.c = value
   */
  export const setDeepProp = (keys, data, value) => {
    // 当前key
    const curKey = keys.shift()
    // data是否有当前key
    const hasKey = Object.keys(data).includes(curKey)
    if (keys.length > 0) {
      if (!hasKey) {
        data[curKey] = {}
      }
      setDeepProp(keys, data[curKey], value)
    } else {
      data[curKey] = value
    }
  }
