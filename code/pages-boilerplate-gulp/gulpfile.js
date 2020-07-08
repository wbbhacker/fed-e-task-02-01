// 实现这个项目的构建任务
const { series, parallel, src, dest, watch } = require('gulp')
const plugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const bs = browserSync.create()

const opts = {
 data:{
    pkg:{
      name:'gulp',
      description:'gulp 构建流',
      homepage:'http://www.baidu.com'
    }
 }
}


const clean = ()=>{
  return src('dist', { read: false })
    .pipe(plugins.clean())
}
const style = ()=>{
  return src('src/assets/styles/*.scss', {base:'src'})
    .pipe(plugins.sass({ outputStyle: 'expanded'}).on('error', plugins.sass.logError))
    .pipe(dest('dist'))
}
const script = ()=>{
  return src('src/assets/scripts/*.js',{base:'src'})
    .pipe(plugins.babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('dist'))
}

const page = ()=>{
  return src('src/*.html',{base:'src'})
    .pipe(plugins.swig(opts))
    .pipe(dest('dist'))
}

const image = ()=>{
  return src('src/assets/images/*', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = ()=>{
  return src('src/assets/fonts/*',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = ()=>{
  return src('public/**',{base:'src'})
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ],bs.reload)

  bs.init({
    notify:false,
    port:2080,
    files:'dist/**',
    server:{
      baseDir:'dist',
      routes:{
        '/node_modules':'node_modules'
      }
    }
  })
}

const useref = () => {
  return src('dist/*.html',{base:'dist'})
    .pipe(plugins.useref({searchPath:['dist','.']}))
    // html js css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace:true,
        minifyCSS:true,
        minifyJS:true
    })))
    .pipe(dest('release'))
}


const compile = parallel(style,script,page,image, font)
const build = series(clean, parallel(compile,extra))

const start = series(compile,serve)

module.exports = {
  clean,
  compile,
  build,
  serve,
  start,
  useref
}