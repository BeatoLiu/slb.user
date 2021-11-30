const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const path = require('path')
const paths = require('react-scripts/config/paths')

// 修改打包路径
paths.appBuild = path.join(path.dirname(paths.appBuild), './slbUser')


function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'react-vant',
        // libraryDirectory: 'es',
        style: true,
    }),
    // !less-loader版本不能太高，会报this.getOptions错误
    addLessLoader(),

    // react中不让修改tsconfig文件中的path属性，所以路径别名好像不好使
    addWebpackAlias({
        '@': resolve('src')
    }),

    (config) => {
        // config.devtool = false; // 去掉map文件，但去不掉css的map文件 所以还是不用了，用.env文件的方式
        return config;
    }
)