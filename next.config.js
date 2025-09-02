/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['en', 'hr'],
    defaultLocale: 'en',
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    
    optimizeCss: true,
  },
  // Uncomment to enable bundle analyzer in production build
  // webpack: (config, { isServer }) => {
  //   if (process.env.ANALYZE === 'true') {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'server',
  //         analyzerPort: isServer ? 8888 : 8889,
  //         openAnalyzer: true,
  //       })
  //     );
  //   }
  //   return config;
  // },
};

// Sentry configuration for production
if (process.env.NODE_ENV === 'production') {
  // Importing @sentry/nextjs here to avoid issues in development
  try {
    const { withSentryConfig } = require('@sentry/nextjs');
    
    const sentryWebpackPluginOptions = {
      silent: true, // Suppresses all logs
    };
    
    module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
  } catch (e) {
    console.warn('Sentry integration skipped:', e.message);
    module.exports = nextConfig;
  }
} else {
  module.exports = nextConfig;
}
