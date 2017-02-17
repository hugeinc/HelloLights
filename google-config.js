if (process.env.PROD) {
  module.exports = {
    clientID: 'GOOGLE_OAUTH_CLIENT_ID',
    clientSecret: 'GOOGLE_OATH_SECRET',
    redirectURL: 'REDIRECT_URL'
  };
} else {
  module.exports = {
    clientID: 'GOOGLE_OAUTH_CLIENT_ID',
    clientSecret: 'GOOGLE_OATH_SECRET',
    redirectURL: 'http://localhost:6001/auth'
  };
}
