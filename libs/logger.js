const moment = require('moment');
const winston = require('winston');

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
      },
      formatter: function(options) {
        const message = undefined !== options.message ? options.message : '';
        const debug = options.meta && Object.keys(options.meta).length ? JSON.stringify(options.meta) : '';
        return `${options.level.toUpperCase()}: ${options.timestamp()} - ${message} ${debug}`;
      }
    })
  ]
});
