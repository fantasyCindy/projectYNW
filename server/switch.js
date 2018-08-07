const fs = require('fs')
const path = require('path')
var p = name => path.join(__dirname, name)
const PATH_CONFIG = p('../.vscode/sftp.json')

const sourceTable = {
    dev: p('./dev.json'), // 开发
    test: p('./test.json'), // 测试
    "**pro": p('./pro.json'), // 正式jSP
    "**static": p('./static.json') // 正式静态
}

const sourceKey = process.argv[2] || 'dev'
const sroucePath = sourceTable[sourceKey]
if (sroucePath) {
    const source = fs.readFileSync(sroucePath, 'utf-8')
    fs.writeFileSync(PATH_CONFIG, source)
    console.log(`=== 切换到:【${sourceKey}】服务器 ===`)
} else {
    console.log("切换失败, 请检查参数是否正确")
}