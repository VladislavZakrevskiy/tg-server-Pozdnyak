declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_ID: string;
      NODE_ENV: 'dev' | 'prod';
    }
  }
}

export {};
