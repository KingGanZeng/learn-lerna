import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import { useField, isEmpty, typeCheck } from 'babel-form-utils'
// 本地配置
import './index.styl'

const CheckboxField = ({
    fieldData,
    options
}) => {
    const a = 'aa'
    console.log(typeCheck(a))

    return <Checkbox.Group
        options={options}
        value={fieldData}
     />
}

export default memo(CheckboxField)
