const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const clientRoute = require('./client.route');
const docsRoute = require('./docs.route');
const placeRoute = require('./place.route');
const eventRoute = require('./event.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const railRoute = require('./rail.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/client',
    route: clientRoute,
  },
  {
    path: '/place',
    route: placeRoute,
  },
  {
    path: '/event',
    route: eventRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/rails',
    route: railRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
