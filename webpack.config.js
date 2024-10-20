const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Очищает папку dist перед каждой сборкой
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Обрабатывает .ts и .tsx файлы
        exclude: /node_modules/,
        use: 'ts-loader', // ts-loader для TypeScript
      },
      {
        test: /\.css$/, // Для обработки CSS файлов
        use: ['style-loader', 'css-loader'], // Подключение стилей
      },
      {
        test: /\.s[ac]ss$/i, // Обрабатывает .sass и .scss файлы
        use: [
          'style-loader', // Добавляет CSS в DOM
          'css-loader', // Преобразует CSS в CommonJS
          'sass-loader', // Компилирует SASS в CSS
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Для шрифтов
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Позволяет опускать расширения при импорте
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Шаблон HTML
    }),
  ],
  devtool: 'source-map', // Поддержка source maps
  devServer: {
    static: './dist',
  },
};
