import HapiSequelize from 'hapi-sequelizejs';
import Sequelize from 'sequelize';
import { join } from 'path';

import parameters from 'config/parameters';

// BIGINT will be returned as int and not string
require('pg').defaults.parseInt8 = true;

const databasePlugin = {
  name: 'database',
  plugin: HapiSequelize,
  options: [{
    name: 'personalized_nutrition',
    models: [join(__dirname, '../models/**/*.js')],
    sequelize: new Sequelize(parameters.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: (process.env.NODE_ENV === 'production') || (process.env.NODE_ENV === 'staging')
      },
      logging: false
    }),
    sync: true,
    forceSync: false
  }]
};

export default databasePlugin;
