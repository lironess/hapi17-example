import Joi from 'joi';

const port = 8000;

const shared = {
  JWT_SECRET: 'ThisIsOurBoilerplatePassword',
  APPLICATION_NAME: 'mySampleApp',
  PORT: port,
  API_URL: 'https://jsonplaceholder.typicode.com'
};

const configuration = {
  development: {
    ...shared,
    DOCUMENTATION: {
      PROTOCOL: 'http',
      HOST: `localhost:${port}`
    },
    DATABASE_URL: 'postgres://127.0.0.1:5432/postgres',
  },
  production: {
    ...shared,
    DOCUMENTATION: {
      PROTOCOL: 'https',
      HOST: 'myappname.herokuapp.com'
    }
  }
};

const environment = process.env.NODE_ENV || 'development';

const parametersSchema = Joi.object({
  JWT_SECRET: Joi.string().required(),
  APPLICATION_NAME: Joi.string().required(),
  PORT: Joi.number().required(),
  API_URL: Joi.string().required(),
  DOCUMENTATION: Joi.object({
    PROTOCOL: Joi.string().valid('http', 'https').required(),
    HOST: Joi.string().required()
  }).required(),
  DATABASE_URL: Joi.string().required()
}).unknown().required();

const { error, value: parameters } = Joi.validate(
  {
    ...process.env,
    ...configuration[environment]
  },
  parametersSchema
);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default parameters;
