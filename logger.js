const { createLogger, format, transports } = require('winston');

module.exports = createLogger ({
    transports:
    new transports.File({
        filename: 'log/logs.log',
        format:format.combine(
            format.timestamp({format: 'MM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(error => `${error.level}: ${[error.timestamp]}: ${error.message}`),
        )
    })
})