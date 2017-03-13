# HelloLights

An application to change the color of LIFX light bulbs depending on the schedule of Google Calendars. This is used in the Huge DC office to change the colors of lights in our conference rooms as the status of meetings in the rooms changes.

There's a full writeup at http://www.hugeinc.com/ideas/perspective/smart-lighting with more details on the project.

## Prerequisites
There are few pieces of infrastructure that you'll need to run this application.

1. LIFX light bulbs registered with their cloud API with the respective API IDs. These look like `d073d8658159`.
2. Google Calendars and their respective API IDs. These look like `domain.com_5869234857353935383533@resource.calendar.google.com`.
3. A Google API application configured to use the Google Calendar API and oAuth flow configured for the application. You can create one at https://console.developers.google.com

## Code Changes
All keys and IDs have been scrubbed from the codebase. You'll need to replace these bits with the information above in the following locations in the codebase.
* https://github.com/hugeinc/HelloLights/blob/master/room-config.js#L6
* https://github.com/hugeinc/HelloLights/blob/master/room-config.js#L7
* https://github.com/hugeinc/HelloLights/blob/master/google-config.js#L9
* https://github.com/hugeinc/HelloLights/blob/master/google-config.js#L10
* https://github.com/hugeinc/HelloLights/blob/master/google-config.js#L11
* https://github.com/hugeinc/HelloLights/blob/master/libs/lifx.js#L5

## Running the App
This is a standard Node/Express app and can be run with `npm install && npm start`

After starting the app hit http://localhost:6001 and it will boot you to the Google oAuth flow. Authenticate as a user that has permission to read the Google Calendars you'd like to use. After authenticating visit http://locahost:6001/update to update all lights defined in roomconfig.js

## Running the Tests
The tests use mocha and chai and can be run with `npm test`.
