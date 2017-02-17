const moment = require('moment');

const logger = require('./logger');

module.exports = function(CalendarService, currentTimestamp) {

  const cs = CalendarService;

  const getMeetings = roomName => {
    return cs.getMeetings(roomName);
  };

  this.getRoomStatus = roomName => {

    const roomStatus = {
      busy: false,
      customColor: false,
      fiveMinuteWarning: false,
      oneMinuteWarning: false,
    };

    const extractColorCodeFromMeetingDescription = meetingDescription => {
      const colorCodeRegex = /LC\: ?#?(\w{1,6})/;
      const colorCodeMatches = meetingDescription.match(colorCodeRegex);
      if (colorCodeMatches) {
        return colorCodeMatches[1];
      }
    };

    const p = new Promise((resolve, reject) => {

      getMeetings(roomName)
        .then(
          meetings => {

            const now = currentTimestamp ? moment(currentTimestamp) : moment();

            meetings.items.forEach(meeting => {

              const meetingStart = meeting.start.dateTime ? moment(meeting.start.dateTime) : moment(meeting.start.date);
              const meetingEnd = meeting.end.dateTime ? moment(meeting.end.dateTime) : moment(meeting.end.date);

              if (now.isBetween(meetingStart, meetingEnd)) {
                roomStatus.busy = true;

                if (meeting.description) {
                  roomStatus.customColor = extractColorCodeFromMeetingDescription(meeting.description) || false;
                  if (roomStatus.customColor) {
                  }
                }
                const minutesUntilEndOfMeeting = Math.floor(meetingEnd.diff(now, 'minutes', true));
                if (minutesUntilEndOfMeeting == 5) {
                  roomStatus.fiveMinuteWarning = true;
                }
                if (minutesUntilEndOfMeeting == 1) {
                  roomStatus.oneMinuteWarning = true;
                }
              }
            });
            resolve(roomStatus);
          },
          error => {
            reject(error);
          }
        );
    });

    return p;
  }
};
