import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isDebug = process.env.NODE_ENV !== 'production';
const isVerbose = !!process.env.VERBOSE;

const js = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  query: {
    // https://github.com/babel/babel-loader#options
    cacheDirectory: isDebug,

    // https://babeljs.io/docs/usage/options/
    babelrc: false,

    presets: [
      // A Babel preset that can automatically determine the Babel plugins and polyfills
      // https://github.com/babel/babel/tree/master/packages/babel-preset-env
      [
        '@babel/preset-env',
        {
          modules: isDebug ? 'commonjs' : false,
          debug: isVerbose,
        },
      ],
      // Experimental ECMAScript proposals
      // https://babeljs.io/docs/plugins/preset-stage-2/
      '@babel/preset-stage-2',

      // JSX
      // https://babeljs.io/docs/plugins/preset-react/
      '@babel/preset-react',
    ],
  },
};

const css = {
  test: /\.(css|scss)$/,
  use: ExtractTextPlugin.extract({
    use: [
      {
        // CSS Loader https://github.com/webpack/css-loader
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: isDebug,
          // CSS Nano http://cssnano.co/options/
          minimize: !isDebug,
        },
      },
      {
        // PostCSS Loader https://github.com/postcss/postcss-loader
        loader: 'postcss-loader',
        options: {
          sourceMap: isDebug,
          plugins: [
            // Used to resolve imports
            // https://github.com/postcss/postcss-import
            postcssImport(),
            // Add vendor prefixes to CSS rules using values from caniuse.com
            // https://github.com/postcss/autoprefixer
            autoprefixer(),
          ],
        },
      },
      {
        // Sass Loader https://github.com/webpack-contrib/sass-loader
        loader: 'sass-loader',
        options: {
          sourceMap: isDebug,
        },
      },
    ],
  }),
};

const asset = {
  test: /\.(jpg|jpeg|gif|png|svg|woff|woff2)$/,
  // File loader https://github.com/webpack-contrib/file-loader
  loader: 'file-loader',
  options: {
    emitFile: true,
    name: 'assets/img/[name].[ext]?[hash]',
  },
};

export default { js, css, asset };
