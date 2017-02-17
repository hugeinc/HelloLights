const express = require('express'),
  logger = require('./libs/logger'),
  GoogleCalendar = require('./libs/google/calendar'),
  Meetings = require('./libs/meetings'),
  LIFX = require('./libs/lifx'),
  RoomConfig = require('./room-config'),
  rp = require('request-promise'),
  moment = require('moment');

const MeetingsService = new Meetings(GoogleCalendar);

const app = express();

const updateConferenceRoomLights = (singleRoom) => {

  var roomList = RoomConfig.rooms;
  if (singleRoom) {
    const consolidatedRoomList = {};
    consolidatedRoomList[singleRoom] = roomList[singleRoom];
    roomList = consolidatedRoomList;
  }

  var updatedRooms = 0;
  var roomsCurrentStatus = {};
  const totalRooms = Object.keys(roomList).length;

  const p = new Promise((resolve, reject) => {

    const resolveLight = (roomName, roomStatus, success) => {

      roomStatus.lightOnline = success ? true : false;

      updatedRooms++;
      roomsCurrentStatus[roomName] = roomStatus;
      if (updatedRooms == totalRooms) {
        resolve(roomsCurrentStatus);
      }
    };

    for (var roomName in roomList) {

      var lightID = RoomConfig.rooms[roomName].lightID;

      const update = function (roomName, lightID) {

        MeetingsService.getRoomStatus(roomName)
          .then(
            roomStatus => {

              logger.info('-');
              logger.info(`${roomName.toUpperCase()} processing meetings`);

              roomStatus.lightOnline = false;

              if (roomStatus.busy) {
                if (roomStatus.oneMinuteWarning) {
                  logger.info(`${roomName.toUpperCase()} one minute warning`);
                  LIFX.changeLightColor(lightID, RoomConfig.lights.oneMinuteWarning, true)
                    .then(
                      success => {resolveLight(roomName, roomStatus, true)},
                      error => {resolveLight(roomName, roomStatus)}
                    );
                } else if (roomStatus.fiveMinuteWarning) {
                  logger.info(`${roomName.toUpperCase()} five minute warning`);
                  LIFX.changeLightColor(lightID, RoomConfig.lights.fiveMinuteWarning, true)
                    .then(
                      success => {resolveLight(roomName, roomStatus, true)},
                      error => {resolveLight(roomName, roomStatus)}
                    );
                } else if (roomStatus.customColor) {
                  logger.info(`${roomName.toUpperCase()} setting custom color ${roomStatus.customColor}`);
                  LIFX.changeLightColor(lightID, roomStatus.customColor)
                    .then(
                      success => {resolveLight(roomName, roomStatus, true)},
                      error => {resolveLight(roomName, roomStatus)}
                    );
                } else {
                  logger.info(`${roomName.toUpperCase()} is busy.`);
                  LIFX.changeLightColor(lightID, RoomConfig.lights.default)
                    .then(
                      success => {resolveLight(roomName, roomStatus, true)},
                      error => {resolveLight(roomName, roomStatus)}
                    );
                }
              } else {
                logger.info(`${roomName.toUpperCase()} is open`);
                LIFX.changeLightColor(lightID, RoomConfig.lights.open)
                  .then(
                      success => {resolveLight(roomName, roomStatus, true)},
                      error => {resolveLight(roomName, roomStatus)}
                  );
              }

            },
            error => {
              logger.error(error);
              reject(error);
            }
          );

      }(roomName, lightID);
    }
  });

  return p;
};

// Check for a valid token on our file system at startup
GoogleCalendar.validTokenExists()
  .then(
    success => {
      updateConferenceRoomLights();
    },
    error => {
      logger.info(`App needs to authenticate with your google account. Visit ${GoogleCalendar.authURL}`);
    }
  );

app.get('/update/:room?', (req, res) => {

  updateConferenceRoomLights(req.params.room)
    .then(
      success => {
        res.send(success);
      },
      error => {
        res.error(error);
      }
    );
});

app.post('/update-service', (req, res) => {

  rp(process.env.LIGHTS_APP_UPDATE_URL)
    .then(json => {
      logger.info('Calling service update ' + moment().format(), json);
      res.send(json);
    });
});

app.get('/', (req, res) => {
  res.redirect(GoogleCalendar.authURL);
});

// Return point for oAuth flow, should match googleConfig.redirect_url
app.get('/auth', (req, res) => {

  const code = req.query.code;

  GoogleCalendar.getToken(code)
    .then(
      (resolved) => {
        res.send('App properly authed');
      },
      (rejected) => {
        res.send('Refresh token not present. Revoke app permissions and rerun');
        process.exit();
      }
    );
});

const server = app.listen(process.env.PROD ? 8081 : 6001, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
