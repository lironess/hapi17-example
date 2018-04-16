import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import JWTAuth from 'hapi-auth-jwt2';

import parameters from 'config/parameters';
import Routes from 'routes';
import Documentation from 'config/documentation';
import HttpRequest from 'config/http-request';
import Database from 'config/db';
import Auth from 'config/auth';

const server = new Hapi.Server({
  port: process.env.PORT || parameters.PORT,
  router: { stripTrailingSlash: true },
  state: { isSameSite: 'Lax' },
  routes: {
    cors: {
      origin: ['*'],
      credentials: true
    },
    state: {
      failAction: 'ignore'
    }
  }
});

const plugins = [
  Inert,
  Vision,
  Documentation,
  HttpRequest,
  JWTAuth,
  Auth,
  Database,
  Routes
];

const getServer = async () => {
  await server.register(plugins, {
    routes: { prefix: '/api' }
  });
  return server;
};

export { getServer };
