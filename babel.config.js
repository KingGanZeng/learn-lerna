/**
 * 通用配置
 * @type {string[]}
 */
const presets = ["@babel/preset-env", "@babel/preset-react"]
const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import"
]

/**
 * 针对不同的package按需配置
 */
const overrides = [
    {
        test: ["packages/babel-form"]
    },
    {
        test: ["packages/babel-form-theme-antd"]
    }
]

module.exports = {
    presets,
    plugins,
    overrides
}
