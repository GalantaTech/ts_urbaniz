const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/public/js/main.ts',
    particles: './src/public/js/particles-config.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
  },
};