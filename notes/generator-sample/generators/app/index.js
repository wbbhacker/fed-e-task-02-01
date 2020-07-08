// 此文件为 Generator 的核心入口
// 需要导出一个集成自Yeoman Generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型汇总定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting(){
    return this.prompt([
      {
        type:'input',
        name:'name',
        measage:'Your project name',
        default: this.appname
      }
    ]).then(ansers=>{
      
    })
  }
  writing(){
    // this.fs.write(
    //   this.destinationPath('temp.text'),
    //   Math.random().toString()
    // )
    const tmpl =  this.templatePath('foo.txt')
    const output = this.destinationPath('foo.txt')
    const context = {title:'hello,world', success:false}
    this.fs.copyTpl(tmpl, output, context)
  }
}