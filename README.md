### 简单题

1. 工程化认识：

   业务驱动 --->项目的构建、开发、测试、上线、监控、维护、升级-->同时项目影响业务 ，形成业务闭环。

   工程化则是整个项目流程的集成，根据业务形成独有的项目规则流程，提高开发效率。

   工程化解决问题：

   - 统一团队开发风格，易于项目维护
   - 前后端同时并行，解耦对接口的依赖 如：本地服务器、代理、mock数据
   - 使用新技术 、新语法来构建项目 如： sass、es6、ts
   - 常用工作流程的自动化 如上线、测试、监控

   工程化带来的价值：

   - 统一团队开发目标
   - 快速灵活的支持业务
   - 高效的开发效率 

2. 更深的意义：

   - 促使学习node，以完成适合自己脚手架
   - 表达出一种思想，重复的工作流程 , 让计算机完成

#### 编程题

1.node 实现 根据模板 生成文件 及 修改文件的脚手架 filec

​	github：https://github.com/wbbhacker/file-create

​    npm：https://www.npmjs.com/package/file-create

​	场景：如vue项目，新建一个页面的时候，需要新增一个views 文件 store文件同时要修改 router 才行。filec就是自动根据配置文件生成一个新页面

​	思路：

- 新建文件：根据模板拷贝文件，并根据数据源替换页面上的占位符
-  修改文件： 读取 要修改的文件，把源代码转化为AST，通过回调函数返回给用户自己去修改，之后再把修改之后的AST 转换成代码 保存到文件中

​	file.config.js配置

```javascript
exports.config = {
  template:{
      // 模板文件
      files:[
        {
          soucre_path: 'templates/view.vue',
          dest_path: 'demoFile/',
        },
        {
          soucre_path: 'templates/store.js',   
          dest_path: 'demoFile/',
        }
      ],
      // 模板文件源
      source_data:[{
        questionfield:'title',
        questtionMessage:'请输入文件title'
      },{
        questionfield:'name',
        questtionMessage:'请输入文件name'
      }]   //用户输入数据源
  },
  change_files:[
    // 要修改的文件
    {
      soucre_path:'./menuData.js',
      dest_path:'./menuData.js',
      transform_fn: function (ast, traverse, t, parser, userInputData){
        let templateB = `
            export default  {
            path: "/${userInputData.name}",
            meta: {
              requireAuth: true,
              title: '${userInputData.title}'
            },
            components: {
              default: Header,
              menu: Menu,
              content: () => import("@new/views/pay/archives/${userInputData.name}"),
              tab: MenuTab
            }}`

        const obj = parser.parse(templateB, { sourceType: 'module' })
            
        let flag = true;
        traverse(ast,{
          enter(path){
            if(t.isArrayExpression(path.node)){
              let elements = path.get('elements')
              let lastElemPath = elements[elements.length-1]
              path.node.elements.push(obj.program.body[0].declaration)
              flag = false
            }
          }
        })
      }
    }
  ]
}
```



2.gulp 自动化构建

1. 通过gulp-sass 对scss文件进行转化 style 任务

2. 通过gulp-babel 对js 文件转化 scirpt 任务

3. 通过gulp-swig 对 html版本文件进行转 page 任务

4. 通过gulp-imagemin 对 图片文件及字体文件进行压缩  image、font任务

5. build 任务 是将1-4任务并行执行

6. serve 任务是通过browser-sync 监听文件变化，实时刷新浏览器用于开发

   







