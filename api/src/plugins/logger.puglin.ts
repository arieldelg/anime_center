import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  //   defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({ filename: "error.log", level: " error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

const buildLogger = (service: string) => {
  return {
    log: (message: any) => logger.log("info", { message, service }),
    error: (message: any) => logger.error("info", { message, service }),
  };
};

export { buildLogger };
