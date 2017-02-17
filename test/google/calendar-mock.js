const mockResponse = {
  "kind": "calendar#events",
  "summary": "HUGE | Chuck",
  "updated": "2016-08-24T16:01:48.447Z",
  "timeZone": "America/Los_Angeles",
  "accessRole": "reader",
  "defaultReminders": [],
  "items": [{
    "status": "confirmed",
    "created": "2016-08-18T15:21:26.000Z",
    "updated": "2016-08-23T15:29:52.488Z",
    "summary": "Daily Stand-up",
    "description": "Hi everyone,\n\nPlease set aside this time for a daily 15-min stand-up on the project.\n\nThanks",
    "location": "DC | Chuck",
    "start": {
      "dateTime": "2016-08-24T08:15:00-07:00"
    },
    "end": {
      "dateTime": "2016-08-24T08:30:00-07:00"
    },
    "originalStartTime": {
      "dateTime": "2016-08-24T08:15:00-07:00"
    }
  }, {
    "kind": "calendar#event",
    "status": "confirmed",
    "created": "2016-07-05T16:16:14.000Z",
    "updated": "2016-08-23T15:31:42.911Z",
    "summary": "Daily 30 minute Phase2",
    "description": "There's no consistent room block I can use, so will let everyone know where we're meeting prior to each standup.",
    "start": {
      "dateTime": "2016-08-24T12:45:00-07:00"
    },
    "end": {
      "dateTime": "2016-08-24T13:15:00-07:00"
    },
    "originalStartTime": {
      "dateTime": "2016-08-24T12:45:00-07:00"
    },
    "sequence": 0
  }, {
    "kind": "calendar#event",
    "status": "confirmed",
    "created": "2016-08-19T15:25:04.000Z",
    "updated": "2016-08-24T14:01:54.486Z",
    "summary": "508 Compliance",
    "description": "We'll use this 30 minutes to review the landing page design PDF to discuss how we envision the animation working, and discuss the color contrast. LC: #c000ff",
    "location": "| 202-794-7088, DC | Chuck",
    "sequence": 1,
    "reminders": {
      "useDefault": true
    }
  }, {
    "status": "confirmed",
    "created": "2016-08-05T19:07:51.000Z",
    "updated": "2016-08-24T14:41:17.187Z",
    "location": "DC | Chuck",
    "start": {
      "dateTime": "2016-08-24T07:00:00-07:00"
    },
    "end": {
      "dateTime": "2016-08-24T07:30:00-07:00"
    },
    "originalStartTime": {
      "dateTime": "2016-08-24T07:00:00-07:00"
    },
    "sequence": 0
  }, {
    "kind": "calendar#event",
    "status": "confirmed",
    "created": "2016-01-06T16:25:57.000Z",
    "updated": "2016-08-24T15:28:37.784Z",
    "summary": "Huge | Daily PM Sync",
    "description": "Daily check-in to cover off on priority items.",
    "start": {
      "dateTime": "2016-08-24T10:30:00-07:00"
    },
    "end": {
      "dateTime": "2016-08-24T11:00:00-07:00"
    },
    "originalStartTime": {
      "dateTime": "2016-08-24T09:30:00-07:00"
    },
    "sequence": 2,
    "start": {
      "dateTime": "2016-08-24T09:00:55-07:00"
    },
    "end": {
      "dateTime": "2016-08-24T10:00:55-07:00"
    },
    "sequence": 0,
    "attendees": [{
      "displayName": "DC | Chuck",
      "self": true,
      "resource": true,
      "responseStatus": "accepted"
    }],
    "reminders": {
      "useDefault": true
    }
  }]
};

module.exports = {
  getMeetings: (room) => {

    const p = new Promise(resolve => {
      resolve(mockResponse);
    });

    return p;
  }
};
