import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Pozdnyak Pokemon',
    description: 'Pokemon-like game about Pozdnyakov and Butalka',
    version: '0.0',
    path: 'api',
  },
};

export default (): Config => config;
