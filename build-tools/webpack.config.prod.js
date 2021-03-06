var webpack = require('webpack');
var env = process.env.NODE_ENV;

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactDnDExternal = {
  root: 'ReactDnD',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactBackendExternal = {
  root: 'ReactDnDHTML5Backend',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var config = {
  entry: './src/index',
  externals: {
    'react': reactExternal,
    'react-dnd': reactDnDExternal,
    'react-dnd-html5-backend': reactBackendExternal
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    filename: 'dist/ReactLayoutPluginDnD.min.js',
    library: 'ReactLayoutPluginDnD',
    libraryTarget: 'umd',
  },
  plugins: [
    {
      apply: function apply(compiler) {
        compiler.plugin("parser", function(parser, options) {
          parser.plugin('expression global', function expressionGlobalPlugin() {
            this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
            return false;
          });
        });
      }
    },
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  )
}

module.exports = config;