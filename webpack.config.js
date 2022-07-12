// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // parcel main.js
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // __dirname: 현재 파일이 있는 그 경로를 나타내는 하는 node.js의 전역적인 변수
    // resolve: __dirname와 dist 폴더를 합쳐서 절대적인 경로를 제공
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',

    // 구성옵션을 바꿨을 때 전에 만들어 놓은 파일이 자동으로 제거됨
    clean: true  // Clean the output directory before emit.
  },

  module: {
    rules: [
      { // .scss로 끝나는 확장자를 찾는데 s는 있을 수도 없을 수도 있다.
        test: /\.s?css$/,
        use: [
          // 아래 해석된 내용을 html파일에 삽입해줌
          'style-loader',
          // js파일에서 css파일을 해석할 수 있게 도와줌
          'css-loader',
          // sass에서 해석된 내용을 postcss-loader를 통해 공급업체 접두사를 붙여준다.
          'postcss-loader',
          // css-loader보다 sass-loader가 먼저 실행되어야 한다.
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    })
  ],

  devServer: {
    host: 'localhost'
  }
}