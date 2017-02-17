module.exports = function() {

  const rooms = {

    goldie: {
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID',
      bulbNumber: 1
    },
    ian: {
      bulbNumber: 2,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    },
    marion: {
      bulbNumber: 3,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    },
    connie: {
      bulbNumber: 4,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    },
    chuck: {
      bulbNumber: 5,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    },
    marvin: {
      bulbNumber: 6,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    },
    wale: {
      bulbNumber: 7,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    },
    duke: {
      bulbNumber: 8,
      calendarID: 'GOOGLE_CALENDAR_ID@resource.calendar.google.com',
      lightID: 'LIFX_LIGHT_ID'
    }
  };

  const lightColorSettings = {
    default: 'ffffff',
    open: '13ff00',
    fiveMinuteWarning: '007fff',
    oneMinuteWarning: 'ff2900'
  };

  return {
    rooms: rooms,
    lights: lightColorSettings
  }
}();
