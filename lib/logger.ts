import pino from "pino";

export const createLogger = (name?: string) =>
  pino({
    name,
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  });

export const log = createLogger();
