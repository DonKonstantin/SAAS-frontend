// Подключаем .env файл
require('dotenv').config({
    path: './.env',
});

// Основные настройки приложения
const nextConfig = {
    typescript: {
        // ignoreBuildErrors: true,
    },
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    devIndicators: {
        autoPrerender: false,
    },
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html'
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html'
        }
    },
    publicRuntimeConfig: {
        graphQlEndpoint: process.env.GRAPHQL_SERVER,
        wsGraphQlEndpoint: process.env.GRAPHQL_WS_SERVER,
        mediaLibraryEndPoint: process.env.MEDIA_LIBRARY_SERVER,
        mediaLibraryApiVersion: process.env.MEDIA_LIBRARY_API_VERSION,
        mainDomain: process.env.MAIN_DOMAIN,
        debug: process.env.DEBUG === "true",
        environment: process.env.ENVIRONMENT || `dev`,
        tokenRefreshTimeout: parseInt(process.env.TOKEN_REFRESH_TIMEOUT) || 1,
        reportsUrl: process.env.NEXT_PUBLIC_REPORTS_URL || '',
        reportsApiVersion: process.env.NEXT_PUBLIC_REPORTS_API_VERSION || '',
        CI: process.env.NEXT_PUBLIC_CI || false,
    },
    serverRuntimeConfig: {
        env: {...process.env}
    }
};

module.exports = nextConfig;
