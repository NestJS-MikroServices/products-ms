/* eslint-disable */
import 'dotenv/config';
import * as joi from 'joi';
import * as process from 'process';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;

  NATS_SERVERS: string[];
}

const envsSchema = joi.object(
  {
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required()
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation ERROR: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseURL: envVars.DATABASE_URL
}