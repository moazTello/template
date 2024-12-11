module.exports = {
  apps: [
    {
      name: process.env.NODE_ENV === 'production' ? 'Caffeina-Dashboard' : 'Caffeina-QA-Dashboard',
      script: 'serve',
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: process.env.NODE_ENV === 'production' ? 3987 : 3990,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
        PM2_SERVE_BASIC_AUTH: 'true',
        PM2_SERVE_BASIC_AUTH_USERNAME: 'admin',
        PM2_SERVE_BASIC_AUTH_PASSWORD: 'admin@orkabit',
      },
    },
  ],
};
