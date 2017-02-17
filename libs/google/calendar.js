const fs = require('fs-promise'),
  google = require('googleapis'),
  serialize = require('node-serialize'),
  moment = require('moment');

const logger = require('../logger'),
  RoomConfig = require('../../room-config'),
  googleConfig = require('../../google-config');

module.exports = () => {

  const calendar = google.calendar('v3');
  const oAuthClient = new google.auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.redirectURL);

  const tokenFile = 'google-token';

  const validTokenExists = () => {

    const p = new Promise((resolve, reject) => {

      fs.exists(tokenFile)
        .then(exists => {
          if (exists) {
            logger.info('Token file present');
            readTokenFile(tokenFile);
          } else {
            logger.info('No local token file');
            reject();
          }
        });

      const readTokenFile = (tokenFile) => {
        fs.readFile(tokenFile, 'utf-8')
          .then(tokenCredentials => {
            oAuthClient.setCredentials(serialize.unserialize(tokenCredentials));
            testCalendarAccess();
          });
        };

      const testCalendarAccess = () => {
        getMeetings('chuck')
          .then(
            success => {
              logger.info('Token is valid and can access calendars');
              resolve(true);
            },
            error => {
              logger.info('Token is invalid');
              reject(false);
            }
          );
        };
    });

    return p;
  };

  const authURL = function() {
    return oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/calendar.readonly'
    });
  };

  var getMeetings = function(room) {

    const p = new Promise(function(resolve, reject) {

      var today = moment().format('YYYY-MM-DD') + 'T';
      var calendarID = RoomConfig.rooms[room].calendarID;

      var parameters = {
        calendarId: calendarID,
        maxResults: 20,
        timeMin: today + '00:00:00.000Z',
        timeMax: today + '23:59:59.000Z',
        showDeleted: false,
        singleEvents: true,
        auth: oAuthClient
      };

      calendar.events.list(parameters, (err, meetings) => {
        if (err) {
          logger.error(err);
          reject(err);
        } else {
          resolve(meetings);
        }
      });

    });

    return p;
  };

  const getToken = function(code) {

    const p = new Promise(function(resolve, reject) {

      oAuthClient.getToken(code, (err, token) => {

        if(token) {
          if (token.refresh_token) {
            fs.writeFile(tokenFile, serialize.serialize(token))
              .then(
                success => {
                  logger.info('Successfully wrote token file');
                  oAuthClient.setCredentials(token);
                  resolve();
                },
                err => {
                  logger.error('Error storing token in file');
                  reject();
                }
              );
          } else {
            logger.error('Refresh token not present. Revoke app permissions and rerun');
            reject();
          }
        } else {
          logger.error('Could not retrieve oAuth token');
          reject();
        }
      });
    });

    return p;
  };

  return {
    validTokenExists: validTokenExists,
    authURL: authURL(),
    getMeetings: getMeetings,
    getToken: getToken
  };

}();
