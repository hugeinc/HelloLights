const lifxObj = require('lifx-api');

const logger = require('./logger');

const token = 'LIFX_API_TOKEN';
const lifx = new lifxObj(token);

const changeLightColor = (id, color, pulse) => {

  const p = new Promise((resolve, reject) => {

    const handleLightResponse = (response) => {

      const lightResponse = JSON.parse(response);
      if (lightResponse.status === 'ok') {
        logger.info(`Setting/pulsing light ${id} to ${color}`);
        resolve(lightResponse);
      } else {
        logger.error('Error setting light', response);
        reject(lightResponse);
      }
    };

    if (pulse) {
      lifx.pulseEffect(`id:${id}`, `#${color}`, null, 6, 1, false, true, 0.5, handleLightResponse);
    } else {
      lifx.setColor(`id:${id}`, `#${color}`, 0, true, handleLightResponse);
    }
  });

  return p;
};

module.exports = {
  changeLightColor: changeLightColor
};
