"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLogger = void 0;
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    //   defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.transports.File({ filename: "error.log", level: " error" }),
        new winston_1.transports.File({ filename: "combined.log" }),
    ],
});
const buildLogger = (service) => {
    return {
        log: (message) => {
            let newMessage = message;
            if (message === undefined) {
                newMessage = "indefinido Papu";
            }
            logger.log("info", { message: newMessage, service });
        },
        error: (message) => logger.error("info", { message, service }),
    };
};
exports.buildLogger = buildLogger;
