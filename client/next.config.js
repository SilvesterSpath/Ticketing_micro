module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOPtions.poll = 300;
    return config;
  },
};
