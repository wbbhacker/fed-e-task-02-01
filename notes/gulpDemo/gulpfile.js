const {src, dest} = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = ()=>{
  // 读取流
  return src('src/*.css)  
  // 转化流
  .pipe(cleanCss())
  // 转化流
    .pipe(rename({extname: '.min.css'}))
  // 写入流
    .pipe(dest('dist'))
}