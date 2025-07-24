import { config } from "dotenv";
config();

const env = process.env;

interface AppEnvInterface {
  JWT_SECRET: string,
  FRONTEND_HOST: string,
  BACKEND_HOST: string,
  GOOGLE_CLIENT_ID: string,
  GOOGLE_CLIENT_SECRET: string,
  ENCRYPTION_KEY: string
  EMAIL_CONFIG: {
    host: string,
    port: number,
    auth: {
      user: string,
      pass: string,
    },
    senderPassword: string,
    secure: boolean,
  }
}

export const AppEnv: AppEnvInterface = {
  JWT_SECRET: env.JWT_SECRET as any,
  FRONTEND_HOST: env.FRONTEND_HOST as any,
  BACKEND_HOST: env.BACKEND_HOST as any,
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID as any,
  GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET as any,
  ENCRYPTION_KEY: env.ENCRYPTION_KEY as any,
  EMAIL_CONFIG: {
    host: env.SMTP_SERVER as any,
    port: parseInt(env.SMTP_PORT as any),
    auth: {
      user: env.SENDER_EMAIL as any,
      pass: env.SENDER_PASSWORD as any,
    },
    senderPassword: env.SENDER_PASSWORD as any,
    secure: env.EMAIL_USE_TLS !== 'true' ? true : false,
  }
}