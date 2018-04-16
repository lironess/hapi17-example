import { helloWorld, getPosts, getUser } from 'routes/basic';
import { login, register as registerRoute } from 'routes/auth';

const routesPlugin = {
  name: 'routes',
  register: (server) => {
    server.route([
      { method: 'GET', path: '/hello/{name}', config: helloWorld },
      { method: 'POST', path: '/register', config: registerRoute },
      { method: 'POST', path: '/login', config: login },
      { method: 'GET', path: '/posts', config: getPosts },
      { method: 'GET', path: '/user', config: getUser }
    ]);
  }
};

export default routesPlugin;
