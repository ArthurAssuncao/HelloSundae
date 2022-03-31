const withPlugins = require('next-compose-plugins');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm|txt)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[path][name].[hash][ext]',
      },
    });
    return config;
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets/sass')],
  },
};

module.exports = withPlugins([], { reactStrictMode: true }, nextConfig);
