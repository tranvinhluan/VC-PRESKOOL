const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  console.log(env.mode);
  return {
    mode: "development",
    entry: {
      index: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "bundle.js",
      // clean: true,
      assetModuleFilename: "[name][ext]",
    },
    // watch: true,
    // devtool: "inline-source-map", eval().
    devServer: {
      static: {
        directory: path.resolve(__dirname, "build"),
      },
      port: 9000,
      // open: true,
      // hot: true,
      // compress: true,
      // historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            env?.mode === "pro" ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            //   { loader: 'style-loader', options: { injectType: 'linkTag' } },
            //   { loader: 'file-loader', options: { name: 'css/[name].[ext]' } },
          ],
        },
        {
          test: /\.(ico|svg|gif|png|jpg|jpeg|eot|ttf|woff|woff2)$/i,
          type: "asset/resource",
        //   loader: "file-loader",
        //   options: {
        //     name: "[path][name].[ext]",
        //   },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            env?.mode === "pro" ? MiniCssExtractPlugin.loader : "style-loader",
            // "style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: { outputStyle: "expanded" },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new HtmlWebpackPlugin({
        title: "Webpack App",
        filename: "index.html",
        template: path.resolve(__dirname, "./public/index.html"),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
