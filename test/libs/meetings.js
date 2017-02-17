const chai = require('chai');
const expect = chai.expect;

Meetings = require('../../libs/meetings');
CalendarServiceMock = require('../google/calendar-mock');

describe('MeetingsService', () => {
  describe('getRoomStatus', () => {
    it('should return open during an open time', (done) => {

      const MeetingsService = new Meetings(CalendarServiceMock, '2016-08-24T09:15:00-04:00');

      MeetingsService.getRoomStatus('chuck')
        .then(
          roomStatus => {
            expect(roomStatus.busy).to.equal(false);
            done();
          }
        );
    });
  });
});

describe('MeetingsService', () => {
  describe('getRoomStatus', () => {
    it('should return busy during a busy time', (done) => {

      const MeetingsService = new Meetings(CalendarServiceMock, '2016-08-24T10:15:00-04:00');

      MeetingsService.getRoomStatus('chuck')
        .then(
          roomStatus => {
            expect(roomStatus.busy).to.equal(true);
            done();
          }
        );
    });
  });
});

describe('MeetingsService', () => {
  describe('getRoomStatus', () => {
    it('should return a custom meeting color when one exists', (done) => {

      const MeetingsService = new Meetings(CalendarServiceMock, '2016-08-24T11:00:00-04:00');

      MeetingsService.getRoomStatus('chuck')
        .then(
          roomStatus => {
            expect(roomStatus.customColor).to.equal('c000ff');
            done();
          }
        );
    });
  });
});

describe('MeetingsService', () => {
  describe('getRoomStatus', () => {
    it('should return a 5 minute warning 5 minutes before the meeting ends', (done) => {

      const MeetingsService = new Meetings(CalendarServiceMock, '2016-08-24T11:10:00-04:00');

      MeetingsService.getRoomStatus('chuck')
        .then(
          roomStatus => {
            expect(roomStatus.fiveMinuteWarning).to.equal(true);
            done();
          }
        );
    });
  });
});

describe('MeetingsService', () => {
  describe('getRoomStatus', () => {
    it('should return a 1 minute warning 1 minute before the meeting ends', (done) => {

      const MeetingsService = new Meetings(CalendarServiceMock, '2016-08-24T11:14:00-04:00');

      MeetingsService.getRoomStatus('chuck')
          .then(
              roomStatus => {
                expect(roomStatus.oneMinuteWarning).to.equal(true);
                done();
              }
          );
    });
  });
});